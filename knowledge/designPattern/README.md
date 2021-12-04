## 设计模式

### 单例模式
```ts
class Single {
	// 直接私有，这样外面就不能new了
	private constructor(){}
	// 第一种方法（直接定义静态属性拥有承载实例，外部直接调用这个静态方法即这个单例）
	// 缺点：耗内存
	// static Instance= new Single();
	// 第二种方法（直接调方法执行返回单例，不执行不返回）
	private static Instance: Single;
	static getInstance() {
		if(!Single.Instance) {
			Single.Instance = new Single();
		}
		return Single.Instance;
	}
}
// 第一种方法
// Single.Instance;
// 第二种方法
Single.getInstance();
```

### 代理模式

```ts
interface Icalc {
	calc(num1:number, num2:number): number;
}

class Worker1 implements Icalc {
	calc(num1:number, num2:number) {
		return num1 + num2;
	}
}

class Worker2 implements Icalc {
	calc(num1:number, num2:number) {
		return num1 * num2;
	}
}

class Boss {
	// 代理
	delegate!: Icalc;
	GetNum(num1:number, num2:number) {
        console.log(this.delegate.calc(num1, num2));
		return this.delegate.calc(num1, num2);
	}
}

let man = new Boss();
// 实例一个代理
man.delegate = new Worker1();
// man.delegate = new Worker2();
// 代理结果
man.GetNum(1,2);

```