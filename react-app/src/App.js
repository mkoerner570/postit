import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Main from './components/main';
import Post from './components/post';
import Postform from './components/postform'
import Sub from "./components/subpage"
import { authenticate } from './store/session';
import Footer from './components/footer';
import './App.css'
import NoPage from './components/noresults';
import EditForm from './components/editform';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Main loaded={loaded}/>
        </Route>
        <Route path='/post/:id' exact={true}>
          <Post />
        </Route>
        <Route path='/postform' exact={true}>
          <Postform />
        </Route>
        <Route path='/noresults'>
          <NoPage />
        </Route>
        <Route path='/sub/:id/:name'>
          <Sub />
        </Route>
        <Route path='/post/:id/comment/:id/edit'>
          <EditForm />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
