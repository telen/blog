---
title: maven 几个基本命令
layout: post
date:   2013-03-06 21:00:00 +0800
categories: java
tag:
- maven
---

基础入门，目前了解到的几个命令

{% highlight shell %}
mvn clean
mvn clean compile
mvn clean test
mvn clean package  编译打包
mvn clean install    安装到本地repository仓库中
{% endhighlight %}


`mvn dependency:list`    列出直接依赖


`mvn dependency:tree`     列出依赖树



`mvn dependency:analyze`    分析间接依赖、未使用到的依赖等（测试中使用到的依赖不会被检测到）


待续……
