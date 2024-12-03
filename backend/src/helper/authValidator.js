const { check } = require('express-validator');

exports.signupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('mobile' , "Mobible Number should contains 10 digits ").isLength({
        min: 10 ,
        max: 10
    }),
    check('password', 'Password must be  greater than 6 character , and cotains at least one  Uppercase , one lowercase , one number and one character').not().isEmpty()
    .isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
    }),
];



exports.loginValidator = [
    check('email', 'Enter a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password is required').not().isEmpty()
];


exports.companyRegistrationValidator = [
check('referenceName', 'Reference Name is required').not().isEmpty(),
check('companyName', 'Company Name is required').not().isEmpty(),
check('email', 'Enter a valid email').isEmail().normalizeEmail({
gmail_remove_dots: true
}),
check('phoneNumber', 'Phone Number should contain 10 digits').isLength({
min: 10,
max: 10
}),
check('whatsappNumber', 'WhatsApp Number should contain 10 digits').isLength({
min: 10,
max: 10
}),
check('password', 'Password must be greater than 6 characters, and contains at least one Uppercase, one lowercase, one number and one character').not().isEmpty()
.isStrongPassword({
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
}),
check('city', 'City is required').not().isEmpty(),
check('address', 'Address is required').not().isEmpty(),
];