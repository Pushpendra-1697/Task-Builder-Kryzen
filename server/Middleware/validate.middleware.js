//middleware for validate Unauthorized user
let jwt = require("jsonwebtoken");
const validate = (req, res, next) => {
    let { token } = req.headers;
    token = jwt.verify(token, process.env.secret_key);
    if (token) {
        next();
    } else {
        res.send({ "status": "NO", "msg": "Unauthorized Please Login First" });
    }
};

module.exports = { validate };