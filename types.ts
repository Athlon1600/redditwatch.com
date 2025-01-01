export interface WithBusy {
    busy?: boolean;
}

export interface User {
    email: string;
    name: string;
}

interface Subreddit {
    name: string;
    subscriber_count: number;
    subscriber_count_formatted: number;
}

export interface RedditPost {
    id: number;
    subreddit: Subreddit;
    title: string;
    title_highlighted: string;
    text_snippets: string[];
    permalink: string;
    short_link: string;
    url: string;
    score: number;
    num_comments: number;
    created_utc: number;
    updated_utc: number;
}

interface RedditAlertMatches {
    past_hour: number;
    past_day: number;
    total: number;
}

export interface RedditAlert {
    id: number;
    created_at: string; // ISO 8601 date string
    query: string;
    search_title: boolean;
    search_text: boolean;
    search_url: boolean;
    matches: RedditAlertMatches;
}
