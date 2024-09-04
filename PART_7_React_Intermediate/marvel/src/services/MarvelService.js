import useHttp from '../hooks/http.hook'
import ServerResponse from "../components/ServerResponse";

const useMarvelService = () => {
    const {loading, request, error} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'ts=1&apikey=f4979a8ca52b9a0d717881bc92c6367b&hash=ca2ba35b0fc8961d5967fa7f12103672';
    const _baseOffset = 0;



    const getAllCharacters = async (offset = _baseOffset) => {
        //const serRes = new ServerResponse();
        //const res = await serRes.getResponse()
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

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,234)}...` : `There is not description about this character`,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            image: comics.thumbnail.path +'.'+ comics.thumbnail.extension
        }
    }
    return {loading, error, getAllCharacters, getCharacter, getAllComics}
}

// 1011031
export default useMarvelService;