/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      text
      date
      image
      tag {
        items {
          id
          blogID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
        tag {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      blog {
        items {
          id
          blogID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        blog {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTagBlogJoin = /* GraphQL */ `
  query GetTagBlogJoin($id: ID!) {
    getTagBlogJoin(id: $id) {
      id
      blogID
      tagID
      blog {
        id
        title
        text
        date
        image
        tag {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        name
        blog {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTagBlogJoins = /* GraphQL */ `
  query ListTagBlogJoins(
    $filter: ModelTagBlogJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagBlogJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          createdAt
          updatedAt
          owner
        }
        tag {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
