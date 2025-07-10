const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Saved'],
    default: 'Applied'
  },
  applicationDate: { type: Date, default: Date.now },
  jobPostingURL: { type: String },
  notes: [String],
  tags: [String],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);