const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")
const { BadRequestError, UnauthenticatedError } = require("../errors")

const register = async (req, res) => {
    const { email } = req.body

    let existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new BadRequestError("Email already exist")
    }

    const user = await User.create({ ...req.body })

    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
}
