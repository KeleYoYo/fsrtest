function renturnQuestionStr(roomstr, treestr, personstr) {
    roomstr = roomstr.join("!");
    treestr = treestr.join("#");
    personstr = personstr.join("$");
    let str = roomstr + '!' + treestr + '#' + personstr + '$';
    return str
}


function returnQuestionArr(requestionStr) {
    let roomArr = requestionStr.split("!")
    let otherArr = roomArr.pop()

    let treeArr = otherArr.split("#")
    let otherArr2 = treeArr.pop()
    let personArr = otherArr2.split("$")
    personArr.pop()

    return {
        roomArr,
        treeArr,
        personArr
    }
}

export {
    renturnQuestionStr,
    returnQuestionArr
}