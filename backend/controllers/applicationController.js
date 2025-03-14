const Application = require('../models/Application');
const Job = require('../models/Job');
exports.createApplication = async (req, res) => {
    try {
        const { jobId } = req.body;
        const resumeUrl = req.file ? req.file.path : null;

        if (!resumeUrl) {
            return res.status(400).json({ message: 'Resume is required' });
        }
        const job = await Job.findById(jobId);
        const recruiter = job.recruiter;
        const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;
        const application = new Application({
            candidateId: req.user._id,
            jobId,
            resumeUrl:resumePath,
            recruiter
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find({recruiter: req.user._id}).populate('candidateId jobId', '-password');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('candidateId jobId', '-password');
        if (!application) return res.status(404).json({ message: 'Application not found' });

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });

        await application.deleteOne();
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
