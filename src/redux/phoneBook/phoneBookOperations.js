import axios from 'axios';
import {
  addContactSuccess,
  addContactRequest,
  fetchContactsSuccess,
  fetchContactsRequest,
  fetchContactsError,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './phoneBookActions';

axios.defaults.baseURL = 'http://localhost:4040';

const getAllContacts = () => async (dispatch) => {
  dispatch(fetchContactsRequest());
  try {
    await axios
      .get('/contacts')
      .then(({ data }) => dispatch(fetchContactsSuccess(data)));
  } catch (e) {
    dispatch(fetchContactsError(e));
  }
};

const addContact = (name, tel) => async (dispatch) => {
  dispatch(addContactRequest());
  try {
    const contact = {
      name,
      tel,
    };

    await axios.post('/contacts', contact).then(({ data }) => {
      dispatch(addContactSuccess(data));
    });
  } catch (e) {
    dispatch(addContactError(e));
  }
};

const deleteContact = (id) => async (dispatch) => {
  dispatch(deleteContactRequest());
  await axios
    .delete(`/contacts/${id}`)
    .then(dispatch(deleteContactSuccess(id)))
    .catch((e) => dispatch(deleteContactError(e)));
};

export default { addContact, deleteContact, getAllContacts };
