// a.mjs
import b from './b.mjs'

console.log('b',b.message);

export default {
	message: "我是a，在 Evaluation 之后你才能看到我",
};