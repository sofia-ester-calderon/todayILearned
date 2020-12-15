/* eslint-disable */

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      text
      date
      image
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      tags {
        items {
          id
          tag {
            id
            name
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        text
        date
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tags {
          items {
            id
            tag {
              name
              id
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const searchBlogs = /* GraphQL */ `
  query SearchBlogs(
    $filter: SearchableBlogFilterInput
    $sort: SearchableBlogSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchBlogs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        title
        text
        date
        image
        _version
        _deleted
        createdAt
        updatedAt
        tags {
          items {
            id
            tagID
            tag {
              name
              id
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        blogs {
          items {
            id
            blog {
              id
              title
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      blogs {
        items {
          id
          blog {
            id
            title
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const syncTags = /* GraphQL */ `
  query SyncTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        blogs {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getBlogTag = /* GraphQL */ `
  query GetBlogTag($id: ID!) {
    getBlogTag(id: $id) {
      id
      blogID
      tagID
      blog {
        id
        title
        text
        date
        image
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tags {
          nextToken
          startedAt
        }
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      tag {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        blogs {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listBlogTags = /* GraphQL */ `
  query ListBlogTags(
    $filter: ModelBlogTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        blogID
        tagID
        blog {
          id
          title
          text
          date
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tag {
          id
          name
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBlogTags = /* GraphQL */ `
  query SyncBlogTags(
    $filter: ModelBlogTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBlogTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        blogID
        tagID
        blog {
          id
          title
          text
          date
          image
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tag {
          id
          name
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
