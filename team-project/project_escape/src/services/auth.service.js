import axios from 'axios';
const API_URL = '/api/';
class AuthService {
    login(user) {
    return axios
    .post(API_URL + 'account', {
        email: user.email,
        password: user.password
    })
    .then(response => {
        if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
    }
    logout() {
    localStorage.removeItem('user');
    }
    register(user) {
    return axios.post(API_URL + 'signup', {
    laboratory: user.laboratory,
    username: user.username,
    email: user.email,
    password: user.password
    });
}
}
export default new AuthService();