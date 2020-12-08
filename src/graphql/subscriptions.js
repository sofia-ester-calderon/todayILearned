/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateTagBlogJoin = /* GraphQL */ `
  subscription OnCreateTagBlogJoin {
    onCreateTagBlogJoin {
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
export const onUpdateTagBlogJoin = /* GraphQL */ `
  subscription OnUpdateTagBlogJoin {
    onUpdateTagBlogJoin {
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
export const onDeleteTagBlogJoin = /* GraphQL */ `
  subscription OnDeleteTagBlogJoin {
    onDeleteTagBlogJoin {
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
