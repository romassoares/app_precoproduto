import api from "./api";

export const loginMethod = async (data) =>{
    try {
        const result = await api.post('/login',data)
        return result
    } catch (error) {
        return error
    }
}