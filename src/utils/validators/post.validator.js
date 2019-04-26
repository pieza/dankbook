const Validator = require('validator')
const isEmpty = require('./is-empty')

const { IMAGE, VIDEO } = require('../../utils/enums/media-types')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.description = !isEmpty(data.description) ? data.description : ''
    data.media = !isEmpty(data.media) ? data.media : null

    if (!Validator.isLength(data.description, { max: 255 })) 
        errors.description = 'Description must be less than 255 characters'
    
    // contains media attached
    if(data.media) {
        switch(data.media.type){
            case IMAGE:
            case VIDEO:
                if(isEmpty(data.media.url) || isEmpty(data.file))
                    errors.media = 'Media attached is invalid'
                break
            default:
                errors.media = 'Unknown media type'
                break
        }
    } else if (!Validator.isLength(data.description, { min: 5 })) 
            errors.description = 'Cannot submit an empty post'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


