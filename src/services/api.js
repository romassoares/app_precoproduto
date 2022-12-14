import { create } from "apisauce";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = create({
    BaseUrl: 'http://127.0.0.1:8000/api/'
});

api.addAsyncRequestTransform(async (request) => {
    const token = JSON.parse(await AsyncStorage.getItem('@precoproduto:token'));

    if (token)
        request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
    if (!response.ok)
        throw response;
})

export default api;