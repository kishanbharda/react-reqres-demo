import * as Types from '../constants/actionKeys';
import axios from 'axios';
import { apiUrl } from '../config/api';

export const loginUser = (email, password) => {
	console.log(email, password);
	return async (dispatch) => {
		const data = await axios.post(`${apiUrl}/login`, { email, password }).catch((error) => {
			throw error;
		});
		localStorage.setItem("USER_TOKEN", data.data.token);
		dispatch({
			type: Types.SET_TOKEN,
			token: data.data.token
		});
		return;
	}
}
