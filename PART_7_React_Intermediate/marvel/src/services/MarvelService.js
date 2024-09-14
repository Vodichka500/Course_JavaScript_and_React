import useHttp from '../hooks/http.hook'
import ServerResponse from "../components/ServerResponse";

const useMarvelService = () => {
    const {loading, request, error} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'ts=1&apikey=f4979a8ca52b9a0d717881bc92c6367b&hash=ca2ba35b0fc8961d5967fa7f12103672';
    const _baseOffset = 0;



    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?format=comic&formatType=comic&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        //console.log(`${_apiBase}characters?name=${name.replaceAll(" ", "%20")}&${_apiKey}`)
        const res = await request(`${_apiBase}characters?name=${name.replaceAll(" ", "%20")}&${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        if(char){
            return {
                id: char.id,
                name: char.name,
                description: char.description ? `${char.description.slice(0,234)}...` : `There is not description about this character`,
                thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
            }
        } else {
            return {id: -1}
        }
    }

    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description,
            price: comics.prices[0].price,
            image: comics.thumbnail.path +'.'+ comics.thumbnail.extension,
            pageCount: comics.pageCount,
            language: comics.textObjects.language
        }
    }
    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}
}

// 1011031
export default useMarvelService;