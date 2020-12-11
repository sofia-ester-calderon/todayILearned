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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateBlogTag = /* GraphQL */ `
  subscription OnCreateBlogTag {
    onCreateBlogTag {
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
export const onUpdateBlogTag = /* GraphQL */ `
  subscription OnUpdateBlogTag {
    onUpdateBlogTag {
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
export const onDeleteBlogTag = /* GraphQL */ `
  subscription OnDeleteBlogTag {
    onDeleteBlogTag {
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
