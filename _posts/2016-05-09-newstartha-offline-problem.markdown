---
title: newstartHA 双机 offline小问题
layout: post
date: 2013-04-01 21:00:00 +0800
categorys: others
---

注意：

（1）当member status的状态中有一个为DOWN时，请检查系统防火墙是否已关闭，使用iptables -F关闭。

（2）当work link status的状态中有一个为OFFLINE时，在cli下输入sshconfig HA-2,按提示输入密码，正确后即可显示为ONLINE。

来源 [http://hai123.blog.51cto.com/459203/604206](http://hai123.blog.51cto.com/459203/604206)
