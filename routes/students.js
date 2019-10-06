const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const studentId = await Student.findByPk(req.params.id);
    if (studentId === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(studentId);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [updatedRowCount, [updatedStudent]] = await Student.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
