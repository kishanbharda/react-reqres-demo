import axios from 'axios';
import { apiUrl } from '../config/api';

export const fetchUsers = (page = 1, delay = 3) => {
	return async () => {
		const { data } = await axios.get(`${apiUrl}/users?page=${page}&delay=${delay}`).catch((error) => {
			throw error;
		});
		return data;
	}
};

export const fetchUserDetail = (id, delay = 3) => {
	return async () => {
		if (id) {
			const data = await axios.get(`${apiUrl}/users/${id}?delay=${delay}`).catch((error) => {
				throw error;
			});
			return data;
		} else {
			throw new Error("Please provide user id");
		}
	}
}

export const fetchProducts = (page = 1, delay = 3) => {
	return async () => {
		const { data } = await axios.get(`${apiUrl}/products?page=${page}&delay=${delay}`).catch((error) => {
			throw error;
		});
		return data;
	}
};

export const fetchProductDetail = (id, delay = 3) => {
	return async () => {
		if (id) {
			const data = await axios.get(`${apiUrl}/products/${id}?delay=${delay}`).catch((error) => {
				throw error;
			});
			return data;
		} else {
			throw new Error("Please provide product id");
		}
	}
}