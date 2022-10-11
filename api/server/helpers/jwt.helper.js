const jwt = require('jsonwebtoken');
const Account = require('../model/account-master');
const config = require('../../../config');

function decodeToken(token) {
    return jwt.decode(token.replace('Bearer ', ''));
}

async function getAuthUser(token) {
    try {
        const tokenData = decodeToken(token);
        const user = await User.findById(tokenData.id);
        return user;
    } catch (error) {
        return null;
    }
}
function getJWTToken(data) {
    const token = `Bearer ${jwt.sign(data, config.tokenSecret)}`;
    return token;
}

module.exports = { decodeToken, getJWTToken, getAuthUser };
