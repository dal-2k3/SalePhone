const express = require("express");
const userRouter = express.Router();
const {
    createUser,
    getUserByEmail,
    getListUser,
    getUserById,
    deleteUser,
    updateUser,
    getListCustomer,
} = require("../../services/users");

const {
    comparePassword,
    hashPassword,
    genToken,
    genrefreshToken,
} = require("../../services/auth");

userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const mail = await getUserByEmail(email);

    if (mail) {
        return res.status(404).send("Email already exists!!!");
    } else {
        const user = await createUser({
            username, email, password: hashedPassword
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
        });
        res.status(200).send({ token });
    }
});

userRouter.get('/one/:id', async (req, res) => {
    const { id } = req.params;
    const getuser = await getUserById(id);
    if (!getuser) {
        return res.status(500).send('User does not exist!');
    }
    res.status(200).send(getuser);
});

userRouter.get('/allCustomer', async (req, res) => {
    const listUser = await getListCustomer();
    if (!listUser) {
        return res.status(500).send("Can't get list Customer");
    }
    res.status(200).send(listUser);
});
userRouter.get('/allStaff', async (req, res) => {
    const listUser = await getListStaff();
    if (!listUser) {
        return res.status(500).send("Can't get list staff");
    }
    res.status(200).send(listUser);
});

userRouter.get('/all', async (req, res) => {
    const listUser = await getListUser();
    if (!listUser) {
        return res.status(500).send("Can't get list user");
    }
    res.status(200).send(listUser);
});
userRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    const idUserExist = await getUserById(id);

    if (!idUserExist) {
        return res.status(500).send(`User ${id} is not exists in db`);
    }
    const userDelete = await deleteUser(id);
    return res.status(200).send(`User id : ${userDelete} successfully`);
});

userRouter.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, phone, address } = req.body;

    const isExistUser = await getUserById(id);

    if (!isExistUser) {
        res.status(500).send("User is not exists in db");
    }

    const hashedPassword = await hashPassword(password);

    const data = { username, email, password: hashedPassword, phone, address };
    await updateUser(id, data);

    res.status(200).send(data);
});


module.exports = userRouter;