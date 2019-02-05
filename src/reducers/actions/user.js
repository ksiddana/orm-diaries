import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const signUp = (payload) => dispatch => {
  console.log(payload);
  let url = '/users';

  axios.post(url, payload)
  .then(response => {
    if (response.status == 200) {
      cookies.set('auth', response.headers['x-auth'], { path: '/'});
      dispatch({ type: 'SIGN_UP_NEW_USER', payload: response.data.email })
    }
  })
  .catch();
}

export const login = (payload) => dispatch => {
  console.log(payload);
  let url = '/users/login';

  axios.post(url, payload)
  .then(response => {
    if (response.status == 200) {
      cookies.set('auth', response.headers['x-auth'], { path: '/'});
      dispatch({ type: 'LOGIN_USER', payload: response.data.email })
      dispatch(fetchTodoList());
    }
  })
  .catch();
}

const fetchTodoList = () => dispatch => {
  const url = '/todos'
  const auth = cookies.get('auth');
  const headers = {
    'Content-Type': 'application/json',
    'x-auth': auth
  }
  return axios.get(url, { headers }).then(response => {
    dispatch({ type: "FETCH_TODO_LIST", payload:  response.data.todos })
  })
}
