const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { token }= JSON.parse(req.headers.authorization);
    try {        
        req.app.locals.userAuth = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({
            message: "Access Forbidden",
            err
        });
    };
};