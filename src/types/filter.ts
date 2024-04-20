type FilterTarget = 'tweets' | 'users' | 'reports' | '';

interface Filter {
    id: string;
    user_id: string;
    name: string;
    target?: FilterTarget;
    primary_prompt?: string;
    report_guide?: string;
    filter_prompt?: string;
    filter_period?: number; // In days
    usernames?: string[]; // Specific usernames to search for
    only_search_specified_usernames?: boolean;
    return_cap?: number;
    keyword_groups?: string[][];
    messages?: { [key: string]: string }[];
}

export default Filter;
export type { Filter, FilterTarget };
