import { gql } from '@apollo/client';

export const GET_REPOS = gql`query Repositories($token: String!) {
  repositories(token: $token) {
    isPrivate
    name
    size
    owner
  }
}`;

export const GET_REPO_DETAILS = gql`query RepositoryDetails($token: String!, $owner: String!, $repoName: String!) {
  repositoryDetails(token: $token, owner: $owner, repoName: $repoName) {
    activeWebhooks {
      active
      events
      name
    }
    name
    isPrivate
    numFiles
    owner
    size
    ymlContent {
      path
      size
      url
    }
  }
}`;