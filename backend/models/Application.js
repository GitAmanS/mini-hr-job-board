const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resumeUrl: { type: String, required: true },
    parsedData: { type: Object }
});

module.exports = mongoose.model('Application', applicationSchema);

