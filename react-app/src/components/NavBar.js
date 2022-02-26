import * as sessionActions from '../store/session';
import React,{useState, useEffect} from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from './auth/LogoutButton';
import Search from './search';
import SubsBar from './subsbar';

 // test
const NavBar = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const allSubs = useSelector((state) => state.subs)
  const posts = useSelector((state) => state.posts)
  const subs = Object.values(allSubs)

  const demoLogin = async () => {
    setCredential('demo@aa.io');
    setPassword('password');
    return dispatch(
      sessionActions.login('demo@aa.io', 'password')
    );
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  let demo;
  if(!sessionUser){
    demo = <button className='demo' onClick={demoLogin}>Demo Login</button>
  }

  let signin;
  if(!sessionUser){
    signin=<NavLink to='/login' exact={true} activeClassName='active' className='link-signin'>
    Sign In
  </NavLink>
  }

  let create;
  if(!sessionUser){
    create = <NavLink to='/sign-up' exact={true} activeClassName='active' className='links'>
    Create Account
  </NavLink>
  }

  let logOut;
  if(sessionUser){
    logOut = <LogoutButton/>
  }

  let profileButton;
  if(sessionUser){
    profileButton =  <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active' className='links'>
    {sessionUser.username}
  </NavLink>
  }
  let uploadButton;
  if(sessionUser){
    uploadButton =  <NavLink to={'/postform'} activeClassName='active' className='links'>
    Create a new Post
  </NavLink>
  }

  return (
    <nav>
      <div className="nav">
      <div className="the-logo">
        <Link to="/" className="homie">
          <img src='https://imagesclone.s3.amazonaws.com/35b42199b9f1499e97cc654557958d7f.png' alt=''/>
           PostIt
        </Link>
      </div>

      <ul className='the-nav'>
        <li className="search">
          <Search posts={posts}/>
        </li>
        <li>
          {demo}
        </li>
        <li>
          {signin}
        </li>
        <li>
          {create}
          {uploadButton}
        </li>
        <li>
          {profileButton}
        </li>
        <li>
          {logOut}
        </li>
        {/* <li>
          <SubsBar/>
        </li> */}
      </ul>


      </div>
    </nav>

  );
}

export default NavBar;
