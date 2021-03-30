import { selector } from 'recoil';
import { loginState } from '../atoms/loginState';
//
export const username = selector({
    key: 'getUsername',
    get: ({get}) =>{
        return get(loginState)?.username;
    }
});
export const userInfo = selector({
    key: 'getUserInfo',
    get: ({get}) =>{
        return get(loginState);
    }
});