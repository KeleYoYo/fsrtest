import service from "@/utils/axios/request.ts"

//初次提交绘画
export function $firstCommit(data = {}) {
    console.log("$userLogin", data)
    return service({
        // url: `/api/u8login`,
        url: `/painting/firstcommit`,
        method: 'post',
        data
    })
}
