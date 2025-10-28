import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { roomNumber, password } = req.body

  const user = await User.findOne({ roomNumber })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id)
    res.json({
      _id: user._id,
      name: user.name,
      roomNumber: user.roomNumber,
      token: token,
    })
  } else {
    res.status(401)
    throw new Error('Invalid roomNumber or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { roomNumber, name, password } = req.body

  const userExists = await User.findOne({ roomNumber })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    roomNumber,
    name,
    password,
  })

  if (user) {
    const token = generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      roomNumber: user.roomNumber,
      token: token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'user logged out successfully' })
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      roomNumber: req.user.roomNumber,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update profile')
})

export { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile }
