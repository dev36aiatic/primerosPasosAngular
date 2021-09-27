/**
 * Interfaz del usuario de WordPress
 */
export interface WordpressUser {
    id:                 number;
    username:           string;
    name:               string;
    first_name:         string;
    last_name:          string;
    email:              string;
    url:                string;
    description:        string;
    link:               string;
    locale:             string;
    nickname:           string;
    slug:               string;
    roles:              string[];
    registered_date:    Date;
    capabilities:       { [key: string]: boolean };
    extra_capabilities: ExtraCapabilities;
    avatar_urls:        { [key: string]: string };
    meta:               any[];
    yoast_head:         string;
    yoast_head_json:    YoastHeadJSON;
    is_super_admin:     boolean;
    woocommerce_meta:   WoocommerceMeta;
    _links:             Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface ExtraCapabilities {
    administrator: boolean;
}

export interface WoocommerceMeta {
    activity_panel_inbox_last_read:   string;
    activity_panel_reviews_last_read: string;
    categories_report_columns:        string;
    coupons_report_columns:           string;
    customers_report_columns:         string;
    orders_report_columns:            string;
    products_report_columns:          string;
    revenue_report_columns:           string;
    taxes_report_columns:             string;
    variations_report_columns:        string;
    dashboard_sections:               string;
    dashboard_chart_type:             string;
    dashboard_chart_interval:         string;
    dashboard_leaderboard_rows:       string;
    homepage_layout:                  string;
    homepage_stats:                   string;
    task_list_tracked_started_tasks:  string;
    help_panel_highlight_shown:       string;
    android_app_banner_dismissed:     string;
}

export interface YoastHeadJSON {
    title:        string;
    robots:       Robots;
    canonical:    string;
    og_locale:    string;
    og_type:      string;
    og_title:     string;
    og_url:       string;
    og_site_name: string;
    og_image:     OgImage[];
    twitter_card: string;
    schema:       Schema;
}

export interface OgImage {
    url: string;
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
    "@type":           string;
    "@id":             string;
    url?:              string;
    name?:             string;
    description?:      string;
    potentialAction?:  PotentialAction[];
    inLanguage?:       string;
    isPartOf?:         Breadcrumb;
    breadcrumb?:       Breadcrumb;
    itemListElement?:  ItemListElement[];
    image?:            Image;
    mainEntityOfPage?: Breadcrumb;
}

export interface Breadcrumb {
    "@id": string;
}

export interface Image {
    "@type":    string;
    "@id":      string;
    inLanguage: string;
    url:        string;
    contentUrl: string;
    caption:    string;
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
}

export interface TargetClass {
    "@type":     string;
    urlTemplate: string;
}
