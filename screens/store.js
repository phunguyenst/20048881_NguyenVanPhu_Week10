import {createStore, combineReducers} from 'redux'

import noteReducer  from './reducer'

const rootReducer = combineReducers({
    note: noteReducer,
})

const store = createStore(rootReducer);

export default store;