import axios from "axios";
import router from "@/router"


const BASE_URL = 'http://5.23.54.183:105/'

axios.defaults.baseURL = BASE_URL

const api = {
  BASE_URL: BASE_URL,

  login: (formData) => axios.post('/login/', formData ),

  loadAllPurchases: (token) => axios.get(`/main_page/?field=date&order=desc&status=all&token=${token}`),
  loadPurchaseInfo: (name, token) => axios.get(`/order_page?order_name=${name}&token=${token}`),

  getStatus: (name, token) => axios.get(`/get_order_status/?order_name=${name}&token=${token}`),
  changeStatus: (name, act, token) => axios.get(`/change_status?order_name=${name}&action=${act}&token=${token}`),

  uploadFile: (formData) => axios.post('/upload', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    })
}

axios.interceptors.request.use(
  config => {
    config.timeout = 10000;
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return config
  }
)


axios.interceptors.response.use(
  response => {
      return response.data
  },
  error => {
    if (error) {
        console.log(error)
        if (error.response.status === 303) {
            router.push({'name': 'login'})
            return
        }
        return
    }

    return Promise.reject(error)
  }
)

export default api