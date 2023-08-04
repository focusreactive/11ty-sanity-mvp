import React from "react"

const JsonPreview = ({ document }) => {
    console.log(document)
    return <iframe title='page' src={`https://11ty-sanity-mvp.vercel.app/${document.displayed?.slug?.current}`} style={{height: '100%', width: '100%'}} />
}
export const defaultDocumentNodeResolver = (S) =>
    S.document().views([
        S.view.form(),
        S.view.component(JsonPreview).title('JSON'),
    ])
