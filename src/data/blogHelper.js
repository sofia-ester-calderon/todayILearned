import { API } from "aws-amplify";
import { listTags } from "../graphql/queries";
import { createTag as createTagGraphQL } from "../graphql/mutations";

const fetchTags = async () => {
  const apiData = await API.graphql({ query: listTags });
  return apiData.data.listTags.items;
};

const createTag = async (tagData) => {
  const newTag = await API.graphql({
    query: createTagGraphQL,
    variables: { input: tagData },
  });
  return newTag.data.createTag;
};

const blogHelper = { fetchTags, createTag };

export default blogHelper;
