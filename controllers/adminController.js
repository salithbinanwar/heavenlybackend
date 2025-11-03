import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'
import Product from '../model/productModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const adminLogin = asyncHandler(async (req, res) => {
  const { adminName, adminPassword } = req.body

  const admin = await Admin.findOne({ adminName })

  if (admin && (await admin.matchPassword(adminPassword))) {
    const token = generateToken(res, admin._id)
    res.json({
      _id: admin._id,
      name: admin.adminName,
      token, // Include token in response
    })
  } else {
    res.status(401)
    throw new Error('Invalid roomNumber or password')
  }
})

//* @desc adminRegister
//?@route POST api/users/admin/register

const adminRegister = asyncHandler(async (req, res) => {
  const { adminName, adminPassword } = req.body

  // const adminExists = await Admin.findOne({ adminName })
  // console.log(adminSingularity)
  const adminSingularity = await Admin.countDocuments()

  if (adminSingularity == 1) {
    res.status(400)
    throw new Error(`Admin limit reached`)
  }

  const admin = await Admin.create({ adminName, adminPassword })

  if (admin) {
    const token = generateToken(res, admin._id)

    res.json({
      isSuccess: true,
      _id: admin._id,
      adminName: admin.adminName,
      token, // Include token in response
    })
  } else {
    res.status(404)
    throw new Error('admin registration failed')
  }
})

//* @desc get admin details
//?@route POST api/users/admin/adminDetails

const adminDetails = asyncHandler(async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    data: await Admin.find(),
    error: null,
  })
})

//* @desc adminLogOut
//?@route GET api/users/admin/logout
const adminLogOut = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'admin logged out successfully' })
}

const addProduct = asyncHandler(async (req, res) => {
  const { name, image, price, category } = req.body

  const product = await Product.create({ name, image, price, category })

  if (product) {
    res.status(200).json({
      isSuccess: true,
      data: product,
      error: null,
    })
  } else {
    res.status(400).json({
      isSuccess: false,
      data: null,
      error: 'Product not added',
    })
  }
})

// const deleteProduct = asyncHandler(async (req, res)=)

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.deleteOne()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    data: await Product.find(),
    error: null,
  })
})

export {
  addProduct,
  adminDetails,
  adminLogin,
  adminLogOut,
  adminRegister,
  deleteProduct,
  getAllProducts,
}
