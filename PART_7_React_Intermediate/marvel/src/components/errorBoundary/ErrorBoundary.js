import {Component} from "react";

class errorBoundary extends Component{
    state = {
        error: false
    }


//  static getDerivedStateFromError(error){
//     return {error: true}
//  }



    componentDidCatch(error, errorInfo) {
        console.log( error )
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error){
            return(
                <h2>Something went wrong</h2>
            )
        }

        return this.props.children
    }
}

export default errorBoundary