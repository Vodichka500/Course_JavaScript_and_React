import {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import './app.css'



class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:"Alex D." ,salary:800, id: 1, increase: false, like: false},
                {name:"Brad P." ,salary:1200, id:2, increase: false, like: false},
                {name:"Metiu M." ,salary:1000, id: 3, increase: false, like: false },
            ],
            show: false,
            searchName: '',
            filter: '',
        }
        this.maxId = 4;

    }
    onDelete = (id) => {
        this.setState(({data}) => {
            return{
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addEmployee = (name, salary) => {
        if(name.length > 3 && salary !== ''){
            const newEmp = {
                name: name,
                salary: salary,
                increase: false,
                like: false,
                id: this.maxId++,
            }
            this.setState(({data})=>{
                return{
                    data: data.concat(newEmp)
                }
            })
            this.setState({show: false});
        } else {
            console.log('error')
            this.setState({show: true});
        }
    }


    onIncreaseChange = (id) => {
        this.setState(({data})=>{
            return {
                data: data.map(item => {
                    if(item.id === id){
                        return {...item, increase: !item.increase}
                    }
                    return item;
                })
            }
        })
    }

    onLikeChange = (id) => {
        this.setState(({data})=>{
            return {
                data: data.map(item => {
                    if(item.id === id){
                        return {...item, like: !item.like}
                    }
                    return item;
                })
            }
        })
    }

    employeesCounter = () => {
        return this.state.data.length;
    }
    increaseCounter = () => {
        // eslint-disable-next-line
        return (this.state.data.filter(item => {
            if(item.increase === true){
                return item;
            }
        })).length;
    }

    searchEmp = (searchName,employees) => {
        if(searchName.length === ''){
            return employees;
        }
        return employees.filter((item) => {
            return item.name.indexOf(searchName)>-1;
        })
    }

    onUpdateSearchedName = (searchName) => {
        this.setState({searchName});
    }

    onFilter = (filter, data) => {
        if(filter === 'salaryMoreThen1000'){
            return data.filter(item => {
                return item.salary > 1000
            })
        }else if (filter === 'increaseEmployees'){
            return data.filter(item => {
                return item.increase === true
            })
        } else {
            return data
        }
    }

    getFilter = (filter) => {
        this.setState({filter});
    }

    updateSalary = (id, newSalary) => {
        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    if (item.id === id) {
                        return {...item, salary: newSalary}
                    }
                    return item;
                })
            }
        })
    }

    render() {

        const {data, searchName} = this.state;
        const visibleData = this.onFilter(this.state.filter ,this.searchEmp(searchName, data));


        return(
            <div className="app">
                <AppInfo employeesCounter={this.employeesCounter()} increaseCounter={this.increaseCounter()}/>
                <div className={"search-panel"}>
                    <SearchPanel onUpdateSearchedName={this.onUpdateSearchedName}/>
                    <AppFilter onFilter={this.getFilter}/>
                </div>
                <EmployeesList data={visibleData}
                               onDelete={this.onDelete}
                               onIncreaseChange={this.onIncreaseChange}
                               onLikeChange={this.onLikeChange}
                               updateSalary={this.updateSalary}
                                />
                <EmployeesAddForm addEmployee={this.addEmployee} show={this.state.show} />
            </div>
        )
    }
}

export default App;