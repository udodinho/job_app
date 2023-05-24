const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require('../errors')
const Job = require("../models/job")

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
    const userId = req.user.userId
    const jobs = await Job.find({ createdBy: userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length})  
}

const getJob = async (req, res) => {
    const {user: { userId }, params: { id: jobId }} = req
    const job = await Job.findById({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(`No job with the id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getAllJobs,
    createJob,
    getJob
}
