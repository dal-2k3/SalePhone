const { User } = require("..//..//models");
const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (err) {
        console.log(err);
    }
};
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        return user;
    } catch (err) {
        console.log(err);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        return user;
    } catch (err) {
        console.log(err);
    }
};

const getListStaff = async () => {
    try {
        const listUser = await User.findAll({
            where: {
                role: "staff"
            }
        });
        return listUser;
    } catch (err) {
        console.log(err);
    }
};
const getList = async () => {
    try {
        const listUser = await User.findAll();
        return listUser;
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (id) => {
    try {
        const userDeleted = await User.destroy({
            where: {
                id,
            },
        });
        return userDeleted;
    } catch (err) {
        console.log(err);
    }
};
const updateUser = async (id, data) => {
    try {
        const updateUser = await User.update(data, {
            where: {
                id,
            },
        });
        return updateUser;
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    createUser,
    getUserByEmail,
    getListStaff,
    getUserById,
    getList,
    deleteUser,
    updateUser,
};