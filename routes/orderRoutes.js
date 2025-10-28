import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToCancelled,
  updateOrderToConfirmed,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import { adminProtect } from '../middleware/adminAuthMiddleware.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, adminProtect, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect, adminProtect, updateOrderToDelivered)
router.route('/:id/cancel').put(protect, adminProtect, updateOrderToCancelled)
router.route('/:id/confirm').put(protect, updateOrderToConfirmed)

export default router
