const Product = require('../models/product')
const Cart = require('../models/Cart')
const Admin = require('../models/Admin')
const Customer = require('../models/Customer')
const StaffMember = require('../models/StaffMember')

exports.getAdminData = (req, res, next) => {
  res.status(200).json({
      success: true, 
      data: "You have access to the data on admin-protected routes"
  })
}

exports.addProduct = (req, res, next) => {
  const { imageurl, title, description, rate,  per, category, subcategory } = req.body
  console.log('Adding product')
  let product  = new Product({
      imageurl, title, description, rate, per, category, subcategory,
    })

  product.save((error) => {
    if(error) {
      res.json({error: 'Unable to save the product'})
    } else {
      res.json({success: true, message: 'New product saved!', product})
    }
  })
}


exports.updateProduct = (req, res, next) => {
    console.log("update product is fired")
    const { imageurl, title, description, rate, per, category, subcategory } = req.body
    const productId = req.params.productId
  
    const updatedProduct = {
      imageurl, title, description, rate,  per, category, subcategory
    }
  
    Product.findByIdAndUpdate(productId, updatedProduct, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update product'})
        } else {
            res.json({success: true, message: 'Product updated successfully!'})
        }
    })
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId 
  
    Product.deleteOne({
      _id: productId,
    }, (error, result) => {
      if(error) {
        res.json({error: 'Unable to delete product'})
      } else {
        res.json({success: true, message: 'Product deleted successfully!'})
      }
    })
}



//route to get all admins: (not staff or users)
exports.allAdmins = (req, res, next) => {
  
  Admin.find({}, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch admins!'}) 
    } else {
      res.json(posts)
    }
  })
}


//route to get all staff :(not admin or users)
exports.allStaff = (req, res, next) => {
  
  StaffMember.find({}, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch staff !'}) 
    } else {
      res.json(posts)
    }
  })
}

//route to get all users :(not admin or staff)
exports.allUsers = (req, res, next) => {
  
  Customer.find({}, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch users!'}) 
    } else {
      res.json(posts)
    }
  })
}


//routes to get all order history
exports.allOrders = (req, res, next) => {
  
  Cart.find({}, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch orders!'})
    } else {
      res.json(posts)
    }
  })
}


//routes to get all completed-orders history
exports.completedOrders = (req, res, next) => {
  
  Cart.find({
    is_delivered: true,
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'})
    } else {
      res.json(posts)
    }
  })
}


//routes to get all pending-orders history
exports.pendingOrders = (req, res, next) => {
  
  Cart.find({
    is_delivered: false,
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'})
    } else {
      res.json(posts)
    }
  })
}

//routes to change the delivery status to delivered
exports.ChangeToDelivered = (req, res, next) => {

  const cartId = req.params.cartId 
  
  

  const update_delivery_status = {
    is_delivered : true
  }

  Cart.findByIdAndUpdate(cartId, update_delivery_status, (error, result) => {
      if(error) {
          res.json({error: 'Unable to updated'})
      } else {
          res.json({success: true})
      }
  })

}


//routes to change the delivery status to not delivered
exports.ChangeToNotDelivered = (req, res, next) => {

  const cartId = req.params.cartId 

  const update_delivery_status = {
    is_delivered : false
  }

  Cart.findByIdAndUpdate(cartId, update_delivery_status, (error, result) => {
      if(error) {
          res.json({error: 'Unable to updated'})
      } else {
          res.json({success: true})
      }
  })

}


exports.deleteOrder = (req, res, next) => {
  const cartId = req.params.cartId  
  console.log("deleteOrder is fired node")

  Cart.deleteOne({
    _id: cartId,
  }, (error, result) => {
    if(error) {
      res.json({error: 'Unable to delete product'})
    } else {
      res.json({success: true, message: 'Product deleted successfully!'})
    }
  })
}

