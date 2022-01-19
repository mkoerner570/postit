import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='sign-up'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name*</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required={true}
          className='inputs'
        ></input>
      </div>
      <div>
        <label htmlFor='email'>Email*</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
          className='inputs'
        ></input>
      </div>
      <div>
        <label>Password*</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
          className='inputs'
        ></input>
      </div>
      <div>
        <label>Repeat Password*</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className='inputs'
        ></input>
      </div>
      <div className='required'>* indicates a required field</div>
      <button type='submit' className='logon'>Sign Up</button>
      <NavLink to='/login' exact={true} activeClassName='active' className='logon'>
      Already have an account? Sign in!
      </NavLink>
    </form>
  );
};

export default SignUpForm;
