const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { title, description } = req.body;
        const job = new Job({ title, description, recruiter: req.user._id });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.recruiterId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        Object.assign(job, req.body);
        await job.save();
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.recruiterId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
