import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Admin from '../model/adminModel.js'

const adminProtect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await Admin.findById(decoded.userId).select('-adminPassword')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { adminProtect }
