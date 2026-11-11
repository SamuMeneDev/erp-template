/**
 * Interface para mapear respostas paginadas
 */
export interface PagedResponse<T> {
    content: T[]
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}