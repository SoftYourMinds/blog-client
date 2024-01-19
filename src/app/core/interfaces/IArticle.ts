export interface IArticle {
    id?: number,
    title?: string,
    content?: string,
    author_id?: number,
    category_id?: number,
    updated_at?: Date,
    image_path?: string,
    tags?: string[]
}