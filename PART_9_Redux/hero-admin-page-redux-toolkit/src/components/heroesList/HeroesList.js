import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {heroesDeleting,heroesFetching ,fetchHeroes} from "../../slice/heroesSlice"
import {filteredHeroesSelector} from "../../slice/heroesSlice"

const HeroesList = () => {


    const {heroesLoadingStatus} = useSelector(state => state.heroes)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const filteredHeroes = useSelector(filteredHeroesSelector)

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