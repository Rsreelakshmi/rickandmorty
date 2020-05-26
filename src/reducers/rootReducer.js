import { combineReducers } from 'redux'
import filters from './filterReducer'
import characters from './characterReducer'

export default combineReducers({
    filters,
    characters
})