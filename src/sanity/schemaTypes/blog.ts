import { title } from "process";

export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Your Blog Title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug of your article",
      options:{
        source: 'title',
      }
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title Image",
    },
    {
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
