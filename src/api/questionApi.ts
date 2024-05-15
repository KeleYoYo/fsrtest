import service from "@/utils/axios/request.ts"

export function $getTreeQuestions() {
    return service({
        url: `/question/tree`,
        method: 'get',
    })
}

export function $getPersonQuestions() {
    return service({
        url: `/question/person`,
        method: 'get',
    })
}

export function $getRoomQuestions() {
    return service({
        url: `/question/room`,
        method: 'get',
    })
}

// 添加树问题
export function $addTreeQuestion(data) {
    return service({
        url: `/question/treeAdd`,
        method: 'post',
        data
    })
}

export function $updateTreeQuestion(data) {
    return service({
        url: `/question/treeUpdate`,
        method: 'post',
        data
    })
}

export function $delTreeQuestion(data) {
    return service({
        url: `/question/treeDel`,
        method: 'post',
        data
    })
}


export function $addPersonQuestion(data) {
    return service({
        url: `/question/personAdd`,
        method: 'post',
        data
    })
}

export function $updatePersonQuestion(data) {
    return service({
        url: `/question/personUpdate`,
        method: 'post',
        data
    })
}

export function $delPersonQuestion(data) {
    return service({
        url: `/question/personDel`,
        method: 'post',
        data
    })
}



