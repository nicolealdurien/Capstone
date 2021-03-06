import * as actionTypes from '../stores/actions/actionTypes'
// const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []


const initialState = {

    all_products: [],
    vegetable: [],
    fruit: [],
    flower: [],
    moredetails: [],
    cart: [],
    address:[],
    admins:[],
    staff:[],
    users:[],
    orders:[],
    completed_orders:[],
    pending_orders:[],



    // OrderConformation:[],
    


}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.Products_Loaded:{
            return {
                ...state,
                all_products: action.payload
            }
        }

        case actionTypes.Products_Loaded_VEGETABLE:{
            return {
                ...state,
                vegetable: action.payload
            }
        }

        case actionTypes.Products_Loaded_FRUIT:{
            return {
                ...state,
                fruit: action.payload
            }
        }

        case actionTypes.Products_Loaded_FLOWER:{
            return {
                ...state,
                flower: action.payload
            }
        }
        case actionTypes.onMoreDetails:{
            return {
                ...state,
                moredetails: action.payload
            }
        }


        case actionTypes.onAddToCart:{
            return {
                ...state,
                cart: state.cart.concat (action.payload)
            }
        }
        
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((x) => x.title !== action.payload)
        }

        case actionTypes.onUpdateAddress:{
            return {
                ...state,
                address: action.payload
            }
        }

        case actionTypes.Admin_Loaded:{
            return {
                ...state,
                admins: action.payload
            }
        }


        case actionTypes.Staff_Loaded:{
            return {
                ...state,
                staff: action.payload
            }
        }

        case actionTypes.Users_Loaded:{
            return {
                ...state,
                users: action.payload
            }
        }

        case actionTypes.Orders_Loaded:{
            return {
                ...state,
                orders: action.payload
            }
        }



        case actionTypes.Completed_Orders_Loaded:{
            return {
                ...state,
                completed_orders: action.payload
            }
        }
        

        case actionTypes.Pending_Orders_Loaded:{
            return {
                ...state,
                pending_orders: action.payload
            }
        }

        default:
            return state
         }
    
}

export default reducer