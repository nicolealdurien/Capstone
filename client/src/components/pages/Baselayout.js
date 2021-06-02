import NewNavbar from '../Navbar'

const BaseLayout = (props) => {

    return (
        <div>
            <NewNavbar />
            { props.children }
        </div>
    )
}


export default BaseLayout