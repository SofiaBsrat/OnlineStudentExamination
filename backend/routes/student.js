const express = require('express');

const StudentService = require('../services/student');

const studentRouter = express.Router();

const studentService = new StudentService();

studentRouter.get('/', function (req, res, next) {
  const queryObj = req.query.published == null ? {} : {"published": req.query.published};
  studentService.get(queryObj).subscribe(
    (students) => res.status(200).json(students),
    (err) => next(err),
    null
  );

});

studentRouter.get('/:id', (req, res, next) => {
  studentService.get({
    _id: req.params.id
  }).subscribe(
    (students) => res.status(200).json(students),
    (err) => next(err),
    null
  );
});

studentRouter.post('/', function (req, res, next) {
  studentService.add(req.body)
    .then(() => res.status(200).json({
      success: true
    }))
    .catch((err) => next(err));
});

studentRouter.patch('/:id', (req, res, next) => {

});

studentRouter.delete('/:id', (req, res, next) => {

});

module.exports = studentRouter;