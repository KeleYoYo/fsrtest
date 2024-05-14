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

