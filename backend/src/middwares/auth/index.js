const { verifyToken } = require("../../services/auth");
const { getUserByEmail, getUserById } = require("../../services/users");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            const data = await verifyToken(accessToken);
            const user = await getUserById(data.id);
            console.log(user.role)
            if (!user) {
                return res.status(403).send("Token is not valid");
            }
            next();
        }
    } catch (err) {
        return res.status(401).send("You're not authenticated");
    }
};
const verifyTokenandAdmin = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            const data = await verifyToken(accessToken);
            const user = await getUserById(data.id);
            console.log(user.role)
            if (user.role === 'admin') {
                next();
            } else {
                return res.status(403).send("Token is not admin");
            }

        }
    } catch (err) {
        return res.status(401).send("You're not authenticated");
    }

};
module.exports = {
    authenticate,
    verifyTokenandAdmin,
};