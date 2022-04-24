const { decodeToken } = require("../../src/service/auth");
const { getUserById } = require("../../src/service/user");

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('token').replace('Bearer ', '');
        const data = decodeToken(token)
        const isExistUser = await getUserById(data.id);
        if (!isExistUser) {
            return res.status(401).send('Invalid token');
        }
        req.user = isExistUser
        next()
    } catch (error) {
        return res.status(500).send("Server error")
    }
}
const checkRole = (role) => (req,res,next) => {
    const user = req.user
    if(user.roleId !== role){
        return res.status(401).send("Unauthorized access");
    }
    next()
}

module.exports = {
    authenticate, 
    checkRole
}