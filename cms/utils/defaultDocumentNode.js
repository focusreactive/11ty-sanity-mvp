import Iframe from 'sanity-plugin-iframe-pane'

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc) {
  return 'http://localhost:8080/'
}

// Import this into the deskTool() plugin
export const defaultDocumentNode = (S, {schemaType}) => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: 'https://11ty-sanity-etkrk9nv8-focusreactive.vercel.app/',

        // Optional: Display the Url in the pane
        showDisplayUrl: true, // boolean. default `true`.

        // Optional: Set the default size
        defaultSize: `mobile`, // default `desktop`

        // Optional: Add a reload button, or reload on new document revisions
        reload: {
          button: true, // default `undefined`
          revision: true, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
        },

        // Optional: Display a spinner while the iframe is loading
        loader: true, // boolean | string. default `undefined`. If a string is provided, it will be display below the spinner (e.g. Loading…)

        // Optional: Pass attributes to the underlying `iframe` element:
        // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
        attributes: {
          allow: 'fullscreen', // string, optional
          referrerPolicy: 'strict-origin-when-cross-origin', // string, optional
          sandbox: 'allow-same-origin', // string, optional
        },
      })
      .title('Preview'),
  ])
  // default:
  //   return S.document().views([S.view.form()])
}
