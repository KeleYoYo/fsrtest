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

// 获取我的绘画列表
export function $getMyPaintingList(authorId) {
    console.log("$getMyPaintingList", authorId)
    return service({
        // url: `/api/u8login`,
        url: `/painting/list?authorId=${authorId}`,
        method: 'get',
    })
}
