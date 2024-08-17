
var addTwoNumbers = function(l1, l2) {
    return rever((''+(parseInt(rever(l1).join("")) + parseInt(rever(l2).join("")))).split(""));
};
function rever (arr){
    const tempArr = [];
    for(let i = 0; i < arr.length; i++){
        tempArr.push(arr[arr.length-i-1]);
    }
    return tempArr;
}

//console.log(rever([1,2,3]));
//console.log(addTwoNumbers([2,4,3], [5,6,4]));


function likes(names) {
    switch (names.length) {
        case 0:
            return `no one likes this`;
        case 1:
            return `${names[0]} likes this'`;
        case 2:
            return `${names[0]} and ${names[1]} like this'`;
        case 3:
            return `${names[0]}, ${names[1]} and ${names[2]} like this'`;
        default:
            return `${names[0]}, ${names[1]} and ${names.length-2} others like this'`;
    }
}

//console.log(likes(['Alex']));

function findMissingLetter(array)
{
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const position = findPosition(alphabet, array);
    for(let i = 0; i<array.length; i++){
        if(array[i] !== alphabet[position+i]){
            return alphabet[position+i];
        }
    }
    return ' ';
}
function findPosition(alp, str){
    for(let i = 0; i<52; i++){
        if(str[0] === alp[i]){
            return i;
        }

    }
}
//console.log(findMissingLetter(['a','b','c','d','f']));
let counter = 0;
function deepCount(a){
    for(let i = 0; i< a.length; i++){
        if(!Array.isArray(a[i])){
           counter++;
        }else{
           deepCount(a[i]);
           counter++;
        }
    }
    return counter;
}
//deepCount(["1", 5, "3", ["10", 11, [2]]]);

function primeFactors(n){
    let arr = [];

    first : while(n !== 1 ){
        let i = 2;
        let makeIt = true;
        while(makeIt){
            if(n%i === 0){
                console.log(`${n} \ ${i} `);
                arr.push(i);
                n /= i;
                i++;
                makeIt = false;
            }
            i++;
        }
    }
}
//primeFactors(7775460);


snail = function(array) {
    function top(arr){
        return arr.shift();
    }
    function right(arr){
        let retArr = [];
        for(let i = 0; i<arr.length; i++){
            retArr.push(arr[i].pop());
        }
        return retArr;
    }
    function bottom(arr){
        return (arr.pop()).reverse()
    }
    function left(arr){
        let retArr = [];
        for(let i = 0; i<arr.length; i++){
            retArr.push(arr[i].shift());
        }
        return retArr.reverse();
    }

    let t = true,
        r =false,
        b = false,
        l = false;
    let snailArray = [];


    while(array.length !== 0){
        if(t){
            snailArray.push(top(array));
            t = false;
            r = true;
        } else if(r){
            snailArray.push(right(array));
            r = false;
            b = true;
        } else if(b){
            snailArray.push(bottom(array));
            b = false;
            l = true;
        } else if(l){
            snailArray.push(left(array));
            l = false;
            t = true;
        }
    }
    return [].concat(...snailArray);
}
const arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
//snail(arr);


function magicWand(image, origin, threshold) {

    function detect(image, x, y, threshold, arr, color){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){

                const tempX = x-1+i;
                const tempY = y-1+j;

                if((tempX >= 0 && tempX < image.length) && (tempY >= 0 && tempY < image[0].length)){
                    if(!arr.some(p => p[0] === tempX && p[1] === tempY)){
                        const deviation = Math.abs(image[tempX][tempY][0] + image[tempX][tempY][1] + image[tempX][tempY][2] - color);
                        if (deviation <= threshold) {
                            arr.push([tempX, tempY, false]);
                        }
                    }
                }
            }
        }
    }

    function containsFalse(samePixels){
        return samePixels.some(pixel => pixel[2] === false);
    }

    function falsePixel(samePixels){
        return samePixels.find(pixel => pixel[2] === false);
    }

    const pixel = image[origin.y][origin.x];
    const pixelColor = pixel[0] + pixel[1] + pixel[2];

    let samePixels = [];
    samePixels.push([origin.y, origin.x, false]);

    while(containsFalse(samePixels)){
        const pix = falsePixel(samePixels);
        pix[2] = true;
        detect(image, pix[0], pix[1], threshold, samePixels, pixelColor);
    }

    // Convert the array of arrays to an array of objects
    return samePixels.map(p => ({x: p[1], y: p[0]}));
}


const image = [
    [[0, 0, 0], [5, 5, 5], [255, 255, 255], [255, 255, 255], [70, 50, 30], [240, 0, 120]],
    [[0, 0, 0], [5, 5, 5], [255, 255, 255], [255, 255, 255], [70, 50, 30], [240, 0, 120]],
    [[0, 0, 0], [5, 5, 5], [255, 255, 255], [255, 255, 255], [70, 50, 30], [240, 0, 120]],
    [[0, 0, 0], [5, 5, 5], [0,     0,   0], [0,     0,   0], [70, 50, 30], [240, 0, 120]],
    [[0, 0, 0], [5, 5, 5], [0,    15,   5], [0,    15,   5], [70, 50, 30], [240, 0, 120]],
    [[0, 0, 0], [4, 2, 0], [255, 255, 255], [255, 255, 255], [0,  15,  5], [240, 0, 120]],
    [[0, 0, 0], [4, 2, 0], [255, 255, 255], [255, 255, 255], [0,  15,  5], [240, 0, 120]],
    [[0, 0, 0], [4, 2, 0], [255, 255, 255], [255, 255, 255], [0,  15,  5], [240, 0, 120]]
]
const origin = {x:0, y:0};
const treshold = 0;

//console.log(magicWand(image,origin,treshold));

var Sudoku = function(data)
{
    //   Private methods



    //   Public methods
    return {

        isValid: function() {

            for(let i = 0; i<data.length; i++ ){
                if(data.length !== data[i].length){
                    console.log('length error');
                    return false;
                }
            }

            for(let rows = 0; rows<data.length; rows++){
                for(let i = 0; i<data[rows].length; i++){
                    for(let j = 0; j<data[rows].length; j++){
                        if((data[rows][i] === data[rows][j]) && (i !== j)){
                            console.log('error in row');
                            return false;
                        }
                    }
                }
            }
            for(let cols = 0; cols<data.length; cols++){
                for(let i = 0; i<data[cols].length; i++){
                    for(let j = 0; j<data[cols].length; j++){
                        if((data[i][cols] === data[j][cols]) && (i !== j)){
                            console.log('error in col');
                            return false;
                        }
                    }
                }
            }

            let str = '';
            let set = new Set();
            for(let rows = 0; rows<data.length; rows+= Math.sqrt(data.length)){
                for(let cols = 0; cols<data.length; cols+= Math.sqrt(data.length)){

                    set.clear();
                    // start every square elements
                    for(let i = 0+rows; i < Math.sqrt(data.length)+rows; i++) {
                        for(let j = 0+cols; j < Math.sqrt(data.length)+cols; j++){

                            set.add(data[i][j]);
                        }

                    }
                    if(set.size !== data.length){
                        console.log(set);
                        console.log(`error in square; column: ${cols}, row: ${rows}`);
                        return false;
                    }

                    //end every square elements

                }
            }
            console.log(data);
            return true;
        }
    };


};

var goodSudoku1 = new Sudoku([
    [7,8,4, 1,5,9, 3,2,6],
    [5,3,9, 6,7,2, 8,4,1],
    [6,1,2, 4,3,8, 7,5,9],

    [9,2,8, 7,1,5, 4,6,3],
    [3,5,7, 8,4,6, 1,9,2],
    [4,6,1, 9,2,3, 5,8,7],

    [8,7,6, 3,9,4, 2,1,5],
    [2,4,3, 5,6,1, 9,7,8],
    [1,9,5, 2,8,7, 6,3,4]
]);

var goodSudoku2 = new Sudoku([
    [1,4, 2,3],
    [3,2, 4,1],

    [4,1, 3,2],
    [2,3, 1,4]
]);

var badSudoku1 = new Sudoku([
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9]
]);

var badSudoku2 = new Sudoku([
    [1,2,3,4,5],
    [1,2,3,4],
    [1,2,3,4],
    [1]
]);
var badSudoku3 = new Sudoku([[true]]);


//console.log(goodSudoku1.isValid());
//console.log(goodSudoku2.isValid());
//console.log(badSudoku1.isValid());
//console.log(badSudoku2.isValid());
//console.log(badSudoku3.isValid());

new Promise( function (resolve, reject){
    setTimeout( () => {
        console.log("Data preparation");

        const product = {
            name: 'TV',
            price: 2000,
        };
        const rand = Math.floor(Math.random()*100);
        console.log(rand);
        if(rand % 2 === 0){
            resolve();
        } else {
            reject();
        }

    },2000 )
}).then(() => {
    setTimeout(() => {
        console.log("Data status: Ok");
    }, 2000);
}).catch(() => {
    setTimeout(() => {
        console.log("Data status: error");
    }, 2000);
});

const names = ['Vlad', 'Yana', 'Pablo', 'Svetlana'];
const shortNames = names.filter((name) => {
    return name.length < 5;
})
//console.log(shortNames);

const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];

function showGoodFilms(arr) {
    arr = arr.filter(item => {
        if(Object.entries(item)[1][1] >= 8){
            return item;
        }
    })
    console.log(arr);
    return arr;
}

function showListOfFilms(arr) {
    arr = showGoodFilms(arr).map(item => Object.entries(item)).map(item => item[0][1]).join(',');
    console.log(arr);
}

function setFilmsIds(arr) {
    arr.forEach((item, i) => {
        item['id']=i;
    })
    return arr;
}

//const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every(item => item.id || item.id === 0);
}


//showGoodFilms(films);
//showListOfFilms(films);
//console.log(checkFilms(films));


const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

const getPositiveIncomeAmount = (data) => {
    data = data.map(item => Object.entries(item)).filter(item => item[0][1] > 0).map(item => item[0][1]).reduce((sum, item) => sum + item);
    console.log(data);
    return data;
};

const getTotalIncomeAmount = (data) => {
    if(data.map(item => Object.entries(item)).map(item => item[0][1]).some(item => item<0)){
        data = data.map(item => Object.entries(item)).map(item => item[0][1]).reduce((sum, item) => sum + item);
        return data;
    } else {
        return  getTotalIncomeAmount(data);
    }
};

//getPositiveIncomeAmount(funds);
//getTotalIncomeAmount(funds);


class Student{
    constructor(name, surname, age) {
        this._name = name;
        this._surname = surname;
        this._age = age;
    }
    #id = '99792';

    displayInfo(){
        console.log(`Student: id:${this.#id} ${this._name} ${this._surname}, ${this._age} years old.`);
    }

    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }

    get id(){
        return this.#id;
    }
    set id(newID){
        this.#id = newID;
        console.log('ID has been update');
    }
}

let uladzislau = new Student('Uladzislau', 'Kamisarau', '20');
uladzislau.displayInfo();

console.log(uladzislau.id);