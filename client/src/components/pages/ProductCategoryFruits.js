import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../../stores/creators/actionCreators'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import React from 'react';
import '../css/App.css';


const ProductCategoryFruit = (props) => {

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


    var  product = props.moredetails
    var  fruit = props.fruit

    let counter2 = 0;
    for (let i = 0; i < fruit.length; i++) {
        if (fruit[i]) counter2++;
}


const fruitItems = fruit.map((items, index) => {
    return <div key ={index} className= "card" class="card" style={{width: "18rem"}}>
        <img src={items.imageurl} className= "card-img-top"class="card-img-top"/>

        <div className="card-body" class="card-body">
            <h1 className="card-title"class="card-title">{items.title}</h1>
            <ul class="list-group list-group-flush">
                <li className="list-group-item" class="list-group-item">
                    <b>Price: </b> ${items.rate}/{items.per}
                </li>
            </ul>
        </div>

        <div className="card-body" class="card-body">
             <p className="card-text" class="card-text">{items.description}</p>
         

            <button className="more-details-button" onClick = {() => handleMoreDetails(items)}>
                <Link to= {`/product-detail/${items.title}`} class="card-link" className="card-link-details" style={{textDecoration: 'none'}}> More Details </Link>
            </button>
        </div>
        </div>
})


    return (
        <div>
            <h1>
                &nbsp;&nbsp;Try Some Of Our Delicious Fruits!
            </h1>

                <div className="all-fruits-page">
                    <div className="card_flex best-book-h1">
                        {fruitItems}
                    </div>
                </div>
            
        </div>
    )

   
}

const mapDispatchToProps = (dispatch) => {
    return {
      onLoadProducts: () => dispatch(actionCreators.loadProducts()),
      onMoreDetails: (items) => dispatch(actionCreators.onMoreDetails(items)),
      onAddToCart: (items) => dispatch(actionCreators.onAddToCart(items)) 
    }
  }


const mapStateToProps = (state) => {
    return {
        all_products: state.all_products,
        vegetable: state.vegetable,
        fruit: state.fruit,
        flower: state.flower
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryFruit);
