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

使用 *virtual DOM* —— 一个 DOM 子树描述，渲染到浏览器里。它操作的是 javascript 对象，比直接创建 DOM 和访问 DOM 节点快得多。当 props 或 state 改变时，React 通过构建一个新的 virtual DOM 和旧的比较来决定是否实际更新。只有两者不同时才会更新，来尽量减少变更。

在此之上，React 提供了一个 component 生命周期函数，`shouldComponentUpdate`，在重新渲染（virtual DOM 比较和eventual DOM reconciliation）之前触发，让开发者有时机来减小重回处理。
该方法默认返回 true。

*需要注意这个方法可能会被频繁调用，所以处理函数务必高效。*

总之，React 采用 `shouldComponentUpdate` 来减少 DOM 子树操作，将需要更新的 DOM 通过比较 virtual DOM，来减少昂贵的 DOM 操作。

> 更多参见 [https://facebook.github.io/react/docs/advanced-performance.html](https://facebook.github.io/react/docs/advanced-performance.html)
