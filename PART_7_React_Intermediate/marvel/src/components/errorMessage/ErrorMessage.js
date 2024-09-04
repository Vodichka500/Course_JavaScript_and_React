import img from './img.png'

const errorMessage = () => {
    return ( <img style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt={"error image"}/> )
}

// <img src={process.env.PUBLIC_URL+'/error.gif'}/>

export default errorMessage()