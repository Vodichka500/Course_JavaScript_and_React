
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