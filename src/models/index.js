// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Blog, BlogTag, Tag } = initSchema(schema);

export {
  Blog,
  BlogTag,
  Tag
};