import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from '../phoneBook/phoneBookActions';
import {
  addContactSuccess,
  deleteContactSuccess,
  fetchContactsSuccess,
} from './phoneBookActions';

const contact = createReducer([], {
  [fetchContactsSuccess]: (_, action) => action.payload,
  [addContactSuccess]: (state, action) => [action.payload, ...state],
  [deleteContactSuccess]: (state, action) =>
    state.filter((contact) => contact.id !== action.payload),
});

const filter = createReducer('', {
  [actions.findContact]: (_, action) => action.payload,
});

const phoneBookReducer = combineReducers({
  contact,
  filter,
});

export default phoneBookReducer;
