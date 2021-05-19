import { connect } from 'react-redux'
import * as actionCreators from '../../stores/creators/actionCreators'
import { useEffect , useState} from 'react'
import { NavLink, Link } from "react-router-dom";
import React from 'react';
import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../css/App.css';


function ProductManage(props) {
  const [ProductManage, setProductManage] = useState({})
//   const [ProductManage, setProductManage] = useState({})


  const [showFirstElement, setShowFirstElement] = useState(false);
  const [showSecondElement, setShowSecondElement] = useState(false);
  const [showThirdElement, setShowThirdElement] = useState(false);
  const [showFourthElement, setShowFourthElement] = useState(false);
  const [showFiveElement, setShowFiveElement] = useState(false);
  const [showSixElement, setShowSixElement] = useState(false);
  const [showSevenElement, setShowSevenElement] = useState(false);
  const [showEightElement, setShowEightElement] = useState(false);
  const [showNineElement, setShowNineElement] = useState(false);
  const [showTenElement, setShowTenElement] = useState(false);
  const [showElevenElement, setShowElevenElement] = useState(false);




  const toggleFirstElement = () => setShowFirstElement(!showFirstElement);
  const toggleSecondElement = () => setShowSecondElement(!showSecondElement);
  const toggleThirdElement = () => setShowThirdElement(!showThirdElement);
  const toggleFourthElement = () => setShowFourthElement(!showFourthElement);
  const toggleFiveElement = () => setShowFiveElement(!showFiveElement);
  const toggleSixElement = () => setShowSixElement(!showSixElement);
  const toggleSevenElement = () => setShowSevenElement(!showSevenElement);
  const toggleEightElement = () => setShowEightElement(!showEightElement);
  const toggleNineElement = () => setShowNineElement(!showNineElement);
  const toggleTenElement = () => setShowTenElement(!showTenElement);
  const toggleElevenElement = () => setShowElevenElement(!showElevenElement);

  const toggleAllElements = () => {
    setShowFirstElement(!showFirstElement);
    setShowSecondElement(!showSecondElement);
    setShowThirdElement(!showThirdElement);
    setShowFourthElement(!showFourthElement);
    setShowElevenElement(!showElevenElement);


  }
  const toggleAllElements2 = () => {

    setShowFiveElement(!showFiveElement);
    setShowSixElement(!showSixElement);
    setShowSevenElement(!showSevenElement);

  }

  const toggleAllElements3 = () => {

    setShowEightElement(!showEightElement);
    setShowNineElement(!showNineElement);
    setShowTenElement(!showTenElement);
  }


    useEffect(() => {
        console.log("use effect is fired")
        props.onLoadProducts()
        props.onLoadUsers()
        props.onLoadOrders()
    },[])

    const handledelete = (_id) => {
        props.onDelete(_id)
        props.onLoadProducts()
        props.onLoadUsers()
        props.onLoadOrders()
        window.location.reload(false);

    }


    var  all_products = props.all_products

    let counter1 = 0;
    for (let i = 0; i < all_products.length; i++) {
        if (all_products[i]) counter1++;
    }
    console.log(counter1)

    const all_productsItems = all_products.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
                <img src={items.imageurl} alt='product'/>
            </div>
            <div>
                <h1>{items.title}</h1>
            </div>
            <div>
                <h4>{items.description}</h4>
            </div>
            <div>
                <h6>rate : {items.rate} / {items.per}</h6>
            </div>
            <div>
                <p>category : {items.category}</p>
            </div>
            <div>
            <p>sub-category : {items.subcategory}</p>
            </div>
            <div>
            <button onClick= {() => handledelete(items._id)}>Delete</button>
            </div>
            <div>
            <button><NavLink to= {`/update-product/${items._id}`}>update</NavLink></button>
            </div>
            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })




    var vegetable = props.vegetable

    let counter2 = 0;
    for (let i = 0; i < all_products.length; i++) {
        if (vegetable[i]) counter2++;
    }
    console.log(counter2)


    const vegetableItems = vegetable.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
                <img src={items.imageurl} alt='vegetable product'/>
            </div>
            <div>
                <h1>{items.title}</h1>
            </div>
            <div>
                <h4>{items.description}</h4>
            </div>
            <div>
                <h6>rate : {items.rate} / {items.per}</h6>
            </div>
            <div>
                <p>category : {items.category}</p>
            </div>
            <div>
            <p>sub-category : {items.subcategory}</p>
            </div>
            <div>
            <button onClick= {() => handledelete(items._id)}>Delete</button>
            </div>
            <div>
            <button><NavLink to= {`/update-product/${items._id}`}>update</NavLink></button>
            </div>

            </div>
    })



    var fruit = props.fruit
    console.log(fruit)
    let counter3 = 0;
    for (let i = 0; i < all_products.length; i++) {
        if (fruit[i]) counter3++;
    }
    console.log(counter3)

    const fruitItems = fruit.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
                <img src={items.imageurl} alt = 'fruit product'/>
            </div>
            <div>
                <h1>{items.title}</h1>
            </div>
            <div>
                <h4>{items.description}</h4>
            </div>
            <div>
                <h6>Rate : {items.rate} / {items.per}</h6>
            </div>
            <div>
                <p>Category : {items.category}</p>
            </div>
            <div>
            <p>Sub-category : {items.subcategory}</p>
            </div>
            <div>
            <button onClick= {() => handledelete(items._id)}>Delete</button>
            </div>
            <div>
            <button><NavLink to= {`/update-product/${items._id}`}>update</NavLink></button>
            </div>

            </div>
    })



    var flower = props.flower
    let counter4 = 0;
    for (let i = 0; i < all_products.length; i++) {
        if (flower[i]) counter4++;
    }
    console.log(counter4)

    const flowerItems = flower.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
                <img src={items.imageurl} alt = 'flower product' />
            </div>
            <div>
                <h1>{items.title}</h1>
            </div>
            <div>
                <h4>{items.description}</h4>
            </div>
            <div>
                <h6>Rate : {items.rate} / {items.per}</h6>
            </div>
            <div>
                <p>Category : {items.category}</p>
            </div>
            <div>
            <p>Sub-category : {items.subcategory}</p>
            </div>
            <div>
            <button onClick= {() => handledelete(items._id)}>Delete</button>
            </div>
            <div>
            <button><NavLink to= {`/update-product/${items._id}`}>update</NavLink></button>
            </div>

            </div>
    })

    var  admins = props.admins
    console.log(admins)

    let counter5 = 0;
    for (let i = 0; i < admins.length; i++) {
        if (admins[i]) counter5++;
    }
    console.log(counter5)

    const adminsItems = admins.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>

            <div>
                <h1>{items.username}</h1>
            </div>
            <div>
                <h4>{items.email}</h4>
            </div>

            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })





    var  staff = props.staff
    console.log(staff)

    let counter6 = 0;
    for (let i = 0; i < staff.length; i++) {
        if (staff[i]) counter6++;
    }
    console.log(counter6)

    const staffItems = staff.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>

            <div>
                <h1>{items.username}</h1>
            </div>
            <div>
                <h4>{items.email}</h4>
            </div>

            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })


    var  users = props.users
    console.log(users)

    let counter7 = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i]) counter7++;
    }
    console.log(counter7)

    const usersItems = users.map((items, index) => {
        return <div key ={index} className="card" style={{width: "18rem"}}>

            <div>
                <h1>{items.username}</h1>
            </div>
            <div>
                <h4>{items.email}</h4>
            </div>
            <div>
                <h3>Address</h3>
                <h4>Street: {items.street}</h4><br></br>
                <h4>City: {items.city}</h4><br></br>
                <h4>State: {items.usaState}</h4><br></br>
                <h4>Zip: {items.zip}</h4><br></br>
            </div>

            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })



    var  orders = props.orders
    console.log(orders)
    console.log(orders.address)
    console.log("cart",orders.cart)
    var  orders_cart = props.orders.cart

    // const order_cart_Items = orders_cart.map((items, index) => {
    //     return<div>
    //         <h1>{items.title}</h1>
    //     </div>
    // })



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
            <div>
            <button onClick = {() => handleDeleteOrder({items})}><p> Delete Order</p></button>
            </div>
            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })





    var  completed_orders = props.completed_orders
    


    let counter9 = 0;
    for (let i = 0; i < completed_orders.length; i++) {
        if (completed_orders[i]) counter9++;
    }
    console.log(counter9)

    const completed_ordersItems = completed_orders.map((items, index) => {
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
            <div>
            <button onClick = {() => handleNotDeliveried({items})}><p> mark As Not delivered delivered</p></button>
            </div>
            <div>
            <p>Id : {items._id}</p>
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
            <div>
            <button onClick = {() => handleDeliveried({items})}><p> mark As delivered delivered</p></button>
            </div>
            <div>
            <p>Id : {items._id}</p>
            </div>

            </div>
    })



    const handleDeliveried = (items) => {
        console.log(items.items._id)
       const _id = items.items._id
        console.log(_id)
        const token = localStorage.getItem('adminToken')


        fetch (`http://localhost:5000/change_to_delivered/${_id}`,{
        method: 'PATCH',
        headers: {
            'authorization':`Bearer ${token}`,
            
        }}).then(response => response.json())
        .then(result => {
        if(result.success) {

          alert("Products Has Been Delivered")
            props.onLoadProducts()
            props.onLoadUsers()
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



        fetch (`http://localhost:5000/change_to_not_delivered/${_id}`,{
        method: 'PATCH',
        headers: {
            'authorization':`Bearer ${token}`,
            
        }

        
        
    }).then(response => response.json())
    .then(result => {
        if(result.success) {

          alert("Delivery Has Been Moved to Pending")
          props.onLoadProducts()
            props.onLoadUsers()
            props.onLoadOrders()
        }

    }).catch(error => {
        console.log(error)
    })

    }




    const handleDeleteOrder = (items) => {
        console.log("deleteOrder is fired")
        console.log(items.items._id)
       const _id = items.items._id
        console.log(_id)
        const token = localStorage.getItem('adminToken')


        fetch (`http://localhost:5000/admin/delete-order/${_id}`,{
        method: 'DELETE',
        headers: {
            'authorization':`Bearer ${token}`,
            
        }

        
        
        }).then(response => response.json())
        .then(result => {
        if(result.success) {

          alert("Order Has Been Deleted")
          props.onLoadProducts()
          props.onLoadUsers()
          props.onLoadOrders()

        }

        }).catch(error => {
            console.log(error)
        })

    }



  const handleSave = () => {
    const token = localStorage.getItem('adminToken')

    fetch ('http://localhost:5000/admin/add-products',{
        method: 'POST',

        headers: {
            'authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageurl: ProductManage.imageurl,
            title: ProductManage.title,
            description: ProductManage.description,
            rate: ProductManage.rate,
            per: ProductManage.per,
            category: ProductManage.category,
            subcategory: ProductManage.subcategory,

        })
    }).then(response => response.json())
    .then(result => {
        if(result.success) {

          alert("Your product has been added to the database")
          props.onLoadProducts()
            props.onLoadUsers()
            props.onLoadOrders()

        }

    }).catch(error => {
        console.log(error)
    })
  }

  const handleChange = (e) => {
    setProductManage({
        ...ProductManage,
        [e.target.name]: e.target.value,

    })
  }

  return (
      <div>

            <div id="box-admin">
            <>
                <div id="header">
                    <h2>Add, Edit, Or Delete Products</h2>

                </div>
                <MDBBtn onClick={toggleFirstElement} className="collapse_btn_title mt-3"> All Products (total products: {counter1}) </MDBBtn>
                <MDBBtn onClick={toggleSecondElement} className="collapse_btn_title mt-3">Vegetables (total products: {counter2})</MDBBtn>
                <MDBBtn onClick={toggleThirdElement} className="collapse_btn_title mt-3">Fruit (total products: {counter3})</MDBBtn>
                <MDBBtn onClick={toggleFourthElement} className="collapse_btn_title mt-3">Flowers (total products: {counter4})</MDBBtn>
                <MDBBtn onClick={toggleElevenElement} className="collapse_btn_title mt-3">Add Product</MDBBtn>
                {/* <MDBBtn onClick={toggleAllElements} className="collapse_btn_title mt-3"> Show All</MDBBtn> */}


                <MDBRow>

                        <MDBCollapse show={showFirstElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>All Products</h1></div>
                            {all_productsItems}
                        </MDBCollapse>

                        <MDBCollapse show={showSecondElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>Vegetable</h1></div>
                            {vegetableItems}
                        </MDBCollapse>

                        <MDBCollapse show={showThirdElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>Fruit</h1></div>
                            {fruitItems}
                        </MDBCollapse>


                        <MDBCollapse show={showFourthElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>Flowers</h1></div>
                            {flowerItems}
                        </MDBCollapse>


                        <MDBCollapse show={showElevenElement} className='mt-3 card_flex best-book-h1'>
                                <div id="inputsection">
                            <div id="storenametextbox">
                                <label>Image: </label>
                                <input onChange = {handleChange}  type="text" name="imageurl" />
                                    </div>
                            <div id="storenametextbox">
                                <label>Title: </label>
                                <input onChange = {handleChange}  type="text" name="title" />
                            </div>
                            <div id="storenametextbox">
                                <label>Description: </label>
                                <input onChange = {handleChange}  type="text" name="description" />
                            </div>
                            <div id="storenametextbox">
                                <label>Rate: </label>
                                <input onChange = {handleChange}  type="text" name="rate" />
                            </div>
                            <div id="storenametextbox">
                                <label>Quantity: </label>
                                <input onChange = {handleChange}  type="text" name="per" />
                            </div>
                                <div id="storenametextbox">
                                    <label>Category: </label>
                                        <input onChange = {handleChange}  type="text" name="category" />
                                    </div>
                                    <div id="storenametextbox">
                                        <label>Subcategory: </label>
                                        <input onChange = {handleChange}  type="text" name="subcategory" />
                                    </div>
                                    <div>
                                    <button id="btnsubmit" onClick = {handleSave}>Add product</button>
                                </div>
                                </div>
                        </MDBCollapse>

                </MDBRow>
            </>
            </div>

            <div id="box-admin">
            <>
                <div id="header">

                    <h2>Orders</h2>

                </div>

                <MDBBtn onClick={toggleEightElement} className="collapse_btn_title mt-3">All Orders (total Orders: {counter8})</MDBBtn>
                <MDBBtn onClick={toggleNineElement} className="collapse_btn_title mt-3">Pending Orders (total Orders: {counter10})</MDBBtn>
                <MDBBtn onClick={toggleTenElement} className="collapse_btn_title mt-3">Completed Orders (total Orders: {counter9})</MDBBtn>
                <MDBBtn onClick={toggleAllElements3} className="collapse_btn_title mt-3"> Show All</MDBBtn>

                <MDBRow>

                    <MDBCol>
                        <MDBCollapse show={showEightElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1 style={{color: 'black', fontSize: '40px', fontWeight: 'bold'}}>All Orders</h1></div>
                            <div>{orderItems}</div>
                        </MDBCollapse>
                    </MDBCol>
                    <MDBCol>
                        <MDBCollapse show={showNineElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>Pending Orders</h1></div>
                            {pending_ordersItems}
                        </MDBCollapse>
                    </MDBCol>
                    <MDBCol>
                        <MDBCollapse show={showTenElement} className='mt-3 card_flex best-book-h1'>
                            <div><h1>Completed Orders</h1></div>
                            {completed_ordersItems}
                        </MDBCollapse>
                    </MDBCol>
                </MDBRow>
            </>
            </div>

            <div id="box-admin">
            <>
                <div id="header">
                    <h2>All Admin / Staff / Users list</h2>

                </div>

                <MDBBtn onClick={toggleFiveElement} className="collapse_btn_title mt-3">Admins (Total Admins: {counter5})</MDBBtn>
                <MDBBtn onClick={toggleSixElement} className="collapse_btn_title mt-3">Staff (Total Staff: {counter6})</MDBBtn>
                <MDBBtn onClick={toggleSevenElement} className="collapse_btn_title mt-3">Users (Total Users: {counter7})</MDBBtn>
                <MDBBtn onClick={toggleAllElements2} className="collapse_btn_title mt-3"> Show All</MDBBtn>

                <MDBRow>

                    <MDBCol>
                        <MDBCollapse show={showFiveElement} className='mt-3 card_flex best-book-h1'>
                            <div><h2 style={{color: 'Red'}}>Admin Team</h2></div>
                            <div>{adminsItems}</div>
                        </MDBCollapse>
                    </MDBCol>
                    <MDBCol>
                        <MDBCollapse show={showSixElement} className='mt-3 card_flex best-book-h1'>
                            <div><h2>Staff</h2></div><br/>
                            <div>{staffItems}</div>
                        </MDBCollapse>
                    </MDBCol>
                    <MDBCol>
                        <MDBCollapse show={showSevenElement} className='mt-3 card_flex best-book-h1'>
                            <div><h2>Users</h2></div><br/>
                            <div>{usersItems}</div>
                        </MDBCollapse>
                    </MDBCol>
                </MDBRow>
            </>
            </div>
            <div className = 'admin__links' id="box-admin">
            <div id="header">
                    <h2>Add Admin / Staff</h2>

                </div>
                <Link to={`/auth/add-admin`}><MDBBtn  className="collapse_btn_title mt-3">Add New Admin</MDBBtn></Link>
                <Link to= {`/auth/add-staff`}><MDBBtn  className="collapse_btn_title mt-3">Add New Staff</MDBBtn></Link>
            </div>

        </div>

  );
}



const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProducts: () => dispatch(actionCreators.loadProducts()),
    onLoadUsers: () => dispatch(actionCreators.loadAllUsers()),
    onDelete: (_id) => dispatch(actionCreators.deleteProduct(_id)),
    onLoadOrders: () => dispatch(actionCreators.LoadOrders()),

  }
}

const mapStateToProps = (state) => {
    return {
        all_products: state.all_products,
        vegetable: state.vegetable,
        fruit: state.fruit,
        flower: state.flower,
        admins: state.admins,
        staff : state.staff,
        users: state.users,
        orders:state.orders,
        completed_orders:state.completed_orders,
        pending_orders:state.pending_orders,

    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
