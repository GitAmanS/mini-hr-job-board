const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('resume'), applicationController.createApplication);
router.get('/', authMiddleware, applicationController.getAllApplications);
router.get('/:id', authMiddleware, applicationController.getApplicationById);
router.delete('/:id', authMiddleware, applicationController.deleteApplication);

module.exports = router;
