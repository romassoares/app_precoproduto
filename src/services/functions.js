import api from "./api";

export const api_login = async (data) => {
    try {
        const response = await api.post('login',data)
        console.log(response,'okkkkkkkk')
    } catch (error) {
         console.log(error)
    }
}