import Navbar from '../Navbar'

const BaseLayout = (props) => {

    return (
        <div>
            <Navbar />
            { props.children }
        </div>
    )
}


export default BaseLayout