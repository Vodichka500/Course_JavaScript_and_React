import {connect, useSelector,useDispatch} from "react-redux";
import * as actions from "../actions"

const Counter = () => {
    const counter = useSelector(state => state.value);
    const dispatch = useDispatch()
    return (
        <div className="jumbotron">
            <h1 className="counter">{counter}</h1>
            <button onClick={() => dispatch(actions.inc())} className="btn btn-primary">INC</button>
            <button onClick={() => dispatch(actions.dec())} className="btn btn-primary">DEC</button>
            <button onClick={() => dispatch(actions.rnd())} className="btn btn-primary">RND</button>
        </div>
    );
}


export default Counter;
