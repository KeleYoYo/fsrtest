import service from "@/utils/axios/request.ts"

/**
 * @description 获取字典数据
 * @param dictCode 字典编码
 * @return Promise
 * */
export function $getDict(dictCode: String) {
    console.log("$getDict", dictCode)
    return service({
        url: `/api/dict/list?dictcode=${dictCode}`,
        method: 'get',
    })
}