---
title: React 性能
layout: post
date:   2016-06-16 23:05:00 +0800
categories: js
excerpt: React 中提高性能的方式
---

## Use the production build

使用压缩版 react rect-dom 文件

## 避免同步 DOM

React 使用 *virtual DOM* —— 一个 DOM 子树描述，渲染到浏览器里。它操作的是 javascript 对象，比直接创建 DOM 和访问 DOM 节点快得多。当 props 或 state 改变时，React 通过构建一个新的 virtual DOM 和旧的比较来决定是否实际更新。只有两者不同时才会更新，来尽量减少变更。

在此之上，React 提供了一个 component 生命周期函数，`shouldComponentUpdate`，在重新渲染（virtual DOM 比较和eventual DOM reconciliation）之前触发，让开发者有时机来减小重回处理。
该方法默认返回 true。

*需要注意这个方法可能会被频繁调用，所以处理函数务必高效。*

总之，React 采用 `shouldComponentUpdate` 来减少 DOM 子树操作，将需要更新的 DOM 通过比较 virtual DOM，来减少昂贵的 DOM 操作。

## Immutable-js to the rescue (immutable-js 来解救)

[Immutable-js](https://github.com/facebook/immutable-js) 是 facebook 开源的，由 Lee Byron 编写的一个 JavaScript 集合库。它通过 *解构共享（structural sharing）* 来创建 *不可修改的持久的* 集合。
其特点：

- **Immutable**: 不可修改
- **Persistent**: 新集合可以依照原集合创建，变更同时设置。新集合创建后原集合依然有效
- **Structural Sharing**: 新集合和原集合尽量保持结构一致。减少拷贝，达到一个空间和性能都可接受的范围。如果新集合与原集合相等，往往直接返回原集合。

不可修改性使得追踪变更变得高效。一个变更往往返回一个新对象，所以我们只需要判断引用是否发生变化。

```js
例子
```

另一种可能的方式是通过 setter 设置的标记来进行脏检查。它的问题是你不得不使用 setter，也要写更多的代码，甚至修改你的 class 属性。当然，你也可以在变更之前通过对象深拷贝，深比较，来判断是否有变更。这样做的问题就是深拷贝和深比较都是高代价的操作。

所以，immutable 数据解构为你提供了一个高效简洁的方式来追踪对象的变化，我们需要做的就是实现 `shouldComponentUpdate` 方法。因此，有了 Immutable-js 提供的抽象来模型化 props 和 state 属性，我们就能使用 `PureRenderMixin` 同时在性能上获得提升。

## Immutable-js and Flux

如果你使用了 [Flux](https://facebook.github.io/flux/), 你就应该开始使用 Immutable-js 来编写 stores。参考 [full API](https://facebook.github.io/immutable-js/docs/#/)。

```js
例子
```

> 原文参见 [https://facebook.github.io/react/docs/advanced-performance.html](https://facebook.github.io/react/docs/advanced-performance.html)
