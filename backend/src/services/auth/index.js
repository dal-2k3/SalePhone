const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// mã hóa password bằng bcrypt nè ..
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

// giải mã password đã mã hóa nè...
const comparePassword = async (password, passwordHashed) => {
    const isMatch = bcrypt.compare(password, passwordHashed);
    return isMatch;
};

// tạo mới một token nè... 
const genToken = async (data) => {
    const verify = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "3d",
    });
    return verify;
};

// kiểm tra token nè...
const verifyToken = async (token) => {
    const verify = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    return verify;
};

// refresh lại token nè...
const genrefreshToken = (data) => {
    const verify = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "3d",
    });
    return verify;
};
module.exports = {
    hashPassword,
    comparePassword,
    genToken,
    verifyToken,
    genrefreshToken,
}