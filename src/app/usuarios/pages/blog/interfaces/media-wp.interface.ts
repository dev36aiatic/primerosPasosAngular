export interface Media {
    id: number;
    date?: Date;
    date_gmt?: Date;
    guid?: Caption;
    modified?: Date;
    modified_gmt?: Date;
    slug: string;
    status: string;
    type?: string;
    link?: string;
    title: Caption;
    author: number;
    comment_status: string;
    permalink_template?: string;
    generated_slug?: string;
    description?: Caption;
    caption?: Caption;
    alt_text?: string;
    media_type: string;
    mime_type?: string;
    post?: null;
    source_url?: string;
}

export interface Caption {
    raw: string;
    rendered: string;
}