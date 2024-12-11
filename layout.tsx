import { html } from 'hono/html'
import type { PropsWithChildren } from 'hono/jsx'

import Header from '@/components/global_header'
import Footer from '@/components/global_footer'
import type { CompProps } from '@/types/app'

export type CompProps = {
  path?: string
  title?: string
  ogpUrl?: string
  ogpType?: string
  ogpImage?: string
  description: string
}
const siteInfo = {
  title: '雨喵 (@rnmeow)',
  titleSuffix: 'rnmeow',
  description: 'Site Description',
  themeColor: '#172155',
  baseUrl: 'https://rnmeow.com',
}

// prettier-ignore
const Layout = (props: PropsWithChildren<CompProps>) => html`<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    >

    <title>
      ${props.title ? `${props.title} - ${siteInfo.titleSuffix}` : siteInfo.title}
    </title>
    <meta name="description" content="${props.description}">
    <meta name="url" content="${siteInfo.baseUrl}${props.path}">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta name="theme-color" content="${siteInfo.themeColor}">
    <meta name="referer" content="strict-origin-when-cross-origin">
    <meta
      property="og:title"
      content="${props.title
        ? `${props.title} - ${siteInfo.titleSuffix}`
        : siteInfo.title}"
    >
    <meta property="og:description" content="${props.description}">
    <meta property="og:type" content="${props.ogpType}">
    <meta property="og:image" content="${props.ogpImage}">
    <meta property="og:url" content="${siteInfo.baseUrl}${props.path}">

    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml">

    <link rel="stylesheet" href="/static/styles.css">
  </head>
  <body>
    <div class="container">
      ${(<Header />)}
      ${props.children}
      ${(<Footer />)}
    </div>
  </body>
</html>`

export default Layout
