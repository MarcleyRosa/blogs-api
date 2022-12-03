const { isRequiredString, isDisplayName, isEmail, isPassword,
   isToken, isPost, isUpdatePost } = require('./schema');

const middleLogin = (req, res, next) => {
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

const middleName = (req, res, next) => {
  const { name } = req.body;

  const { error } = isRequiredString.validate(name);

  if (error) return res.status(400).json({ message: '"name" is required' });

  return next();
};

const middlePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = isPost.validate({ title, content, categoryIds });

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  return next();
};

const middleUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  const { error } = isUpdatePost.validate({ title, content });

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  return next();
};

module.exports = {
    middleLogin,
    middleDisplayName,
    middleEmail,
    middlePassword,
    middleToken,
    middleName,
    middlePost,
    middleUpdatePost,
};