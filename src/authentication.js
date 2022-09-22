/** 
 * 鉴权
 * 
 * */

//引入路由
import router from "./router"
//引入vuex
import store from "./store"

// const token = store.getters.token
// console.log(token);
// 挂载路由守卫
router.beforeEach(async (to, from, next) => {
    const token = store.getters.token
    if (token) {
        // 已登录的逻辑
        if (to.path === "/login") {
            next(from.path)
        } else {
            let userInfo = store.getters.userInfo
            userInfo = typeof userInfo === "object" ? JSON.stringify(userInfo) : userInfo
            if (userInfo === "{}" || userInfo === "") {
                const response = await store.dispatch("user")
                if (response) {
                    next()
                } else {
                    next("/login")
                }
            } else {
                next()
            }
        }
    } else {
        if (to.path === "/login") {
            next()
        } else {
            next("/login")
        }
    }
})
