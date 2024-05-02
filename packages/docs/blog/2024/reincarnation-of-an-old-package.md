---
slug: reincarnation-of-an-old-package
title: Reincarnation of an old package
authors: glyphcat
tags: [react, react-relink]
date: 2024-03-31
---

In 2020, [`react-relink`](https://github.com/glyph-cat/react-relink) was released. It was heavily inspired by [`recoil`](https://github.com/facebookexperimental/Recoil) and had a similar API design.

<br/>

`react-relink` was created with the goals of:

1. not needing to wrap components in [Providers](https://react.dev/reference/react/createContext#provider) while still allowing states to be shared across different React components trees, and
2. make it easy to transition from `recoil` by introducing similar concepts and APIs.

<br/>

As time goes on, the concepts of `recoil` were slowly disregarded, new features were added, and `react-relink` began to evolve into a state management library of it's own.

<br/>

At that point, there were three main problems...
<!-- truncate -->
- The codebase became bloated and difficult to maintain
- It became so slow, that in some scenarios, it results in very noticeable lagging
- There was no easy way to use `react-relink` as a state management tool outside of React because the dependencies are tied together.

<br/>

Eventually, the better solution was to create ~~a new package~~ two new packages —
a core package and another one for its React bindings. This allows non-React projects to use this new state management library without needing to install [`react`](https://www.npmjs.com/package/react) as a dependency, and the core package is called `cotton-box`.

`cotton-box` exposes three different types of State Managers that are built on top of one another for different needs:
- `SimpleStateManager` — the most lightweight state manager
- `StateManager` - generic state manager with lifecycle hooks for persisting data
- `AsyncStateManager` - similar to `StateManager` but supports async set-state functions

More information on the differences between these State Managers are available [here](/cotton-box/docs/learn/tutorial/which-state-manager-should-i-use).

If you're migrating from `react-relink`, it is highly recommended to check out the [migration guide](/cotton-box/docs/learn/react/migration-from-react-relink).
