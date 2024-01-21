export interface IComment {
    article_id?: string,
    name?: string,
    content?: string,
    parent_id?: string | null,
    updated_at?: Date,
    id?: string,
    replies?: IComment[]
}

export interface IReply {
    article_id?: string,
    name?: string,
    content?: string,
    parent_id?: string | null,
}