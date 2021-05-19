import '../css/cart.css'; 
import { connect } from 'react-redux'
import * as actionCreators from '../../stores/creators/actionCreators'
import { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import StripeContainer from '../StripeContainer'


const Mycart = (props) => {

    const [address, setaddress] = useState({})

    const removeItem = (title) => {
        props.removeFromCart(title)
    } 
    // const [Qty, setQty] = useState({})

    // const handleChange = (e) => {   
    //     setQty({
    //         ...Qty,
    //         [e.target.name]: e.target.value,
            
    //     })
    // }
    // console.log(Qty.qty)




    const cart = props.cart 


    

    // const carttotalItems = cart.map((cart, index) =>{
        
    //     const subtotal = parseFloat(cart.subtotal)
    //     console.log(subtotal)
    //     let total =+ subtotal
    //     console.log(total)

    //     return total 
    // })

    let total = 0
    // for (let i = 0; i < cart.length; i++) {
    //     const subtotal = parseFloat(cart[i].subtotal)
    //     console.log(subtotal)
    //     let total =+ subtotal
    //     console.log(total)
    // }
    const subtotal = cart.reduce((prev, current) => {
        return prev + current.subtotal
    }, 0)

    // console.log(subtotal)
   



   
    
    const handleAddressChange = (e) => {   
        setaddress({
            ...address,
            [e.target.name]: e.target.value,
            
        })
    }

    const handleUpdateAddress = () => {
        props.onUpdateAddress(address)
        alert('Delivery address added to your order!')
    }

    




    
    const cartItems = cart.map((cart, index) => {
            
        // console.log(cart.rate)
        // console.log(cart.qty)

        // const CartSubTotalItems= (cart.rate) *  (cart.qty)
        
        // const handleChange = (e) => {   
        //     setQty({
        //         ...Qty,
        //         [e.target.name]: e.target.value,
                
        //     })
        // }
        // const subtotal = cart.rate *(Qty.qty)
        return <tbody  key = {cart._id} >
                                    <tr className="cart_item tbody">
                                        <td className="product-remove">
                                            <a href="#" onClick = {() => {removeItem(cart.title)}}className="remove" title="Remove this item"><img src="./trashcan.jpeg" alt="" />
                                            </a>
                                        </td>
                                        <td className="product-thumbnail">
                                           <Link to = {`/product-detail/${cart.title}`}><img src={cart.imageurl}/></Link>
                                            
                                        </td>
                                        <td className="product-info">
                                        <Link to = {`/product-detail/${cart.title}`}>
                                            <h2>{cart.title}</h2>
                                            <h4>{cart.category} / {cart.subcategory}</h4>
                                            </Link>
                                        </td>
                                        <td className="product-quantity">
                                            <div className="quantity">
                                                {/* <input onChange = {handleChange} type="number"  name="qty" className="input-field" required/> */}
                                                {cart.qty}
                                            </div>
                                        </td>
                                        {/* <td className="product-number">
                                            <span>{cart._id}</span>
                                        </td> */}
                                        <td className="product-price">
                                            <span className="amount">${cart.rate} /{cart.per}</span>
                                        </td>
                                        <td className="product-subtotal">
                                            {/* <span className="amount-subtotal">{subtotal}</span> */}
                                            ${cart.subtotal}
                                        </td>
                                    </tr>
                </tbody>
    })

    // checkout functionality here

    const [stripeTestProduct, setStripeTestProduct] = useState({
        name: 'hyacinths',
        rate: 28.29
    })

    const makePayment = (token, addresses) => {
        const body = {
            token,
            stripeTestProduct
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        return fetch(`http://localhost:5000/payment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log('RESPONSE', response)
            const { status } = response
            console.log('STATUS', status)
        }).catch(error => console.log(error))
    }



    return (
        <div>
            <div className="shopping-cart">
                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="shop_table">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="product-name">Product</th>
                                        <th className="product-quantity">qty</th>
                                        {/* <th className="product-number">Product Id</th> */}
                                        <th className="product-price">Price</th>
                                        <th className="product-subtotal">Subtotal</th>
                                    </tr>
                                </thead>
                                
                                    {cartItems}
                                
                            </table>
                        </div>
                        <div className="refresh-shoping">
                            <a className="btn btn-update" href="shop-grid-sidebar.html">update cart</a>
                            <Link to="/" className="btn btn-update"> continue shopping</Link>
                        </div>
                    </div>
                    <div className="row">

                    <div class="col-md-4">
                    <h5 className="small-title" style={{color: 'black', fontSize: '30px', fontWeight: 'bold'}}>Delivery Address</h5>
                    <form>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>Full Nmae</label> */}
                            <input type="text" onChange = {handleAddressChange} name="fullname" class="form-control" id="formGroupname" placeholder="Full name" required/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>Contact No:</label> */}
                            <input type="text" onChange = {handleAddressChange} name="Street1" class="form-control" id="formGroupstreet1" placeholder="Street address" required/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>Street Address</label> */}
                            <input type="text" onChange = {handleAddressChange} name="Street2" class="form-control" id="formGroupstreet2" placeholder="Continued street address, if needed"/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput2" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>Street Address 2</label> */}
                            <input type="text" onChange = {handleAddressChange} name="city" class="form-control" id="formGroupcity" placeholder="City" required/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>City</label> */}
                            <input type="text" onChange = {handleAddressChange} name="state" class="form-control" id="formGroupstate" placeholder="State" required/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>State</label> */}
                            <input type="text"  onChange = {handleAddressChange} name="zip" class="form-control" id="formGroupZip" placeholder="Zip code" required/>
                        </div>
                        <div class="form-group">
                            {/* <label for="formGroupExampleInput" style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}>Zip-Code</label> */}
                            <input type="text" onChange = {handleAddressChange} name="phone" class="form-control" id="formGroupphone" placeholder="Telephone number" required/>
                        </div>
                    </form>
                    <div className="refresh-shoping">
                        <a className="btn btn-update" onClick = {() => handleUpdateAddress(address)} >
                            {/* <img src="refresh.png" alt="icon"/> */}
                        Update Address</a>
                            
                    </div>

                
                    </div>
                        

                        

                        <div className="col-md-4"><div className="squarebg">
                            <div className="cart-total">
                                <h5 className="small-title" style={{color: 'black', fontSize: '30px', fontWeight: 'bold'}}>CART TOTALS</h5>
                                <table>
                                    <tbody>
                                        <tr className="cart-subtotal">
                                            <th>Subtotal</th>
                                            <td><span className="subtotal">{subtotal.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr className="order-shipping">
                                            <th>delivery</th>
                                            <td><span className="shipping">Free Delivery (please tip your driver!)</span>
                                            </td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>order total</th>
                                            <td><span className="amount"><strong> {subtotal.toFixed(2)}</strong></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <StripeCheckout 
                                    stripeKey = 'pk_test_51In4ABCDwFUaylUuuSu1e43AVzMfTkMUQq4wu5sU7iTRpVkTjhQD9JxkVTZiZPKQLH0VOtKfVPgVP6naDlrpDx4Z00SDMXekQC'
                                    amount = {stripeTestProduct.rate *100} 
                                    token = {makePayment} 
                                    name = 'FruveFlow Checkout'
                                    // amount = {Number(getCartSubTotal().toFixed(2))*100}
                                    shippingAddress
                                    billingAddress>
                                    <div><button className = 'btn'>Secure Checkout With Stripe</button></div>
                                </StripeCheckout> */}
                                
                            </div></div>
                        </div><br/><br/>
                        <div className = 'stripediv'>
                            <h2 className = 'checkout'>Secure Checkout Handled Through&nbsp; <a href = 'https://stripe.com/' _target = 'blank'><img 
                                src='https://stripe.com/img/v3/home/social.png' 
                                style = {{height: '60px'}} 
                                alt = 'stripe logo'/>
                            </a></h2><br/><br/> 
                            <StripeContainer/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateAddress: (address) => dispatch(actionCreators.onUpdateAddress(address)),
        removeFromCart: (item) => dispatch({type: 'REMOVE_FROM_CART', payload: item})
    }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mycart)