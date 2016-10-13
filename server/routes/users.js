import express from 'express';
import validateInput from '../shared/validations/signup';
let router = express.Router();
import bcrypt from 'bcryptjs';

import User from '../models/User';


router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

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

export default router;
