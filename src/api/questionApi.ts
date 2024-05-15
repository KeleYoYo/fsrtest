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

// 添加人问题
export function $addRoomQuestion(data) {
    return service({
        url: `/question/roomAdd`,
        method: 'post',
        data
    })
}

// 添加人问题
export function $addPersonQuestion(data) {
    return service({
        url: `/question/personAdd`,
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


