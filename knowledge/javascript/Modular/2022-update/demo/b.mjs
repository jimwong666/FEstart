//b.mjs
import a from './a.mjs';

export default {
	message: "我是b，在 Evaluation 之后你才能看到我",
};

console.log('a', a.message)
// setTimeout(() => console.log('a', a.message), 0)