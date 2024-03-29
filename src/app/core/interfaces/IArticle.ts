import { IAuthor } from "./IAuthor"
import { ICategory } from "./ICategory"

export interface IArticle {
    id?: number,
    title?: string,
    content?: string,
    author_id?: number,
    category_id?: number,
    author?: IAuthor,
    category?: ICategory,
    updated_at?: Date,
    image_path?: string,
    tags?: string[]
}