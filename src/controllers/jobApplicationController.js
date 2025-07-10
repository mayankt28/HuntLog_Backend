const JobApplication = require('../models/JobApplication');
const { Parser } = require('json2csv');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({ user: req.user._id }).sort({ lastUpdated: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobApplication.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = new JobApplication({ ...req.body, user: req.user._id });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: 'Invalid input', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await JobApplication.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    Object.assign(job, req.body);
    job.lastUpdated = new Date();
    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await JobApplication.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Deletion failed' });
  }
};

exports.exportJobsToCSV = async (req, res) => {
  try {
    const { status, tag, from, to } = req.query;

    const filter = { user: req.user._id };

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = tag;
    }

    if (from || to) {
      filter.applicationDate = {};
      if (from) filter.applicationDate.$gte = new Date(from);
      if (to) filter.applicationDate.$lte = new Date(to);
    }

    const jobs = await JobApplication.find(filter);

    const fields = [
      { label: 'Company', value: 'company' },
      { label: 'Position', value: 'position' },
      { label: 'Status', value: 'status' },
      { label: 'Location', value: 'location' },
      { label: 'Application Date', value: row => row.applicationDate?.toISOString().split('T')[0] },
      { label: 'Job Posting URL', value: 'jobPostingURL' },
      { label: 'Notes', value: row => row.notes?.join('; ') || '' },
      { label: 'Tags', value: row => row.tags?.join(', ') || '' },
      { label: 'Last Updated', value: row => row.lastUpdated?.toISOString() }
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(jobs);

    res.header('Content-Type', 'text/csv');
    res.attachment('filtered_job_applications.csv');
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to export data' });
  }
};

