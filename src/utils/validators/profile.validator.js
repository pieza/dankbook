const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    let errors = {}

    data.description = !isEmpty(data.description) ? data.description : ''
    data.image = !isEmpty(data.image) ? data.image : null
        
    if (!Validator.isLength(data.description, { min: 1, max: 200 })) 
        errors.description = 'Description must be between 1 and 200 characters'
    
    if (Validator.isEmpty(data.description)) 
        errors.description = 'Description field is required'

    if(data.image) {
        const ext = path.extname(data.image.originalname).toLowerCase()
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif')
            errors.image = 'Only images are allowed'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


