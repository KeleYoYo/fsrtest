function renturnQuestionStr(roomstr, treestr, personstr) {
    roomstr = roomstr.join("!");
    treestr = treestr.join("a");
    personstr = personstr.join("b");
    let str = roomstr + '!' + treestr + 'a' + personstr + 'b';
    return str
}


function returnQuestionArr(requestionStr) {
    console.log("strquestion", requestionStr)
    let roomArr = requestionStr.split("!")
    let otherArr = roomArr.pop()

    let treeArr = otherArr.split("a")
    let otherArr2 = treeArr.pop()
    let personArr = otherArr2.split("b")
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