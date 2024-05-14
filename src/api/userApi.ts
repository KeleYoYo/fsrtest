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
    console.log("$register", data)
    return service({
        url: `/api/register`,
        method: 'post',
        data
    })
}

export function $getToken(data = {}) {
    console.log("$getToken", data)
    return service({
        // url: `/api/token`,
        url: `/token/`,
        method: 'post',
        data
    })
}


