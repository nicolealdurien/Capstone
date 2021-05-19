const crypto = require('crypto')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Admin = require('../models/Admin')
const Customer = require('../models/Customer')
const StaffMember = require('../models/StaffMember')


exports.customerRegister = async (req, res, next) => {
    const {username, email, password, street, city, usaState, zip} = req.body;

    try {
        const customer = await Customer.create({
            username, email, password, street, city, usaState, zip
        })
        sendCustomerToken(customer, 201, res)
    } catch (error) {
        next(error)
    }
}

exports.customerLogin = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const customer = await Customer.findOne({ email }).select('+password')

        if(!customer) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }
            const isMatch = await customer.matchPasswords(password)

            if(!isMatch) {
                return next(new ErrorResponse('Invalid Credentials', 401))
            }

            sendCustomerToken(customer, 200, res)

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.customerForgotPassword = async (req, res, next) => {

    const { email } = req.body

    try {
        const customer = await Customer.findOne({ email })

        if(!customer) {
            return next(new ErrorResponse('Email could not be sent', 404))
        }

        const resetToken = customer.getResetPasswordToken()
            await customer.save()
            const resetUrl = `${process.env.FRUVEFLOW_URL}/auth/customer-reset-password/${resetToken}`

            const message = `
                <h1>You have requested a password reset.</h1>
                <p>Follow this link to reset your password:</p>
                <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                `

            try {
                await sendEmail({
                    to: customer.email,
                    subject: 'Password Reset Request',
                    text: message
                })
                res.status(200).json({ success: true, data: 'Email sent'})
            } catch (error) {
                customer.resetPasswordToken = undefined
                customer.resetPasswordExpire = undefined

                await customer.save()

                return next(new ErrorResponse('Email could not be sent', 500))
            }
    } catch (error) {
        next(error)
    }
}

exports.customerResetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const customer = await Customer.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(!customer) {
            return next(new ErrorResponse('Invalid Reset Token', 400))
        }

        customer.password = req.body.password
        customer.resetPasswordToken = undefined
        customer.resetPasswordExpire = undefined

        await customer.save()

        res.status(201).json({
            success: true,
            data: 'Password Reset Successfully'
        })
    } catch (error) {
        next(error)
    }
}

exports.adminRegister = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const admin = await Admin.create({
            username, email, password
        })
        sendAdminToken(admin, 201, res)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const admin = await Admin.findOne({ email }).select('+password')
        if(!admin) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }
            const isMatch = await admin.matchPasswords(password)

            if(!isMatch) {
                return next(new ErrorResponse('Invalid Credentials', 401))
            }

            sendAdminToken(admin, 200, res)

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}


exports.adminForgotPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const admin = await Admin.findOne({ email })

        if(!admin) {
            return next(new ErrorResponse('Email could not be sent', 404))
        }

        const resetToken = admin.getResetPasswordToken()
            await admin.save()
            const resetUrl = `${process.env.FRUVEFLOW_URL}/auth/admin-reset-password/${resetToken}`
            const message = `
                <h1>You have requested a password reset.</h1>
                <p>Follow this link to reset your password:</p>
                <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                `

            try {
                await sendEmail({
                    to: admin.email,
                    subject: 'Password Reset Request',
                    text: message
                })
                res.status(200).json({ success: true, data: 'Email sent'})
            } catch (error) {
                admin.resetPasswordToken = undefined
                admin.resetPasswordExpire = undefined

                await admin.save()

                return next(new ErrorResponse('Email could not be sent', 500))
            }
    } catch (error) {
        next(error)
    }
}


exports.adminResetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const admin = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(!admin) {
            return next(new ErrorResponse('Invalid Reset Token', 400))
        }

        admin.password = req.body.password
        admin.resetPasswordToken = undefined
        admin.resetPasswordExpire = undefined

        await admin.save()

        res.status(201).json({
            success: true,
            data: 'Password Reset Successfully'
        })
    } catch (error) {
        next(error)
    }
}

exports.staffRegister = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const staffMember = await StaffMember.create({
            username, email, password
        })
        sendStaffMemberToken(staffMember, 201, res)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.staffLogin = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const staffMember = await StaffMember.findOne({ email }).select('+password')
        if(!staffMember) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }
            const isMatch = await staffMember.matchPasswords(password)

            if(!isMatch) {
                return next(new ErrorResponse('Invalid Credentials', 401))
            }

            sendStaffMemberToken(staffMember, 200, res)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.staffForgotPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const staff = await StaffMember.findOne({ email })

        if(!staff) {
            return next(new ErrorResponse('Email could not be sent', 404))
        }

        const resetToken = staff.getResetPasswordToken()
            await staff.save()
            const resetUrl = `${process.env.FRUVEFLOW_URL}/auth/staff-reset-password/${resetToken}`
            const message = `
                <h1>You have requested a password reset.</h1>
                <p>Follow this link to reset your password:</p>
                <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                `

            try {
                await sendEmail({
                    to: staff.email,
                    subject: 'Password Reset Request',
                    text: message
                })
                res.status(200).json({ success: true, data: 'Email sent'})
            } catch (error) {
                staff.resetPasswordToken = undefined
                staff.resetPasswordExpire = undefined

                staff.save()

                return next(new ErrorResponse('Email could not be sent', 500))
            }
    } catch (error) {
        next(error)
    }
}

exports.staffResetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const staff = await StaffMember.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(!staff) {
            return next(new ErrorResponse('Invalid Reset Token', 400))
        }

        staff.password = req.body.password
        staff.resetPasswordToken = undefined
        staff.resetPasswordExpire = undefined

        await staff.save()

        res.status(201).json({
            success: true,
            data: 'Password Reset Successfully'
        })
    } catch (error) {
        next(error)
    }
}

// token creation
const sendCustomerToken = (customer, statusCode, res) => {
    const token = customer.getSignedToken()
    res.status(statusCode).json({ success: true, token })
}

const sendAdminToken = (admin, statusCode, res) => {
    const token = admin.getSignedToken()
    res.status(statusCode).json({ success: true, token })
}

const sendStaffMemberToken = (staffMember, statusCode, res) => {
    const token = staffMember.getSignedToken()
    res.status(statusCode).json({ success: true, token })
}
