require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const Product =require('./models/product')
const Admin =require('./models/Admin')
const StaffMember = require('./models/StaffMember')
const Customer = require('./models/Customer')
const Cart =require('./models/Cart')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// Connect DB
connectDB()


// Middleware
app.use(cors())
app.use(express.json())
app.use('/auth', require('./routes/authRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/customer', require('./routes/customerRoutes'))
app.use('/staff', require('./routes/staffMemberRoutes'))
// error handler - should be *last* piece of middleware
app.use(errorHandler)



// Route to get all products 
app.get('/all-products', (req, res) => {
  Product.find({}, (error, product) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'}) 
    } else {
      res.json(product)
    }
  })
})



// Route to get vegetable products only
app.get('/all-products/vegetable', (req, res) => {
  
  Product.find({
    category: "vegetable",
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'}) 
    } else {
      res.json(posts)
    }
  })
})



// Route to get fruit products only
app.get('/all-products/fruit', (req, res) => {
  
  Product.find({
    category: "fruit",
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'}) 
    } else {
      res.json(posts)
    }
  })
})


// Route to get flower products only
app.get('/all-products/flower', (req, res) => {
  
  Product.find({
    category: "flowers",
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'})
    } else {
      res.json(posts)
    }
  })
})

///////////////////////////////////////////////
//  below is the section for getting all types of orders
//////////////////////////////////////////////


// Route to get all orders
app.get('/all-orders', (req, res) => {
  
  Cart.find({}, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch orders!'})
    } else {
      res.json(posts)
    }
  })
})


// Route to get just completed orders
app.get('/completed-orders', (req, res) => {
  
  Cart.find({
    is_delivered: true,
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'})
    } else {
      res.json(posts)
    }
  })
})


// Routes to get just pending orders
app.get('/pending-orders', (req, res) => {
  
  Cart.find({
    is_delivered: false,
  }, (error, posts) => {
    if(error) {
      res.json({error: 'Unable to fetch products!'})
    } else {
      res.json(posts)
    }
  })
})

// Route to change delivery status from pending to delivered
app.patch('/change_to_delivered/:cartId', (req, res) => {

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

})


// Routes to change the delivery status back to not-delivered (if changed initially in error)
app.patch('/change_to_not_delivered/:cartId', (req, res) => {

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

})

///////////////////////////////////////////////
// below is the section for posting orders after a successful payment only
//////////////////////////////////////////////

app.post ('/order-confirmation', (req, res) => {

  const fullname = req.body.fullname
  const street1 = req.body.address.street1
  const street2 = req.body.address.street2
  const city = req.body.address.city
  const state = req.body.address.state
  const zipcode = req.body.address.zipcode
  const images = req.body.cart.images 
  const title = req.body.cart.title
  const description = req.body.cart.description 
  const rate = req.body.cart.rate 
  const per = req.body.cart.per
  const category = req.body.cart.category 
  const subcategory = req.body.cart.subcategory 
  const phone = req.body.phone
  const is_delivered = false

 console.log(req.body)
  let cart = new Cart({
    fullname:fullname,
    address:req.body.address,
    phone: phone,
    cart:req.body.cart,
    is_delivered: is_delivered,
  })

  cart.save((error) => {
    if(error) {
      res.json({error: 'Unable to save the cart!'})
    } else {
      res.json({success: true, message: 'New cart saved'})
    }
  })

})


// Stripe payment route 
app.post('/nonmodalpayment', cors(), async (req, res) => {
  let {amount, id} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount, 
      currency: 'USD',
      description: 'FruVe Flow',
      payment_method: id,
      confirm: true
    })
    console.log('Payment', payment)
    res.json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {
      console.log('Error', error)
      res.json({
        message: 'Payment failed',
        success: false
      })
  }
})


// Listener
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// Makes giant server errors concise and simple to read
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})

// Needed for proper Heroku deployment
if(process.env.NODE_ENV === 'production') {
  app.use(express.static((path.join(__dirname, 'client/build'))))
}

// Needed for proper Heroku deployment
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
 })