---
title: struts2 输出json 选择action 属性
layout: post
date:   2013-06-08 21:00:00 +0800
categories: java
tag:
- struts2
---

原来的action里有一堆属性，添加需要json输出的方法时这样设置

{% highlight xml  %}
<package name="jsonout" extends="json-default" namespace="/example">
    <action name="list" class="fooAction" method="bee">
        <result type="json">
            <!-- root参数选择需要输出为json的属性 -->
            <param name="root">jsonOut</param>
        </result>
    </action>
</package>
{% endhighlight %}
