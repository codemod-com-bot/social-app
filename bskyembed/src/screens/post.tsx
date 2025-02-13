import { useTranslation } from "react-i18next";
import '../index.css'

import {AppBskyFeedDefs, AtpAgent} from '@atproto/api'
import {h, render} from 'preact'

import logo from '../../assets/logo.svg'
import {initColorMode} from '../color-mode'
import {Container} from '../components/container'
import {Link} from '../components/link'
import {Post} from '../components/post'
import {getRkey} from '../utils'

const root = document.getElementById('app')
if (!root) throw new Error('No root element')

const agent = new AtpAgent({
  service: 'https://public.api.bsky.app',
})

const uri = `at://${window.location.pathname.slice('/embed/'.length)}`
if (!uri) {
  throw new Error('No uri in path')
}

initColorMode()

agent
  .getPostThread({
    uri,
    depth: 0,
    parentHeight: 0,
  })
  .then(({data}) => {
    if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
      throw new Error('Expected a ThreadViewPost')
    }
    const pwiOptOut = !!data.thread.post.author.labels?.find(
      label => label.val === '!no-unauthenticated',
    )
    if (pwiOptOut) {
      render(<PwiOptOut thread={data.thread} />, root)
    } else {
      render(<Post thread={data.thread} />, root)
    }
  })
  .catch(err => {
    console.error(err)
    render(<ErrorMessage />, root)
  })

function PwiOptOut({thread}: {thread: AppBskyFeedDefs.ThreadViewPost}) {
const { t } = useTranslation("../bskyembed/src/screens");

  const href = `/profile/${thread.post.author.did}/post/${getRkey(thread.post)}`
  return (
    <Container href={href}>
      <Link
        href={href}
        className="transition-transform hover:scale-110 absolute top-4 right-4">
        <img src={logo} className="h-6" />
      </Link>
      <div className="w-full py-12 gap-4 flex flex-col items-center">
        <p className="max-w-80 text-center w-full text-textLight dark:text-textDimmed">{t('author-request-no-display')}</p>
        <Link
          href={href}
          className="max-w-80 rounded-lg bg-brand text-white text-center py-1 px-4 w-full mx-auto">{t('view-on-bluesky')}</Link>
      </div>
    </Container>
  )
}

function ErrorMessage() {
const { t } = useTranslation("../bskyembed/src/screens");

  return (
    <Container href="https://bsky.app/">
      <Link
        href="https://bsky.app/"
        className="transition-transform hover:scale-110 absolute top-4 right-4">
        <img src={logo} className="h-6" />
      </Link>
      <p className="my-16 text-center w-full text-textLight dark:text-textDimmed">{t('post-not-found')}</p>
    </Container>
  )
}
