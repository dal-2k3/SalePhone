const { Comment } = require("../../models");

const createComment = async (data) => {
    try {
        console.log(data);
        const comment = await Comment.create(data);
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getCommentPrivate = async () => {
    try {
        const comment = await Comment.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                status: "private",
            },

        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getComment = async (idProduct) => {
    try {
        const comment = await Comment.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                idProduct,
                status: "public",
            },
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getCommentPublic = async () => {
    try {
        const comment = await Comment.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                status: "public",
            }
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (id, data) => {
    try {
        const updatecomment = await Comment.update(data, {
            where: {
                id,
            }
        });
        return updatecomment;
    } catch (error) {
        console.log(error);
    }
};
const deleteComments = async (id) => {
    try {
        const deletecomment = await Comment.destroy({
            where: {
                id,
            }
        });
        return deletecomment;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    createComment,
    getComment,
    getCommentPublic,
    getCommentPrivate,
    updateComment,
    deleteComments
}