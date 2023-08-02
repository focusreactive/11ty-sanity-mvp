import hero from '../schemas/hero'

const blocks = [hero]
export const contentBlocks = blocks.map((block) => ({
  type: block.name,
}))

export default {
  name: 'pages',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'pageName',
      },
    },
    {
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: contentBlocks,
    },
  ],
}
