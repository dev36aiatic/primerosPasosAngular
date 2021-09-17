export interface Post {
    id:                      number;
    date:                    Date;
    date_gmt:                Date;
    guid:                    GUID;
    modified:                Date;
    modified_gmt:            Date;
    slug:                    string;
    status:                  string;
    type:                    string;
    link:                    string;
    title:                   GUID;
    content:                 Content;
    excerpt:                 Content;
    author:                  number;
    featured_media:          number;
    comment_status:          string;
    ping_status:             string;
    sticky:                  boolean;
    template:                string;
    format:                  string;
    meta:                    Meta;
    categories:              number[];
    tags:                    number[];
    "jetpack-related-posts": JetpackRelatedPost[];
    _links:                  Links;
}

export interface Links {
    self:               About[];
    collection:         About[];
    about:              About[];
    author:             Author[];
    replies:            Author[];
    "version-history":  About[];
    "wp:featuredmedia": Author[];
    "wp:attachment":    About[];
    "wp:term":          WpTerm[];
    curies:             Cury[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface WpTerm {
    taxonomy:   string;
    embeddable: boolean;
    href:       string;
}

export interface Content {
    rendered:  string;
    protected: boolean;
}

export interface GUID {
    rendered: string;
}

export interface JetpackRelatedPost {
    id:       number;
    url:      string;
    url_meta: URLMeta;
    title:    string;
    date:     string;
    format:   boolean;
    excerpt:  string;
    rel:      string;
    context:  string;
    img:      Img;
    classes:  any[];
}

export interface Img {
    src:    string;
    width:  number;
    height: number;
}

export interface URLMeta {
    origin:   number;
    position: number;
}

export interface Meta {
    amp_status: string;
}
