---
slug: v1-is-finally-out
authors: glyphcat
tags: []
date: 2026-03-20
---

# v1 is finally out

Hello there, it's been quite a while. Two years, in fact, since the first blog post. In this one, I will be writing from an "author's note" perspective.

After countless rounds of testing, observation, and tweaking, Cotton Box's API has finally become stable enough that breaking changes no longer need to be introduced in every new release.

<!-- truncate -->

## Recap
It was originally created as the successor of React Relink with a cleaner API, faster performance, and independence from React. However, it remained experimental and there was no concrete roadmap for further development.

## The Current Situation
After testing it with some of my private side projects (from simple form applications, to projects with [Live2D](https://www.live2d.com) integration, and even to VR games that use [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/guide) + [`react-three-fiber`](https://r3f.docs.pmnd.rs/getting-started/introduction)), the results have been quite satisfactory. There were almost no lags, and even when there were, state management was never the bottleneck.

Combining the above factor with the fact that there is now a stable pattern in how the library can be used / how it should be used, it made sense to do some cleanup, remove some deprecated APIs, and release it as v1.

## Future Plans
The APIs of this library will remain fairly consistent unless a future version of React with breaking changes is introduced or if any bug/vulnerability has been found. 

Of course, there's also the experimental `<HydrateStateManager>` component, which is not listed in the documentation intentionally. More time is needed to test this out. Considering the purpose of this library, it is deemed near-complete, with only some rare cases that require writing custom React hooks as a workaround.

I intend to keep this library simple and lightweight. However, feature suggestions are always welcomed, and I will consider adding them as long as they make sense and do not compromise performance.

## Closing Note
Though this is not a popular library since its first release and neither is it at the time of writing. To anyone who comes across this post or has been using Cotton Box, thank you for putting your trust in this literally nameless state management library. I hope you continue to use and support it, and may you always find it a joy to use Cotton Box in your projects.
