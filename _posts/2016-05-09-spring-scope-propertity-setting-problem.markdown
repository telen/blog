---
title: 由spring配置引起的属性保持问题
layout: post
date:   2013-03-26 21:00:00 +0800
categories: java
tag:
- spring
---

项目上线后，点击编辑菜单，发现表单都出现了默认值，内容是一个已存在的记录。
新的表单怎么会出现类似”表单回显“的现象呢？同事观察了一阵判断说是因为他那里点击了查看改条记录的操作。
这就更奇怪了，不同电脑、浏览器怎么会共享数据呢？存session？不可能！存在application里？更不可能，没人这么做。同事却不以为然，说在action里把这个属性赋空值就行了，我说不行，这是回避问题，不是问题原因。一定是哪里配置有问题。

今天又想了想，google了一番，原来是spring配置的action。默认spring scope都是**singleton**单例的，所以只有一个action对象，以至与谁请求了一次都会显示刚才的数据了。
目前的解决办法就是在spring 里action配置上加上`scope="reqeust"`或`singleton="false"`。

参考地址 [http://blog.csdn.net/peng658890/article/details/7233718](http://blog.csdn.net/peng658890/article/details/7233718)


> 5 types of bean scopes supported :
>
> ```
> singleton – Return a single bean instance per Spring IoC container
> prototype – Return a new bean instance each time when requested
> request – Return a single bean instance per HTTP request. *
> session – Return a single bean instance per HTTP session. *
> globalSession – Return a single bean instance per global HTTP session. *>
In most cases, you may only deal with the Spring’s core scope – singleton and prototype, and the default scope is > singleton.
> ```
>
> -* means only valid in the context of a web-aware Spring ApplicationContext-

from [http://www.mkyong.com/spring/spring-bean-scopes-examples/](http://www.mkyong.com/spring/spring-bean-scopes-examples/)
