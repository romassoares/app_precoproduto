import {create} from 'apisauce';
import { getRealm } from '../db/realm';

var api = create({
    baseURL: 'http://127.0.0.1:8000/api',
    
});

api.addAsyncRequestTransform(async request => {

    const realm = await getRealm;
    const user = realm.objects('User')

    if (user) request.headers['Authorization'] = `Bearer ${user.access_token}`;
  });
  
  api.addResponseTransform(response => {
    if (!response.ok) throw response;
  });

export default api;

