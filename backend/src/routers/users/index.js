const express = require("express");
const userRouter = express.Router();
const { authenticate, verifyTokenandAdmin } = require("../../middwares/auth");
require('dotenv').config();

const {
    createUser,
    getUserByEmail,
    getList,
    getUserById,
    deleteUser,
    updateUser,
} = require("../../services/users");

const {
    comparePassword,
    hashPassword,
    genToken,
    genrefreshToken,
} = require("../../services/auth");

let refreshTokens = [];

userRouter.post('/register', async (req, res) => {
    const { username,phone, email, password, code } = req.body;

    const verificationCode = process.env.VERIFICATION_CODE;

    console.log('Using Verification Code:', verificationCode);

    if (code !== verificationCode) {
        return res.status(401).send("Invalid verification code");
    }

    const hashedPassword = await hashPassword(password);
    const  existingMail = await getUserByEmail(email);
    if (existingMail) {
        return res.status(409).send("Email already exists!!!");
    } else {
        const user = await createUser({
            username,phone, email, password: hashedPassword
        })
        if (!user) {
            return res.status(500).send("Can't create user");
        }
        res.status(200).send(user);
    }

});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).send("Wrong email!!!");
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
        return res.status(404).send("Wrong Password!!!");
    }

    if (user && isValidPassword) {
        const token = await genToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });
        const refresh = await genrefreshToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        res.cookie("refreshToken", refresh, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });

        refreshTokens.push(refresh);
        const { password, ...others } = user.dataValues;
        res.status(200).send({ ...others, token });
    }
});

userRouter.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).send("You're not authenticate");
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send("Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, async (err, user) => {
        if (err) {
            console.log(err);
        }

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = await genToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        const newRefreshToken = await genrefreshToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });

        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });

        res.status(200).send({ accessToken: newAccessToken });
    });
});

userRouter.post("/logout", [authenticate], (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
    );
    res.status(200).send("Log out is successfully");
});

userRouter.get('get/:id', async (req, res) => {
    const { id } = req.params;
    const getuser = await getUserById(id);
    if (!getuser) {
        return res.status(500).send('User does not exist!');
    }
    res.status(200).send(getuser);
});
userRouter.get('/allStaff', async (req, res) => {
    const listUser = await getListStaff();
    if (!listUser) {
        return res.status(500).send("Can't get list staff");
    }
    res.status(200).send(listUser);
});

userRouter.get('/all', async (req, res) => {
    const listUser = await getList();
    if (!listUser) {
        return res.status(500).send("Can't get list user");
    }
    res.status(200).send(listUser);
});
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const idUserExist = await getUserById(id);

    if (!idUserExist) {
        return res.status(500).send(`User ${id} is not exists in db`);
    }
    const userDelete = await deleteUser(id);
    return res.status(200).send(`User id : ${userDelete} successfully`);
});

userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, phone, status, address } = req.body;

    const isExistUser = await getUserById(id);

    if (!isExistUser) {
        res.status(500).send("User is not exists in db");
    }

    const hashedPassword = await hashPassword(password);

    const data = { username, email, password: hashedPassword, phone, status, address };
    await updateUser(id, data);

    res.status(200).send(data);
});


module.exports = userRouter;