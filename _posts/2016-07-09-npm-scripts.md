---
title: npm scripts
layout: post
date:   2016-07-09 23:09:00 +0800
categories: js
excerpt: npm 如何处理 "scripts" 属性
---

## Description

npm 支持在 package.json 中添加 "scripts"，以下是支持的 scripts，（通常说的生命周期方法）:

- **prepublish**: Run BEFORE the package is published. (ALso run on local **npm install** without any arguments.)
- **publish, postpublish**: Run AFTER the package is published.
- **preinstall**: Run BEFORE the package is installed
- **install, postinstall**: Run AFTER the package is installed.
- **preuninstall, uninstall**: Run Before the package is uninstalled.
- **postuninstall**: Run AFter the package is uninstalled.
- **preversion, version**: Run BEFORE bump the package version.
- **postversion**: Run AFTER bump the package version.
- **pretest, test, posttest**: Run by the **npm test** command.
- **prestop, stop, poststop**: Run by the **npm stop** command.
- **prestart, start, poststart**: Run by the **npm start** command.
- **prerestart, restart, postrestart**: Run by the **npm restart** command. Note: **npm restart** will run the stop and start scripts if no **restart** scripts is provided.

另外，其他的 script 也可以通过运行 ** npm run-script <pkg> <stage>** 来执行。 与之匹配的 *pre* 和 *post* 脚本也回运行。（例如 **premyscript, myscript, postmyscript**）。

## 通常用法

如果你需要在使用你的 package 之前做一些不依赖于操作系统或者目标系统结构的操作的话，就可以使用**prepublish**脚本。包括一些这样的操作：

- 将 CoffeeScript 编译为 JavaScript
- 压缩js代码
- 拉取你的 package 依赖的远程资源

这样的优势在于它们可以一次执行完成，在同一个地方，这样也减少了复杂度和可变性，另外：

- 可以在 **devDependency** 依赖 **coffee-script**，而用户并不需要安装
- 不一定需要在 package 里包含压缩版的代码，减小了大小
- 不一定需要用户环境或者目标系统依赖 **curl** 或者 **wget** 命令

## DEFAULT VALUES 默认值

npm 会依据 package 内容包含一些默认值。

- **"start": "node server.js"**:

 If there is a **server.js** file in the root of your package, then npm will default the **start** command to **node server.js**.

- **"install": "node-gyp rebuild"**:

 If there is a **binding.gyp** file in the root of your package, npm will default the **install** command to compile using node-gyp.



 `...`
