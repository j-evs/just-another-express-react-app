import express from 'express';
import commonValidations from '../shared/validations/signup';
let router = express.Router();
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';

import User from '../models/User';

function validatedata(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'There is user with such username';
      }
      if (user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });


}


router.post('/', (req, res) => {
  validatedata(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        username, email, password_digest
      }, { hasTimestamps: true }).save()
        .then(user => res.json({ success:true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });


});

export default router;
