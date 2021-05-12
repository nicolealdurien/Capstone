const Product = require('../models/product')

exports.getAdminData = (req, res, next) => {
  res.status(200).json({
      success: true, 
      data: "You have access to the data on admin-protected routes"
  })
}

exports.addProduct = (req, res, next) => {
  const { imageurl, title, description, rate, category, subcategory } = req.body
  
  let product  = new Product({
      imageurl, title, description, rate, category, subcategory,
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
    const { productId, imageurl, title, description, rate, category, subcategory } = req.body
  
    const updatedProduct = {
      imageurl, title, description, rate, category, subcategory
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
  
    Product.remove({
      _id: productId
    }, (error, result) => {
      if(error) {
        res.json({error: 'Unable to delete product'})
      } else {
        res.json({success: true, message: 'Product deleted successfully!'})
      }
    })
}