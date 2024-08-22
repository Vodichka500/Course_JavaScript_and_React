import './app-filter.css'
import {Component} from "react";

class AppFilter extends Component{
    constructor() {
        super();
        this.state = {
            filter: ''
        }
    }

    changeFilter = (e) => {
        this.setState({
            filter: e.target.getAttribute('data-filter')
        })
        console.log((e.target.getAttribute('data-filter')))
        this.props.onFilter(e.target.getAttribute('data-filter'));

    }
    render() {
        return(
            <div className={"btn-group"}>
                <button
                    className={"btn btn"+ (this.state.filter === ''?"":"-outline") +"-light"}
                    type={"button"}
                    data-filter={""}
                    onClick={this.changeFilter}>

                    Все сотрудники
                </button>
                <button
                    className={"btn btn"+ (this.state.filter === 'increaseEmployees'?"":"-outline") +"-light"}
                    type={"button"}
                    data-filter={"increaseEmployees"}
                    onClick={this.changeFilter}>
                    На повышение
                </button>
                <button
                    className={"btn btn"+ (this.state.filter === 'salaryMoreThen1000'?"":"-outline") +"-light"}
                    type={"button"}
                    data-filter={"salaryMoreThen1000"}
                    onClick={this.changeFilter}>
                    З\П > 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter