import express from 'express'
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
const router = express.Router()

import { adminProtect } from '../middleware/adminAuthMiddleware.js'
import { protect } from '../middleware/authMiddleware.js'

// ! admin routes
import {
  addProduct,
  adminDetails,
  adminLogOut,
  adminRegister,
  getAllProducts,
} from '../controllers/adminController.js'
router.post('/admin/register', adminRegister)
// router.post('/admin/login', loginAdmin)
router.post('/admin/logout', adminLogOut)
router.get('/admin/details', adminProtect, adminDetails)
router.post('/admin/addproduct', adminProtect, addProduct)
router.get('/admin/products', getAllProducts)

// ! user routes

router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
