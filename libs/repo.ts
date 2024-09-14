export type RepoResponse = {
  id: number;
  full_name: string;
  human_name: string;
  url: string;
  namespace: {
    id: number;
    type: string;
    name: string;
    path: string;
    html_url: string;
  };
  path: string;
  name: string;
  owner: UserInfo;
  assigner: UserInfo;
  description: string;
  private: boolean;
  public: boolean;
  internal: boolean;
  fork: boolean;
  html_url: string;
  ssh_url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  hooks_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  stargazers_url: string;
  contributors_url: string;
  commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  recommend: boolean;
  gvp: boolean;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  default_branch: string;
  open_issues_count: number;
  has_issues: boolean;
  has_wiki: boolean;
  issue_comment: boolean;
  can_comment: boolean;
  pull_requests_enabled: boolean;
  has_page: boolean;
  license: string | null;
  outsourced: boolean;
  project_creator: string;
  members: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  parent: any | null;
  paas: any | null;
  stared: boolean;
  watched: boolean;
  permission: {
    pull: boolean;
    push: boolean;
    admin: boolean;
  };
  relation: string;
  assignees_number: number;
  testers_number: number;
  assignee: UserInfo[];
  testers: UserInfo[];
  status: string;
  programs: any[];
  enterprise: any | null;
  project_labels: any[];
  issue_template_source: string;
};

export type UserInfo = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  html_url: string;
  remark: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
};
