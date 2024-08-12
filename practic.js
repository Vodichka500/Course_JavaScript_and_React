
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

const req = new Promise( function (resolve, reject){
    setTimeout( () => {
        console.log("Data preparation");

        const product = {
            name: 'TV',
            price: 2000,
        };

        resolve(product);
    },2000 )
});

req.then((product) => {
    setTimeout(() => {
        console.log("Data status: Ok");
    }, 2000);
});

req.catch();