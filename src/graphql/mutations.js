/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
      owner
      tags {
        items {
          id
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
      owner
      tags {
        items {
          id
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
      owner
      tags {
        items {
          id
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
          blogID
          tagID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createBlogTag = /* GraphQL */ `
  mutation CreateBlogTag(
    $input: CreateBlogTagInput!
    $condition: ModelBlogTagConditionInput
  ) {
    createBlogTag(input: $input, condition: $condition) {
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
        owner
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
      owner
    }
  }
`;
export const updateBlogTag = /* GraphQL */ `
  mutation UpdateBlogTag(
    $input: UpdateBlogTagInput!
    $condition: ModelBlogTagConditionInput
  ) {
    updateBlogTag(input: $input, condition: $condition) {
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
        owner
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
      owner
    }
  }
`;
export const deleteBlogTag = /* GraphQL */ `
  mutation DeleteBlogTag(
    $input: DeleteBlogTagInput!
    $condition: ModelBlogTagConditionInput
  ) {
    deleteBlogTag(input: $input, condition: $condition) {
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
        owner
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
      owner
    }
  }
`;
