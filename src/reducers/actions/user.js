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

export const login = (payload, history) => dispatch => {
  console.log(payload);
  let url = '/users/login';

  axios.post(url, payload)
  .then(response => {
    if (response.status == 200) {
      cookies.set('auth', response.headers['x-auth'], { path: '/'});
      dispatch({ type: 'LOGIN_USER', payload: response.data.email })
      history.replace('/');
    }
  })
  .catch();
}

export const fetchTodoTaskList = () => dispatch => {
  const url = '/todos'
  const auth = cookies.get('auth');
  const headers = {
    'Content-Type': 'application/json',
    'x-auth': auth
  }
  return axios.get(url, { headers }).then(response => {
    dispatch({ type: 'FETCH_TODO_LIST', payload:  response.data.todos })
  })
}

export const createTask = (payload) => dispatch => {
  console.log(payload);
  const url = '/todos';
  const auth = cookies.get('auth');
  const headers = {
    'Content-Type': 'application/json',
    'x-auth': auth
  }

  return axios.post(url, payload, { headers })
    .then(response => {
      dispatch({ type: 'CREATE_NEW_TODO_ITEM' })
    })
    .then(response => {
      axios.get(url, { headers }).then(response => {
        dispatch({ type: 'FETCH_TODO_LIST', payload:  response.data.todos })
      })
    })
}

export const deleteTodoTask = (id) => dispatch => {
  // console.log(payload);
  const url = `/todos/${id}`;
  const auth = cookies.get('auth');
  const headers = {
    'Content-Type': 'application/json',
    'x-auth': auth
  }

  return axios.delete(url, { headers })
    .then(response => {
      dispatch({ type: 'DELETE_TODO_ITEM' })
    })
    .then(response => {
      axios.get('/todos', { headers }).then(response => {
        dispatch({ type: 'FETCH_TODO_LIST', payload:  response.data.todos })
      })
    })
}

export const updateEditedTask = (payload) => dispatch => {
  const { _id, text, completed } = payload.todo;
  const newPayload = { text, completed };
  const path = `/todos/${_id}`;
  const auth = cookies.get('auth');
  const headers = { 'x-auth': auth }

  // return axios.put(url, { headers })
  return axios.patch(path, newPayload, { headers }).then(response => {
    dispatch({ type: 'UPDATE_TODO_ITEM', payload: response.data.todo })
  })
}

export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT_USER' });
  dispatch({ type: 'DELETE_TODO_LIST' });
}
