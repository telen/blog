---
layout: post
title:  "EL表达式的部分方法"
date:   2010-11-29 21:55:32 +0800
categories: java
tags:
- jsp
- java
- web
---

摘录了使用el表达式时常用到的取值方法:

**1,取得请求参数**

{% highlight jsp %}
${param.xxx}
${paramValues.xxx}
{% endhighlight %}

**2,各种scope值**

{% highlight jsp %}
${pageContext.request.queryString}         取得请求的参数字符串
${pageContext.request.requestURL}         取得请求的URL，但不包括请求之参数字符串
${pageContext.request.contextPath}         服务的web application 的名称
${pageContext.request.method}           取得HTTP 的方法(GET、POST)
${pageContext.request.protocol}         取得使用的协议(HTTP/1.1、HTTP/1.0)
${pageContext.request.remoteUser}         取得用户名称
${pageContext.request.remoteAddr }         取得用户的IP 地址
${pageContext.session.new}             判断session 是否为新的
${pageContext.session.id}               取得session 的ID
${pageContext.servletContext.serverInfo}   取得主机端的服务信息常用pageContext
${pageContext.request.contextPath }
{% endhighlight %}

[核心标签库core参考](http://www.cnblogs.com/Fskjb/archive/2009/07/05/1517164.html)
