import React, {useCallback, useEffect, useState} from 'react'
import {createClient} from '@sanity/client'
import debounce from 'lodash.debounce'

const client = createClient({
  projectId: 'nzudkmke',
  dataset: 'production',
  token:
    'sk4pvS2ZY8GiQuEiYsW4eIEQ9Vgcuh1xhMnL80ch5sA3ozTtHkpJfqJItI4pyWvT2ijrE2Mlszuee9hPTlTq0U3yy54jTcdPohzqms00vxfzIpzOFqdOOtuMSTAiUEFaVa2i3XVjUpLxIPjclRbCqxM0d85dqv7cigcTOiTEC2jsYfYLRt3w',
  useCdn: false,
})

function useForceUpdate() {
  const [value, setValue] = useState(0)

  return {
    trigger: () => {
      setTimeout(() => {
        setValue((value) => value + 1)
      }, 1500)
    },
    value,
  }
}

const JsonPreview = ({document: sanityDocument}) => {
  const {trigger, value} = useForceUpdate()
  const debouncedChangeHandler = useCallback(debounce(trigger, 1500), [])

  useEffect(() => {
    if (debouncedChangeHandler) {
      debouncedChangeHandler()
    }
  }, [sanityDocument?.displayed?._updatedAt, debouncedChangeHandler])

  return (
    <iframe
      title="page"
      id="preview_iframe"
      key={value}
      src={`https://11ty-sanity-mvp.vercel.app/api/preview?slug=${sanityDocument.displayed?.slug?.current}`}
      style={{height: '100%', width: '100%'}}
    />
  )
}
export const defaultDocumentNodeResolver = (S) =>
  S.document().views([S.view.form(), S.view.component(JsonPreview).title('Preview')])
