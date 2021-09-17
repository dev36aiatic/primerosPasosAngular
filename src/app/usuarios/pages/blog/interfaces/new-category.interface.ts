export interface NewCategory {
    id:              number;
    count:           number;
    description?:     string;
    link:            string;
    name:            string;
    slug:            string;
    taxonomy:        string;
    parent:          number;
    meta:            any[];
    yoast_head:      string;
    yoast_head_json: YoastHeadJSON;
    _links:          Links;
}

export interface Links {
    self:           About[];
    collection:     About[];
    about:          About[];
    "wp:post_type": About[];
    curies:         Cury[];
}

export interface About {
    href: string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface YoastHeadJSON {
    title:          string;
    robots:         Robots;
    canonical:      string;
    og_locale:      string;
    og_type:        string;
    og_title:       string;
    og_description: string;
    og_url:         string;
    og_site_name:   string;
    twitter_card:   string;
    schema:         Schema;
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
    "@type":          string;
    "@id":            string;
    name?:            string;
    url?:             string;
    sameAs?:          any[];
    logo?:            Logo;
    image?:           Breadcrumb;
    description?:     string;
    publisher?:       Breadcrumb;
    potentialAction?: PotentialAction[];
    inLanguage?:      string;
    isPartOf?:        Breadcrumb;
    breadcrumb?:      Breadcrumb;
    itemListElement?: ItemListElement[];
}

export interface Breadcrumb {
    "@id": string;
}

export interface ItemListElement {
    "@type":  string;
    position: number;
    name:     string;
    item?:    string;
}

export interface Logo {
    "@type":    string;
    "@id":      string;
    inLanguage: string;
    url:        string;
    contentUrl: string;
    width:      number;
    height:     number;
    caption:    string;
}

export interface PotentialAction {
    "@type":        string;
    target:         string[] | TargetClass;
    "query-input"?: string;
}

export interface TargetClass {
    "@type":     string;
    urlTemplate: string;
}
