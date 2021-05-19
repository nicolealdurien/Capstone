import { connect } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { onAddToCart } from '../../stores/creators/actionCreators' 
import * as actionCreators from '../../stores/creators/actionCreators' 
import '../css/App.css';


const ProductDetails = (props) => {
    const [qty, setQty] = useState(1)

    // var  product = props.moredetails
    // console.log(product)
    // const moredetails_imageurlItems = moredetails_imageurl.map((items, index) => {
    //     return
    //     <div>
            
    //     </div>
    // })


    // const handleSave =(product) => {
    //     const customerToken = localStorage.getItem('customerToken')
    //     const customerEmail = localStorage.getItem('customerEmail')
        
    //     fetch ('http://localhost:5000/add-to-cart',{
    //         method: 'POST',
            
    //         headers: {
                
    //             'Content-Type': 'application/json'
    //         },
    //         //add username or email token here.
    //         body:JSON.stringify({
    //             imageurl: product.imageurl,
    //             title: product.title,
    //             description: product.description,
    //             rate: product.rate,
    //             category: product.category,
    //             subcategory: product.subcategory,
    //             customerToken:customerToken,
    //             customerEmail:customerEmail
                
    //         })
    //     }).then(response => response.json())
    //     .then(result => {
    //         if(result.success) {
                
    //           alert("Your product has been added to the database")
    //         //   window.location.reload(false);
              
    //         }
           
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }


    // const handleAddToCart = () => {
    //     dispatch(onAddToCart(product, qty))
    //     alert("This item has been added to your cart!")
    // }



    const handleChange = (e) => {   
        setQty({
            ...qty,
            [e.target.name]: e.target.value,
            
        })
    }

    // console.log(qty)
    // console.log(product)

    const handleAddToCart = (product, qty) => {
        
        const subtotal = parseFloat(qty * product.rate)
        // console.log(subtotal)
        const transformProduct  = {...product, qty , subtotal}


        console.log(transformProduct)
        props.onAddToCart(transformProduct)
        alert("Item has been added to the cart!")
    }
    var  product = props.moredetails
    
    
    const customerToken = localStorage.getItem('customerToken')
   
        var product = props.moredetails
        // console.log(product)

        return (

    <div class="card mb-3 bg-success text-white" style={{width: '97vw', border: 'solid 5px black'}}>
        <div class="row g-0"style={{height: '98%'}}>
            <div className="product-details-image" className="col-md-4" style={{height: 'auto', margin: '5px', marginRight: "10px"}}>
                <img className="productimg" style={{width: '100%', height: '438px'}} class = 'card-img' src={product.imageurl} alt="..."/>
            </div>
        <div class="col-md-8" style={{fontFamily: "sans-serif", width: '65%'}}>
            <div class="card-body">
                <div>
                <h1 class="card-title" style={{fontSize: '5rem'}}>{product.title}</h1><br/><h1 style={{fontSize: '3rem'}}>$ {product.rate}/{product.per}</h1>
                </div><br/>
                <p class="card-text" style={{fontSize: '20px'}}>{product.description}</p>

                <ul>
                
                <li>
                    <p class="card-text" style={{fontSize: '20px'}}><b>Category: </b><i>{product.category}</i></p>
                </li>
                <li>
                    <p class="card-text" style={{fontSize: '20px'}}><b>Sub-Category: </b><i>{product.subcategory}</i></p>
                </li>
                {/* <li>
                    <p class="card-text" style={{fontSize: '20px'}}> <b>Product ID: </b><i>{product._id}</i></p>
                </li> */}
                </ul>
                {/* <div classname = 'detailsbuttondiv' style={{display:"flex"}}> */}
                <p><b>QTY:</b>&nbsp; &nbsp;
                <input type="number" min="1" max="100" value={qty} onChange = {(e) => setQty(e.target.value)}/></p>
                <div classname = 'detailsbuttondiv'>
                    <button className="btn" style = {{backgroundColor: '#860286', padding: '8px', color: 'white', marginTop:'28px', width:'210px', marginRight: '.2rem', marginLeft: '.2rem', }} onClick = {() => handleAddToCart(product,qty)}>
                    <a style = {{fontSize: '1.2rem', textDecoration: 'none', color: 'white'}}className="add-cart" ><span><span className="icon_plus"></span></span> Add To Cart</a></button>
                    <button className = 'btn' style = {{backgroundColor: '#860286', padding: '8px', color: 'white', marginTop:'28px', width:'210px', marginRight: '.2rem', marginLeft: '.2rem'}}>
                    <Link to = '/mycart' style = {{fontSize: '1.2rem', textDecoration: 'none', color: 'white'}}className="add-cart" ><span><span className="icon_plus"></span></span> Go To Cart</Link></button>
                    <button className = 'btn' style = {{backgroundColor: '#860286', padding: '8px', color: 'white', marginTop:'28px', width:'210px', marginRight: '.2rem', marginLeft: '.2rem'}} >
                    <Link to = '/' style = {{fontSize: '1.2rem', textDecoration: 'none', color: 'white'}}className="add-cart" ><span><span className="icon_plus"></span></span>Continue Shopping</Link></button>
                    </div>
            
            </div>
        </div>
        </div>
    </div>

    )}
            

            // <div className="home01">
        
            // <div className="single-product-details clearfix">
               
            //     <div className="col-md-5">
            //         <div className="single-slider-item">
            //             <ul className="owl-slider">
            //                 <div className="item">
            //                     <img src={product.imageurl} alt={product.title} className="img-responsive"/>
            //                 </div>
                            
            //             </ul>
                        
                //     </div>
                // </div>
                // <div className="col-md-7">
                //     <div className="right-content">
                //         <div className="product-info">
                //             <h1>{product.title}</h1>
                //             <div className="price">
                //             <h4>${product.rate} / {product.per}</h4>
                //             </div>
                            
            //                 <div className="product-description">
            //                     <h4 className="small-title"><b>DESCRIPTION</b></h4>
            //                     <p>{product.description}</p>
            //                 </div>
            //                 <div className="product-desc product-description">
            //                     <span className="item-number"><b>Product ID:</b>  {product._id}</span>
            //                     <br></br>
            //                     <span className="item-cat"><b>Category:</b>  {product.category}</span>
            //                     <br></br>
            //                     <span className="item-tag"><b>SubCategory:</b>  {product.subcategory}</span>
            //                 </div>
            //                 <div className="product-description">
            //                     <ul>
            //                         <div><button onClick = {() => handleAddToCart(product)}><a className="add-cart" ><span><span className="icon_plus"></span></span> add to cart</a></button>
            //                         </div>
            //                         <div><a href="#"><span className="icon_heart_alt"></span></a>
            //                         </div>
            //                         <div><a className="zoom" href="assets/images/gallery_men/single-shop-details/big/image1xxl.jpg"><span className="arrow_expand"></span></a>
            //                         </div>
            //                     </ul>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // </div>


const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product, qty) => dispatch(actionCreators.onAddToCart(product, qty)),
        // onAddToCart :(Qty ) => dispatch(actionCreators.onAddToCart(Qty )),        
    }
}

const mapStateToProps = (state) => {
    return {
        moredetails: state.moredetails, 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);