const express = require('express')
const router = express.Router()
const { getAdminData , 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  addStaff, 
  allAdmins , 
  allStaff , 
  allUsers, 
  // allOrders, 
  // completedOrders,
  // pendingOrders,
  // ChangeToDelivered,
  // ChangeToNotDelivered,
  deleteOrder
} = require('../controllers/adminController')




const { authenticate } = require('../middleware/adminAuth')
const Product = require('../models/product')



router.patch('/update-product/:productId', authenticate, updateProduct)

router.delete('/delete-product/:productId', authenticate, deleteProduct)

router.get('/product-manage', authenticate, getAdminData)

router.post ('/add-products', authenticate, addProduct)

router.put('/update-product/:productId', authenticate, updateProduct)

router.delete('/product/:productId', authenticate, deleteProduct)

router.get('/all-admins', authenticate, allAdmins)

router.get('/all-staff', authenticate, allStaff)

router.get('/all-users', authenticate, allUsers)

// router.get('/all-orders', authenticate, allOrders)

// router.get('/completed-orders', authenticate, completedOrders)

// router.get('/pending-orders', authenticate, pendingOrders)

// router.patch('/change_to_delivered/:cartId', authenticate, ChangeToDelivered)

// router.patch('/change_to_not_delivered/:cartId', authenticate, ChangeToNotDelivered)

router.delete('/delete-order/:cartId', authenticate, deleteOrder)


module.exports = router