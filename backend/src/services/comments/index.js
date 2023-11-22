const comment = require("../../models/comment");
const Comment = require("../../models/comment");

const createComment = async (comment) => {
    try {
        const comment = await Comment.create(comment);
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getCommentPrivate = async (idProduct) => {
    try {
        const comment = await Comment.findAll({
            where: {
                idProduct,
                status: "private",
            }
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getCommentPublic = async (idProduct) => {
    try {
        const comment = await Comment.findAll({
            where: {
                idProduct,
                status: "public",
            }
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getComments = async (id) => {
    try {
        const comment = await Comment.findAll({
            where: {
                id,
            }
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const updateComment = async (id, comment) => {
    try {
        const updatecomment = await Comment.update(comment, {
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
    getComments,
    deleteComments
}