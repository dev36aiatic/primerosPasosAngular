/** Interfaz de una nueva entrada */
export interface NewPost {
    id:                 number;
    date:               Date;
    date_gmt:           Date;
    guid:               GUID;
    modified:           Date;
    modified_gmt:       Date;
    password:           string;
    slug:               string;
    status:             string;
    type:               string;
    link:               string;
    title:              GUID;
    content:            Content;
    excerpt:            Content;
    author:             number;
    featured_media:     number;
    comment_status:     string;
    ping_status:        string;
    sticky:             boolean;
    template:           string;
    format:             string;
    meta:               any[];
    categories:         number[];
    tags:               any[];
    permalink_template: string;
    generated_slug:     string;
    yoast_head:         string;
    yoast_head_json:    YoastHeadJSON;
    _links:             Links;
}

export interface Links {
    self:                          About[];
    collection:                    About[];
    about:                         About[];
    author:                        AuthorElement[];
    replies:                       AuthorElement[];
    "version-history":             VersionHistory[];
    "wp:featuredmedia":            AuthorElement[];
    "wp:attachment":               About[];
    "wp:term":                     WpTerm[];
    "wp:action-publish":           About[];
    "wp:action-unfiltered-html":   About[];
    "wp:action-sticky":            About[];
    "wp:action-assign-author":     About[];
    "wp:action-create-categories": About[];
    "wp:action-assign-categories": About[];
    "wp:action-create-tags":       About[];
    "wp:action-assign-tags":       About[];
    curies:                        Cury[];
}

export interface About {
    href: string;
}

export interface AuthorElement {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface VersionHistory {
    count: number;
    href:  string;
}

export interface WpTerm {
    taxonomy:   string;
    embeddable: boolean;
    href:       string;
}

export interface Content {
    raw:            string;
    rendered:       string;
    protected:      boolean;
    block_version?: number;
}

export interface GUID {
    rendered: string;
    raw:      string;
}

export interface YoastHeadJSON {
    title:                  string;
    robots:                 Robots;
    canonical:              string;
    og_locale:              string;
    og_type:                string;
    og_title:               string;
    og_description:         string;
    og_url:                 string;
    og_site_name:           string;
    article_published_time: Date;
    twitter_card:           string;
    twitter_misc:           TwitterMisc;
    schema:                 Schema;
}

export interface Robots {
    index:               string;
    follow:              string;
    "max-snippet":       string;
    "max-image-preview": string;
    "max-video-preview": string;
}

export interface Schema {
    "@context": string;
    "@graph":   Graph[];
}

export interface Graph {
    "@type":             string;
    "@id":               string;
    name?:               string;
    url?:                string;
    sameAs?:             any[];
    logo?:               Image;
    image?:              Image;
    description?:        string;
    publisher?:          BreadcrumbClass;
    potentialAction?:    PotentialAction[];
    inLanguage?:         string;
    contentUrl?:         string;
    width?:              number;
    height?:             number;
    isPartOf?:           BreadcrumbClass;
    primaryImageOfPage?: BreadcrumbClass;
    datePublished?:      Date;
    dateModified?:       Date;
    breadcrumb?:         BreadcrumbClass;
    itemListElement?:    ItemListElement[];
    author?:             BreadcrumbClass;
    headline?:           string;
    mainEntityOfPage?:   BreadcrumbClass;
    wordCount?:          number;
    commentCount?:       number;
    thumbnailUrl?:       string;
}

export interface BreadcrumbClass {
    "@id": string;
}

export interface Image {
    "@id":       string;
    "@type"?:    string;
    inLanguage?: string;
    url?:        string;
    contentUrl?: string;
    caption?:    string;
    width?:      number;
    height?:     number;
}

export interface ItemListElement {
    "@type":  string;
    position: number;
    name:     string;
    item?:    string;
}

export interface PotentialAction {
    "@type":        string;
    target:         string[] | TargetClass;
    "query-input"?: string;
    name?:          string;
}

export interface TargetClass {
    "@type":     string;
    urlTemplate: string;
}

export interface TwitterMisc {
    "Written by": string;
}
