const joi = require('joi').defaults(schema => schema.options({abortEarly: false}));

const loginValidator = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const signupValidator = joi.object().keys({
    username: joi.string().min(3),
    email: joi.string().email().required(),
    password: joi.string().required(),
    // CREDITS TO GERGO ERDOSI [STACK OVERFLOW]
    passwordConfirmation: joi.any().valid(joi.ref('password'))                        .required().options({ 
        language: { 
            any: { 
                allowOnly: 'must match password' 
            } 
        } 
    })
});

const validator = (req, res, next) => {
    let dataToValidate;
    let reqUrl = /update/.test(req.url) ?  "/signup" : req.url;
    switch(reqUrl) {
        case "/login":
            dataToValidate = loginValidator;
            break;
        case "/signup":
            dataToValidate = signupValidator
            break;
        default:
            dataToValidate = null;
            break;
    };

    joi.validate(req.body, dataToValidate, (err, value) => {
        if(err) {
            res.status(422).json({
                message: "Incorrect field(s)",
                err
            });
        } else {
            req.app.locals.userData = value;
            next();
        };        
    });
};

module.exports = validator;