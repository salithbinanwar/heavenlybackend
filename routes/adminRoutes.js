import express from 'express'
import {
  addProduct,
  adminLogin,
  adminRegister,
} from '../controllers/adminController.js'
import { adminProtect } from '../middleware/adminAuthMiddleware.js'

const router = express.Router()

router.post('/register', adminRegister)

router.post('/login', adminLogin) // Admin login route
router.route('/products').post(adminProtect, addProduct) // Add route for adding products, protected by admin middleware
router.post('/admin/addproduct', adminProtect, addProduct)

export default router
