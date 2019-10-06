const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const testId = await Test.findByPk(req.params.id);
    res.status(200).json(testId);
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const newTest = await Test.create(req.body);
    newTest.setStudent(student);
    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Test.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
