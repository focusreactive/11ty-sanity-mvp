import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {defaultDocumentNode} from './utils/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: '11ty-Nunjucks',

  projectId: 'nzudkmke',
  dataset: 'production',

  plugins: [deskTool(defaultDocumentNode), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
