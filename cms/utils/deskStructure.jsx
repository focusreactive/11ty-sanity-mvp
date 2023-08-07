import React, {useEffect} from 'react'

function throttle(func, delay) {
  let timeoutId
  let lastExecTime = 0

  return function (...args) {
    const currentTime = Date.now()
    const timeSinceLastExec = currentTime - lastExecTime

    if (!timeoutId && timeSinceLastExec >= delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - timeSinceLastExec)
    }
  }
}

const JsonPreview = ({document}) => {
  useEffect(() => {
    const rawQuery = `*[_type == "pages" && slug.current == "{{ eleventy.serverless.query.slug }}" && _id in path("drafts.**")][0]`
    const rawQuery2 = `*[_type == "pages" && !(_id in path("drafts.**"))][0]`
    const searchParams = new URLSearchParams({query: rawQuery}).toString()
    const searchParams2 = new URLSearchParams({query: rawQuery2}).toString()

    const myFunction = () => {
      setTimeout(function () {
        document.getElementById('preview_iframe').contentWindow.location.reload(true)
      }, 2000)
    }

    const listener = throttle(myFunction, 1500)
    var source = new EventSource(
      `https://nzudkmke.api.sanity.io/v2021-06-07/data/listen/production?${searchParams}`,
      {withCredentials: true},
    )
    source.addEventListener('mutation', listener)

    const myFunction2 = () => {
      setTimeout(function () {
        document.getElementById('preview_iframe').contentWindow.location.reload(true)
      }, 2000)
    }

    const listener2 = throttle(myFunction2, 1500)
    var source2 = new EventSource(
      `https://nzudkmke.api.sanity.io/v2021-06-07/data/listen/production?${searchParams2}`,
      {withCredentials: true},
    )
    source2.addEventListener('mutation', listener2)
  }, [])

  return (
    <iframe
      title="page"
      id="preview_iframe"
      src={`https://11ty-sanity-mvp.vercel.app/api/preview?slug=${document.displayed?.slug?.current}`}
      style={{height: '100%', width: '100%'}}
    />
  )
}
export const defaultDocumentNodeResolver = (S) =>
  S.document().views([S.view.form(), S.view.component(JsonPreview).title('Preview')])
