const { isName } = require('./schema');

const middleName = (req, res, next) => {
    const { password, email } = req.body;
  
    const { error } = isName.validate(password) || isName.validate(email);
   
    if (error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    } 
    return next();
};

module.exports = {
    middleName,
};