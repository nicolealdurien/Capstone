import { useState } from 'react'
import { connect } from 'react-redux'
import './css/Checkout.css'; 
import * as actionCreators from '../stores/creators/actionCreators'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#ffffff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, OpenSans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#ffffff'},
            '::placeholder': { color: '#ffffff' },
            
        },
        invalid: {
            iconColor: '#ffffff',
            color: '#ffffff',
        }
    }
}


const PaymentForm = (props) => {
    const [success, setSuccess] = useState(false)
    // const [OrderConformation] = useState(Math.random().toString(36).substr(2, 8));
    const stripe = useStripe()
    const elements = useElements()


    const cart = props.cart 
    // const OrderConformation1 = props.OrderConformation1 
    const address = props.address 


    const subtotal = cart.reduce((prev, current) => {
        return prev + current.subtotal
    }, 0)
    let amount = parseInt(subtotal*100)
    console.log(typeof(amount))
    console.log(amount)



    const handlesave = () => {
        const fullname = address.fullname
        const phone = address.phone
        const street1 = address.street1
        const street2 = address.street2
        const city = address.city
        const state = address.state
        const zipcode = address.zipcode
        // const OrderConformation = OrderConformation1
        const is_delivered = false
        console.log(address)
    
        fetch ('http://localhost:5000/order-confirmation',{
        method: 'POST',
        
        headers: {
           
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullname:fullname,
            address:address,
            // address:[{ street1:street1,
            //     street2:street2,
            //     city:city,
            //     state:state,
            //     zipcode:zipcode,
            // }],
            phone: phone,
            // OrderConformation: OrderConformation,
            cart:cart,
            is_delivered: is_delivered,

            
        })
    }).then(response => response.json())
    .then(result => {
        if(result.success) {
            
          alert("Your order has been submitted!")
         
          
        }
       
    }).catch(error => {
        console.log(error)
    })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
  

        if(!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:5000/nonmodalpayment', {
                    amount: amount,
                    id 
                })

                if(response.data.success) {
                    console.log('your payment went through successfully')
                    setSuccess(true)
                    // props.OrderConformation()
                    handlesave()
                    
                }
            } catch (error) {
                console.log('error: ', error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
        {!success ?
        <form onSubmit = {handleSubmit}>
            <fieldset className = 'FormGroup'>
                <div className = 'FormRow'>
                    <CardElement options = {CARD_OPTIONS}/>
                </div>
            </fieldset>
            
            <button className='stripe__submit'>Place Your Order: ${subtotal.toFixed(2)}</button>
        </form>
        :
        <div>
            <h2 className = 'checkout'>Thank you for your purchase!<br/>
            Your items will be selected for maximum freshness and delivered to you within 24 hours.<br/>
            Please print this page for your receipt.</h2>
        </div>
        }
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        // OrderConformation: (OrderConformation) => dispatch(actionCreators.OrderConformation(OrderConformation)),
    }
  }
  

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        address:state.address,
        // OrderConformation1:state.OrderConformation,

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentForm)