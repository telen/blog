---
layout: post
title:  "struts2 上传文件 错误记录"
date:   2011-08-02 21:00:00 +0800
categories: java
tags:
- struts2
---

struts2 上传文件form中添加

{% highlight html %}
<input type="file" name="file"/>
{% endhighlight %}

在action中需要有三个属性

{% highlight java %}
private File file;
private String contentType;
private String fileName;
{% endhighlight %}

分别实现其setter方法,但是contentType和fileName的实现方法有所不同
就是方法名前要以file属性的setter名字开头

{% highlight java %}
public void setFileContentType()
public void setFileFileName()
{% endhighlight %}


ps.试验过程中,一直获得不到方法名,后来发现fileName写成filename,就差一个字母,看来这个字母不能随便起名字的.
