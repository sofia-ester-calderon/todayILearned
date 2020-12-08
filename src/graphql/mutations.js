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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createTagBlogJoin = /* GraphQL */ `
  mutation CreateTagBlogJoin(
    $input: CreateTagBlogJoinInput!
    $condition: ModelTagBlogJoinConditionInput
  ) {
    createTagBlogJoin(input: $input, condition: $condition) {
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
export const updateTagBlogJoin = /* GraphQL */ `
  mutation UpdateTagBlogJoin(
    $input: UpdateTagBlogJoinInput!
    $condition: ModelTagBlogJoinConditionInput
  ) {
    updateTagBlogJoin(input: $input, condition: $condition) {
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
export const deleteTagBlogJoin = /* GraphQL */ `
  mutation DeleteTagBlogJoin(
    $input: DeleteTagBlogJoinInput!
    $condition: ModelTagBlogJoinConditionInput
  ) {
    deleteTagBlogJoin(input: $input, condition: $condition) {
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
