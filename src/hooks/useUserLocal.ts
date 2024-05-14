import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

/**
 * @description 获取用户信息
 * @returns {userInfo,isLogin}
 * @param needTip 是否在挂载时就提示
 * */
export default function useUserLocal(needTip = false) {
    const router = useRouter()
    var userInfo = '12'
    var isLogin = false
    const init = () => {
        // const user = JSON.parse(JSON.stringify(localStorage.getItem("userInfo")))
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if (user) {
            userInfo = user
            isLogin = true
            console.log("user", user)
        } else {
            if (needTip) {
                router.push({name: 'login'})
                message.error("请先登录")
            }
        }
    }
    init()
    return {userInfo, isLogin}

}