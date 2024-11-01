import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {heroesDeleting, fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from 'reselect'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния +++
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE +++

const HeroesList = () => {



    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if(filter === "all"){
                return heroes
            } else {
                return (heroes.filter(item => item.element === filter))
            }
        }
    )
    const filteredHeroes = useSelector(filteredHeroesSelector)

    const {heroesLoadingStatus} = useSelector(state => state.heroes)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`,'DELETE' )
            .then((req) =>  console.log(req, ": Deleted"))
            .then(dispatch(heroesDeleting(id)))
            .catch(err => console.log(err));
    })

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} id={id} {...props} onDelete={onDelete} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;