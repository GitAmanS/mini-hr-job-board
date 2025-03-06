const express = require('express');
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, jobController.createJob);
router.get('/',authMiddleware, jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', authMiddleware, jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
