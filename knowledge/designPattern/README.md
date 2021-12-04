## 设计模式

### 单例模式

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