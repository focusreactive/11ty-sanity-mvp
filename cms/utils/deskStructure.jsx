import React from "react"

const JsonPreview = ({ document }) => {
    console.log(document)
    return <iframe title='page' src={`http://localhost:3000/dynamic?slug=${document.displayed?.slug?.current}`} style={{height: '100%', width: '100%'}} />
}
export const defaultDocumentNodeResolver = (S) =>
    S.document().views([
        S.view.form(),
        S.view.component(JsonPreview).title('Preview'),
    ])
