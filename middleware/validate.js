const validator = require('../helpers/validate');

const saveStudent = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "startDate": "string",
        "email": "required|string|email",
        "major": "required|string",
        "courses": "string",
        "isGraduated": "boolean"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    saveStudent
};