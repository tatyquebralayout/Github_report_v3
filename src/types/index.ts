// Core data types for the application

export interface Events {
  PullRequestReviewEvent?: number;
  PushEvent?: number;
  IssueCommentEvent?: number;
  DeleteEvent?: number;
  PullRequestEvent?: number;
  PullRequestReviewCommentEvent?: number;
  CreateEvent?: number;
  IssuesEvent?: number;
  ForkEvent?: number;
  WatchEvent?: number;
  GollumEvent?: number;
  ReleaseEvent?: number;
  coding_events_total: number;
  social_events_total: number;
}

export interface Contributors {
  core_developers: number;
  active_volunteers: number;
  occasional_volunteers: number;
  one_time_contributors: number;
  core_dev_details: [string, number][];
  active_volunteer_details: [string, number][];
}

export interface Languages {
  [key: string]: number;
}

export interface RepoData {
  name: string;
  stars: number;
  events: Events;
  contributors: Contributors;
  languages?: Languages;
  activity?: number[];
  description?: string;
  topics?: string[];
  resources?: {
    hasReadme: boolean;
    hasCodeOfConduct: boolean;
    hasSecurityPolicy: boolean;
    hasCitation: boolean;
  };
  citation?: CitationData;
  license?: {
    name: string;
    url: string;
  };
}

export interface SearchFilters {
  query: string;
  language?: string;
  stars?: string;
  topic?: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface CitationData {
  authors?: Array<{
    name: string;
    affiliation?: string;
  }>;
  title?: string;
  version?: string;
  doi?: string;
  date_released?: string;
  repository_url?: string;
  preferred_citation?: {
    type: string;
    title: string;
    authors: string[];
    journal?: string;
    year?: number;
    doi?: string;
  };
}