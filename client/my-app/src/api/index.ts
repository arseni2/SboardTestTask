import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import { IPoll, PaginationGeneric } from '@/types.ts';

export const instance = axios.default.create({
	baseURL: 'http://localhost:3000/api/',
	timeout: 10000,
});

export const getPolls = (page: number, limit: number) => {
	return instance.get(`polls?page=${page}&limit=${limit}`)
		.then((data: AxiosResponse<PaginationGeneric<IPoll>>) => {
			return data.data
		})
}

export interface IResponseCreate {
	text: string
}
export interface ICreatePoll {
	question: string
	responses: IResponseCreate[]
}
export const createPoll = (payload: ICreatePoll) => {
	return instance.post(`polls`, payload)
		.then((data: AxiosResponse<IPoll>) => {
			return data.data
		})
}

export const deletePoll = (id: number) => {
	return instance.delete(`polls/${id}`)
		.then((data: AxiosResponse<any>) => {
			return data.status
		})
}