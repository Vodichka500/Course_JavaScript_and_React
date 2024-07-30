"use strict";
// PRACTICE pt.1
/*
const numberOfFilms = +prompt('How many films have you watched?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    geners: [],
    privat: false,
}

const lastFilmFirst = prompt("last movie, that you watched?", ""),
    ratingFirst = prompt ("How would you rate it?", ""),
    lastFilmSecond = prompt("last movie, that you watched?", ""),
    ratingSecond = prompt ("How would you rate it?", "");

personalMovieDB.movies[lastFilmFirst] = ratingFirst;
personalMovieDB.movies[lastFilmSecond] = ratingSecond;

console.log(personalMovieDB);

*/

// PRACTICE pt.2
/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит -
возвращаем пользователя к вопросам опять. (К любой строке можно обратиться как
str.length - и получить её длину)

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше -
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: true,
    start: function() {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while(personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)){
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyfilms: function (){
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                b = prompt('На сколько оцените его?', '');

            if(a != null && b != null && a != '' && b != '' && a.length<50 ){
                personalMovieDB.movies [a]=b;
            }else{
                console.log('error');
                i--;
            }
        },
    detectPersonalLevel:    function(){
            if(personalMovieDB.count < 10){
                console.log("You see few films");
            }else if(personalMovieDB.count >= 10 && personalMovieDB<30){
                console.log('You are cool viewer');
            }else if(personalMovieDB.count >= 30){
                console.log('You are a movie fan');
            }else{
                console.log('ERROR');
            }

            console.log(personalMovieDB);
    },
    showMyDB: function(){
        if(personalMovieDB.privat === false){
            console.log(personalMovieDB);
        }else{
            console.log('ERROR. It\'s a personal movie data base');
        }
    },
    writeYourGenres: function(){
        for(let i = 0; i<3; i++ ){
            personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером  ${i}`, '');
            while(personalMovieDB.genres[i] === '' || personalMovieDB.genres[i] == null || !isNaN(personalMovieDB.genres[i]) ){
                personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i}`, '');
            }
        }
        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Ваш любимый жанр под номером ${i+1} - это ${item}`);
        })
    },
    toggleVisibleMyDB: function (){
        !personalMovieDB.privat ? personalMovieDB.privat = true : personalMovieDB.privat = false;
    },

};

personalMovieDB.writeYourGenres();






