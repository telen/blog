---
layout: post
title:  "el表达式 jstl 本地tld配置 环境tomcat5.5"
date:   2010-09-27 21:55:32 +0800
categories: JSP Java SUN Web XML
---

### 一、启用EL表达式

首先需要两个jar包

{% highlight xml %}
jstl.jar 和 standard.jar
{% endhighlight %}

如果不涉及jstl就可以直接在jsp头中声明

{% highlight jsp %}
<%@ page isELIgnored="false" %>
{% endhighlight %}

还要检查下web.xml中的声明

{% highlight xml %}
<web-app id="WebApp_ID" version="2.4"
xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
{% endhighlight %}

其中的version还有2_4.xsd如果是2.5的则要改成2.4，

### 二、使用JSTL

通常情况下我们还要借助于JSTL，结合EL表达式使用
一般网上介绍是这样声明taglib的

{% highlight jsp %}
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
{% endhighlight %}

或者

{% highlight jsp %}
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
{% endhighlight %}

我暂不清楚这两者有什么区别，但是有些eclipse会提示第二种不合法。

但我更喜欢程序和外界没有任何关联，所以在网上搜到让jsp来引用本地的tld文件

  1.将下载到的tld文件——例如c.tld放到项目WEB-INF下或建一个目录

  2.在项目的web.xml中声明taglib

{% highlight xml %}
<jsp-config>
    <taglib>
        <taglib-uri>http://java.sun.com/jsp/jstl/core</taglib-uri>
        <taglib-location>/WEB-INF/c.tld</taglib-location>
    </taglib>
</jsp-config>
{% endhighlight %}

 3.然后就可以在jsp中这样使用了

{% highlight jsp %}
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
{% endhighlight %}

当然也可以用其他的uri

> original post at [iteye](http://hongfei-sr.iteye.com/blog/773582)
