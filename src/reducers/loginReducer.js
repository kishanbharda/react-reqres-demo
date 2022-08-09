import * as Types from '../constants/actionKeys';

const initialState = {
	token: ''
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.SET_TOKEN: {
			return {
				token: action.token
			}
		}
		default: {
			return state;
		}
	}
}

export default loginReducer;