import "./employees-list-item.css"
import {Component} from "react";

class EmployeesListItem extends Component{

     changeSalary = async (e) => {
        await this.props.getNewSalary(e.target.value);
        this.props.updateSalary();
    }

    render() {
        const {name, salary, onDelete, increase,like, onIncreaseChange,onLikeChange} = this.props;

        return (
            <li className={"list-group-item d-flex justify-content-between" + (increase === true?" increase":"") +  (like === true?" like":"")}>
                <span onClick={onLikeChange} className="list-group-item-label">{name}</span>
                <input type="number" className="list-group-item-input" defaultValue={salary} onChange={this.changeSalary}/>
                <p className={"dollar-icon-item"}>$</p>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                            className="btn-cookie btn-sm "
                            onClick={onIncreaseChange}>
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>

                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;