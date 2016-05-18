---
title: nginx 用作文件服务器
layout: post
date:   2013-04-08 21:00:00 +0800
categories: nginx
tag:
- nginx
---

修改配置`conf/nginx.conf`

{% highlight conf %}
server {
...
    autoindex on; # 开启索引功能
        autoindex_exact_size off; # 关闭计算文件确切大小（单位bytes），只显示大概大小（单位kb、mb、gb）
        autoindex_localtime on; # 显示本机时间而非 GMT 时间
...
}
{% endhighlight %}

引用：[http://www.icocoa.me/blog/2013/01/21/use-nginx-mirror/](http://www.icocoa.me/blog/2013/01/21/use-nginx-mirror/)
