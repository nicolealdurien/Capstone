import { useEffect , useState } from 'react'
import { connect } from 'react-redux'


function ProductUpdate(props) {
    const [ProductManage, setProductManage] = useState({})

    const handleChange = (e) => {
        setProductManage({
            ...ProductManage,
            [e.target.name]: e.target.value,
            
        })
    }
    // var  all_products = props.all_products 
    // console.log(all_products)
    const handleupdate =() => {

        const token = localStorage.getItem('adminToken')
        const id = props.match.params
        console.log(id)
        fetch (`/admin/update-product/${id._id}`,{
            method: 'PUT',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                imageurl: ProductManage.imageurl,
                title: ProductManage.title,
                description: ProductManage.description,
                rate: ProductManage.rate,
                per:ProductManage.per,
                category: ProductManage.category,
                subcategory: ProductManage.subcategory,
            })
         }).then(response => response.json())
         .then(result => {
            if(result.success) {
                console.log("Product updated")
                
                alert("Your product has been added to the database")
                props.history.push('/product-manage')
            }
        })
    }


    return<div>
        <div id="header">
              <h1>Update Products</h1>
        </div>
        <div id="inputsection">
            <div id="storenametextbox">
                <label>Image</label>
                <input onChange = {handleChange}  type="text" name="imageurl" />
            </div>
            <div  id="storenametextbox">
                <label>title</label>
                <input onChange = {handleChange}  type="text" name="title" />
            </div >
            <div id="storenametextbox">
                <label>description</label>
                <input onChange = {handleChange}  type="text" name="description" />
            </div>
            <div id="storenametextbox">
                <label>rate</label>
                <input onChange = {handleChange}  type="text" name="rate" />
            </div>
            <div id="storenametextbox">
                <label>rate</label>
                <input onChange = {handleChange}  type="text" name="per" />
            </div>
            <div id="storenametextbox">
                <label>category</label>
                <input onChange = {handleChange}  type="text" name="category" />
            </div>
            <div id="storenametextbox">
                <label>subcategory</label>
                <input onChange = {handleChange}  type="text" name="subcategory" />
            </div>
            <div id="btnsubmit">
                <button onClick = {handleupdate}>update product</button>
            </div>
        </div><br></br>
    </div>
}

const mapStateToProps = (state) => {
    return {
        all_products: state.all_products
    }
}

export default connect(mapStateToProps)(ProductUpdate);

