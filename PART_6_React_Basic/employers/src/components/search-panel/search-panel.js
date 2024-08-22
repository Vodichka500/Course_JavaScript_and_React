import {Component} from "react";
import './search-panel.css'

class SearchPanel extends Component{
    constructor() {
        super();
        this.state = {
            searchName: ''
        }
    }
    onUpdateSearchedName = (e) => {
        this.setState({
            searchName: e.target.value
        })
        this.props.onUpdateSearchedName(e.target.value)
    }
    render() {
        return (
            <input
                type={"text"}
                className={"form-control search-input"}
                placeholder={"Найти сотрудника"}
                value={this.state.searchName}
                onChange={this.onUpdateSearchedName}
            />
        )
    }
}

export  default SearchPanel;