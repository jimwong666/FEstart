## 发布-订阅模式
> 1. 无耦合
> 2. 基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象

```js
var PubSub = function () {
    this.handlers = {};
};

PubSub.prototype.Subscribe = function (eventType, handler) {
    if (!(eventType in this.handlers)) {
        this.handlers[eventType] = [];
    };
    this.handlers[eventType].push(handler);
    return this;
};

PubSub.prototype.unSubscribe = function (eventType) {
    delete this.handlers[eventType];
    return this;
};

PubSub.prototype.Punlish = function (eventType) {
    var _args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, _handlders = this.handlers[eventType]; i < _handlders.length; i++) {
        _handlders[i].apply(this, _args);
    };
};

var EVENT = new PubSub;

EVENT.Subscribe('Duang', function (masg) {
    console.log(masg + 'DuangDuangDuang~');
});

EVENT.Punlish('Duang', 'jim ');
```


## 观察者模式 
> 1.有一定耦合
> 2.对象间一种一对多的依赖关系

```js
class Subject {
    constructor(name) {
        this.name = name;
        this.observers = []; // 观察者列表
    }

    // 添加订阅者
    add(observer) {
        this.observers.push(observer);
        // 这里：原文都是进行手动触发（并非自动），我改了下
        this.notify(this.name);
    }

    // 删除...
    remove(observer) {
        let idx = this.observers.findIndex(item => item === observer);
        idx > -1 && this.observers.splice(idx, 1);
        // 这里：原文都是进行手动触发（并非自动），我改了下
        this.notify(this.name);
    }

    // 通知
    notify(name) {
        for (let o of this.observers) {
            o.update(name);
        }
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }

    // 目标对象更新时触发的回调，即收到更新通知后的回调
    update(_name) {
        console.log(`目标者通知我更新了，我是：${this.name}-${_name}`);
    }
}

// 实例化【被观察者】
let subject = new Subject("wangjian");

// 实例化两个【观察者】
// 这里：观察者可以不带参数
let obs1 = new Observer('前端');
let obs2 = new Observer('后端');

// 向目标者【添加】观察者
subject.add(obs1);
subject.add(obs2);

/* 这里：原文都是进行手动触发（并非自动），我改了下

subject.notify('xyz');

*/
```