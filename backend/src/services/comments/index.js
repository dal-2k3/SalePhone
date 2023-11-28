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
            where: {       
                status: "private",
            }
        });
        return comment;
    } catch (error) {
        console.log(error);
    }
};
const getCommentPublic = async () => {
    try {
        const comment = await Comment.findAll({
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
    getCommentPublic,
    getCommentPrivate,
    updateComment,
    deleteComments
}