import { connect } from 'react-redux'
import * as actionCreators from '../../stores/creators/actionCreators' 
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import React from 'react';
import '../css/App.css';


const ProductCategoryFlower = (props) =>{

    useEffect(() => {
        props.onLoadProducts()
    },[])

    const handleMoreDetails = (items) => {
        props.onMoreDetails(items)
    }

    const handleAddToCart = (product) => {
        props.onAddToCart(product)
        alert("Item has been added to your cart!")
    }

    

    var  flower = props.flower 
    
    let counter2 = 0;
    for (let i = 0; i < flower.length; i++) {
        if (flower[i]) counter2++;
    }


    const flowerItems = flower.map((items, index) => {
    console.log(items)
    return <div key ={index} className= "card" class="card" style={{width: "18rem"}}>
        <img  src={items.imageurl} className= "card-img-top"class="card-img-top"/>

        <div className="card-body" class="card-body">
            <h1 className="card-title"class="card-title">{items.title}</h1>
            <ul class="list-group list-group-flush">
                <li className="list-group-item" class="list-group-item">
                    <b>Price: </b> ${items.rate}/{items.per}
                </li>
            </ul>

             

            {/* not yet functional for qty adding */}
             {/* <button className="add-cart-button" onClick = {() => handleAddToCart(items)}>
                    <a className="add-cart" class="card-link" ><span><span className="icon_plus"></span></span> Add To Cart</a>
            </button> */}
            
            
        </div>

        <div className="card-body" class="card-body">
             <p className="card-text" class="card-text">{items.description}</p>
         

            <button className="more-details-button" onClick = {() => handleMoreDetails(items)}>
                <Link to= {`/product-detail/${items.title}`} class="card-link" className="card-link-details"> More Details </Link>
            </button>
        </div>
        </div>
       
})

    return (
    <div>
           
        <h1>
            &nbsp;&nbsp;Brighten up your home with some of our beautiful flowers!
        </h1>
         <div className="all-flowers-page">
             <div className="card_flex best-book-h1">
                {flowerItems}
            </div>
         </div>   
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      onLoadProducts: () => dispatch(actionCreators.loadProducts()), 
      onMoreDetails: (items) => dispatch(actionCreators.onMoreDetails(items)), 
      onAddToCart :(items ) => dispatch(actionCreators.onAddToCart(items )) 
    }
  }


const mapStateToProps = (state) => {
    return {
        all_products: state.all_products,
        vegetable: state.vegetable,
        fruit: state.fruit,
        flower: state.flower,
        
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryFlower);