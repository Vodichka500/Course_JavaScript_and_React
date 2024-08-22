import './app-info.css'
const  AppInfo = ({employeesCounter, increaseCounter}) => {
    return(
        <div className={"app-info"}>
            <h1>Учет сотрудников в компании "FinanceComp"</h1>
            <h2>Общее число сотрудников: {employeesCounter}</h2>
            <h2>Премию получат: {increaseCounter}</h2>
        </div>
    )
}
export default AppInfo;