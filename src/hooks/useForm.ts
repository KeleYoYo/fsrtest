import {ref} from "vue";

/**
 * @description useFormHook
 * @param config 表单配置项
 * */
export default function useForm(config) {
    const formConfig = ref({})
    // 当前行数据
    const currentRowData = ref(null)

    /**
     * @description 表单提交成功时触发
     * @param callBack 传入的回调函数，将在这里面执行回调
     * */
    // async function onFormSubmit(callBack){
    //     console.log("ccc",callBack)
    //     console.log("123",formConfig.value.formState)
    //     let res = await callBack(toRaw(formConfig.value.formState))
    //     if(res.code === 200 ){
    //         // 成功响应，且操作成功
    //         if(res.success){
    //             message.success(res.message)
    //             return res
    //         }
    //         // 成功响应，但操作失败
    //         message.error(res.message)
    //         return res
    //     }else {
    //         // 响应失败
    //         message.error(res.message)
    //         return res
    //     }
    // }
    //
    // // 从服务端加载数据
    // function loadFormData(){
    //     init.loadDataAPI(currentRowData.value.id).then(res =>{
    //         console.log("loadDataAPI",res)
    //         if(res.code === 200){
    //             formConfig.value.formState = res.data
    //         }else{
    //             message.error("获取信息出错了")
    //         }
    //     }).catch(()=>{
    //         message.error("获取信息出错了")
    //     })
    // }
    // 初始化
    function initForm() {
        formConfig.value = config
    }

    config && initForm()
    return {
        formConfig,
        currentRowData,
    }
}