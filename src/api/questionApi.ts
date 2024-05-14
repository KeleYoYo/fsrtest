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


