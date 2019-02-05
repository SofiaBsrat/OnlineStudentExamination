const express = require('express');

const UserService = require('../services/user');

const userRouter = express.Router();

const userService = new UserService();

userRouter.get('/', function (req, res, next) {
const queryObj = req.query.admin == null ? {} : {"is_admin": req.query.admin};
  userService.get(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});

userRouter.post('/', function (req, res, next) {
  userService.add(req.body)
    .then(() => res.status(200).json({
      success: true
    }))
    .catch((err) => next(err));
});

userRouter.patch('/:id', (req, res, next) => {

});

module.exports = userRouter;