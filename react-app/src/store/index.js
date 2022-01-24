import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './session';
import session from './session';
import PostReducer from './posts';
import CommentReducer from './comments';
import subReducer from './subs';
import SingleReducer from './single';
import SearcReducer from './search';


const rootReducer = combineReducers({
  session:reducer,
  posts:PostReducer,
  comments:CommentReducer,
  subs:subReducer,
  single:SingleReducer,
  search:SearcReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
