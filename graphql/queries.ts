import { gql } from '@apollo/client';

// ✅ TODOS QUERY
export const GET_TODOS = gql`
  query GetTodos($page: Int!, $limit: Int!) {
    todos(
      options: {
        paginate: { page: $page, limit: $limit }
      }
    ) {
      data {
        id
        title
        completed
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

// ✅ PHOTOS QUERY (ADD THIS)
export const GET_PHOTOS = gql`
  query GetPhotos($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        id
        title
        url
        thumbnailUrl
        album {
          id
          title
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
export const GET_ALBUMS = gql`
  query GetAlbums($options: PageQueryOptions) {
    albums(options: $options) {
      data {
        id
        title
        user {
          id
          name
        }
        photos(options: { paginate: { limit: 2 } }) {
          data {
            id
            thumbnailUrl
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
export const GET_POSTS = gql`
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
          email
        }
        comments {
          data {
            id
            name
            email
          }
          meta {
            totalCount
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        username
        email
        phone
        website
        posts {
          meta {
            totalCount
          }
        }
        albums {
          meta {
            totalCount
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;