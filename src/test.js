let roomarr = [
    "room1",
    "room2",
    "room3",
]

let treearr = [
    "treearr1",
    "treearr2",
    "treearr3",
]
let personarr = [
    "person1",
    "person1",
    "person1",
]

// 转化为提问字符串
function renturnQuestionStr(roomstr, treestr, personstr) {
    roomstr = roomarr.join("*");
    treestr = treearr.join("|");
    personstr = treearr.join("$");
    let str = roomstr + '*' + treestr + '|' + personstr + '$';
    return str
}

let str = renturnQuestionStr(roomarr, treearr, personarr)


function returnQuestionArr(requestionStr) {
    let roomArr = requestionStr.split("*")
    let otherArr = roomArr.pop()

    let treeArr = otherArr.split("|")
    let otherArr2 = treeArr.pop()
    let personArr = otherArr2.split("$")
    personArr.pop()

    return {
        roomArr,
        treeArr,
        personArr
    }
}

console.log("str", str)

returnQuestionArr(str)
console.log("data", returnQuestionArr(str))
// let arrtree = str.split("|")[1].split("|");
// console.log("arrtree",arrtree)