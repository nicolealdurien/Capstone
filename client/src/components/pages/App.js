import { connect } from 'react-redux'
import * as actionCreators from '../../stores/creators/actionCreators' 
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/App.css';


import React from 'react';
import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
// import Button from 'react-bootstrap/Button';


const App = (props) => {

  // const [Uniqueid] = useState(Math.random().toString(36).substr(2, 8));
  // const [error, setError] = useState('');



  // const UniqueidlocalStorage = (id) => {
  //   console.log("hello")
  //   console.log(id)
      
  //     try {
      
  //       console.log("hello2")
  //       localStorage.setItem('Uniqueid', id)
    
  //     } catch (error) {
  //             setError(error.response.data.error)
  //             setTimeout(() => {
  //                 setError('')
  //             }, 5000)
  //         }
  // }
  

    useEffect(() => {
      // console.log("use effect is fired")
      props.onLoadProducts()
      // UniqueidlocalStorage(Uniqueid)
    },[])

    const handleMoreDetails = (items) => {
      props.onMoreDetails(items)
    }

    var  all_products = props.all_products 

  let counter1 = 0;
  for (let i = 0; i < all_products.length; i++) {
    if (all_products[i]) counter1++;
  }
console.log(counter1)

// const Uniqueidzitem = localStorage.getItem('Uniqueid')
const all_productsItems = all_products.map((items, index) => {
  // console.log(Uniqueid)
    return <div key ={index} className="card" style={{width: "18rem"}}>
            <div>
              <Link style={{textDecoration: 'none'}} to= {`/product-detail/${items.title}`}><div className='square'><img className="img" onClick = {() => handleMoreDetails(items)} src={items.imageurl} alt={items.title}/></div></Link>
            </div>
            <div>
              <Link style={{textDecoration: 'none'}} to= {`/product-detail/${items.title}`}><h1 onClick = {() => handleMoreDetails(items)}>{items.title}</h1></Link>
            </div>
          </div>
})




var  vegetable = props.vegetable 

let counter2 = 0;
for (let i = 0; i < all_products.length; i++) {
    if (vegetable[i]) counter2++;
}
console.log(counter2)


const vegetableItems = vegetable.map((items, index) => {
    return <div key ={index} className="card" id='card-vegetable' style={{width: "18rem"}}>
        <div>
        <Link style={{textDecoration: 'none'}} to= {`/product-detail/${items.title}`}><div className="square"><img className="img" onClick = {() => handleMoreDetails(items)} src={items.imageurl} alt={items.title} /></div></Link>
        </div>
        <div>
        <Link style={{textDecoration: 'none', color: '#3a2713'}} to= {`/product-detail/${items.title}`}><h1 onClick = {() => handleMoreDetails(items)}>{items.title}</h1></Link>
        </div>
      </div>
})



var  fruit = props.fruit 
// console.log(fruit)
let counter3 = 0;
for (let i = 0; i < all_products.length; i++) {
    if (fruit[i]) counter3++;
}
console.log(counter3)

const fruitItems = fruit.map((items, index) => {
    return <div key ={index} className="card" id='card-fruit' style={{width: "18rem"}}>
        <div>
        <Link style={{textDecoration: 'none'}} to= {`/product-detail/${items.title}`}><div className='square'><img className="img" onClick = {() => handleMoreDetails(items)} src={items.imageurl} alt={items.title}/></div></Link>
        </div>
        <div>
        <Link style={{textDecoration: 'none', color: '#3a2713'}} to= {`/product-detail/${items.title}`}><h1 onClick = {() => handleMoreDetails(items)}>{items.title}</h1></Link>
        </div>
      </div>
})



var  flower = props.flower 
let counter4 = 0;
for (let i = 0; i < all_products.length; i++) {
    if (flower[i]) counter4++;
}
// console.log(counter4)

const flowerItems = flower.map((items, index) => {
    return <div key ={index} className="card" id='card-flower' style={{width: "18rem"}}>
        <div>
        <Link style={{textDecoration: 'none'}} to= {`/product-detail/${items.title}`}><div className='square'><img className="img" style={{width: "17rem"}} onClick = {() => handleMoreDetails(items)} src={items.imageurl} alt={items.title}/></div></Link>
        </div>
        <div>
        <Link style={{textDecoration: 'none', color: '#3a2713'}} to= {`/product-detail/${items.title}}`}><h1 onClick = {() => handleMoreDetails(items)}>{items.title}</h1></Link>
        </div>
       
        

        </div>
})



  return (
    <header>
      <div
        className='p-5 text-center bg-image'

        
        style={{ backgroundImage: "url('#')" }}
      >
        
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>FruVe Flow</h1>
              <h4 className='mb-4'>Get your Fruit, Vegetables, and Flowers delivered fresh.</h4>
              <Link style={{textDecoration: 'none'}} className='btn btn-outline-light btn-lg' to='/auth/customer-register' role='button'>
                Register Today!
              </Link>
            </div>
          </div>
        </div>
        
        <br />
        <div className='cards'>
        <>
  <Card id="card-fruits">
    
    <Card.Body>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    
      <div className="product_display">
        {fruitItems[0]}
        {fruitItems[1]}
        {fruitItems[3]}
        
        
        
      </div>
      <Link className='btn btn-outline-light btn-lg' to='/fruits' role='button'>
                See All Fruits
              </Link>
    </Card.Body>
  </Card>
  <br />
  <Card id="card-vegetables">
    <Card.Body>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    {/* <Card.Title>Vegetables</Card.Title> */}
    <div className="product_display">
        {vegetableItems[11]}
        {vegetableItems[18]}
        {vegetableItems[5]}
        
        
      </div>
      <Link className='btn btn-outline-light btn-lg' to='/vegetables' role='button'>
                See All Vegetables
              </Link>
    </Card.Body>
    
  </Card>
  <br />
  <Card id="card-flowers">
    <Card.Body>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    {/* <Card.Title>Flowers</Card.Title> */}
    <div className="product_display">
        {flowerItems[11]}
        {flowerItems[12]}
        {flowerItems[13]}
        
       
      </div>
      <Link className='btn btn-outline-light btn-lg' to='/flowers' role='button'>
                See All Flowers
              </Link>
    </Card.Body>
    
  </Card>
</>
      </div>
      </div>
      
    </header>                 
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProducts: () => dispatch(actionCreators.loadProducts()),
    onMoreDetails :(items) => dispatch(actionCreators.onMoreDetails(items)) 
    
          
  }
}

const mapStateToProps = (state) => {
  return {
      all_products: state.all_products,
      vegetable: state.vegetable,
      fruit: state.fruit,
      flower: state.flower,
      isLoggedIn: state.isAuthenticated,
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

