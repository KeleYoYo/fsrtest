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
        url: `/painting/list?authorId=${authorId}`,
        method: 'get',
    })
}

// 获取绘画列表
export function $getPaintingList(status) {
    return service({
        url: `/painting/alldetail?paintingStatus=${status}`,
        method: 'get',
    })
}


// 对学生提问
export function $questionStudent(status, questionStr, paintingId) {
    let teacherId = JSON.parse(localStorage.getItem("userInfo")).userId
    return service({
        url: `/painting/question?paintingStatus=${status}&questionStr=${questionStr}&teacherId=${teacherId}&paintingId=${paintingId}`,
        method: 'post',
    })
}


// 回复老师问题
export function $replyTeacher(replyContent, paintingId) {
    return service({
        url: `/painting/reply?replyContent=${replyContent}&paintingId=${paintingId}`,
        method: 'post',
    })
}


// 给出测评报告
export function $giveReport(reportContent, paintingId) {
    return service({
        url: `/painting/report?reportContent=${reportContent}&paintingId=${paintingId}`,
        method: 'post',
    })
}


// 删除绘画记录
export function $deletePainting(paintingId) {
    return service({
        url: `/painting/delete?paintingId=${paintingId}`,
        method: 'post',
    })
}