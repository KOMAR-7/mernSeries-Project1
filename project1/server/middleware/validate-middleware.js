const { parse } = require("../validator/auth-validator");

const validate = (schema) => async (req, res, next)=>{
    try {
        const parseBody = await  schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        console.log(error)
        const message = 'Fill the inputs properly'
        const extraDetails = error.errors[0].message;
        const status = 422;
        const err = {
            status,
            message,
            extraDetails
        }
        next(err)
        // res.status(400).json({msg: message})
    }
}

module.exports = validate;
