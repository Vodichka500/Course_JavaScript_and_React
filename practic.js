
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

console.log(rever([1,2,3]));
console.log(addTwoNumbers([2,4,3], [5,6,4]));


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

console.log(likes(['Alex']));


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

console.log(findMissingLetter(['a','b','c','d','f']));

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

deepCount(["1", 5, "3", ["10", 11, [2]]]);

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

primeFactors(7775460);


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
snail(arr);
//snail([[1,2,3],[4,5,6],[7,8,9]]);
console.log();