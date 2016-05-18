---
layout: post
title:  "java 安全 权限策略"
date:   2011-11-30 21:00:00 +0800
categories: java
tags:
- java
---

java的能够成为众多企业中应用广泛的语言,除了完善,强大的功能之外,重要的还有它的安全性.

java设计了从程序编写,编译,类加载过程,执行的每一步都进行安全检查.

这里简要说一下java的安全管理器和访问权限

> "安全管理器是负责控制某个操作是否允许执行的类."

安全管理器负责检查的操作包括一下几个:

- 创建一个新的类加载器
- 退出虚拟机;
- 使用反射访问另一个类的成员;
- 访问本地文件;
- 打开socket连接;
- 启动打印作业;
- 访问系统剪贴板;
- 访问AWT时间队列;
- 打开一个顶层窗口.
- 整个java类库中还有许多其他类似的检查.

*需要注意的是,在运行java应用程序是,默认的设置是不安装安全管理器的,这样所有的操作都是允许的.另一方面,applet浏览器会执行一个功能受限的安全策略.*

它的安全策略建安里了代码来源和访问权限集之间的映射关系.

以文件访问权限为例

**安全策略文件**

策略类需要读取响应的安全策略文件,这些文件包含了将代码来源映射为权限的指令.
在我们的jdk中默认有两个地方可以安装安全侧路文件:
 - java平台主目录的`java.policy`文件
 - 用户主目录的`.java.policy`文件(**注意文件名前面的圆点**)


注意:可以在java.security配置文件中修改这些文件的位置,默认位置设定为
{% highlight propertity %}
policy.url.1=file:${java.home}/lib/security/java.policy
policy.url.2=file:${user.home}/.java.policy
{% endhighlight %}

另外一种方式是为每一个应用程序配置显示的策略文件.
(策略文件格式参考[官方文档](http://download.oracle.com/javase/6/docs/technotes/guides/security/PolicyFiles.html) )

---

启用策略文件有两种方法

**一,在应用程序的main方法内部设置系统属性:**

1.
{% highlight java %}
System.setProperty("java.security.policy", "app.policy");
{% endhighlight %}

2.虚拟机命令行启动参数
{% highlight shell %}
java -Djava.security.policy=app.policy App
{% endhighlight %}

**对于applet**

{% highlight shell %}
applietviewer -J-Djava.security.policy=app.policy applet.html
{% endhighlight %}

在这些例子中,`app.policy`文件被添加到了其他有效的策略中.如果再命令行中添加了第二个等号,比如:

{% highlight shell %}
java -Djava.security.policy==app.policy App
{% endhighlight %}

那么应用程序就只是用指定的策略文件,而标准的策略文件将被忽略.

前面说,默认java是不安装安全管理器的.因此,在安装安全管理器之前,看不到策略文件的作用.
所以启用要启用安全管理器,一可以在main方法中添加:

{% highlight java %}
System.setSecurityManager(new SecurityManager());
{% endhighlight %}


或者在启动虚拟机的时候添加命令行选项`-Djava.security.manager`

{% highlight shell %}
java -Djava.security.manager -Djava.security.policy=app.policy App
{% endhighlight %}

**针对文件访问file permission**

`java.io.FilePermission` 有`read`, `write`, `execute` 和`delete`四个操作

另外一个注意的地方是:

> 代码总是可以读取自身所在目录（或该目录的子目录）中的文件，不需要对其进行显式授权。(since JDK API 1.2)

就是说默认情况下代码总是对自身目录的文件有可读权限,但是其他`read`, `write`, `execute` 和`delete`权限是没有的.

> "每个类都有个保护域,它是用于封装类的代码来源和权限集合的对象.当SecuritManager类需要检查某个权限是,它要检查看当前位于调用堆栈上的所有方法的类,然后它获得所有类的保护域,并且询问每个保护欲,该域的权限集合是否允许执行当前正在被检查的操作.如果所有的域都同意,那么检查得以通过.否则,就会抛出一个SecurityManager异常."


这里我和搭档的测试方法是测试应用程序目录的上一个目录中的一个目录的权限.

策略文件和应用程序文件在同一目录

PermissionTest.policy
{% highlight policy %}
grant {
    permission java.util.PropertyPermission "user.dir", "read";
    permission java.io.FilePermission "../test", "write";
};
{% endhighlight %}

需要说明的是,`user.dir` 这个property的读权限因为需要在应用程序中获得上级目录需要使用的`java.io.File`的方法,但是在执行过程中出现报错,`user.dir`不可读.所以应该是File的方法使用到了`user.dir`这个property,所以在这里也把这个权限加上.

> 相应的`java.util.PropertyPermission`权限可参考java目录中的`java.policy`文件相应内容,注意其中并没有user.dir属性目标.

同时,我们对测试程序本身目录中的文件进行了测试.

测试程序
PermissionTest.java

{% highlight java %}
import java.io.FilePermission;
import java.io.File;

public class PermissionTest {
    public static void main(String[] args) {

        SecurityManager manager = System.getSecurityManager();

        File f = new File("");
        System.out.println(System.getProperty("user.dir"));
        System.out.println(f.getAbsoluteFile().getParent());

        try{
            manager.checkRead("../test");
            System.out.println("读权限可用!");
        } catch (SecurityException e) {
            System.out.println("读权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
            manager.checkWrite("../test");
            System.out.println("写权限可用!");
        } catch (SecurityException e) {
            System.out.println("写权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
            manager.checkDelete("../test");
            System.out.println("删除权限可用!");
        } catch (SecurityException e) {
            System.out.println("删除权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
            manager.checkExec(f.getAbsoluteFile().getParent() + File.separator + "test");
            System.out.println("执行权限可用!");
        } catch (SecurityException e) {
            System.out.println("执行权限不可用!");
            System.out.println(e.getMessage());
        }

        System.out.println("=======检查应用程序本身目录文件权限=======");
        try{
            manager.checkRead("TEM");
            System.out.println("TEM 读权限可用!");

        } catch (SecurityException e) {
            System.out.println("TEM 读权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
                manager.checkWrite("TEM");
            System.out.println("TEM 写权限可用!");

        } catch (SecurityException e) {
            System.out.println("TEM 写权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
            manager.checkDelete("TEM");
            System.out.println("TEM 删除权限可用!");

        } catch (SecurityException e) {
            System.out.println("TEM 删除权限不可用!");
            System.out.println(e.getMessage());
        }

        try{
            manager.checkExec(System.getProperty("user.dir") + File.separator + "TEM");
            System.out.println("TEM 执行权限可用!");
        } catch (SecurityException e) {
            System.out.println("TEM 执行权限不可用!");
            System.out.println(e.getMessage());
        }

        System.out.println("Fine.");

    }
}
{% endhighlight %}


还需要说明的是检查执行权限的checkExec方法,参见JDK API

```
public void checkExec(String cmd)
……
如果 cmd 是绝对路径，那么此方法使用 FilePermission(cmd,"execute") 权限调用 checkPermission，否则用 FilePermission("<<ALL FILES>>","execute") 权限调用 checkPermission。
……
```

所以,checkExec需要使用绝对路径文件来调用.
当然可以通过`checkPermission(Permission p)`来检查,这样就不涉及到绝对路径的问题.

命令行执行测试:

{% highlight shell %}
java -Djava.security.manager -Djava.security.policy==PermissionTest.policy PermissionTest
{% endhighlight %}

修改policy文件及测试程序,可以看到不同权限的变化.

> 参考资料《JAVA核心技术（Core Java）》原书第8版
