const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.description = !isEmpty(data.description) ? data.description : ''

    if (!Validator.isLength(data.description, { max: 255 })) 
        errors.description = 'Description must be less than 255 characters'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


