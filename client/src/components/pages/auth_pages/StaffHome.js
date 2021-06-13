import { connect } from 'react-redux'
import { useEffect , useState} from 'react'
import * as actionCreators from '../../../stores/creators/actionCreators'


function Staff(props) {

    useEffect(() => {        
        props.onLoadOrders()
    },[])

    var  orders = props.orders
    var  orders_cart = props.orders.cart


    let counter8 = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i]) counter8++;
    }
    console.log(counter8)

    const orderItems = orders.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
            <h1>{items.fullname}</h1>
            </div>
            <div>
                <h1>{items.address.Street1}</h1>
            </div>
            <div>
                <h1>{items.address.Street2}</h1>
            </div>
             <div>
                <h1>{items.address.city} , {items.address.state} - {items.address.zip}</h1>
            </div>
           <div>
                <p>Phone No. : {items.phone}</p>
            </div>
                <h2>Order Details</h2>
             <div>
                 <p>{items.cart.map(cartItems => {
                     return(
                     <p><h1>{cartItems.title} - {cartItems.qty}</h1></p>
                     )})}</p>
            </div>
        </div>
    })

    var  completed_orders = props.completed_orders

    let counter9 = 0;
    for (let i = 0; i < completed_orders.length; i++) {
        if (completed_orders[i]) counter9++;
    }

    const completed_ordersItems = completed_orders.map((items, index) => {
        return <div className='Column'><div key ={index} className="card" style={{width: "18rem"}}>
            <div>
            <h1>{items.fullname}</h1>
            </div>
            <div>
                <h1>{items.address.Street1}</h1>
            </div>
            <div>
                <h1>{items.address.Street2}</h1>
            </div>
             <div>
                <h1>{items.address.city} , {items.address.state} - {items.address.zip}</h1>
            </div>
           <div>
                <p>Phone No. : {items.phone}</p>
            </div>
                <h2>Order Details</h2>
             <div>
                 <p>{items.cart.map(cartItems => {
                     return (
                     <p><h1>{cartItems.title} - {cartItems.qty}</h1></p>
                     )})}</p>
            </div>
            <div>
            <button className="deliverbtn" onClick = {() => handleNotDeliveried({items})}><p> Return To Pending</p></button>
            </div>
            <div>
            <p>Id: {items._id}</p>
            </div>

            </div>
            </div>
    })





    var  pending_orders = props.pending_orders
    

    let counter10 = 0;
    for (let i = 0; i < pending_orders.length; i++) {
        if (pending_orders[i]) counter10++;
    }
    console.log(counter10)

    const pending_ordersItems = pending_orders.map((items, index) => {
        return <div className='Column'><div key ={index} className="card" style={{width: "18rem"}}>
            <div>
            <div>
            <h1>{items.fullname}</h1>
            </div>
            <div>
                <h1>{items.address.Street1}</h1>
            </div>
            <div>
                <h1>{items.address.Street2}</h1>
            </div>
             <div>
                <h1>{items.address.city} , {items.address.state} - {items.address.zip}</h1>
            </div>
           <div>
                <p>Phone No. : {items.phone}</p>
            </div>
                <h2>Order Details</h2>
             <div>
                 <p>{items.cart.map(cartItems => {
                     return(
                     <p><h1>{cartItems.title} - {cartItems.qty}</h1></p>
                     )})}</p>
            </div>
            <div>
            <button onClick = {() => handleDeliveried({items})}><p> Mark As Delivered</p></button>
            </div>
            <div>
            <p>Id : {items._id}</p>
            </div>
            </div>
            </div>
            </div>
    })



    const handleDeliveried = (items) => {
        console.log(items.items._id)
       const _id = items.items._id
        console.log(_id)
        const token = localStorage.getItem('adminToken')


        fetch (`change_to_delivered/${_id}`,{
        method: 'PATCH',
        headers: {
            'authorization':`Bearer ${token}`,
            
        }}).then(response => response.json())
        .then(result => {
        if(result.success) {

          alert("Products successfully marked as delivered.")
            
            props.onLoadOrders()

        }

    }).catch(error => {
        console.log(error)
    })

    }


    const handleNotDeliveried = (items) => {
        console.log(items.items._id)
       const _id = items.items._id
        console.log(_id)
        const token = localStorage.getItem('adminToken')



        fetch (`/change_to_not_delivered/${_id}`,{
        method: 'PATCH',
        headers: {
            'authorization':`Bearer ${token}`,
            
        }

        
        
    }).then(response => response.json())
    .then(result => {
        if(result.success) {

          alert("Order has been moved back to Pending Orders.")
          
            props.onLoadOrders()
        }

    }).catch(error => {
        console.log(error)
    })

    }


    return<div>
       <div className='center'>
           <div className='order-label'><h2>Pending Orders</h2></div>
           <div>{pending_ordersItems}</div>
       </div>
       <div className='center'>
       <div className='order-label'><h2>Completed Orders</h2></div>
           <div>{completed_ordersItems}</div>
           
       </div>
    </div>
}


const mapDispatchToProps = (dispatch) => {
    return {
      onLoadOrders: () => dispatch(actionCreators.LoadOrders()),
    }
  }


const mapStateToProps = (state) => {
    return {
        orders:state.orders,
        completed_orders:state.completed_orders,
        pending_orders:state.pending_orders,

    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Staff);
