const { isRequiredString, isDisplayName, isEmail, isPassword, isToken } = require('./schema');

const middleName = (req, res, next) => {
    const { password, email } = req.body;
  
    const { error } = isRequiredString.validate(password) || isRequiredString.validate(email);
   
    if (error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    } 
    return next();
};

const middleDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  const { error } = isDisplayName.validate(displayName);
  if (error) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  } 
  return next();
};

const middleEmail = (req, res, next) => {
  const { email } = req.body;

  const { error } = isEmail.validate(email);
  if (error) {
    return res.status(400)
    .json({ message: '"email" must be a valid email' });
  } 
  return next();
};

const middlePassword = (req, res, next) => {
  const { password } = req.body;

  const { error } = isPassword.validate(password);
  if (error) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  } 
  return next();
};

const middleToken = (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const { error } = isToken.validate(authorization);

  if (error) return res.status(401).json({ message: 'Expired or invalid token' });

  return next();
};

module.exports = {
    middleName,
    middleDisplayName,
    middleEmail,
    middlePassword,
    middleToken,
};