// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ALL_USERS = 'session/ALL_USERS'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const getUsers = (users) => ({
  type:ALL_USERS,
  users
})

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: [] };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const GetTheUsers = () => async (dispatch) =>{
  const response = await fetch('/api/users/all')
  if (response.ok) {
    const allUsers = await response.json()
    // console.log("+++++++++",allUsers)
    dispatch(getUsers(allUsers));
  }
}


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}
// export const initialState = { users: [] };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ALL_USERS:
      newState = Object.assign({}, state);
      // console.log("------", action.users)
      // console.log("_______",newState)
      // action.users.forEach( user => newState.users[action.user.id] = action.user);
      return newState;
    default:
      return state;
  }
}
