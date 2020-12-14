import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Blog {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly date: string;
  readonly image?: string;
  readonly tags?: BlogTag[];
  constructor(init: ModelInit<Blog>);
  static copyOf(source: Blog, mutator: (draft: MutableModel<Blog>) => MutableModel<Blog> | void): Blog;
}

export declare class BlogTag {
  readonly id: string;
  readonly blog: Blog;
  readonly tag: Tag;
  constructor(init: ModelInit<BlogTag>);
  static copyOf(source: BlogTag, mutator: (draft: MutableModel<BlogTag>) => MutableModel<BlogTag> | void): BlogTag;
}

export declare class Tag {
  readonly id: string;
  readonly name: string;
  readonly blogs?: (BlogTag | null)[];
  constructor(init: ModelInit<Tag>);
  static copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}