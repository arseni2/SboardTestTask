export interface PaginationGeneric<T> {
	total: number
	page: number
	limit: number
	totalPages: number
	data: T[]
}

export interface IPoll {
	id: number
	question: string
	created_at: Date
	responses: IResponse[]
}

export interface IResponse {
	id: number
	text: string
	created_at: Date
	votes: IVote[]
	pollId: number
}

export interface IVote {
	id: number
	created_at: Date
	responseId: number
}