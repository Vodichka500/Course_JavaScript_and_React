import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css"
import {Component} from "react";


class EmployeesList extends Component{
    constructor() {
        super()
        this.state ={
            newSalary: 0
        }
    }

    getNewSalary =  (salary) => {
        this.setState({
            newSalary: salary
        })
    }

    render() {
        const {data, onDelete, onIncreaseChange, onLikeChange} = this.props
        const elements = data.map(item => {
            return <EmployeesListItem
                key={item.id}
                name={item.name}
                salary={item.salary}
                increase={item.increase}
                like={item.like}
                onDelete={()=>onDelete(item.id)}
                onIncreaseChange={()=>onIncreaseChange(item.id)}
                onLikeChange={()=>onLikeChange(item.id)}
                getNewSalary = {this.getNewSalary}
                getId = {() => this.getId(item.id)}
                updateSalary = {() => this.props.updateSalary(item.id, this.state.newSalary)}
            />
        })

        return (
            <ul className={"app-list list-group"}>
                {elements}
            </ul>
        )
    }
}
export default EmployeesList;