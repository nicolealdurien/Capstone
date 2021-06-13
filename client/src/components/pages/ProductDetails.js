import { connect } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { onAddToCart } from '../../stores/creators/actionCreators' 
import * as actionCreators from '../../stores/creators/actionCreators' 
import '../css/App.css';


const ProductDetails = (props) => {
    const [qty, setQty] = useState(1)


    const handleChange = (e) => {   
        setQty({
            ...qty,
            [e.target.name]: e.target.value,
            
        })
    }


    const handleAddToCart = (product, qty) => {
        
        const subtotal = parseFloat(qty * product.rate)
        const transformProduct  = {...product, qty , subtotal}

        props.onAddToCart(transformProduct)
        alert("Item has been added to the cart!")
    }

    var product = props.moredetails
    
    
    const customerToken = localStorage.getItem('customerToken')

    return (
        <div class="card mb-3 bg-success text-white" style={{width: '97vw', border: 'solid 5px black', backgroundColor: '#7ca762'}}>
            <div class="row g-0"style={{height: '98%'}}>
                <div className="product-details-image" className="col-md-4" style={{height: 'auto', marginLeft: '10px', marginBottom: '30px'}}>
                    <img className="productimg" style={{width: '100%', height: '100%'}} class = 'card-img' src={product.imageurl} alt="product"/>
                </div>
            <div class="col-md-8" style={{fontFamily: "sans-serif", width: '65%'}}>
                <div class="card-body">
                    <div>
                    <h1 class="card-title" style={{fontSize: '5rem'}}>{product.title}</h1><br/><h1 style={{fontSize: '3rem'}}>$ {product.rate}/{product.per}</h1>
                    </div><br/>
                    <p class="card-text" style={{fontSize: '1.25rem'}}>{product.description}</p>

                    <ul>
                    
                    <li>
                        <p class="card-text" style={{fontSize: '1.25rem'}}><b>Category: </b><i>{product.category}</i></p>
                    </li>
                    <li>
                        <p class="card-text" style={{fontSize: '1.25rem'}}><b>Sub-Category: </b><i>{product.subcategory}</i></p>
                    </li>
                    </ul>

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
            

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product, qty) => dispatch(actionCreators.onAddToCart(product, qty))      
    }
}

const mapStateToProps = (state) => {
    return {
        moredetails: state.moredetails
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);