export interface IComment {
    article_id: number,
    name: string,
    content: string,
    parent_id: number,
    updated_at: Date,
    id: number
}