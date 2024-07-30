/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


document.querySelectorAll('.promo__adv img').forEach(item => {
    item.remove();
})


const poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre');
genre.textContent = "Драма";

poster.style.backgroundImage = "URL('img/bg.jpg')";

function addMoviesOnPage(data){
    const movieList =  document.querySelector('.promo__interactive-list');
    movieList.innerHTML = "";
    let HTML = "";
    data.movies.sort().forEach((film, i) => {
        if(film.length <= 21){
            movieList.innerHTML +=  `<li class="promo__interactive-item">${i+1}. ${film} 
                            <div class="delete"></div>
                            </li> `
        }else{
            const filmShortName = film.slice(0, 22) + "...";
            movieList.innerHTML +=  `<li class="promo__interactive-item">${i+1}. ${filmShortName} 
                            <div class="delete"></div>
                            </li> `
        }
    })

    document.querySelectorAll('.delete').forEach((btn, i) => {
       btn.addEventListener('click', ()=>{
           btn.parentElement.remove();
           movieDB.movies.splice(i, 1);
           addMoviesOnPage(data);
       })
    });

}

addMoviesOnPage(movieDB);

document.getElementById('btn-add').addEventListener('click', event =>
    addMovie(event, movieDB));

function addMovie(event, data){
    event.preventDefault()
    const movie = document.querySelector('.adding__input').value;
    if(movie === null || movie ==='' || !isNaN(movie) ){

        document.querySelector('.adding__input').value = "";
        document.querySelector('.adding__input').placeholder = 'Error';
    }else{
        if(document.getElementById('ifFavorite').checked){
            console.log('Favorite movie have been added');
        }
        data.movies.push(document.querySelector('.adding__input').value );
        addMoviesOnPage(data);

        document.querySelector('.adding__input').value = "";
        document.querySelector('.adding__input').placeholder = 'Movie added';
    }

}

