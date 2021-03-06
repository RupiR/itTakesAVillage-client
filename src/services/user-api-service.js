import config from '../config';
import TokenService from './token-service';

const UserApiService = {
  // Find all users, get users by edit, post and delete users
  getAllUsers() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserById(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postUser(newUser) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateUser(user) {
    return fetch(
      `${config.API_ENDPOINT}/users/${localStorage.getItem('user_id')}`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  deleteUser() {
    return fetch(`${config.API_ENDPOINT}/users/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        return res;
      })
      .catch((err) => {
        console.log('refresh token request error');
      });
  },
};

export default UserApiService;
