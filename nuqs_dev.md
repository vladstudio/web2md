---
url: https://nuqs.dev/docs
title: Installation | nuqs
crawled: 2025-11-09T12:20:07.577Z
---

# Installation | nuqs

Installation | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Installation


# Installation

Getting started

Install the `nuqs` package with your favourite package manager:

npm

pnpm

yarn

bun

```
npm install nuqs
```


## [Which version should I use?](#which-version-should-i-use)

`nuqs@^2` supports the following frameworks and their respective versions:

-   [Next.js](/docs/adapters#nextjs): `next@>=14.2.0` (app & pages routers)
-   [React SPA](/docs/adapters#react-spa): `react@^18.3 || ^19`
-   [Remix](/docs/adapters#remix): `@remix-run/react@^2`
-   [React Router v6](/docs/adapters#react-router-v6): `react-router-dom@^6`
-   [React Router v7](/docs/adapters#react-router-v7): `react-router@^7`
-   ![TanStack Router](/tanstack-logo.png) [TanStack Router](/docs/adapters#tanstack-router): `@tanstack/react-router@^1`

For older versions of Next.js, you may use `nuqs@^1` (documentation in `node_modules/nuqs/README.md`).

[

Adapters

Using nuqs in your React framework of choice

](/docs/adapters)


### On this page

[Which version should I use?](#which-version-should-i-use)

---

---
url: https://nuqs.dev/docs/installation
title: Installation | nuqs
crawled: 2025-11-09T12:20:10.644Z
---

# Installation | nuqs

Installation | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Installation


# Installation

Getting started

Install the `nuqs` package with your favourite package manager:

npm

pnpm

yarn

bun

```
npm install nuqs
```


## [Which version should I use?](#which-version-should-i-use)

`nuqs@^2` supports the following frameworks and their respective versions:

-   [Next.js](/docs/adapters#nextjs): `next@>=14.2.0` (app & pages routers)
-   [React SPA](/docs/adapters#react-spa): `react@^18.3 || ^19`
-   [Remix](/docs/adapters#remix): `@remix-run/react@^2`
-   [React Router v6](/docs/adapters#react-router-v6): `react-router-dom@^6`
-   [React Router v7](/docs/adapters#react-router-v7): `react-router@^7`
-   ![TanStack Router](/tanstack-logo.png) [TanStack Router](/docs/adapters#tanstack-router): `@tanstack/react-router@^1`

For older versions of Next.js, you may use `nuqs@^1` (documentation in `node_modules/nuqs/README.md`).

[

Adapters

Using nuqs in your React framework of choice

](/docs/adapters)


### On this page

[Which version should I use?](#which-version-should-i-use)

---

---
url: https://nuqs.dev/docs/adapters
title: Adapters | nuqs
crawled: 2025-11-09T12:20:10.718Z
---

# Adapters | nuqs

Adapters | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Adapters


# Adapters

Using nuqs in your React framework of choice

Since version 2, you can now use nuqs in the following React frameworks, by wrapping it with a `NuqsAdapter` context provider:

-   [Next.js (app router)](#nextjs-app-router)
-   [Next.js (pages router)](#nextjs-pages-router)
-   [React SPA (eg: with Vite)](#react-spa)
-   [Remix](#remix)
-   [React Router v6](#react-router-v6)
-   [React Router v7](#react-router-v7)
-   ![TanStack Router](/tanstack-logo.png) [TanStack Router](#tanstack-router)


## [Next.js](#nextjs)


### [App router](#nextjs-app-router)

Wrap your `{children}` with the `NuqsAdapter` component in your root layout file:

src/app/layout.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'
export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```


### [Pages router](#nextjs-pages-router)

Wrap the `<Component>` page outlet with the `NuqsAdapter` component in your `_app.tsx` file:

src/pages/\_app.tsx

```
import type { AppProps } from 'next/app'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
```


### [Unified (router-agnostic)](#nextjs-unified)

If your Next.js app uses **both the app and pages routers** and the adapter needs to be mounted in either, you can import the unified adapter, at the cost of a slightly larger bundle size (~100B).

```
import { NuqsAdapter } from 'nuqs/adapters/next'
```

  

The main reason for adapters is to open up nuqs to other React frameworks:


## [React SPA](#react-spa)

Example, with Vite:

src/main.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/react'
createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <App />
  </NuqsAdapter>
)
```

Note

Because there is no known server in this configuration, the [`shallow: false`](/docs/options#shallow) option will have no effect.

See below for some options:


### [Full page navigation on  
`shallow: false`](#full-page-navigation-on-shallow-false)

Introduced in version **2.4.0**.

![TanStack Router](/tanstack-logo.png)

You can specify a flag to perform a full-page navigation when updating query state configured with `shallow: false`, to notify the web server that the URL state has changed, if it needs it for server-side rendering other parts of the application than the static React bundle:

src/main.tsx

```
createRoot(document.getElementById('root')!).render(
  <NuqsAdapter fullPageNavigationOnShallowFalseUpdates>
    <App />
  </NuqsAdapter>
)
```

This may be useful for servers not written in JavaScript, like Django (Python), Rails (Ruby), Laravel (PHP), Phoenix (Elixir) etc…


## [Remix](#remix)

app/root.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/remix'
// ...
export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```


## [React Router v6](#react-router-v6)

src/main.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])
export function ReactRouter() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}
```

Only `BrowserRouter` is supported. There may be support for `HashRouter` in the future (see issue [#810](https://github.com/47ng/nuqs/issues/810)), but support for `MemoryRouter` is not planned.


## [React Router v7](#react-router-v7)

app/root.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Outlet } from 'react-router'
// ...
export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

Deprecation notice

The generic import `nuqs/adapters/react-router` (pointing to v6) is deprecated and will be removed in nuqs@3.0.0.

Please pin your imports to the specific version, eg: `nuqs/adapters/react-router/v6` or `nuqs/adapters/react-router/v7`.

The main difference is where the React Router hooks are imported from: `react-router-dom` for v6, and `react-router` for v7.


##  [![TanStack Router](/tanstack-logo.png) TanStack Router](#tanstack-router)

src/routes/\_\_root.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Outlet, createRootRoute } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: () => (
    <>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </>
  ),
})
```

TanStack Router support is experimental and does not yet cover TanStack Start.


### [Type-safe routing via `validateSearch`](#type-safe-routing-via-validatesearch)

TanStack Router comes with built-in type-safe search params support, and its APIs should likely be used in your application code for best DX.

Nevertheless, sometimes you may need to import a component that uses nuqs (from NPM or a shared library), and benefit from TanStack Router’s type-safe routing.

You may do so via the [Standard Schema](/docs/utilities#standard-schema) support:

```
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  createStandardSchemaV1,
  parseAsIndex,
  parseAsString,
  useQueryStates
} from 'nuqs'
const searchParams = {
  searchQuery: parseAsString.withDefault(''),
  pageIndex: parseAsIndex.withDefault(0),
}
export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true
  })
})
function RouteComponent() {
  // Consume nuqs state as usual:
  const [{ searchQuery, pageIndex }] = useQueryStates(searchParams)
  // But now TanStack Router knows about it too:
  return (
    <Link
      to="/search"
      search={{
        searchQuery: 'foo',
        // note: we're not specifying pageIndex
      }}
    />
  )
}
```

Note that the `partialOutput` flag allows specifying only a subset of the search params for a given route. It also does not reflect those search in the URL automatically, following nuqs’ behaviour more closely.

Caveats

Due to differences in how TanStack Router and nuqs handle serialisation and deserialisation (global in TanStack Router and per-key in nuqs), only *trivial* state types are supported for type-safe linking. Those include all string-based parsers (string, enum, literals), number-based (integer, float, number literal), boolean, and JSON.

The `urlKeys` feature to provide shorthand key names is also not supported for similar reasons.


## [Testing](#-testing)

Documentation for the `NuqsTestingAdapter` is on the [testing page](/docs/testing).

[

Installation

Getting started

](/docs/installation)[

Basic usage

Replacing React.useState with useQueryState

](/docs/basic-usage)


### On this page

[Next.js](#nextjs)[App router](#nextjs-app-router)[Pages router](#nextjs-pages-router)[Unified (router-agnostic)](#nextjs-unified) [React SPA](#react-spa)[Full page navigation on  
`shallow: false`](#full-page-navigation-on-shallow-false) [Remix](#remix) [React Router v6](#react-router-v6) [React Router v7](#react-router-v7) [![TanStack Router](/tanstack-logo.png) TanStack Router](#tanstack-router)[Type-safe routing via `validateSearch`](#type-safe-routing-via-validatesearch) [Testing](#-testing)

---

---
url: https://nuqs.dev/docs/basic-usage
title: Basic usage | nuqs
crawled: 2025-11-09T12:20:10.500Z
---

# Basic usage | nuqs

Basic usage | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Basic usage


# Basic usage

Replacing React.useState with useQueryState

Prerequisite

Have you setup your app with the appropriate [**adapter**](/docs/adapters)? Then you are all set!

If you are using `React.useState` to manage your local UI state, you can replace it with `useQueryState` to sync it with the URL.

```
'use client'
import { useQueryState } from 'nuqs'
export function Demo() {
  const [name, setName] = useQueryState('name')
  return (
    <>
      <input value={name || ''} onChange={e => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || 'anonymous visitor'}!</p>
    </>
  )
}
```

```
<empty query>
```

Hello, anonymous visitor!Clear

`useQueryState` takes one required argument: the key to use in the query string.

Like `React.useState`, it returns an array with the value present in the query string as a string (or `null` if none was found), and a state updater function.

Example outputs for our demo example:

| URL | name value | Notes |
| --- | --- | --- |
| `/` | `null` | No `name` key in URL |
| `/?name=` | `''` | Empty string |
| `/?name=foo` | `'foo'` |  |
| `/?name=2` | `'2'` | Always returns a string by default, see [Parsers](/docs/parsers) |

Tip

Setting `null` as a value will remove the key from the query string.


## [Default values](#default-values)

When the query string is not present in the URL, the default behaviour is to return `null` as state.

It can make state updating and UI rendering tedious. Take this example of a simple counter stored in the URL:

```
import { useQueryState, parseAsInteger } from 'nuqs'
export default () => {
  const [count, setCount] = useQueryState('count', parseAsInteger)
  return (
    <>
      <pre>count: {count}</pre>
      <button onClick={() => setCount(0)}>Reset</button>
      {/* handling null values in setCount is annoying: */}
      <button onClick={() => setCount(c => (c ?? 0) + 1)}>+</button>
      <button onClick={() => setCount(c => (c ?? 0) - 1)}>-</button>
      <button onClick={() => setCount(null)}>Clear</button>
    </>
  )
}
```

You can provide a default value as the second argument to `useQueryState` (or via the `.withDefault` builder method on parsers):

```
const [search] = useQueryState('search', { defaultValue: '' })
//      ^? string
const [count] = useQueryState('count', parseAsInteger)
//      ^? number | null -> no default value = nullable
const [count] = useQueryState('count', parseAsInteger.withDefault(0))
//      ^? number
```

It makes it much easier to handle state updates:

```
const increment = () => setCount(c => c + 1) // c will never be null
const decrement = () => setCount(c => c - 1) // c will never be null
const clearCount = () => setCount(null) // Remove query from the URL
```

Note

The default value is internal to React, it will **not** be written to the URL *unless you set it explicitly* and use the [`clearOnDefault: false` option](/docs/options#clear-on-default).

Tip

The default value is also returned if the value is *invalid* for the parser.

Tip

Setting the state to `null` when a default value is specified:

1.  Clears the query from the URL
2.  Returns the default value as state

[

Adapters

Using nuqs in your React framework of choice

](/docs/adapters)[

Built-in parsers

When using strings is not enough

](/docs/parsers/built-in)


### On this page

[Default values](#default-values)

---

---
url: https://nuqs.dev/docs/options
title: Options | nuqs
crawled: 2025-11-09T12:20:14.973Z
---

# Options | nuqs

Options | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Options


# Options

Configuring nuqs

By default, `nuqs` will update search params:

1.  On the client only (not sending requests to the server),
2.  by replacing the current history entry,
3.  without scrolling to the top of the page.
4.  with a throttle rate adapted to your browser

These default behaviours can be [configured](#global-defaults-override), along with a few additional options.


## [Passing options](#passing-options)

Options can be passed at the hook level via the builder pattern:

```
const [state, setState] = useQueryState(
  'foo',
  parseAsString.withOptions({ history: 'push' })
)
```

Or when calling the state updater function, as a second parameter:

```
setState('foo', { scroll: true })
```

Call-level options will override hook level options.


## [History](#history)

By default, state updates are done by **replacing** the current history entry with the updated query when state changes.

You can see this as a sort of `git squash`, where all state-changing operations are merged into a single browsing history entry.

You can also opt-in to **push** a new history entry for each state change, per key, which will let you use the Back button to navigate state updates:

```
// Append state changes to history:
useQueryState('foo', { history: 'push' })
```

Watch out!

Breaking the Back button can lead to a bad user experience. Make sure to use this option only if the search params to update contribute to a navigation-like experience (eg: tabs, modals). Overriding the Back behaviour must be a UX enhancement rather than a nuisance.

*— “With great power comes great responsibility.”*


## [Shallow](#shallow)

By default, query state updates are done in a *client-first* manner: there are no network calls to the server.

This is equivalent to the `shallow` option of the Next.js router set to `true`.

To opt-in to notifying the server on query updates, you can set `shallow` to `false`:

```
useQueryState('foo', { shallow: false })
```

Note that the shallow option only makes sense if your page can be server-side rendered. Therefore, it has no effect in React SPA.

For server-side renderable frameworks, you would pair `shallow: false` with:

-   In Next.js app router: the `searchParams` page prop to render the RSC tree based on the updated query state.
-   In Next.js pages router: the `getServerSideProps` function
-   In Remix & React Router: a `loader` function


### [In React Router based frameworks](#in-react-router-based-frameworks)

While the `shallow: true` default behaviour is uncommon for Remix and React Router, where loaders are always supposed to run on URL changes, nuqs gives you control of this behaviour, by opting in to running loaders only if they do need to access the relevant search params.

One caveat is that the stock `useSearchParams` hook from those frameworks doesn’t reflect shallow-updated search params, so we provide you with one that does:

```
import { useOptimisticSearchParams } from 'nuqs/adapters/remix' // or '…/react-router/v6' or '…/react-router/v7'
function Component() {
  // Note: this is read-only, but reactive to all URL changes
  const searchParams = useOptimisticSearchParams()
  return <div>{searchParams.get('foo')}</div>
}
```

This concept of *“shallow routing”* is done via updates to the browser’s [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API).

Why not using shouldRevalidate?

[`shouldRevalidate`](https://reactrouter.com/start/framework/route-module#shouldrevalidate) is the idomatic way of opting out of running loaders on navigation, but nuqs uses the opposite approach: opting in to running loaders only when needed.

In order to avoid specifying `shouldRevalidate` for every route, nuqs chose to patch the history methods to enable shallow routing by default (on its own updates) in React Router based frameworks.


## [Scroll](#scroll)

The Next.js router scrolls to the top of the page on navigation updates, which may not be desirable when updating the query string with local state.

Query state updates won’t scroll to the top of the page by default, but you can opt-in to this behaviour:

```
useQueryState('foo', { scroll: true })
```


## [Rate-limiting URL updates](#rate-limiting-url-updates)

Because of browsers rate-limiting the History API, updates **to the URL** are queued and throttled to a default of 50ms, which seems to satisfy most browsers even when sending high-frequency query updates, like binding to a text input or a slider.

Safari’s rate limits are much stricter and use a default throttle of 120ms (320ms for older versions of Safari).

Note

the state returned by the hook is always updated **instantly**, to keep UI responsive. Only changes to the URL, and server requests when using `shallow: false`, are throttled or debounced.

This [throttle](#throttle) time is configurable, and also allows you to [debounce](#debounce) updates instead.

Which one should I use?

Throttle will emit the first update immediately, then batch updates at a slower pace **regularly**. This is recommended for most low-frequency updates.

Debounce will push back the moment when the URL is updated when you set your state, making it **eventually consistent**. This is recommended for high-frequency updates where the last value is more interesting than the intermediate ones, like a search input or moving a slider.

Read more about [debounce vs throttle](https://kettanaito.com/blog/debounce-vs-throttle).


### [Throttle](#throttle)

If you want to increase the throttle time — for example to reduce the amount of requests sent to the server when paired with `shallow: false` — you can specify it under the `limitUrlUpdates` option:

```
useQueryState('foo', {
  // Send updates to the server maximum once every second
  shallow: false,
  limitUrlUpdates: {
    method: 'throttle',
    timeMs: 1000
  }
})
// or using the shorthand:
import { throttle } from 'nuqs'
useQueryState('foo', {
  shallow: false,
  limitUrlUpdates: throttle(1000)
})
```

If multiple hooks set different throttle values on the same event loop tick, the highest value will be used. Also, values lower than 50ms will be ignored, to avoid rate-limiting issues. [Read more](https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs#batching--throttling).

Specifying a `+Infinity` value for throttle time will **disable** updates to the URL or the server, but all `useQueryState(s)` hooks will still update their internal state and stay in sync with each other.

Deprecation notice

The `throttleMs` option has been deprecated in `nuqs@2.5.0` and will be removed in a later major upgrade.

To migrate:

1.  `import { throttle } from 'nuqs'`
2.  Replace `{ throttleMs: 100 }` with `{ limitUrlUpdates: throttle(100) }` in your options.


### [Debounce](#debounce)

Do I need debounce?

Debounce only makes sense for **server-side data fetching** (RSCs & loaders, when combined with [`shallow: false`](#shallow)), to control when requests are made to the server. For example: it lets you avoid sending the first character on its own when typing in a search input, by waiting for the user to finish typing.

If you are **fetching client-side** (eg: with TanStack Query), you’ll want to debounce the state returned by the hooks instead (using a 3rd party `useDebounce` utility hook).

In addition to throttling, you can apply a debouncing mechanism to URL updates, to delay the moment where the URL gets updated with the latest value.

The returned state is always updated **immediately**: only the network requests sent to the server are debounced.

This can be useful for high frequency state updates where the server only cares about the final value, not all the intermediary ones while typing in a search input or moving a slider.

We recommend you opt-in to debouncing on specific state updates, rather than defining it for the whole search param.

Let’s take the example of a search input. You’ll want to update it:

1.  When the user is typing text, with debouncing
2.  When the user clears the input, by sending an immediate update
3.  When the user presses Enter, by sending an immediate update

You can see the debounce case is the outlier here, and actually conditioned on the set value, so we can specify it using the state updater function:

```
import { useQueryState, parseAsString, debounce } from 'nuqs';
function Search() {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false })
  )
  return (
    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value, {
          // Send immediate update if resetting, otherwise debounce at 500ms
          limitUrlUpdates: e.target.value === '' ? undefined : debounce(500)
        })
      }
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          // Send immediate update
          setSearch(e.target.value)
        }
      }}
    />
  )
}
```


### [Resetting](#resetting)

You can use the `defaultRateLimit` import to reset debouncing or throttling to the default:

```
import { debounce, defaultRateLimit } from 'nuqs'
const [, setState] = useQueryState('foo', {
  limitUrlUpdates: debounce(1000)
})
// This state update isn't debounced
setState('bar', { limitUrlUpdates: defaultRateLimit })
```


## [Transitions](#transitions)

When combined with `shallow: false`, you can use React’s `useTransition` hook to get loading states while the server is re-rendering server components with the updated URL.

Pass in the `startTransition` function from `useTransition` to the options to enable this behaviour:

```
'use client'
import React from 'react'
import { useQueryState, parseAsString } from 'nuqs'
function ClientComponent({ data }) {
  // 1. Provide your own useTransition hook:
  const [isLoading, startTransition] = React.useTransition()
  const [query, setQuery] = useQueryState(
    'query',
    // 2. Pass the `startTransition` as an option:
    parseAsString.withOptions({ startTransition, shallow: false })
  )
  // 3. `isLoading` will be true while the server is re-rendering
  // and streaming RSC payloads, when the query is updated via `setQuery`.
  // Indicate loading state
  if (isLoading) return <div>Loading...</div>
  // Normal rendering with data
  return <div>...</div>
}
```

In `nuqs@1.x.x`, passing `startTransition` as an option automatically sets `shallow: false`.

This is no longer the case in `nuqs@>=2.0.0`: you’ll need to set it explicitly.


## [Clear on default](#clear-on-default)

When the state is set to the default value, the search parameter is removed from the URL, instead of being reflected explicitly.

However, sometimes you might want to keep the search parameter in the URL, because **default values *can* change**, and the meaning of the URL along with it.

Example of defaults changing

In `nuqs@1.x.x`, `clearOnDefault` was `false` by default.  
in `nuqs@2.0.0`, `clearOnDefault` is now `true` by default, in response to [user feedback](https://x.com/fortysevenfx/status/1841610237540696261).

If you want to keep the search parameter in the URL when it’s set to the default value, you can set `clearOnDefault` to `false`:

```
useQueryState('search', {
  defaultValue: '',
  clearOnDefault: false
})
```

Tip

Clearing the key-value pair from the query string can always be done by setting the state to `null`.

This option compares the set state against the default value using `===` reference equality, so if you are using a [custom parser](/docs/parsers/making-your-own) for a state type that wouldn’t work with reference equality, you should provide the `eq` function to your parser (this is done for you in built-in parsers):

```
const dateParser = createParser({
  parse: (value: string) => new Date(value.slice(0, 10)),
  serialize: (date: Date) => date.toISOString().slice(0, 10),
  eq: (a: Date, b: Date) => a.getTime() === b.getTime() 
})
```


## [Adapter props](#adapter-props)

The following options are global and can be passed directly on the [`<NuqsAdapter>`](/docs/adapters) as props, and apply to its whole children tree.


### [Global defaults override](#global-defaults-override)

Introduced in version **2.5.0**.

![TanStack Router](/tanstack-logo.png)

Default values for some options can be configured globally via the `defaultOptions` adapter prop:

```
<NuqsAdapter
  defaultOptions={{
    shallow: false,
    scroll: true,
    clearOnDefault: false,
    limitUrlUpdates: throttle(250),
  }}
>
  {children}
</NuqsAdapter>
```


### [Processing `URLSearchParams`](#processing-urlsearchparams)

Introduced in version **2.6.0**.

![TanStack Router](/tanstack-logo.png)

You can pass a `processUrlSearchParams` callback to the adapter, which will be called *after* the `URLSearchParams` have been merged when performing a state update, and *before* they are sent to the adapter for updating the URL.

Think of it as a sort of **middleware** for processing search params.


#### [Alphabetical Sort](#alphabetical-sort)

Sort the search parameters alphabetically:

```
<NuqsAdapter
  processUrlSearchParams={(search) => {
    // Note: you can modify search in-place,
    // or return a copy, as you wish.
    search.sort()
    return search
  }}
>
  {children}
</NuqsAdapter>
```

*Try toggling **c**, then **b**, then **a**, and note how the URL remains ordered:*

Enable alphabetical sorting on updates

```
<empty query>
```

Toggle "a"

Toggle "b"

Toggle "c"


#### [Timestamp](#timestamp)

Add a timestamp to the search parameters:

```
<NuqsAdapter
  processUrlSearchParams={(search) => {
    search.set('ts', Date.now().toString())
    return search
  }}
>
  {children}
</NuqsAdapter>
```

```
<empty query>
```

Increment "d": 0

Increment "e": 0

Increment "f": 0

[

Zod codecs

Using Zod codecs for (de)serialisation in custom nuqs parser

](/docs/parsers/community/zod-codecs)[

useQueryStates

How to read & update multiple search params at once

](/docs/batching)


### On this page

[Passing options](#passing-options)[History](#history)[Shallow](#shallow)[In React Router based frameworks](#in-react-router-based-frameworks)[Scroll](#scroll)[Rate-limiting URL updates](#rate-limiting-url-updates)[Throttle](#throttle)[Debounce](#debounce)[Resetting](#resetting)[Transitions](#transitions)[Clear on default](#clear-on-default)[Adapter props](#adapter-props)[Global defaults override](#global-defaults-override)[Processing `URLSearchParams`](#processing-urlsearchparams)[Alphabetical Sort](#alphabetical-sort)[Timestamp](#timestamp)

---

---
url: https://nuqs.dev/docs/batching
title: useQueryStates | nuqs
crawled: 2025-11-09T12:20:14.449Z
---

# useQueryStates | nuqs

useQueryStates | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

useQueryStatesMultiple updates (batching)


# useQueryStates

How to read & update multiple search params at once


## [Multiple updates (batching)](#multiple-updates-batching)

You can call as many state update functions as needed in a single event loop tick, and they will be applied to the URL asynchronously:

```
const MultipleQueriesDemo = () => {
  const [lat, setLat] = useQueryState('lat', parseAsFloat)
  const [lng, setLng] = useQueryState('lng', parseAsFloat)
  const randomCoordinates = React.useCallback(() => {
    setLat(Math.random() * 180 - 90)
    setLng(Math.random() * 360 - 180)
  }, [])
}
```

If you wish to know when the URL has been updated, and what it contains, you can await the Promise returned by the state updater function, which gives you the updated URLSearchParameters object:

```
const randomCoordinates = React.useCallback(() => {
  setLat(42)
  return setLng(12)
}, [])
randomCoordinates().then((search: URLSearchParams) => {
  search.get('lat') // 42
  search.get('lng') // 12, has been queued and batch-updated
})
```

*Implementation details (Promise caching)*

The returned Promise is cached until the next flush to the URL occurs, so all calls to a setState (of any hook) in the same event loop tick will return the same Promise reference.

Due to throttling of calls to the Web History API, the Promise may be cached for several ticks. Batched updates will be merged and flushed once to the URL. This means not every setState will reflect to the URL, if another one comes overriding it before flush occurs.

The returned React state will reflect all set values instantly, to keep UI responsive.

* * *


## [`useQueryStates`](#usequerystates)

For query keys that should always move together, you can use `useQueryStates` with an object containing each key’s type:

```
import { useQueryStates, parseAsFloat } from 'nuqs'
const [coordinates, setCoordinates] = useQueryStates(
  {
    lat: parseAsFloat.withDefault(45.18),
    lng: parseAsFloat.withDefault(5.72)
  },
  {
    history: 'push'
  }
)
const { lat, lng } = coordinates
// Set all (or a subset of) the keys in one go:
const search = await setCoordinates({
  lat: Math.random() * 180 - 90,
  lng: Math.random() * 360 - 180
})
```


### [Options](#options)

There are three places you can define [options](/docs/options) in `useQueryStates`:

-   As the second argument to the hook itself (global options, like `history: 'push'` above)
-   On each parser, like `parseAsFloat.withOptions({ shallow: false })`
-   At the call level when updating the state:

```
setCoordinates(
  {
    lat: 42,
    lng: 12
  },
  {
    shallow: false
  }
)
```

The order of precedence is: call-level options > parser options > global options.

Tip

You can clear all keys managed by a `useQueryStates` hook by passing `null` to the state updater function:

```
const clearAll = () => setCoordinates(null)
```

This will clear `lat` & `lng`, and leave other search params untouched.


### [Shorter search params keys](#shorter-search-params-keys)

Introduced in version **1.20.0**.

![TanStack Router](/tanstack-logo.png)

One issue with tying the parsers object keys to the search params keys was that you had to trade-off between variable names that make sense for your domain or business logic, and short, URL-friendly keys.

You can use a `urlKeys` object in the hook options to remap the variable names to shorter keys:

```
const [{ latitude, longitude }, setCoordinates] = useQueryStates(
  {
    // Use variable names that make sense in your codebase
    latitude: parseAsFloat.withDefault(45.18),
    longitude: parseAsFloat.withDefault(5.72)
  },
  {
    urlKeys: {
      // And remap them to shorter keys in the URL
      latitude: 'lat',
      longitude: 'lng'
    }
  }
)
// No changes in the setter API, but the keys are remapped to:
// ?lat=45.18&lng=5.72
setCoordinates({
  latitude: 45.18,
  longitude: 5.72
})
```

As your application grows, you may want to reuse these parsers and urlKeys definitions across multiple components or nuqs features (like [loaders](/docs/server-side#loaders) or a [serializer](/docs/utilities#serializer-helper)).

You can use the `UrlKeys` type helper for this:

```
import { type UrlKeys } from 'nuqs' // or 'nuqs/server'
export const coordinatesParsers = {
  latitude: parseAsFloat.withDefault(45.18),
  longitude: parseAsFloat.withDefault(5.72)
}
export const coordinatesUrlKeys: UrlKeys<typeof coordinatesParsers> = {
  latitude: 'lat',
  longitude: 'lng'
}
```

Introduced in version **2.3.0**.

[

Options

Configuring nuqs

](/docs/options)[

Server-Side usage

Type-safe search params on the server

](/docs/server-side)


### On this page

[Multiple updates (batching)](#multiple-updates-batching)[`useQueryStates`](#usequerystates)[Options](#options)[Shorter search params keys](#shorter-search-params-keys)

---

---
url: https://nuqs.dev/docs/server-side
title: Server-Side usage | nuqs
crawled: 2025-11-09T12:20:14.970Z
---

# Server-Side usage | nuqs

Server-Side usage | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Server-Side usageLoaders


# Server-Side usage

Type-safe search params on the server


## [Loaders](#loaders)

Introduced in version **2.3.0**.

![TanStack Router](/tanstack-logo.png)

To parse search params server-side, you can use a *loader* function.

You create one using the `createLoader` function, by passing it your search params descriptor object:

searchParams.tsx

```
import { parseAsFloat, createLoader } from 'nuqs/server'
// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  latitude: parseAsFloat.withDefault(0),
  longitude: parseAsFloat.withDefault(0)
}
export const loadSearchParams = createLoader(coordinatesSearchParams)
```

Here, `loadSearchParams` is a function that parses search params and returns state variables to be consumed server-side (the same state type that [`useQueryStates`](/docs/batching) returns).

Next.js (app router)Next.js (pages router)API routesRemix / React RouterReact / client-side

app/page.tsx

```
import { loadSearchParams } from './search-params'
import type { SearchParams } from 'nuqs/server'
type PageProps = {
  searchParams: Promise<SearchParams>
}
export default async function Page({ searchParams }: PageProps) {
  const { latitude, longitude } = await loadSearchParams(searchParams)
  return <Map
    lat={latitude}
    lng={longitude}
  />
  // Pro tip: you don't *have* to await the result.
  // Pass the Promise object to children components wrapped in <Suspense>
  // to benefit from PPR / dynamicIO and serve a static outer shell
  // immediately, while streaming in the dynamic parts that depend on
  // the search params when they become available.
}
```

pages/index.tsx

```
import type { GetServerSidePropsContext } from 'next'
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { latitude, longitude } = loadSearchParams(query)
  // Do some server-side calculations with the coordinates
  return {
    props: { ... }
  }
}
```

app/routes/\_index.tsx

```
export function loader({ request }: LoaderFunctionArgs) {
  const { latitude, longitude } = loadSearchParams(request) // request.url works too
  // Do some server-side calculations with the coordinates
  return ...
}
```

```
// Note: you can also use this client-side (or anywhere, really),
// for a one-off parsing of non-reactive search params:
loadSearchParams('https://example.com?latitude=42&longitude=12')
loadSearchParams(location.search)
loadSearchParams(new URL(...))
loadSearchParams(new URLSearchParams(...))
```

```
// App router, eg: app/api/location/route.ts
export async function GET(request: Request) {
  const { latitude, longitude } = loadSearchParams(request)
  // ...
}
// Pages router, eg: pages/api/location.ts
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { latitude, longitude } = loadSearchParams(request.query)
}
```

Note

Loaders **don’t validate** your data. If you expect positive integers or JSON-encoded objects of a particular shape, you’ll need to feed the result of the loader to a schema validation library, like [Zod](https://zod.dev).

Built-in validation support is coming. [Read the RFC](https://github.com/47ng/nuqs/discussions/446). Alternatively, you can build validation into [custom parsers](/docs/parsers/making-your-own).

The loader function will accept the following input types to parse search params from:

-   A string containing a fully qualified URL: `https://example.com/?foo=bar`
-   A string containing just search params: `?foo=bar` (like `location.search`)
-   A `URL` object
-   A `URLSearchParams` object
-   A `Request` object
-   A `Record<string, string | string[] | undefined>` (eg: `{ foo: 'bar' }`)
-   A `Promise` of any of the above, in which case it also returns a Promise.


### [Strict mode](#strict-mode)

Introduced in version **2.5.0**.

![TanStack Router](/tanstack-logo.png)

If a search param contains an invalid value for the associated parser (eg: `?count=banana` for `parseAsInteger`), the default behaviour is to return the [default value](/docs/basic-usage#default-values) if specified, or `null` otherwise.

You can turn on **strict mode** to instead throw an error on invalid values when running the loader:

```
const loadSearchParams = createLoader({
  count: parseAsInteger.withDefault(0)
})
// Default: will return { count: 0 }
loadSearchParams('?count=banana')
// Strict mode: will throw an error
loadSearchParams('?count=banana', { strict: true })
// [nuqs] Error while parsing query `banana` for key `count`
```


## [Cache](#cache)

Introduced in version **1.13.0**.

![TanStack Router](/tanstack-logo.png)

If you wish to access the searchParams in a deeply nested Server Component (ie: not in the Page component), you can use `createSearchParamsCache` to do so in a type-safe manner.

Think of it as a loader combined with a way to propagate the parsed values down the RSC tree, like Context would on the client.

searchParams.ts

```
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server'
// Note: import from 'nuqs/server' to avoid the "use client" directive
export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  q: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10)
})
```

page.tsx

```
import { searchParamsCache } from './searchParams'
import { type SearchParams } from 'nuqs/server'
type PageProps = {
  searchParams: Promise<SearchParams> // Next.js 15+: async searchParams prop
}
export default async function Page({ searchParams }: PageProps) {
  // ⚠️ Don't forget to call `parse` here.
  // You can access type-safe values from the returned object:
  const { q: query } = await searchParamsCache.parse(searchParams)
  return (
    <div>
      <h1>Search Results for {query}</h1>
      <Results />
    </div>
  )
}
function Results() {
  // Access type-safe search params in children server components:
  const maxResults = searchParamsCache.get('maxResults')
  return <span>Showing up to {maxResults} results</span>
}
```

The cache will only be valid for the current page render (see React’s [`cache`](https://react.dev/reference/react/cache) function).

Note: the cache only works for **server components**, but you may share your parser declaration with `useQueryStates` for type-safety in client components:

searchParams.ts

```
import {
  parseAsFloat,
  createSearchParamsCache
} from 'nuqs/server'
export const coordinatesParsers = {
  lat: parseAsFloat.withDefault(45.18),
  lng: parseAsFloat.withDefault(5.72)
}
export const coordinatesCache = createSearchParamsCache(coordinatesParsers)
```

page.tsx

```
import { coordinatesCache } from './searchParams'
import { Server } from './server'
import { Client } from './client'
export default async function Page({ searchParams }) {
  // Note: you can also use strict mode here:
  await coordinatesCache.parse(searchParams, { strict: true })
  return (
    <>
      <Server />
      <Suspense>
        <Client />
      </Suspense>
    </>
  )
}
```

server.tsx

```
import { coordinatesCache } from './searchParams'
export function Server() {
  const { lat, lng } = coordinatesCache.all()
  // or access keys individually:
  const lat = coordinatesCache.get('lat')
  const lng = coordinatesCache.get('lng')
  return (
    <span>
      Latitude: {lat} - Longitude: {lng}
    </span>
  )
}
```

client.tsx

```
'use client'
import { useQueryStates } from 'nuqs'
import { coordinatesParsers } from './searchParams'
export function Client() {
  const [{ lat, lng }, setCoordinates] = useQueryStates(coordinatesParsers)
  // ...
}
```


### [Shorter search params keys](#shorter-search-params-keys)

Just like with `useQueryStates`, you can define a [`urlKeys`](/docs/batching#shorter-search-params-keys) object to map the variable names defined by the parser to shorter keys in the URL. They will be translated on read and your codebase can only refer to variable names that make sense for your domain or business logic.

searchParams.ts

```
export const coordinatesParsers = {
  // Use human-readable variable names throughout your codebase
  latitude: parseAsFloat.withDefault(45.18),
  longitude: parseAsFloat.withDefault(5.72)
}
export const coordinatesCache = createSearchParamsCache(coordinatesParsers, {
  urlKeys: {
    // Remap them to read from shorter keys in the URL
    latitude: 'lat',
    longitude: 'lng'
  }
})
```

[

useQueryStates

How to read & update multiple search params at once

](/docs/batching)[

Limits

There are some limits you should be aware of when using nuqs or URL params in general.

](/docs/limits)


### On this page

[Loaders](#loaders)[Strict mode](#strict-mode)[Cache](#cache)[Shorter search params keys](#shorter-search-params-keys)

---

---
url: https://nuqs.dev/docs/limits
title: Limits | nuqs
crawled: 2025-11-09T12:20:18.796Z
---

# Limits | nuqs

Limits | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

LimitsURL update throttling


# Limits

There are some limits you should be aware of when using nuqs or URL params in general.


## [URL update throttling](#url-update-throttling)

Browsers rate-limit the History API, updates to the URL are queued and throttled to a default of 50ms, which seems to satisfy most browsers even when sending high-frequency query updates, like binding to a text input or a slider.

Safari’s rate limits are much stricter and require a throttle of 120ms (320ms for older versions of Safari).

Nuqs handles this out of the box so you don’t run into those rate-limits, however it is possible to set your own custom throttles.

For more info how to set custom throttles see [Rate-limiting URL updates](/docs/options#rate-limiting-url-updates).


## [Max URL lengths](#max-url-lengths)

Most modern browsers enforce a max URL length, which can vary:

-   **Chrome:** ~2 MB (practically, you might encounter issues at around 2,000 characters).
-   **Firefox:** ~65,000 characters.
-   **Safari:** Generally has more restrictive limits (around 80,000 characters).
-   **IE/Edge:** Historically limited to 2,083 characters (IE), although Edge has relaxed this limit.

Additionally, transport mechanisms like social media, messaging apps, and emails may impose significantly lower limits on URL length. Long URLs may be truncated, wrapped, or rendered unusable when shared on these platforms.

Keep in mind that not all application state should be stored in URLs. Exceeding the 2,000-character range may indicate the need to reconsider your state management approach.

[

Server-Side usage

Type-safe search params on the server

](/docs/server-side)[

Utilities

Utilities for working with query strings

](/docs/utilities)


### On this page

[URL update throttling](#url-update-throttling)[Max URL lengths](#max-url-lengths)

---

---
url: https://nuqs.dev/docs/utilities
title: Utilities | nuqs
crawled: 2025-11-09T12:20:19.021Z
---

# Utilities | nuqs

Utilities | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

UtilitiesSerializer helper


# Utilities

Utilities for working with query strings


## [Serializer helper](#serializer-helper)

Introduced in version **1.16.0**.

To populate `<Link>` components with state values, you can use the `createSerializer` helper.

Pass it an object describing your search params, and it will give you a function to call with values, that generates a query string serialized as the hooks would do.

Example:

```
import {
  createSerializer,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server' // can also be imported from 'nuqs' in client code
const searchParams = {
  search: parseAsString,
  limit: parseAsInteger,
  from: parseAsIsoDateTime,
  to: parseAsIsoDateTime,
  sortBy: parseAsStringLiteral(['asc', 'desc'])
}
// Create a serializer function by passing the description of the search params to accept
const serialize = createSerializer(searchParams)
// Then later, pass it some values (a subset) and render them to a query string
serialize({
  search: 'foo bar',
  limit: 10,
  from: new Date('2024-01-01'),
  // here, we omit `to`, which won't be added
  sortBy: null // null values are also not rendered
})
// ?search=foo+bar&limit=10&from=2024-01-01T00:00:00.000Z
```


### [Base parameter](#base-parameter)

The returned `serialize` function can take a base parameter over which to append/amend the search params:

```
serialize('/path?baz=qux', { foo: 'bar' }) // /path?baz=qux&foo=bar
const search = new URLSearchParams('?baz=qux')
serialize(search, { foo: 'bar' }) // ?baz=qux&foo=bar
const url = new URL('https://example.com/path?baz=qux')
serialize(url, { foo: 'bar' }) // https://example.com/path?baz=qux&foo=bar
// Passing null removes existing values
serialize('?remove=me', { foo: 'bar', remove: null }) // ?foo=bar
```


### [Shorter search params keys](#shorter-search-params-keys)

Just like with `useQueryStates`, you can define a [`urlKeys`](/docs/batching#shorter-search-params-keys) object to map the variable names defined by the parsers to shorter keys in the URL:

```
const serialize = createSerializer(
  {
    // 1. Use variable names that make sense for your domain/business logic
    latitude: parseAsFloat,
    longitude: parseAsFloat,
    zoomLevel: parseAsInteger
  },
  {
    // 2. Remap them to shorter keys in the URL
    urlKeys: {
      latitude: 'lat',
      longitude: 'lng',
      zoomLevel: 'z'
    }
  }
)
// 3. Use your variable names when calling the serializer,
// and the shorter keys will be rendered in the URL:
serialize({
  latitude: 45.18,
  longitude: 5.72,
  zoomLevel: 12
})
// ?lat=45.18&lng=5.72&z=12
```


### [Processing URLSearchParams](#processing-urlsearchparams)

Introduced in version **2.6.0**.

![TanStack Router](/tanstack-logo.png)

Just like in the [`<NuqsAdapter>`](/docs/options#processing-urlsearchparams), you can specify a `processUrlSearchParams` function to modify the search params before they are serialized.

For example, it can be useful for consistent canonical URLs (for SEO), by sorting search param keys alphabetically:

```
const serialize = createSerializer(
  {
    a: parseAsInteger,
    z: parseAsInteger
  },
  {
    processUrlSearchParams: (search) => {
      // Note: you can modify search in-place,
      // or return a copy, as you wish.
      search.sort()
      return search
    }
  }
)
serialize('?foo=bar', {
  a: 1,
  z: 1
})
// ?a=1&foo=bar&z=1
// merged, then sorted
```


## [Parser type inference](#parser-type-inference)

Introduced in version **1.18.0**.

![TanStack Router](/tanstack-logo.png)

To access the underlying type returned by a parser, you can use the `inferParserType` type helper:

```
import { parseAsInteger, type inferParserType } from 'nuqs' // or 'nuqs/server'
const intNullable = parseAsInteger
const intNonNull = parseAsInteger.withDefault(0)
inferParserType<typeof intNullable> // number | null
inferParserType<typeof intNonNull> // number
```

For an object describing parsers (that you’d pass to [`createLoader`](/docs/server-side#loaders) or to [`useQueryStates`](/docs/batching#usequerystates)), `inferParserType` will return the type of the object with the parsers replaced by their inferred types:

```
import {
  parseAsBoolean,
  parseAsInteger,
  type inferParserType
} from 'nuqs' // or 'nuqs/server'
const parsers = {
  a: parseAsInteger,
  b: parseAsBoolean.withDefault(false)
}
inferParserType<typeof parsers>
// { a: number | null, b: boolean }
```


## [Standard Schema](#standard-schema)

Introduced in version **2.5.0**.

![TanStack Router](/tanstack-logo.png)

Search param definitions can be turned into a [Standard Schema](https://standardschema.dev) for validating external sources and passing on type inference to other tools.

```
import {
  createStandardSchemaV1,
  parseAsInteger,
  parseAsString,
} from 'nuqs' // or 'nuqs/server'
// 1. Define your search params as usual
export const searchParams = {
  searchTerm: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10)
}
// 2. Then create a Standard Schema compatible validator
export const validateSearchParams = createStandardSchemaV1(searchParams)
// 3. Use it with other tools, like tRPC:
router({
  search: publicProcedure.input(validateSearchParams).query(...)
})
```


### [TanStack Router & validateSearch](#tanstack-router--validatesearch)

You can pass the standard schema validator to [TanStack Router](https://tanstack.com/router/)’s `validateSearch` for type-safe linking to nuqs URL state, but in order to keep those values optional (as nuqs uses different defaults strategies than TSR), you need to mark the output as `Partial`, using the `partialOutput` option:

src/routes/search.tsx

```
import { createStandardSchemaV1 } from 'nuqs'
const validateSearch = createStandardSchemaV1(searchParams, {
  partialOutput: true
})
export const Route = createFileRoute('/search')({
  validateSearch
})
```

Note

TanStack Router support is still experimental and comes with caveats, see the [adapter documentation](/docs/adapters#tanstack-router) for more information about what is supported.

[

Limits

There are some limits you should be aware of when using nuqs or URL params in general.

](/docs/limits)[

Debugging

Enabling debug logs and user timings markers

](/docs/debugging)


### On this page

[Serializer helper](#serializer-helper)[Base parameter](#base-parameter)[Shorter search params keys](#shorter-search-params-keys)[Processing URLSearchParams](#processing-urlsearchparams)[Parser type inference](#parser-type-inference)[Standard Schema](#standard-schema)[TanStack Router & validateSearch](#tanstack-router--validatesearch)

---

---
url: https://nuqs.dev/docs/debugging
title: Debugging | nuqs
crawled: 2025-11-09T12:20:18.750Z
---

# Debugging | nuqs

Debugging | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)


# Debugging

Enabling debug logs and user timings markers

You can enable debug logs in the browser by setting the `debug` item in localStorage to `nuqs`, and reload the page.

```
// In your devtools:
localStorage.setItem('debug', 'nuqs')
```

> Note: unlike the `debug` package, this will not work with wildcards, but you can combine it: `localStorage.setItem('debug', '*,nuqs')`

Log lines will be prefixed with `[nuqs]` for `useQueryState` and `[nuq+]` for `useQueryStates`, along with other internal debug logs.

User timings markers are also recorded, for advanced performance analysis using your browser’s devtools.

Providing debug logs when opening an [issue](https://github.com/47ng/nuqs/issues) is always appreciated. 🙏

[

Utilities

Utilities for working with query strings

](/docs/utilities)[

Testing

Some tips on testing components that use \`nuqs\`

](/docs/testing)

---

---
url: https://nuqs.dev/docs/testing
title: Testing | nuqs
crawled: 2025-11-09T12:20:23.030Z
---

# Testing | nuqs

Testing | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

TestingTesting hooks with React Testing Library


# Testing

Some tips on testing components that use \`nuqs\`

Since nuqs 2, you can unit-test components that use `useQueryState(s)` hooks without needing to mock anything, by using a dedicated testing adapter that will facilitate **setting up** your tests (with initial search params) and **asserting** on URL changes when **acting** on your components.


## [Testing hooks with React Testing Library](#testing-hooks-with-react-testing-library)

When testing hooks that rely on nuqs’ `useQueryState(s)` with React Testing Library’s [`renderHook`](https://testing-library.com/docs/react-testing-library/api/#renderhook) function, you can use `withNuqsTestingAdapter` to get a wrapper component to pass to the `renderHook` call:

```
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
const { result } = renderHook(() => useTheHookToTest(), {
  wrapper: withNuqsTestingAdapter({
    searchParams: { count: "42" },
  }),
})
```

Introduced in version **2.2.0**.


## [Testing components with Vitest](#testing-components-with-vitest)

Here is an example for Vitest and Testing Library to test a button rendering a counter:

Vitest v1Vitest v2

counter-button.test.tsx

```
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withNuqsTestingAdapter, type UrlUpdateEvent } from 'nuqs/adapters/testing'
import { describe, expect, it, vi } from 'vitest'
import { CounterButton } from './counter-button'
it('should increment the count when clicked', async () => {
  const user = userEvent.setup()
  const onUrlUpdate = vi.fn<[UrlUpdateEvent]>()
  render(<CounterButton />, {
    // 1. Setup the test by passing initial search params / querystring:
    wrapper: withNuqsTestingAdapter({ searchParams: '?count=42', onUrlUpdate })
  })
  // 2. Act
  const button = screen.getByRole('button')
  await user.click(button)
  // 3. Assert changes in the state and in the (mocked) URL
  expect(button).toHaveTextContent('count is 43')
  expect(onUrlUpdate).toHaveBeenCalledOnce()
  const event = onUrlUpdate.mock.calls[0]![0]!
  expect(event.queryString).toBe('?count=43')
  expect(event.searchParams.get('count')).toBe('43')
  expect(event.options.history).toBe('push')
})
```

counter-button.test.tsx

```
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withNuqsTestingAdapter, type OnUrlUpdateFunction } from 'nuqs/adapters/testing'
import { describe, expect, it, vi } from 'vitest'
import { CounterButton } from './counter-button'
it('should increment the count when clicked', async () => {
  const user = userEvent.setup()
  const onUrlUpdate = vi.fn<OnUrlUpdateFunction>()
  render(<CounterButton />, {
    // 1. Setup the test by passing initial search params / querystring:
    wrapper: withNuqsTestingAdapter({ searchParams: '?count=42', onUrlUpdate })
  })
  // 2. Act
  const button = screen.getByRole('button')
  await user.click(button)
  // 3. Assert changes in the state and in the (mocked) URL
  expect(button).toHaveTextContent('count is 43')
  expect(onUrlUpdate).toHaveBeenCalledOnce()
  const event = onUrlUpdate.mock.calls[0]![0]!
  expect(event.queryString).toBe('?count=43')
  expect(event.searchParams.get('count')).toBe('43')
  expect(event.options.history).toBe('push')
})
```

See issue [#259](https://github.com/47ng/nuqs/issues/259) for more testing-related discussions.


## [Jest and ESM](#jest-and-esm)

Since nuqs 2 is an [ESM-only package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), there are a few hoops you need to jump through to make it work with Jest. This is extracted from the [Jest ESM guide](https://jestjs.io/docs/ecmascript-modules).

1.  Add the following options to your jest.config.ts file:

jest.config.ts

```
const config: Config = {
  // <Other options here>
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {}
};
```

2.  Change your test command to include the `--experimental-vm-modules` flag:

package.json

```
{
  "scripts": {
    "test": "NODE_OPTIONS=\"$NODE_OPTIONS --experimental-vm-modules\" jest"
  }
}
```

Adapt accordingly for Windows with [`cross-env`](https://www.npmjs.com/package/cross-env).


## [API](#api)

`withNuqsTestingAdapter` accepts the following arguments:

-   `searchParams`: The initial search params to use for the test. These can be a query string, a `URLSearchParams` object or a record object with string values.

```
withNuqsTestingAdapter({
  searchParams: '?q=hello&limit=10'
})
withNuqsTestingAdapter({
  searchParams: new URLSearchParams('?q=hello&limit=10')
})
withNuqsTestingAdapter({
  searchParams: {
    q: 'hello',
    limit: '10' // Values are serialized strings
  }
})
```

-   `onUrlUpdate`: a function that will be called when the URL is updated by the component. It receives an object with:
    
    -   the new search params as an instance of `URLSearchParams`
    -   the new rendered query string (for convenience)
    -   the options used to update the URL.
-   `hasMemory`: by default, the testing adapter is **immutable**, meaning it will always use the initial search params as a base for URL updates. This encourages testing units of behaviour in a single test.
    

To make it behave like framework adapters (which do store the updates in the URL), set `hasMemory: true`, so subsequent updates build up on the previous state. This memory is per-adapter instance, and so is isolated between tests, but shared for components under the same adapter.

🧪 Internal/advanced options

-   `rateLimitFactor`. By default, rate limiting is disabled when testing, as it can lead to unexpected behaviours. Setting this to 1 will enable rate limiting with the same factor as in production.
    
-   `resetUrlUpdateQueueOnMount`: clear the URL update queue before running the test. This is `true` by default to isolate tests, but you can set it to `false` to keep the URL update queue between renders and match the production behaviour more closely.
    


## [NuqsTestingAdapter](#nuqstestingadapter)

The `withNuqsTestingAdapter` function is a wrapper component factory function wraps children with a `NuqsTestingAdapter`, but you can also use it directly:

```
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
<NuqsTestingAdapter>
  <ComponentsUsingNuqs/>
</NuqsTestingAdapter>
```

It takes the same props as the arguments you can pass to `withNuqsTestingAdapter`.


## [Testing custom parsers](#testing-custom-parsers)

If you create custom parsers with `createParser`, you will likely want to test them.

Parsers should:

1.  Define pure functions for `parse`, `serialize`, and `eq`.
2.  Be bijective: `parse(serialize(x)) === x` and `serialize(parse(x)) === x`.

To help test bijectivity, you can use helpers defined in `nuqs/testing`:

```
import {
  isParserBijective,
  testParseThenSerialize,
  testSerializeThenParse
} from 'nuqs/testing'
it('is bijective', () => {
  // Passing tests return true
  expect(isParserBijective(parseAsInteger, '42', 42)).toBe(true)
  // Failing test throws an error
  expect(() => isParserBijective(parseAsInteger, '42', 47)).toThrowError()
  // You can also test either side separately:
  expect(testParseThenSerialize(parseAsInteger, '42')).toBe(true)
  expect(testSerializeThenParse(parseAsInteger, 42)).toBe(true)
  // Those will also throw an error if the test fails,
  // which makes it easier to isolate which side failed:
  expect(() => testParseThenSerialize(parseAsInteger, 'not a number')).toThrowError()
  expect(() => testSerializeThenParse(parseAsInteger, NaN)).toThrowError()
})
```

Introduced in version **2.4.0**.

[

Debugging

Enabling debug logs and user timings markers

](/docs/debugging)[

Troubleshooting

Common issues and solutions

](/docs/troubleshooting)


### On this page

[Testing hooks with React Testing Library](#testing-hooks-with-react-testing-library)[Testing components with Vitest](#testing-components-with-vitest)[Jest and ESM](#jest-and-esm)[API](#api)[NuqsTestingAdapter](#nuqstestingadapter)[Testing custom parsers](#testing-custom-parsers)

---

---
url: https://nuqs.dev/docs/troubleshooting
title: Troubleshooting | nuqs
crawled: 2025-11-09T12:20:23.027Z
---

# Troubleshooting | nuqs

Troubleshooting | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

TroubleshootingPages router


# Troubleshooting

Common issues and solutions

Tip

Check out the list of [known issues and solutions](https://github.com/47ng/nuqs/issues/423).


## [Pages router](#pages-router)

Because the Next.js **pages router** is not available in an SSR context, this hook will always return `null` (or the default value if supplied) on SSR/SSG.

This limitation doesn’t apply to the app router.


## [Caveats](#caveats)


### [Different parsers on the same key](#different-parsers-on-the-same-key)

Hooks are synced together on a per-key basis, so if you use different parsers on the same key, the last state update will be propagated to all other hooks using that key. It can lead to unexpected states like this:

```
const [int] = useQueryState('foo', parseAsInteger)
const [float, setFloat] = useQueryState('foo', parseAsFloat)
setFloat(1.234)
// `int` is now 1.234, instead of 1
```

We recommend you abstract a key/parser pair into a dedicated hook to avoid this, and derive any desired state from the value:

```
function useIntFloat() {
  const [float, setFloat] = useQueryState('foo', parseAsFloat)
  const int = Math.floor(float)
  return [{int, float}, setFloat] as const
}
```


## [Client components need to be wrapped in a `<Suspense>` boundary](#client-components-need-to-be-wrapped-in-a-suspense-boundary)

You may have encountered the following [error message](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout) from Next.js:

```
Missing Suspense boundary with useSearchParams
```

Components using hooks like `useQueryState` should be wrapped in `<Suspense>` when rendered within a page component. Adding the ‘use client’ directive to the page.tsx file is the immediate fix to get things working if you are defining components that use client-side features (like nuqs or React Hooks):

```
'use client'
export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  )
}
function Client() {
  const [foo, setFoo] = useQueryState('foo')
  // ...
}
```

However, the steps below indicate the optimal approach to get better UX: separating server and client files (and moving client side code as low down the tree as possible to pre-render the outer shell).

The recommended approach is:

1.  Keep page.tsx as a server component (no `'use client'` directive)
2.  Move client-side features into a separate client file.
3.  Wrap the client component in a `<Suspense>` boundary.

[

Testing

Some tips on testing components that use \`nuqs\`

](/docs/testing)[

SEO

Pitfalls and best practices for SEO with query strings

](/docs/seo)


### On this page

[Pages router](#pages-router)[Caveats](#caveats)[Different parsers on the same key](#different-parsers-on-the-same-key)[Client components need to be wrapped in a `<Suspense>` boundary](#client-components-need-to-be-wrapped-in-a-suspense-boundary)

---

---
url: https://nuqs.dev/docs/seo
title: SEO | nuqs
crawled: 2025-11-09T12:20:22.664Z
---

# SEO | nuqs

SEO | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)


# SEO

Pitfalls and best practices for SEO with query strings

If your page uses query strings for local-only state, you should add a canonical URL to your page, to tell SEO crawlers to ignore the query string and index the page without it.

In the Next.js app router, this is done via the metadata object:

```
import type { Metadata } from 'next'
export const metadata: Metadata = {
  alternates: {
    canonical: '/url/path/without/querystring'
  }
}
```

If however the query string is defining what content the page is displaying (eg: YouTube’s watch URLs, like `https://www.youtube.com/watch?v=dQw4w9WgXcQ`), your canonical URL should contain relevant query strings, and you can still use your parsers to read it, and to serialize the canonical URL.

/app/watch/page.tsx

```
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import {
  createParser,
  parseAsString,
  createLoader,
  createSerializer,
  type SearchParams,
  type UrlKeys
} from 'nuqs/server'
const youTubeVideoIdRegex = /^[^"&?\/\s]{11}$/i
const youTubeSearchParams = {
  videoId: createParser({
    parse(query) {
      if (!youTubeVideoIdRegex.test(query)) {
        return null
      }
      return query
    },
    serialize(videoId) {
      return videoId
    }
  })
}
const youTubeUrlKeys: UrlKeys<typeof youTubeSearchParams> = {
  videoId: 'v'
}
const loadYouTubeSearchParams = createLoader(
  youTubeSearchParams,
  {
    urlKeys: youTubeUrlKeys
  }
)
const serializeYouTubeSearchParams = createSerializer(
  youTubeSearchParams,
  {
    urlKeys: youTubeUrlKeys
  }
)
// --
type Props = {
  searchParams: Promise<SearchParams>
}
export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const { videoId } = await loadYouTubeSearchParams(searchParams)
  if (!videoId) {
    notFound()
  }
  return {
    alternates: {
      canonical: serializeYouTubeSearchParams('/watch', { videoId })
      // /watch?v=dQw4w9WgXcQ
    }
  }
}
```

[

Troubleshooting

Common issues and solutions

](/docs/troubleshooting)[

Tips and tricks

A collection of good practices and tips to help you get the most out of nuqs

](/docs/tips-tricks)

---

---
url: https://nuqs.dev/docs/tips-tricks
title: Tips and tricks | nuqs
crawled: 2025-11-09T12:20:25.901Z
---

# Tips and tricks | nuqs

Tips and tricks | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Tips and tricksReusing hooks


# Tips and tricks

A collection of good practices and tips to help you get the most out of nuqs


## [Reusing hooks](#reusing-hooks)

If you find yourself reusing the same hooks in multiple components, you can create a custom hook to encapsulate the parser configuration.

Tip

All query states bound to the same key will be synchronized across components.

hooks/useCoordinates.ts

```
'use client'
import { useQueryStates, parseAsFloat } from 'nuqs'
export function useCoordinates() {
  return useQueryStates({
    lat: parseAsFloat.withDefault(0),
    lng: parseAsFloat.withDefault(0),
  })
}
```

components/Map.tsx

```
'use client'
import { useCoordinates } from '../hooks/useCoordinates'
function MapView() {
  const [{ lat, lng }] = useCoordinates() // Read-only
  return (
    <div>
      Latitude: {lat}
      Longitude: {lng}
    </div>
  )
}
function MapControls() {
  const [{ lat, lng }, setCoordinates] = useCoordinates()
  return (
    <div>
      <input
        type="number"
        value={lat}
        onChange={(e) => setCoordinates({ lat: e.target.valueAsNumber })}
      />
      <input
        type="number"
        value={lng}
        onChange={(e) => setCoordinates({ lng: e.target.valueAsNumber })}
      />
    </div>
  )
}
```

[

SEO

Pitfalls and best practices for SEO with query strings

](/docs/seo)[

About

About the nuqs library

](/docs/about)


### On this page

[Reusing hooks](#reusing-hooks)

---

---
url: https://nuqs.dev/docs/about
title: About | nuqs
crawled: 2025-11-09T12:20:25.915Z
---

# About | nuqs

About | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

AboutLicense


# About

About the nuqs library


## [License](#license)

Released under the [MIT License](https://github.com/47ng/nuqs/blob/next/LICENSE), made with ❤️ by [François Best](https://francoisbest.com).

Using this package at work ? [Sponsor me](https://github.com/sponsors/franky47) to help with support and maintenance.


## [Contributors](#contributors)

![Project analytics and stats](https://repobeats.axiom.co/api/embed/3ee740e4729dce3992bfa8c74645cfebad8ba034.svg)


## [About the name](#about-the-name)


### [How is it pronounced?](#how-is-it-pronounced)

Up to you. I say “nucks” (like ducks 🦆🦆).


### [What does nuqs mean?](#what-does-nuqs-mean)

> **Never underestimate query strings**.

Kidding aside, it’s the initials of the original name package name, `Next-UseQueryState`, which was too long and annoying to type.

I realised after the fact that the word `nuqs` in Urdu & Arabic means “flaw” or “defect”. It’s a good reminder that:

> Perfection is a direction, not a destination.
> 
> — [James Wright](https://www.youtube.com/shorts/CH_d9lVRLWk)

I probably should have checked the meaning of the word before using it, and apologise to any Urdu/Arabic-speaking user who might find it offensive.

It’s also Klingon for “What?!”, the kind of reaction you get when you move from `useState` to URL state for the first time. 🖖

[

Tips and tricks

A collection of good practices and tips to help you get the most out of nuqs

](/docs/tips-tricks)[

Migration guide to v2

How to update your code to use nuqs@2.0.0

](/docs/migrations/v2)


### On this page

[License](#license)[Contributors](#contributors)[About the name](#about-the-name)[How is it pronounced?](#how-is-it-pronounced)[What does nuqs mean?](#what-does-nuqs-mean)

---

---
url: https://nuqs.dev/docs/migrations/v2
title: Migration guide to v2 | nuqs
crawled: 2025-11-09T12:20:25.948Z
---

# Migration guide to v2 | nuqs

Migration guide to v2 | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Migration guide to v2


# Migration guide to v2

How to update your code to use nuqs@2.0.0

Here’s a summary of the breaking changes in `nuqs@2.0.0`:

-   [Enable support for other React frameworks via **adapters**](#adapters)
-   [Behaviour changes](#behaviour-changes)
-   [ESM-only package](#esm-only)
-   [Deprecated exports have been removed](#deprecated-exports)
-   [Renamed `nuqs/parsers` to `nuqs/server`](#renamed-nuqsparsers-to-nuqsserver)
-   [Debug printout detection](#debug-printout-detection)
-   [Dropping `next-usequerystate`](#dropping-next-usequerystate)
-   [Type changes](#type-changes)


## [Adapters](#adapters)

The biggest change is that `nuqs@2.0.0` now supports other React frameworks, providing type-safe URL state for all.

You will need to wrap your app with the appropriate [adapter](/docs/adapters) for your framework or router, to let the hooks know how to interact with it.

Adapters are currently available for:

-   Next.js (app & pages routers)
-   React SPA
-   Remix
-   React Router
-   Testing environments (Vitest, Jest, etc.)

If you are coming from nuqs v1 (which only supported Next.js), you’ll need to wrap your app with the appropriate `NuqsAdapter`:


### [Next.js](#nextjs)

Minimum required version: next@>=14.2.0

Early versions of Next.js 14 were in flux with regards to shallow routing. Supporting those earlier versions required a lot of hacks, workarounds, and performance penalties, which were removed in `nuqs@2.0.0`.


#### [App router](#app-router)

src/app/layout.tsx

```
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'
export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```


#### [Pages router](#pages-router)

src/pages/\_app.tsx

```
import type { AppProps } from 'next/app'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
```


#### [Unified (router-agnostic)](#unified-router-agnostic)

If your Next.js app uses **both the app and pages routers** and the adapter needs to be mounted in either, you can import the unified adapter, at the cost of a slightly larger bundle size (~100B).

```
import { NuqsAdapter } from 'nuqs/adapters/next'
```


### [Other adapters](#other-adapters)

Albeit not part of a migration from v1, you can now use nuqs in other React frameworks via their respective [adapters](/docs/adapters).

However, there’s one more adapter that might be of interest to you, and solves a long-standing issue with testing components using nuqs hooks:


### [Testing adapter](#testing-adapter)

Unit-testing components that used nuqs v1 was a hassle, as it required mocking the Next.js router internals, causing abstraction leaks.

In v2, you can now wrap your components to test with the [`NuqsTestingAdapter`](/docs/testing), which provides a convenient setup & assertion API for your tests.

Here’s an example with Vitest & Testing Library:

counter-button-example.test.tsx

```
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NuqsTestingAdapter, type UrlUpdateEvent } from 'nuqs/adapters/testing'
import { describe, expect, it, vi } from 'vitest'
import { CounterButton } from './counter-button'
it('should increment the count when clicked', async () => {
  const user = userEvent.setup()
  const onUrlUpdate = vi.fn<[UrlUpdateEvent]>()
  render(<CounterButton />, {
    // Setup the test by passing initial search params / querystring:
    wrapper: ({ children }) => (
      <NuqsTestingAdapter searchParams="?count=1" onUrlUpdate={onUrlUpdate}>
        {children}
      </NuqsTestingAdapter>
    )
  })
  // Act
  const button = screen.getByRole('button')
  await user.click(button)
  // Assert changes in the state and in the (mocked) URL
  expect(button).toHaveTextContent('count is 2')
  expect(onUrlUpdate).toHaveBeenCalledOnce()
  expect(onUrlUpdate.mock.calls[0][0].queryString).toBe('?count=2')
  expect(onUrlUpdate.mock.calls[0][0].searchParams.get('count')).toBe('2')
  expect(onUrlUpdate.mock.calls[0][0].options.history).toBe('push')
})
```


## [Behaviour changes](#behaviour-changes)

Setting the `startTransition` option no longer sets `shallow: false` automatically. This is to align with other frameworks that don’t have a concept of shallow/deep routing.

You’ll have to set both to keep sending updates to the server and getting a loading state in Next.js:

```
useQueryState('q', {
  startTransition: true,
+ shallow: false
})
```

The `"use client"` directive was not included in the client import (`import {} from 'nuqs'`). It has now been added, meaning that server-side code needs to import from `nuqs/server` to avoid errors like:

```
Error: Attempted to call withDefault() from the server but withDefault is on
the client. It's not possible to invoke a client function from the server, it can
only be rendered as a Component or passed to props of a Client
Component.
```


## [ESM only](#esm-only)

`nuqs@2.0.0` is now an [ESM-only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) package. This should not be much of an issue since Next.js supports ESM in app code since version 12, but if you are bundling `nuqs` code into an intermediate CJS library to be consumed in Next.js, you’ll run into import issues:

```
[ERR_REQUIRE_ESM]: require() of ES Module not supported
```

If converting your library to ESM is not possible, your main option is to dynamically import `nuqs`:

```
const { useQueryState } = await import('nuqs')
```


## [Deprecated exports](#deprecated-exports)

Some of the v1 API was marked as deprecated back in September 2023, and has been removed in `nuqs@2.0.0`.


### [`queryTypes` parsers object](#querytypes-parsers-object)

The `queryTypes` object has been removed in favor of individual parser exports, for better tree-shaking.

Replace with `parseAsXYZ` to match:

```
- import { queryTypes } from 'nuqs'
+ import { parseAsString, parseAsInteger, ... } from 'nuqs'
- useQueryState('q',    queryTypes.string.withOptions({ ... }))
- useQueryState('page', queryTypes.integer.withDefault(1))
+ useQueryState('q',    parseAsString.withOptions({ ... }))
+ useQueryState('page', parseAsInteger.withDefault(1))
```


### [`subscribeToQueryUpdates`](#subscribetoqueryupdates)

Next.js 14.1.0 makes `useSearchParams` reactive to shallow search params updates, which makes this internal helper function redundant. See [#425](https://github.com/47ng/nuqs/pull/425) for context.


## [Renamed `nuqs/parsers` to `nuqs/server`](#renamed-nuqsparsers-to-nuqsserver)

When introducing the server cache in [#397](https://github.com/47ng/nuqs/pull/397), the dedicated export for parsers was reused as it didn’t include the `"use client"` directive. Since it now contains more than parsers and probably will be extended with server-only code in the future, it has been renamed to a clearer export name.

Find and replace all occurrences of `nuqs/parsers` to `nuqs/server` in your code:

```
- import { parseAsInteger, createSearchParamsCache } from 'nuqs/parsers'
+ import { parseAsInteger, createSearchParamsCache } from 'nuqs/server'
```


## [Debug printout detection](#debug-printout-detection)

After the rename to `nuqs`, the debugging printout detection logic handled either `next-usequerystate` or `nuqs` being present in the `localStorage.debug` variable. `nuqs@2.0.0` only checks for the presence of the `nuqs` substring to enable logs.

Update your local dev environments to match by running this once in the devtools console:

```
if (localStorage.debug) {
  localStorage.debug = localStorage.debug.replace('next-usequerystate', 'nuqs')
}
```


## [Dropping next-usequerystate](#dropping-next-usequerystate)

This package started under the name `next-usequerystate`, and was renamed to `nuqs` in January 2024. The old package name was kept as an alias for the v1 release line.

`nuqs` version 2 and onwards no longer mirror to the `next-usequerystate` package name.


## [Type changes](#type-changes)

The following breaking changes only apply to exported types:

-   The `Options` type is no longer generic
-   The `UseQueryStatesOptions` is now a type rather than an interface, and is now generic over the type of the object you pass to `useQueryStates`.
-   [`parseAsJson`](/docs/parsers/built-in#json) now requires a runtime validation function to infer the type of the parsed JSON data.

[

About

About the nuqs library

](/docs/about)


### On this page

[Adapters](#adapters)[Next.js](#nextjs)[App router](#app-router)[Pages router](#pages-router)[Unified (router-agnostic)](#unified-router-agnostic)[Other adapters](#other-adapters)[Testing adapter](#testing-adapter)[Behaviour changes](#behaviour-changes)[ESM only](#esm-only)[Deprecated exports](#deprecated-exports)[`queryTypes` parsers object](#querytypes-parsers-object)[`subscribeToQueryUpdates`](#subscribetoqueryupdates)[Renamed `nuqs/parsers` to `nuqs/server`](#renamed-nuqsparsers-to-nuqsserver)[Debug printout detection](#debug-printout-detection)[Dropping next-usequerystate](#dropping-next-usequerystate)[Type changes](#type-changes)

---

---
url: https://nuqs.dev/docs/parsers
title: Built-in parsers | nuqs
crawled: 2025-11-09T12:20:29.235Z
---

# Built-in parsers | nuqs

Built-in parsers | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Built-in parsers

Parsers


# Built-in parsers

When using strings is not enough

Search params are strings by default, but chances are your state is more complex than that.

You might want to use numbers, booleans, Dates, objects, arrays, or even custom types. This is where **parsers** come in.

`nuqs` provides built-in parsers for the most common types, and allows you to [define your own](/docs/parsers/making-your-own).


## [String](#string)

```
import { parseAsString } from 'nuqs'
```

```
<empty query>
```
Clear

Type-safety tip

`parseAsString` is a noop: it does not perform any validation when parsing, and will accept **any** value.

If you’re expecting a certain set of string values, like `'foo' | 'bar'`, see [Literals](#literals) for ensuring type-runtime safety.

If search params are strings by default, what’s the point of this *“parser”* ?

It becomes useful if you’re declaring a search params object, and/or you want to use the builder pattern to specify [default values](/docs/basic-usage#default-values) and [options](/docs/options):

```
export const searchParamsParsers = {
  q: parseAsString.withDefault('').withOptions({
    shallow: false
  })
}
```


## [Numbers](#numbers)


### [Integers](#integers)

Transforms the search param string into an integer with `parseInt` (base 10).

```
import { parseAsInteger } from 'nuqs'
useQueryState('int', parseAsInteger.withDefault(0))
```

```
<empty query>
```
Clear


### [Floating point](#floating-point)

Same as integer, but uses `parseFloat` under the hood.

```
import { parseAsFloat } from 'nuqs'
useQueryState('float', parseAsFloat.withDefault(0))
```

```
<empty query>
```
Clear


### [Hexadecimal](#hexadecimal)

Encodes integers in hexadecimal.

```
import { parseAsHex } from 'nuqs'
useQueryState('hex', parseAsHex.withDefault(0x00))
```

```
<empty query>
```
Clear

Going further

Check out the [Hex Colors](/playground/hex-colors) playground for a demo.


### [Index](#index)

Same as integer, but adds a `+1` offset to the serialized querystring (and `-1` when parsing). Useful for pagination indexes.

```
import { parseAsIndex } from 'nuqs'
const [pageIndex] = useQueryState('page', parseAsIndex.withDefault(0))
```

```
<empty query>
```

```

```
pageIndex: 0 // internal state is zero-indexed
```

```

Clear


## [Boolean](#boolean)

```
import { parseAsBoolean } from 'nuqs'
useQueryState('bool', parseAsBoolean.withDefault(false))
```

```
<empty query>
```
Checked: `false`Clear


## [Literals](#literals)

These parsers extend the basic integer and float parsers, but validate against some expected values, defined as [TypeScript literals](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).

```
import { parseAsStringLiteral, type inferParserType } from 'nuqs'
// Create parser
const parser = parseAsStringLiteral(['asc', 'desc'])
// Optional: extract the type
type SortOrder = inferParserType<typeof parser> // 'asc' | 'desc'
```

Should I declare values inline or outside the parser?

It depends®. Declaring them inline is shorter, and makes the parser the source of truth for type inference with `inferParserType`, but it locks the values inside the parser.

Declaring them outside allows reading and iterating over the values at runtime. Don’t forget to add `as const` though, otherwise the type will widen as a `string`.


### [String literals](#string-literals)

```
import { parseAsStringLiteral } from 'nuqs'
// List accepted values
const sortOrder = ['asc', 'desc'] as const
// Then pass it to the parser
parseAsStringLiteral(sortOrder)
```

```
<empty query>
```
No order definedClear


### [Numeric literals](#numeric-literals)

```
import { parseAsNumberLiteral } from 'nuqs'
parseAsNumberLiteral([1, 2, 3, 4, 5, 6])
```

```
import { parseAsNumberLiteral } from 'nuqs'
// List accepted values
const diceSides = [1, 2, 3, 4, 5, 6] as const
// Then pass it to the parser
parseAsNumberLiteral(diceSides)
```


## [Enums](#enums)

String enums are a bit more verbose than string literals, but `nuqs` supports them.

```
enum Direction {
  up = 'UP',
  down = 'DOWN',
  left = 'LEFT',
  right = 'RIGHT'
}
parseAsStringEnum<Direction>(Object.values(Direction))
```

Note

The query string value will be the **value** of the enum, not its name (here: `?direction=UP`).


## [Dates & timestamps](#dates--timestamps)

There are three parsers that give you a `Date` object, their difference is on how they encode the value into the query string.


### [ISO 8601 Datetime](#iso-8601-datetime)

```
import { parseAsIsoDateTime } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear


### [ISO 8601 Date](#iso-8601-date)

Introduced in version **2.1.0**.

![TanStack Router](/tanstack-logo.png)

```
import { parseAsIsoDate } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear

The Date is parsed without the time zone offset, making it at 00:00:00 UTC.


### [Timestamp](#timestamp)

Miliseconds since the Unix epoch.

```
import { parseAsTimestamp } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear


## [Arrays](#arrays)

All of the parsers on this page can be used to parse arrays of their respective types.

```
import { parseAsArrayOf, parseAsInteger } from 'nuqs'
parseAsArrayOf(parseAsInteger)
// Optionally, customise the separator
parseAsArrayOf(parseAsInteger, ';')
```


## [JSON](#json)

If primitive types are not enough, you can encode JSON in the query string.

Pass it a [Standard Schema](https://standardschema.dev) (eg: a Zod schema) to validate and infer the type of the parsed data:

```
import { parseAsJson } from 'nuqs'
import { z } from 'zod'
const schema = z.object({
  pkg: z.string(),
  version: z.number(),
  worksWith: z.array(z.string())
})
// This parser is a function, don't forget to call it
// with your schema as an argument.
const [json, setJson] = useQueryState('json', parseAsJson(schema))
setJson({
  pkg: 'nuqs',
  version: 2,
  worksWith: ['Next.js', 'React', 'Remix', 'React Router', 'and more']
})
```

```
<empty query>
```
```
null
```
Try itClear

Using other validation libraries is possible: `parseAsJson` accepts any Standard Schema compatible input (eg: ArkType, Valibot), or a custom validation function (eg: Yup, Joi, etc):

```
import { object, string, number } from 'yup';
let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
});
parseAsJson(userSchema.validateSync)
```

Note

Validation functions must either throw an error or return `null` for invalid data. Only **synchronous** validation is supported.


## [Native Arrays](#native-arrays)

Introduced in version **2.7.0**.

![TanStack Router](/tanstack-logo.png)

If you want to use the native URL format for arrays, repeating the same key multiple times like:

```
/products?tag\=books&tag\=tech&tag\=design
```

you can now use `MultiParsers` like `parseAsNativeArrayOf` to read and write those values in a fully type-safe way.

```
import { useQueryState, parseAsNativeArrayOf, parseAsInteger } from 'nuqs'
const [projectIds, setProjectIds] = useQueryState(
  'project',
  parseAsNativeArrayOf(parseAsInteger)
)
// ?project=123&project=456 → [123, 456]
```

```
<empty query>
```
Add random numberRemove last numberClear

```

```
[]
```

```

Note: empty array default

`parseAsNativeArrayOf` has a built-in default value of empty array (`.withDefault([])`) so that you don’t have to handle `null` cases.

Calls to `.withDefault()` can be chained, so you can use it to set a custom default.


## [Using parsers server-side](#using-parsers-server-side)

For shared code that may be imported in the Next.js app router, you should import parsers from `nuqs/server` to use them in both server & client code, as it doesn’t include the `'use client'` directive.

```
import { parseAsString } from 'nuqs/server'
```

Importing from `nuqs` will only work in client code, and will throw bundling errors when using functions (like `.withDefault` & `.withOptions`) across shared code.

For all other frameworks, you can use either interchangeably, as they don’t care about the `'use client'` directive.

[

Basic usage

Replacing React.useState with useQueryState

](/docs/basic-usage)[

Custom parsers

Making your own parsers for custom data types & pretty URLs

](/docs/parsers/making-your-own)


### On this page

[String](#string)[Numbers](#numbers)[Integers](#integers)[Floating point](#floating-point)[Hexadecimal](#hexadecimal)[Index](#index)[Boolean](#boolean)[Literals](#literals)[String literals](#string-literals)[Numeric literals](#numeric-literals)[Enums](#enums)[Dates & timestamps](#dates--timestamps)[ISO 8601 Datetime](#iso-8601-datetime)[ISO 8601 Date](#iso-8601-date)[Timestamp](#timestamp)[Arrays](#arrays)[JSON](#json)[Native Arrays](#native-arrays)[Using parsers server-side](#using-parsers-server-side)

---

---
url: https://nuqs.dev/docs/parsers/built-in
title: Built-in parsers | nuqs
crawled: 2025-11-09T12:20:29.004Z
---

# Built-in parsers | nuqs

Built-in parsers | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Built-in parsers

Parsers


# Built-in parsers

When using strings is not enough

Search params are strings by default, but chances are your state is more complex than that.

You might want to use numbers, booleans, Dates, objects, arrays, or even custom types. This is where **parsers** come in.

`nuqs` provides built-in parsers for the most common types, and allows you to [define your own](/docs/parsers/making-your-own).


## [String](#string)

```
import { parseAsString } from 'nuqs'
```

```
<empty query>
```
Clear

Type-safety tip

`parseAsString` is a noop: it does not perform any validation when parsing, and will accept **any** value.

If you’re expecting a certain set of string values, like `'foo' | 'bar'`, see [Literals](#literals) for ensuring type-runtime safety.

If search params are strings by default, what’s the point of this *“parser”* ?

It becomes useful if you’re declaring a search params object, and/or you want to use the builder pattern to specify [default values](/docs/basic-usage#default-values) and [options](/docs/options):

```
export const searchParamsParsers = {
  q: parseAsString.withDefault('').withOptions({
    shallow: false
  })
}
```


## [Numbers](#numbers)


### [Integers](#integers)

Transforms the search param string into an integer with `parseInt` (base 10).

```
import { parseAsInteger } from 'nuqs'
useQueryState('int', parseAsInteger.withDefault(0))
```

```
<empty query>
```
Clear


### [Floating point](#floating-point)

Same as integer, but uses `parseFloat` under the hood.

```
import { parseAsFloat } from 'nuqs'
useQueryState('float', parseAsFloat.withDefault(0))
```

```
<empty query>
```
Clear


### [Hexadecimal](#hexadecimal)

Encodes integers in hexadecimal.

```
import { parseAsHex } from 'nuqs'
useQueryState('hex', parseAsHex.withDefault(0x00))
```

```
<empty query>
```
Clear

Going further

Check out the [Hex Colors](/playground/hex-colors) playground for a demo.


### [Index](#index)

Same as integer, but adds a `+1` offset to the serialized querystring (and `-1` when parsing). Useful for pagination indexes.

```
import { parseAsIndex } from 'nuqs'
const [pageIndex] = useQueryState('page', parseAsIndex.withDefault(0))
```

```
<empty query>
```

```

```
pageIndex: 0 // internal state is zero-indexed
```

```

Clear


## [Boolean](#boolean)

```
import { parseAsBoolean } from 'nuqs'
useQueryState('bool', parseAsBoolean.withDefault(false))
```

```
<empty query>
```
Checked: `false`Clear


## [Literals](#literals)

These parsers extend the basic integer and float parsers, but validate against some expected values, defined as [TypeScript literals](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).

```
import { parseAsStringLiteral, type inferParserType } from 'nuqs'
// Create parser
const parser = parseAsStringLiteral(['asc', 'desc'])
// Optional: extract the type
type SortOrder = inferParserType<typeof parser> // 'asc' | 'desc'
```

Should I declare values inline or outside the parser?

It depends®. Declaring them inline is shorter, and makes the parser the source of truth for type inference with `inferParserType`, but it locks the values inside the parser.

Declaring them outside allows reading and iterating over the values at runtime. Don’t forget to add `as const` though, otherwise the type will widen as a `string`.


### [String literals](#string-literals)

```
import { parseAsStringLiteral } from 'nuqs'
// List accepted values
const sortOrder = ['asc', 'desc'] as const
// Then pass it to the parser
parseAsStringLiteral(sortOrder)
```

```
<empty query>
```
No order definedClear


### [Numeric literals](#numeric-literals)

```
import { parseAsNumberLiteral } from 'nuqs'
parseAsNumberLiteral([1, 2, 3, 4, 5, 6])
```

```
import { parseAsNumberLiteral } from 'nuqs'
// List accepted values
const diceSides = [1, 2, 3, 4, 5, 6] as const
// Then pass it to the parser
parseAsNumberLiteral(diceSides)
```


## [Enums](#enums)

String enums are a bit more verbose than string literals, but `nuqs` supports them.

```
enum Direction {
  up = 'UP',
  down = 'DOWN',
  left = 'LEFT',
  right = 'RIGHT'
}
parseAsStringEnum<Direction>(Object.values(Direction))
```

Note

The query string value will be the **value** of the enum, not its name (here: `?direction=UP`).


## [Dates & timestamps](#dates--timestamps)

There are three parsers that give you a `Date` object, their difference is on how they encode the value into the query string.


### [ISO 8601 Datetime](#iso-8601-datetime)

```
import { parseAsIsoDateTime } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear


### [ISO 8601 Date](#iso-8601-date)

Introduced in version **2.1.0**.

![TanStack Router](/tanstack-logo.png)

```
import { parseAsIsoDate } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear

The Date is parsed without the time zone offset, making it at 00:00:00 UTC.


### [Timestamp](#timestamp)

Miliseconds since the Unix epoch.

```
import { parseAsTimestamp } from 'nuqs'
```

```
<empty query>
```

UTC

NowClear


## [Arrays](#arrays)

All of the parsers on this page can be used to parse arrays of their respective types.

```
import { parseAsArrayOf, parseAsInteger } from 'nuqs'
parseAsArrayOf(parseAsInteger)
// Optionally, customise the separator
parseAsArrayOf(parseAsInteger, ';')
```


## [JSON](#json)

If primitive types are not enough, you can encode JSON in the query string.

Pass it a [Standard Schema](https://standardschema.dev) (eg: a Zod schema) to validate and infer the type of the parsed data:

```
import { parseAsJson } from 'nuqs'
import { z } from 'zod'
const schema = z.object({
  pkg: z.string(),
  version: z.number(),
  worksWith: z.array(z.string())
})
// This parser is a function, don't forget to call it
// with your schema as an argument.
const [json, setJson] = useQueryState('json', parseAsJson(schema))
setJson({
  pkg: 'nuqs',
  version: 2,
  worksWith: ['Next.js', 'React', 'Remix', 'React Router', 'and more']
})
```

```
<empty query>
```
```
null
```
Try itClear

Using other validation libraries is possible: `parseAsJson` accepts any Standard Schema compatible input (eg: ArkType, Valibot), or a custom validation function (eg: Yup, Joi, etc):

```
import { object, string, number } from 'yup';
let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
});
parseAsJson(userSchema.validateSync)
```

Note

Validation functions must either throw an error or return `null` for invalid data. Only **synchronous** validation is supported.


## [Native Arrays](#native-arrays)

Introduced in version **2.7.0**.

![TanStack Router](/tanstack-logo.png)

If you want to use the native URL format for arrays, repeating the same key multiple times like:

```
/products?tag\=books&tag\=tech&tag\=design
```

you can now use `MultiParsers` like `parseAsNativeArrayOf` to read and write those values in a fully type-safe way.

```
import { useQueryState, parseAsNativeArrayOf, parseAsInteger } from 'nuqs'
const [projectIds, setProjectIds] = useQueryState(
  'project',
  parseAsNativeArrayOf(parseAsInteger)
)
// ?project=123&project=456 → [123, 456]
```

```
<empty query>
```
Add random numberRemove last numberClear

```

```
[]
```

```

Note: empty array default

`parseAsNativeArrayOf` has a built-in default value of empty array (`.withDefault([])`) so that you don’t have to handle `null` cases.

Calls to `.withDefault()` can be chained, so you can use it to set a custom default.


## [Using parsers server-side](#using-parsers-server-side)

For shared code that may be imported in the Next.js app router, you should import parsers from `nuqs/server` to use them in both server & client code, as it doesn’t include the `'use client'` directive.

```
import { parseAsString } from 'nuqs/server'
```

Importing from `nuqs` will only work in client code, and will throw bundling errors when using functions (like `.withDefault` & `.withOptions`) across shared code.

For all other frameworks, you can use either interchangeably, as they don’t care about the `'use client'` directive.

[

Basic usage

Replacing React.useState with useQueryState

](/docs/basic-usage)[

Custom parsers

Making your own parsers for custom data types & pretty URLs

](/docs/parsers/making-your-own)


### On this page

[String](#string)[Numbers](#numbers)[Integers](#integers)[Floating point](#floating-point)[Hexadecimal](#hexadecimal)[Index](#index)[Boolean](#boolean)[Literals](#literals)[String literals](#string-literals)[Numeric literals](#numeric-literals)[Enums](#enums)[Dates & timestamps](#dates--timestamps)[ISO 8601 Datetime](#iso-8601-datetime)[ISO 8601 Date](#iso-8601-date)[Timestamp](#timestamp)[Arrays](#arrays)[JSON](#json)[Native Arrays](#native-arrays)[Using parsers server-side](#using-parsers-server-side)

---

---
url: https://nuqs.dev/docs/parsers/making-your-own
title: Custom parsers | nuqs
crawled: 2025-11-09T12:20:28.988Z
---

# Custom parsers | nuqs

Custom parsers | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Custom parsers

Parsers


# Custom parsers

Making your own parsers for custom data types & pretty URLs

You may wish to customise the rendered query string for your data type. For this, `nuqs` exposes the `createParser` function to make your own parsers.

You pass it two functions:

1.  `parse`: a function that takes a string and returns the parsed value, or `null` if invalid.
2.  `serialize`: a function that takes the parsed value and returns a string.

```
import { createParser } from 'nuqs'
const parseAsStarRating = createParser({
  parse(queryValue) {
    const inBetween = queryValue.split('★')
    const isValid = inBetween.length > 1 && inBetween.every(s => s === '')
    if (!isValid) return null
    const numStars = inBetween.length - 1
    return Math.min(5, numStars)
  },
  serialize(value) {
    return Array.from({length: value}, () => '★').join('')
  }
})
```

```
<empty query>
```

Clear


## [Equality function](#equality-function)

For state types that can’t be compared by the `===` operator, you’ll need to provide an `eq` function as well:

```

// Eg: TanStack Table sorting state
// /?sort=foo:asc → { id: 'foo', desc: false }
const parseAsSort = createParser({
  parse(query) {
    const [key = '', direction = ''] = query.split(':')
    const desc = parseAsStringLiteral(['asc', 'desc']).parse(direction) ?? 'asc'
    return {
      id: key,
      desc: desc === 'desc'
    }
  },
  serialize(value) {
    return `${value.id}:${value.desc ? 'desc' : 'asc'}`
  },
  eq(a, b) {
    return a.id === b.id && a.desc === b.desc
  }
})
```

This is used for the [`clearOnDefault`](/docs/options#clear-on-default) option, to check if the current value is equal to the default value.


## [Custom Multi Parsers](#custom-multi-parsers)

The parsers we’ve seen until now are `SingleParsers`: they operate on **the first occurence** of the key in the URL, and give you a string value to parse when it’s available.

`MultiParsers` work similar to `SingleParsers`, except that they operate on arrays, to support **key repetition**:

```
/?tag\=type-safe&tag\=url-state&tag\=react
```

This means:

1.  `parse` takes an `Array<string>`. It receives all matching values of the key it operates on, and returns the parsed value, or `null` if invalid.
2.  `serialize` takes the parsed value and returns an `Array<string>`, where each item will be separately added to the URL.

You can then compose & reduce this array to form **complex data types**:

```
<empty query>
```

Rating:

Price From:

Price To:

Clear

```
/**
 * 100~200 <=> { gte: 100, lte: 200 }
 * 150     <=> { eq: 150 }
 */
const parseAsFromTo = createParser({
  parse: value => {
    const [min = null, max = null] = value.split('~').map(parseAsInteger.parse)
    if (min === null) return null
    if (max === null) return { eq: min }
    return { gte: min, lte: max }
  },
  serialize: value => {
    return value.eq !== undefined ? String(value.eq) : `${value.gte}~${value.lte}`
  }
})
/**
 * foo:bar <=> { key: 'foo', value: 'bar' }
 */
const parseAsKeyValue = createParser({
  parse: value => {
    const [key, val] = value.split(':')
    if (!key || !val) return null
    return { key, value: val }
  },
  serialize: value => {
    return `${value.key}:${value.value}`
  }
})
const parseAsFilters = <TItem extends {}>(itemParser: SingleParser<TItem>) => {
  return createMultiParser({
    parse: values => {
      const keyValue = values.map(parseAsKeyValue.parse).filter(v => v !== null)
      const result = Object.fromEntries(
        keyValue.flatMap(({ key, value }) => {
          const parsedValue: TItem | null = itemParser.parse(value)
          return parsedValue === null ? [] : [[key, parsedValue]]
        })
      )
      return Object.keys(result).length === 0 ? null : result
    },
    serialize: values => {
      return Object.entries(values).map(([key, value]) => {
        if (!itemParser.serialize) return null
        return parseAsKeyValue.serialize({ key, value: itemParser.serialize(value) })
      }).filter(v => v !== null)
    }
  })
}
const [filters, setFilters] = useQueryState(
  'filters',
  parseAsFilters(parseAsFromTo).withDefault({})
)
```


## [Caveat: lossy serializers](#caveat-lossy-serializers)

If your serializer loses precision or doesn’t accurately represent the underlying state value, you will lose this precision when reloading the page or restoring state from the URL (eg: on navigation).

Example:

```
const geoCoordParser = {
  parse: parseFloat,
  serialize: v => v.toFixed(4) // Loses precision
}
const [lat, setLat] = useQueryState('lat', geoCoordParser)
```

Here, setting a latitude of 1.23456789 will render a URL query string of `lat=1.2345`, while the internal `lat` state will be correctly set to 1.23456789.

Upon reloading the page, the state will be incorrectly set to 1.2345.

[

Built-in parsers

When using strings is not enough

](/docs/parsers/built-in)[

TanStack Table Parsers

Store your table state in the URL, with style.

](/docs/parsers/community/tanstack-table)


### On this page

[Equality function](#equality-function)[Custom Multi Parsers](#custom-multi-parsers)[Caveat: lossy serializers](#caveat-lossy-serializers)

---

---
url: https://nuqs.dev/docs/parsers/community/zod-codecs
title: Zod codecs | nuqs
crawled: 2025-11-09T12:20:32.200Z
---

# Zod codecs | nuqs

Zod codecs | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[TanStack Table Parsers](/docs/parsers/community/tanstack-table)[Effect Schema Parsers](/docs/parsers/community/effect-schema)[Zod codecs](/docs/parsers/community/zod-codecs)

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Zod codecs

ParsersCommunity


# Zod codecs

Using Zod codecs for (de)serialisation in custom nuqs parser

Since `zod@^4.1`, you can use [codecs](https://zod.dev/codecs) to add bidirectional serialisation / deserialisation to your validation schemas:

```
import { z } from 'zod'
// Similar to parseAsTimestamp in nuqs:
const dateTimestampCodec = z.codec(z.string().regex(/^\d+$/), z.date(), {
  decode: (query) => new Date(parseInt(query)),
  encode: (date) => date.valueOf().toFixed()
})
```


## [Demo](#demo)

Zod Codecs Demo

This demo shows how Zod codecs can transform complex data structures into URL-safe strings using base64url encoding and JSON serialization.

Name

Age

RandomizeClear

Encoded in the URL:

```
<empty query>
```

Current Data:

```

```
{
  "name": "John Doe",
  "age": 42
}
```

```

**How it works**

On write (updating the URL):

1.  User object is JSON stringified
2.  JSON string is encoded as UTF-8 bytes
3.  Bytes are encoded as base64url string
4.  Result is stored in the URL query parameter

On read, the process is reversed to decode the URL string back into the original object.

Source code:

```

```
import { createParser } from 'nuqs/server'
import { z } from 'zod'
function createZodCodecParser<
  Input extends z.ZodCoercedString<string> | z.ZodPipe<any, any>,
  Output extends z.ZodType
>(
  codec: z.ZodCodec<Input, Output> | z.ZodPipe<Input, Output>,
  eq: (a: z.output<Output>, b: z.output<Output>) => boolean = (a, b) => a === b
) {
  return createParser<z.output<Output>>({
    parse(query) {
      return codec.parse(query)
    },
    serialize(value) {
      return codec.encode(value)
    },
    eq
  })
}
// --
// All parsers from the Zod docs:
const jsonCodec = <T extends z.core.$ZodType>(schema: T) =>
  z.codec(z.string(), schema, {
    decode: (jsonString, ctx) => {
      try {
        return JSON.parse(jsonString)
      } catch (err: any) {
        ctx.issues.push({
          code: 'invalid_format',
          format: 'json',
          input: jsonString,
          message: err.message
        })
        return z.NEVER
      }
    },
    encode: value => JSON.stringify(value)
  })
const base64urlToBytes = z.codec(z.base64url(), z.instanceof(Uint8Array), {
  decode: base64urlString => z.util.base64urlToUint8Array(base64urlString),
  encode: bytes => z.util.uint8ArrayToBase64url(bytes)
})
const utf8ToBytes = z.codec(z.string(), z.instanceof(Uint8Array), {
  decode: str => new TextEncoder().encode(str),
  encode: bytes => new TextDecoder().decode(bytes)
})
const bytesToUtf8 = invertCodec(utf8ToBytes)
// --
function invertCodec<A extends z.ZodType, B extends z.ZodType>(
  codec: z.ZodCodec<A, B>
): z.ZodCodec<B, A> {
  return z.codec<B, A>(codec.out, codec.in, {
    decode(value, ctx) {
      try {
        return codec.encode(value)
      } catch (err) {
        ctx.issues.push({
          code: 'invalid_format',
          format: 'invert.decode',
          input: String(value),
          message: err instanceof z.ZodError ? err.message : String(err)
        })
        return z.NEVER
      }
    },
    encode(value, ctx) {
      try {
        return codec.decode(value)
      } catch (err) {
        ctx.issues.push({
          code: 'invalid_format',
          format: 'invert.encode',
          input: String(value),
          message: err instanceof z.ZodError ? err.message : String(err)
        })
        return z.NEVER
      }
    }
  })
}
// --
const userSchema = z.object({
  name: z.string(),
  age: z.number()
})
// Composition always wins.
const codec = base64urlToBytes.pipe(bytesToUtf8).pipe(jsonCodec(userSchema))
export const userJsonBase64Parser = createZodCodecParser(
  codec,
  (a, b) => a === b || (a.name === b.name && a.age === b.age)
)
```

```


## [Refinements](#refinements)

The cool part is being able to add string constraints to the first type in a codec. It has to be rooted as a string data type (because that’s what the URL will give us), but you can add **refinements**:

```
z.codec(z.uuid(), ...)
z.codec(z.email(), ...)
z.codec(z.base64url(), ...)
```

See the [complete list](https://zod.dev/api?id=string-formats) of string-based refinements you can use.

Caveats

As stated in the Zod docs, you [cannot use transforms in codecs](https://zod.dev/codecs#transforms).

[

Effect Schema Parsers

Use Effect Schema to parse and serialize URL state.

](/docs/parsers/community/effect-schema)[

Options

Configuring nuqs

](/docs/options)


### On this page

[Demo](#demo)[Refinements](#refinements)

---

---
url: https://nuqs.dev/docs/parsers/community/tanstack-table
title: TanStack Table Parsers | nuqs
crawled: 2025-11-09T12:20:32.315Z
---

# TanStack Table Parsers | nuqs

TanStack Table Parsers | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[TanStack Table Parsers](/docs/parsers/community/tanstack-table)[Effect Schema Parsers](/docs/parsers/community/effect-schema)[Zod codecs](/docs/parsers/community/zod-codecs)

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

TanStack Table Parsers

ParsersCommunity


# TanStack Table Parsers

Store your table state in the URL, with style.

[TanStack Table](https://tanstack.com/table) is a popular library for managing tabular content in React (and other frameworks).

By default, it will store its state in memory, losing all filters, sorts and pagination when the page is refreshed. This is a prime example where URL state shines.


## [Pagination](#pagination)

TanStack Table stores pagination under two pieces of state:

-   `pageIndex`: a zero-based integer representing the current page
-   `pageSize`: an integer representing the number of items per page

You will likely want the URL to follow your UI and be one-based for the page index:

Items per page10

Configure and copy-paste this parser into your application:

search-params.pagination.ts

```

```
import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates
} from 'nuqs'
const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10)
}
const paginationUrlKeys = {
  pageIndex: 'page',
  pageSize: 'perPage'
}
export function usePaginationSearchParams() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys
  })
}
```

```

```
?page\=1&perPage\=10
```

Internal state

```

```
{
  // zero-indexed
  pageIndex: 0,
  pageSize: 10
}
```

```

Page index URL key

Page size URL key


## [Filtering](#filtering)

This section is empty for now, [contributions](https://github.com/47ng/nuqs) are welcome!


## [Sorting](#sorting)

This section is empty for now, [contributions](https://github.com/47ng/nuqs) are welcome!

[

Custom parsers

Making your own parsers for custom data types & pretty URLs

](/docs/parsers/making-your-own)[

Effect Schema Parsers

Use Effect Schema to parse and serialize URL state.

](/docs/parsers/community/effect-schema)


### On this page

[Pagination](#pagination)[Filtering](#filtering)[Sorting](#sorting)

---

---
url: https://nuqs.dev/docs/parsers/community/effect-schema
title: Effect Schema Parsers | nuqs
crawled: 2025-11-09T12:20:35.333Z
---

# Effect Schema Parsers | nuqs

Effect Schema Parsers | nuqs

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

Getting started

[Installation](/docs/installation)[Adapters](/docs/adapters)[Basic usage](/docs/basic-usage)

Guide

Parsers

[Built-in parsers](/docs/parsers/built-in)[Custom parsers](/docs/parsers/making-your-own)

Community

[TanStack Table Parsers](/docs/parsers/community/tanstack-table)[Effect Schema Parsers](/docs/parsers/community/effect-schema)[Zod codecs](/docs/parsers/community/zod-codecs)

[Options](/docs/options)[useQueryStates](/docs/batching)[Server-Side usage](/docs/server-side)[Limits](/docs/limits)

Going further

[Utilities](/docs/utilities)[Debugging](/docs/debugging)[Testing](/docs/testing)[Troubleshooting](/docs/troubleshooting)[SEO](/docs/seo)[Tips and tricks](/docs/tips-tricks)[About](/docs/about)[Migration guide to v2](/docs/migrations/v2)

[](https://github.com/47ng/nuqs)

[nuqs](/)

Search

⌘K

[Documentation](/docs)[Playground](/playground)[Registry](/registry)[Blog](/blog)

[](https://github.com/47ng/nuqs)

Effect Schema Parsers

ParsersCommunity


# Effect Schema Parsers

Use Effect Schema to parse and serialize URL state.

[Effect](https://effect.website) is a popular TypeScript framework, with its own schema validation library: [Effect Schema](https://effect.website/docs/schema/introduction/)

Effect Schemas have the unique property of encoding two way transformations between different types. This makes them a perfect fit for using in a nuqs parser.

```
import { createParser } from 'nuqs'
import { Schema, Either, Equal } from 'effect'
function createSchemaParser<T, E extends string>(schema: Schema.Schema<T, E>) {
  const encoder = Schema.encodeUnknownEither(schema);
  const decoder = Schema.decodeUnknownEither(schema);
  return createParser({
    parse: (queryValue) => {
      const result = decoder(queryValue);
      return Either.getOrNull(result);
    },
    serialize: (value) => {
      const result = encoder(value);
      return Either.getOrThrowWith(
        result,
        (cause) =>
          new Error(`Failed to encode value: ${value}`, {
            cause,
          }),
      );
    },
    eq: (a, b) => Equal.equals(a, b),
  });
}
```


## [Example](#example)

```
import { Schema } from 'effect'
class User extends Schema.Class<User>('User')({
  name: Schema.String,
  age: Schema.Positive
}) {}
const ToBase64UrlEncodedJson = Schema.compose(Schema.StringFromBase64Url, Schema.parseJson())
const schema = Schema.compose(ToBase64UrlEncodedJson, User)
const parser = createSchemaParser(schema).withDefault(new User({ name: 'John Vim', age: 25 }))
const [user, setUser] = useQueryState('user', parser)
```


## [Interactive Demo](#interactive-demo)

```
<empty query>
```

Name

Age (positive integer)

Parsed User Object

```

```
{
  "name": "John Vim",
  "age": 25
}
```

```

Clear

[

TanStack Table Parsers

Store your table state in the URL, with style.

](/docs/parsers/community/tanstack-table)[

Zod codecs

Using Zod codecs for (de)serialisation in custom nuqs parser

](/docs/parsers/community/zod-codecs)


### On this page

[Example](#example)[Interactive Demo](#interactive-demo)