原文链接：[Learn Data Structure & Algorithm in JavaScript | Part 04](https://dev.to/edisonpebojots/learn-data-structure-and-algorithm-in-javascript-part-04-454i "学习JavaScript中的数据结构和算法 | 第04部分") <br/>
作者：Edison Pebojot(👨‍💻)<br/>
作者创作时间：2019年07月04日

------------------------------------------------------------------------------------------------
# ![翻译](../images/publicFile/icon_teranlation.png) 学习JavaScript中的数据结构和算法 | 第04部分

### 第04部分：JavaScript String（😱 ）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qBhxR-ON--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/86upzie1sy1tah20qmeh.png" alt="学习JavaScript中的数据结构和算法">
</p>

第三部分我们将重点介绍 **String, javascript String object** 和**String对象的内置函数。**您将学习如何**访问，比较，分解**和**搜索字符串**以实现现实生活中的常用目的。此外，本章还将探讨字符串的**编码，解码，加密**和**解密。**在本部分的最后，您将了解如何有效的使用JavaScript字符串，并对字符串编码和加密有基本的了解。（🔐）

#### javascript String 的基本类型（🔤）

<p align="center">
<img src="https://i.giphy.com/media/McgIP4JjvsJBplqtR9/giphy.gif" alt="学习JavaScript中的数据结构和算法">
</p>
JavaScript的String基本类型带有各种常见的字符串函数。

#### 访问 String（🔓）

要访问字符，请使用 **.chartAt()**：

```js
  'dog'.charAt(1); // returns "o"
```

**.charAt(index)**获取一个index(从0开始)并且返回字符串中该索引位置的字符。

对于想获取多字符，你可以使用**.subdtring(开始索引, 结束索引)**，它将返回索引之间的字符。

```js
console.log('YouTube'.substring(1,2)) // returns 'o'
console.log('YouTube'.substring(3,7)) // returns 'tube'
```

如果你不传入第二个参数，他将返回所有的字符：

```js
'YouTube'.substring(0); // returns 'Youtube'
```

#### String 的比较方式（=）

编程语言具有你比较字符的功能。在js中，它可以简单地通过大于号(>)和小于号(<)来完成。

```js
'a' < 'b' // prints 'true'
```

这对于排序算法时的字符串比较非常有用，这将在第10部分的后面介绍。但是，如果你比较连个不同长度的字符串，他将从字符串的开头开始比较：

```js
'abc' < 'b' // prints 'true'
```
由于add小于b，因此abc <b的计算结果为true：

```js
'add' < 'ab' // prints 'false'
```
在此示例中，比较了add和ab。这是
与将广告与Ab进行比较相同：

```js
'add'<'ab' == 'ad'<'ab' // prints 'true'
```

#### String 检索（🔍🔍🔍）

在字符串中查找特定字符串，你可以使用.indexOf(搜索值, 来源索引)。它接受一个字符串以及开始的索引搜索来搜索。它返回一个匹配字符的位置，如果没有匹配的字符，则返回 -1：

```js
// Return positive numbers
console.log('Red Dragon'.indexOf('Red')) // returns 0
console.log('Red Dragon'.indexOf('Dragon', 0)) // returns 4
console.log('Red Dragon'.indexOf('Dragon', 4)) // returns 4
console.log('Red Dragon'.indexOf("", 9)) // returns 9

// Return negative number
console.log('Red Dragon'.indexOf('RedScale')) // returns -1
```

要在更大的字符串中搜索字符串，只需检查.indexOf是否返回-1：
```js
let existsInString=(stringValue, search)=> stringValue.indexOf(search) !== -1;
console.log(existsInString('Let say I am the largest string', 'r')); // prints 'true';
console.log(existsInString('Let say I am the largest string', 'b')); // prints 'false';
```

在以下示例中，将计算字符a的出现次数：
```js
// This will count how many 'a' inside the string
((str="He's my king from this day until his last day")=>Array.from(str).map((v,i)=>v=='a'?str.indexOf('a')!==-1?0+1:0:0).filter((v=>v)).length)()
```

最后，如果字符串以输入的字符开头，那么**startsWith**返回true，并且**endsWith**检测字符串是否已驶入的字符结尾。

```js
console.log('Red Dragon'.startsWith('Red')) // returns true
console.log('Red Dragon'.endsWith('Dragon')) // returns true
console.log('Red Dragon'.startsWith('Dragon')) // returns false
console.log('Red Dragon'.endsWith('Red')) // returns false
```

#### String 分解（💩💩💩）

要将字符串分解成多个部分，可以使用.split()。它创建一个由字符串组成的数组：

```js
'chicken,noodle,soup,broth'.split(","); // ["chicken", "noodle", "soup", "broth"]
```

传递一个空的分隔符将创建一个数组：

```js
'chicken'.split(""); // // ["c", "h", "i", "c", "k", "e", "n"]
```

字符串被转换成一个数组以轻松的遍历他们：

```js
'chicken'.split("").forEach(v=>console.log(v))
```

#### 字符串替换（✂️✂️✂️）

**.replace(字符, 替换的字符)**替换一个字符为另外一个字符：

```js
"Wizard of Oz".replace("Wizard","Witch"); // "Witch of Oz"
```

#### 正则表达式（😛😲😱😆）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--DmSWm7Ng--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/VerifiableNearFlee-size_restricted.gif" alt="学习JavaScript中的数据结构和算法">
</p>

正则表达式定义了一种搜索模式。JavaScript带有对象正则表达式*，该对象用于正则表达式。

RegExp对象的构造函数采用两个参数：正则表达式和可选的匹配设置，如下所示：

```
i. Perform case-insensitive matching
g. Perform a global match (find all matches rather than stopping after
first match)
m. Perform multiline matching
```

正则表达式有2个函数：
- search(): 返回一个匹配的索引值
- match(): 返回所有的匹配项

JavaScript String对象还具有以下两个与RegExp相关的正则表达式相关函数：

- exec(): 返回第一个匹配项
- test(): 返回true或者false

#### 基础正则表达式（👌👌👌）

这里是基础的正则规则：
- **^**: 表示字符串的开头
- **\d**: 查找任何数字
- **[abc]**: 查找括号之间的任何字符
- **[^abc]**: 查找不括号之间的任何字符
- **[0-9]**: 查找括号之间的任何数字
- **[^0-9]**: 查找不括号之间的任何数字
- **(x|y)**: 匹配二选一

以下返回索引11，它是字符D的索引，它是匹配的正则表达式的第一个字符：

```js
"JavaScript DataStructures".search(/DataStructures/) // prints '11'
```

#### 常用正则表达式（🆗🆗🆗）

正则表达式有助于检查JavaScript中用户输入的有效性。输入检查的一种常见类型是验证它是否具有任何数字字符。以下是开发人员经常使用的五个正则表达式：

**任何数字字符：/\d+/ **(🔢🔠)

```js
// Number
console.log(/\d+/.test("123")) // true
// Number and Letter
console.log(/\d+/.test("33asd")) // true
console.log(/\d+/.test("5asdasd")) // true
// Only letter
console.log(/\d+/.test("asdasd")) // false

```

**只有数字字符：/\d+$/ **(1️⃣2️⃣3️⃣4️⃣)

```js
// Only Numeric
console.log(/^\d+$/.test("123")) // true
// Numeric and Letter
console.log(/^\d+$/.test("123a")) // false
// Only Letter
console.log(/^\d+$/.test("a")) // false

```

**浮点数字字符: /^[0-9].[0-9][1-9]+$/ **(1️⃣2️⃣ . 3️⃣4️⃣)

```js
var regex=/^[0-9].[0-9][1-9]+$/;
// No Floating point
console.log(regex.test("12")) // false
// With Floating point
console.log(regex.test("12.2")) // true
```

**仅字母数字字符: /[a-zA-Z0-9]/ **(🔤🔤🔤)
    
```js
var regex = /[a-zA-Z0-9]/;
// With Alphanumeric
console.log(regex.test("somethingELSE")); // true
console.log(regex.test("hello")); // true
console.log(regex.test("112a")); // true
console.log(regex.test("112")); // true
// Without Alphanumeric
console.log(regex.test("^")); // false
```

** 查找字符：/([^?=&]+)(=([^&]*))/ **(🔎🔎🔎)

在Web应用程序中，Web URL传递用于路由或数据库查询的参数。例如，对于URL：http：//your.domain/product.aspx？category = 4＆product_id = 2140＆query = lcd + tv，URL可能会响应后端SQL查询，例如
以下：
```sql
SELECT LCD, TV FROM database WHERE Category = 4 AND Product_id=2140
```

要解析这些参数，正则表达式可能有用：
```js
  var queryString = {};
  'http://your.domain/product.aspx?category=4&product_id=2140&query=lcd+tv'.replace(
    new RegExp ("([^?=&]+)(=([^&]*))?" , "g" ),
    function ($0, $1, $2, $3) { queryString[$1] = $3; }
  );
  console.log('ID: ' + queryString['product_id' ]); // ID: 2140
  console.log('Name: ' + queryString['product_name' ]); // Name: undefined
  console.log('Category: ' + queryString['category' ]); // Category: 4
```

#### 编码(📄📄📄)
<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vNOXwhuo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://cdn78.picsart.com/199683351001202.gif%3Fto%3Dmin%26r%3D1024" alt="学习JavaScript中的数据结构和算法">
</p>

**编码**是计算机科学中用于传输或存储的笼统概念。所有计算机文件类型均以特定结构编码。比如，当你上传一个PDF，编码看起来可能像这样：
```
1. JVBERi0xLjMKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwovT3V0bGluZXMgMiAwIFIKL1Bh
Z2VzIDMgMCBS\
2. ID4+CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9PdXRsaW5lcyAvQ291bnQgMCA+PgplbmR
vYmoKMyAwIG9i\
3. ago8PCAvVHlwZSAvUGFnZXMKL0tpZHMgWzYgMCBSCl0KL0NvdW50IDEKL1Jlc291cmNlcyA8
PAovUHJvY1Nl\
4. dCA0IDAgUgovRm9udCA8PCAKL0YxIDggMCBSCj4+
Cj4+Ci9NZWRpYUJveCBbMC4wMDAgMC4w
MDAgNjEyLjAw\
5. MCA3OTIuMDAwXQogPj4KZW5kb2JqCjQgMCBvYmoKWy9QREYgL1RleHQgXQplbmRvYmoKNSAw
IG9iago8PAov\
6. Q3JlYXRvciAoRE9NUERGKQovQ3JlYXRpb25EYXRlIChEOjIwMTUwNzIwMTMzMzIzKzAyJzAw
JykKL01vZERh\
7. dGUgKEQ6MjAxNTA3MjAxMzMzMjMrMDInMDAnKQo+PgplbmRvYmoKNiAwIG9iago8PCAvVHlw
ZSAvUGFnZQov\
8. UGFyZW50IDMgMCBSCi9Db250ZW50cyA3IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PCAvRmls
dGVyIC9GbGF0\
9. ZURlY29kZQovTGVuZ3RoIDY2ID4+CnN0cmVhbQp4nOMy0DMwMFBAJovSuZxCFIxN9AwMzRTM
DS31DCxNFUJS\
10. FPTdDBWMgKIKIWkKCtEaIanFJZqxCiFeCq4hAO4PD0MKZW5kc3RyZWFtCmVuZG9iago4IDA
gb2JqCjw8IC9U\
11. eXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovTmFtZSAvRjEKL0Jhc2VGb250IC9UaW1lcy1
Cb2xkCi9FbmNv\
12. ZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagp4cmVmCjAgOQowMDAwMDAwMDAwIDY
1NTM1IGYgCjAw\
13. MDAwMDAwMDggMDAwMDAgbiAKMDAwMDAwMDA3MyAwMDAwMCBuIAowMDAwMDAwMTE5IDAwMDA
wIG4gCjAwMDAw\
14. MDAyNzMgMDAwMDAgbiAKMDAwMDAwMDMwMiAwMDAwMCBuIAowMDAwMDAwNDE2IDAwMDAwIG4
gCjAwMDAwMDA0\
15. NzkgMDAwMDAgbiAKMDAwMDAwMDYxNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDkKL1J
vb3QgMSAwIFIK\
16. L0luZm8gNSAwIFIKPj4Kc3RhcnR4cmVmCjcyNQolJUVPRgo=.....
```

这是Base64编码的PDF字符串。上传PDF文件时，此类数据通常会传递到服务器。 （💡💡）

#### Base64编码 (6️⃣4️⃣6️⃣4️⃣6️⃣4️⃣)
.btoa() 函数根据字符串创建Base64编码的ASCII字符串。字符串中的每个字符都被视为一个字节（8位：8个0和1）。

.atob()函数对已编码的字符串进行解码。
例如，Base64编码的字符串中的字符串“ hello，我喜欢学习计算机程序”看起来像这样：
```
aGVsbG8gSSBsb3ZlIGxlYXJuaW5nIHRvIGNvbXB
1dGVyIHByb2dyYW0
```

#### 字符串缩短（📐📏😝）
您是否曾经想过像Bit.ly这样的URL缩短站点如何工作？一个简化的URL压缩算法遵循特定的结构，例如www.google.com所示，它是一个示例：

1. 数据库为URL创建唯一的ID：
  <table>
    <tr>
      <th>Long ID</th>
      <th>URL</th>
    </tr>
    <tr>
      <td>11231230</td>
      <td>www.google.com</td>
    </tr>
  </table>

2. 该ID缩短为使用Base62编码的字符串：
  <table>
    <tr>
      <th>Long ID</th>
      <th>URL</th>
      <th>Short ID</th>
    </tr>
    <tr>
      <td>11231230</td>
      <td>www.google.com</td>
      <td>VhU2</td>
    </tr>
  </table>

对于缩短部分，有62个可能的字母和数字，包括26个小写字母，26个大写字母和10个数字（0到9）。可以使用以下算法：

```js
  var DICTIONARY = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
function encodeId(num) {
    var base = DICTIONARY.length;
    var encoded = "";
if (num === 0) {
    return DICTIONARY[0];
}

while (num > 0) {
    encoded += DICTIONARY[(num % base)];
    num = Math.floor(num / base);
}

return reverseWord(encoded);

}

function reverseWord(str) {
    var reversed = "";
    for (var i = str.length - 1; i >= 0; i--) {
        reversed += str.charAt(i);
    }
    return reversed;
}

function decodeId(id) {
    var base = DICTIONARY.length;
    var decoded = 0;
for (var index = 0; index < id.split("").length; index++) {
    decoded = decoded * base + DICTIONARY.
        indexOf(id.charAt(index));
}

return decoded;

}

console.log(encodeId(11231230)); // prints 'VhU2'
console.log(decodeId('VhU2')); // prints '11231230'
```

#### 加密（🔑🔒🔓）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ogoUhhUs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://getflywheel.com/wp-content/uploads/2017/10/chrome-not-secure-ssl-not-secure-sonnection.png" alt="学习JavaScript中的数据结构和算法">
</p>

您是否曾经在Google Chrome浏览器（😐❓❓）中看到图4-3中的警告。这可能意味着您尝试访问的网站没有正确的安全套接字层（SSL）证书。

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pvxpe6EM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/jlvqtv1mch51b5ea565m.png" alt="学习JavaScript中的数据结构和算法">
</p>

TSL是用于在服务器和客户端之间建立加密链接的标准安全性。在此过程中，服务器使用非对称加密。浏览器仅使用对称加密：

1. 服务器将其非对称公钥发送到浏览器。
2. 浏览器为当前会话创建一个对称密钥。
3. 服务器通过其私钥解密浏览器的会话并检索会话密钥。
4. 两个系统都有会话密钥，并将使用它来安全地传输数据。

这是安全的，因为只有浏览器和服务器知道会话密钥。如果浏览器第二天要连接到同一服务器，则将创建一个新的会话密钥。
SSL警告消息表示浏览器和服务器可能未在该连接上加密数据。最常用的公钥加密算法是RSA算法。

#### RSA加密（🔑🔑🔑）

RSA是一种基于分解大整数的加密算法。在RSA中，将生成两个大质数和一个补充值作为公钥。任何人都可以使用公共密钥对消息进行加密，但是只有具有主要因素的人才能对消息进行解码。 （💡💡💡）

该过程分为三个阶段：密钥生成，加密和解密。

1. 密钥生成：生成公钥和私钥。按键的构造方法产生应该是秘密的。
2. 加密：可以通过公用密钥对邮件进行加密
3. 解密：只能使用私钥来解密信息。

以下是该算法的概述：

1. 选择两个（通常大）素数p和q
  a. p和q的乘积表示为n。
  b. (p-1)和(q-1)的乘积表示为phi。
2. 选择2个指数，e和d
   a. e通常为3。可以使用其他大于2的值。
   b. d是使得（e×d）％phi = 1的值。

加密过程如下所示：
```js
m - message:
m^e % n = c
c - encrypted message
```
解密过程如下图：
```
c^d % n = m
```

这是计算d的实现：
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1)
    return 0;

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi, e = t;

    t = x0;

    x0 = x1 - q * x0;

    x1 = t;
}

// Make x1 positive
if (x1 < 0)
    x1 += m0;

return x1;

}
modInverse(7, 40) // 23
```

还需要生成公共密钥和私有密钥的密钥对。让我们选择5和11作为素数：
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1)
    return 0;

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi, e = t;

    t = x0;

    x0 = x1 - q * x0;

    x1 = t;
}

// Make x1 positive
if (x1 < 0)
    x1 += m0;

return x1;

}

function isPrime(n){
    var prime_numbers=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    for(let i of prime_numbers){
        if(n===i){
            return true
        }
    }
}

function RSAKeyPair(p, q) {
    // Need to check that they are primes
    if (!(isPrime(p) && isPrime(q)))
        return;
// Need to check that they're not the same
if (p == q)
    return;

var n = p * q,
    phi = (p - 1) * (q - 1),
    e = 3,
    d = modInverse(e, phi);


// Public key: [e,n], Private key: [d,n]
return [[e, n], [d, n]]

}
RSAKeyPair(5,11) //Public key: [3,55], Private key: [27,55]
```

让我们将秘密消息用作数字2，高于该数字将导致解密不正确。 JavaScript内部使用浮点运算。如果数字变大，那么答案不对就不会感到惊讶：

**加密:**
```js
// m - secret message: 2 // Always remember our secret message
// m^e % n = c
// 2^3 % 55 = 8
2**3 % 55 
// You can also Math.pow(base,exponent) % modulus
// Now the value is 8. Use the value of 8 to decryption
```

**解密:**
```js
// c^d % n = m
8**27 % 55 
// You can also use Math.pow(base,exponent) % modulus
```

**完成：**加密和解密
```js
function modInverse(e, phi) {
    var m0 = phi, t, q;
    var x0 = 0, x1 = 1;
if (phi == 1) {
    return 0;
}

while (e > 1) {
    // q is quotient
    q = Math.floor(e / phi);

    t = phi;

    // phi is remainder now, process same as
    // Euclid's algo
    phi = e % phi // 3 % 40
    e = t; // e = 40
    t = x0; // t = 0
    x0 = x1 - q * x0; // 1-0|13|3 x 0
    x1 = t; // 0
}

// Make x1 positive
if (x1 < 0) {
    x1 += m0;
}

return x1;

}

function isPrime(n){
    var prime_numbers=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    for(let i of prime_numbers){
        if(n===i){
            return true
        }
    }
}

function RSAKeyPair(p, q) {
    // Need to check that they are primes
    if (!(isPrime(p) && isPrime(q))) {
        return;
    }
// Need to check that they're not the same
if (p==q) {
    return;
}

var n = p * q,
    phi = (p-1)*(q-1),
    e = 3,
    d = modInverse(e,phi);



// Public key: [e,n], Private key: [d,n]
return [[e,n], [d,n]]

}

RSAKeyPair(5,11)

for (let i in RSAKeyPair(5,11)){
    var encrypted_message;
const encryption=c=>{
    var m=2,e=c[0],n=c[1],Encrypted_Message=m**e%n
    console.log("Encryption: "+Encrypted_Message)
    encrypted_message=Encrypted_Message
}
const decryption=c=>{
   var d=c[0],n=c[1],Decrypted_Message=encrypted_message**d % n
   console.log("Decryption: "+Decrypted_Message)
}
i=="0"?encryption(RSAKeyPair(5,11)[0]):i=="1"?decryption(RSAKeyPair(5,11)[1]):false

}
```

这将对2进行加密，接收者可以将其解密回2。对于RSA算法，选择的质数非常大，如果大于2，则要尝试，将第70行的2的值更改为3，您会得到不同的结果。结果。
这是因为大数的质分解需要时间来计算。今天的标准是4,096位主要产品。

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--9oqD8dP2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/gvbsids6mwv3ojbr6hm3.jpg" alt="学习JavaScript中的数据结构和算法">
</p>

图中显示了最大可能值4,096位数字。

#### 总结（📚）

<p align="center">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--blaRiVoc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/AdventurousBothAlaskanmalamute-size_restricted.gif" alt="学习JavaScript中的数据结构和算法">
</p>

表中总结了各种字符串函数。
  <table>
    <tr>
      <th>Function</th>
      <th>用法</th>
    </tr>
    <tr>
      <td>charAt(index)</td>
      <td>在索引处访问单个字符</td>
    </tr>
    <tr>
      <td>substring(startIndex, endIndex)</td>
      <td>访问从startIndex到endIndex的字符串部分</td>
    </tr>
    <tr>
      <td>x str1 > str2</td>
      <td>如果str1在字典上大于str2，则返回true</td>
    </tr>
    <tr>
      <td>indexOf(str, startIndex)</td>
      <td>从startIndex开始的所需str的索引</td>
    </tr>
    <tr>
      <td>str.split(delimiter)</td>
      <td>使用指定的分隔符将字符串拆分为数组</td>
    </tr>
    <tr>
      <td>str.replace(original,new)</td>
      <td>用新的替换原来的</td>
    </tr>
  </table>

此外，JavaScript Regex对象可用于字符串验证。下表提供了一个摘要：

<table>
    <tr>
      <th>/\d+/</th>
      <th>用法</th>
    </tr>
    <tr>
      <td>/^\d+$/</td>
      <td>任何数字字符</td>
    </tr>
    <tr>
      <td>substring(startIndex, endIndex)</td>
      <td>只有数字字符</td>
    </tr>
    <tr>
      <td>/^[0-9]*.[0-9]*[1-9]+$/</td>
      <td>浮点数字字符</td>
    </tr>
    <tr>
      <td>/[a-zA-Z0-9] /</td>
      <td>仅字母数字字符</td>
    </tr>
  </table>
