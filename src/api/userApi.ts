import service from "@/utils/axios/request.ts"

//用户登录
export function $userLogin(data = {}) {
    console.log("$userLogin", data)
    return service({
        // url: `/api/u8login`,
        url: `/login`,
        method: 'post',
        data
    })
}

export function $register(data = {}) {
    return service({
        url: `/register`,
        method: 'post',
        data
    })
}


export function $getUserList() {
    return service({
        url: `/user/list`,
        method: 'get',
    })
}

export function $getUserInfo(userId) {
    return service({
        url: `/user/info?userId=${userId}`,
        method: 'get',
    })
}

export function $editUser(user) {
    return service({
        url: `/user/edit`,
        method: 'post',
        data: user
    })
}