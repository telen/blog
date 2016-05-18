---
layout: post
title:  "linux 文件读取IOError 的处理"
date:   2013-02-28 21:00:00 +0800
categories: linux python
tags:
- linux
- python
---

系统中有个文件读取出现IO错误，只能读取一部分，无法复制、移动。
学了下python，练习一下文件读写吧，顺便处理一下这个困扰我很久的破文件。

也不能用标准库shutil里的文件copy方法，因为依然会存在 IO 错误。
所以就循环读取，遇到错误就跳过这个字节，简单地绕过了文件那一部分的错误。

文件读取错误

![io error]({{site.github.url}}/img/post/2013-02-28-bgioerror.png)

> *enviroment python 3.2*

{% highlight python %}
def copyff():
    f = open('Stack_Mute.mp4', 'rb+')
    ff = open('stack.mp4', 'ab+')
    while True:
        try:
            buf_copy = f.read(1024)
            if buf_copy:
                ff.write(buf_copy)
            else:
                break
        except IOError:
            print(f.seek(1024, 1))
            continue

    f.close()
    ff.close()
{% endhighlight %}

中间显示跳过了几次，最终成功复制，虽然中间少了一点点内容。:cool:

第一个python小程序.
貌似复制出来的文件损坏了，损坏了……:cry:
