const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : ''
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ''

    if (!Validator.isLength(data.text, { max: 255 })) 
        errors.text = 'Comment must be less than 255 characters'

    if (!Validator.isLength(data.text, { min: 1 })) 
        errors.text = 'Cannot post an empty comment'

    if (Validator.isEmpty(data.user_id))
        errors.user_id = 'User does not exists'

    if (!data.post_id)
        errors.post_id = 'Post does not exists'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}