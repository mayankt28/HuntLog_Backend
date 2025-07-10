const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  exportJobsToCSV
} = require('../controllers/jobApplicationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.get('/export', exportJobsToCSV); //ex - GET /api/v1/jobs/export?status=Applied&tag=frontend&from=2024-01-01&to=2024-12-31

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
