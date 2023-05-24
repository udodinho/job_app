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



module.exports = {
    getAllJobs,
    createJob
}
