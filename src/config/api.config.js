//接口地址配置
const host = "http://iget.api.cpb168.com"
//const host = "http://192.168.31.182:12004"

const api = {
    host: "http://iget.api.cpb168.com",
    getClasses: host+"/api/IgetShare/GetIgetClasses",
    getClassLessons:  host+"/api/IgetShare/GetIgetClassLessons",
    getShareLessons: host+"/api/IgetShare/GetIgetShareLessons",
    getLoginQrCode: host+"/api/IgetShare/GetLoginQrCode",
    getIgetUserInfo: host+"/api/Identity/GetIgetUserInfo",
    checkLogin:host+"/api/IgetShare/checkLogin",
    checkShareWork:host+"/api/IgetShare/checkShareWork"
}

export default api;