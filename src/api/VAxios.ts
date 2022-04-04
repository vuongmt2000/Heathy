
import  axios  from "axios"


const VAxios = axios.create({
    baseURL:'https://hiring-test.stag.tekoapis.net/api/',
    timeout: 30000,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'sentry-trace',
        'Cache-control': 'no-cache',
        "Cache-Control_Backend": "no-cache"
    }
})


export default VAxios;