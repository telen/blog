---
layout: post
title:  "ubuntu mkdtemp: private socket dir: Permission denied 循环登录界面"
date:   2012-05-08 21:00:00 +0800
categories: linux ubuntu
---

win下的ubunut虚拟机登录时进不了系统了，总是登录进去就闪一下就退回登录界面了。

tty1可以登录，google到查看"~.xsession-errors"看到

```
mkdtemp: private socket dir: Permission denied
```

原来这里有错误提示，根据前人结论，`chmod 1777 /tmp`搞定
