---
layout: post
title:  " jquery disable/enable button 禁用按钮 "
date:   2013-02-09 21:00:00 +0800
categories: javascript
tags:
- javascript
- jquery
---

jQuery 禁用/启用按钮一直记不住，记下来：

{% highlight js %}
$("#btn_id").attr("disabled", "disabled");   // 禁用
$("#btn_id").attr("disabled", "");    // 启用
{% endhighlight %}

