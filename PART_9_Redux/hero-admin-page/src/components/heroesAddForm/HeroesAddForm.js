

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useHttp} from "../../hooks/http.hook";
import * as actions from "../../actions/index"
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';


const HeroesAddForm = () => {

    const heroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp()

    const  onSubmit = (event) => {
        event.preventDefault();

        const hero = {
            id: uuidv4(),
            name: event.target.name.value,
            description: event.target.text.value,
            element: event.target.element.value
        }
        request(`http://localhost:3001/heroes/`,'POST', JSON.stringify(hero))
            .then((hero) => console.log(`hero with id:${hero.id} was created`))
            .then(() => dispatch(actions.heroAdd(hero)))
            .catch(err => console.error(err))
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option value="">Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;