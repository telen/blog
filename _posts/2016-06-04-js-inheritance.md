---
title: JavaScript 继承模式
layout: post
date:   2016-06-04 22:05:32 +0800
categories: js
excerpt: JavaScript是弱类型语言，不需要类型转换，对象继承关系变得无关紧要。对于一个对象来说重要的是它能做什么，而不是它从哪里来。
---

> JavaScript: The Good Parts 第五章

JS弱类型，不需要类型转换，对象继承关系变得无关紧要。对于一个对象来说重要的是它能做什么，而不是它从哪里来。

## 伪类 Pseudoclassical

JS原型存在着诸多矛盾，虽然看起来想基于类的语言，但实际上还是原型机制。表现之一就是：**通过构造器函数产生对象**。

当一个函数对象被创建时，`Function`构造器产生的函数对象会运行类似这样的一些代码：

	this.prototype = {constructor: this};

`constructor`属性没什么用，重要的是`prototype`对象。

当采用构造器调用模式，即用`new`前缀去调用一个函数时，函数执行的方式会被修改。如果`new`运算符是一个方法而不是一个运算符，他可能会像这样执行：

{% highlight javascript %}
Function.prototype.new = function() {
	// 创建一个新对象，它继承自构造器函数的原型对象
	var that = Object.create(this.prototype);
	// 调用构造器对象，绑定-this-到新对象上
	var other = this.apply(that, arguments);
	// 如果它的返回值不是一个对象，就返回该对象
	return (typeof other === 'object' && other) || that;
}
{% endhighlight %}

例子：

{% highlight javascript %}
var Mammal = function(name) {
	this.name = name;
};

Mammal.prototype.get_name = function() {
	return this.name;
};

Mammal.prototype.says = function() {
	return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); // 'Herb the Mammal'

//

var Cat = function(name) {
	this.name = name;
	this.saying = 'meow';
};

Cat.prototype = new Mammal();

Cat.prototype.purr = function(n) {
	return 'r-'.repeat(n);
};

Cat.prototype.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says(); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r-'
var name = myCat.get_name(); // 'meow Henrietta meow'
{% endhighlight %}

伪类模式本意是想向面向对象靠拢，但它看起来格格不入。我们可以隐藏一些丑陋的细节：

{% highlight javascript %}
Function.prototype.method = function(name) {
	this.prototype[name] = name;
	return this;
};

Function.method('inherits', function(Parent) {
	this.prototype = new Parents();
	return this;
});
{% endhighlight %}

`inherits`和`method`都返回`this`，这样就允许我们采用级联的方式编程：

{% highlight javascript %}
var Cat = function(name) {
	this.name = name;
	this.saying = 'meow';
}
.inherits(Mammal)
.method('purr', function(n) {
	return 'r-'.repeat(n);
})
.method('get_name', function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
});
{% endhighlight %}

危害：没有私有环境，无法访问父类方法。如果忘记了`new`，`this`就错了，也没有运行时警告。

## 对象说明符 Object Specifiers

多参数问题，记不住

{% highlight javascript %}
var myObject = maker(f, l, m, c, s);

var myObject = marker({
	first: f,
	middle: m,
	last: l,
	state: s,
	city: c
});
{% endhighlight %}

## 原型 Prototypal

在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承相比于基于类的继承在概念上更为简单：一个新对象可以继承一个旧对象的属性。

{% highlight javascript %}
var myMammal = {
	name: 'Herb the Mammal',
	get_name: function() {
		return this.name;
	},
	says: function() {
		return this.saying || '';
	}
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n) {
	return 'r-'.repeat(n);
};
myCat.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};
{% endhighlight %}

这是一种"[差异化继承](https://developer.mozilla.org/en/docs/Differential_inheritance_in_JavaScript)"。通过定制一个新的对象，我们指明它与所给予的基本对象的区别。

## 函数化 Functional

以上的弱点都是没法保护隐私。更好的方式就是应用模块模式。

我们从构造一个生成对象的函数开始。我们以小写字母开头来命名它，因为它并不需要使用`new`前缀。包括4个步骤。

1. **创建一个新对象**。有很多方法去构造一个对象。它可以构造一个对象字面量，或者它可以和`new`前缀连用去调用一个构造函数，或者他可以使用`Object.create`方法构造一个已经存在的对象的新实例，或者它可以调用一个会返回一个对象的函数。

2. **有选择地定义私有实例变量和方法**。这些就是函数中通过`var`语句定义的普通变量。

3. **给这个新对象扩充方法**。这些方法拥有特权去访问参数，以及在第2步中通过`var`语句定义的变量。

4. **返回那个新对象**。

伪代码
```
var constructor = function(spec, my) {
	var that, 其他私有实例变量;
	my = my || {};

	把共享的变量和函数添加到my中

	that = 一个新对象

	添加给that的特权方法

	return that;
};

```

`spec`对象包含构造器需要构造一个新实例的所有信息。

`my`对象是一个为继承链中的构造器提供秘密共享的容器。

扩充`that`，我们可以分配一个新函数成为`that`的成员方法。或者，更安全地，我们可以先吧函数定义为私有方法，然后再把他们分配给`that`：

```
var methodical = function() {
...
};
that.methodical = methodical;
```
这样分两步的好处是，如果其他方法要用`methodical`，它们可以直接调用`methodical()`而不是`that.methodical()`。如果该实例被破坏或篡改，甚至`that.methodical`被替换掉了，调用`methodical`的方法同样会继续工作，因为它们私有的`methodical`不收该实例被修改的影响。

{% highlight javascript %}
var mammal = function(spec) {
	var that = {};

	that.get_name = function() {
		return spec.name;
	};
	that.says = function() {
		return spec.saying || '';
	};

	return that;
};

var myMammal = mammal({name: 'Herb'});

// sub

var cat = function(spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n) {
		return 'r-'.repeat(5);
	};
	that.get_name = function() {
		return that.says() + ' ' + spec.name + ' ' + that.says();
	};

	return that;
};

var myCat = cat({name: 'Henrietta'});
{% endhighlight %}

函数化模式还给我们提供了一个处理父方法的方法。我们会构造一个`superior`方法，它去的一个方法名并返回调用那个方法的函数。该函数会调用原来的方法，尽管属性已经变化了。

{% highlight javascript %}
Object.method('superior', function(name) {
	var that = this,
		method = that[name];
	return function() {
		return method.apply(that, arguments);
	};
});


var coolcat = function(spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');

    that.get_name = function(n) {
        return 'like ' + super_get_name() + ' baby';
    };

    return that;
}

var myCoolCat = coolCat({name: 'Bix'});
var name = myCoolCat.get_name(); // 'like meow Bix meow baby'
{% endhighlight %}

函数化模式有很大灵活性。它相比伪类模式逼近带来的工作更少，还让我们得到更好的封装和信息以你藏，以及访问父类方法的能力。

如果一个对象的所有状态都是私有的，那么该对象就成为一个“防伪（tamper-proof)对象”。该对象的属性可以被替换或删除，但该对象的完整性不会收到损害。如果我们用函数话的样式创建一个对象，并且该对象的所有方法都不使用`this`或`that`，那么该对象就是**持久性（*durable*）**的。一个持久性对象就是一个简单*功能*函数的集合。

一个持久性的对象不会被入侵。访问一个持久性的对象时，除非有方法授权，否则攻击者不能方位对象的内部状态。
