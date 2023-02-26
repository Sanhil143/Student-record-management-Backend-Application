

const validName = (value) => /^[a-zA-Z ]{3,20}$/.test(value);
const validEmail = (value) => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value);
const validPhone = (value) => (/^[6-9]{1}?[0-9]{9}$/).test(value);
const validPassword = (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)





module.exports = {validName,validEmail,validPhone,validPassword}
