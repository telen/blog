---
layout: post
title:  "jsp 引用常量类"
date:   2013-02-04 21:00:00 +0800
categories: java
tags:
- jsp
---

使用 Jakarta Project: Unstandard Tag library 引入常量类即可

{% highlight jsp %}
<un:useConstants var="const" className="java.lang.Integer" />
{% endhighlight %}

下载地址：[http://people.apache.org/builds/jakarta-taglibs-sandbox/nightly/projects/unstandard/](http://people.apache.org/builds/jakarta-taglibs-sandbox/nightly/projects/unstandard/)

引入jar包，标签库，web.xml中添加标记

{% highlight xml %}
<jsp-config>
    <taglib>
      <taglib-uri>http://jakarta.apache.org/taglibs/unstandard-1.0</taglib-uri>
      <taglib-location>/WEB-INF/taglibs-unstandard.tld</taglib-location>
    </taglib>
</jsp-config>
{% endhighlight %}
