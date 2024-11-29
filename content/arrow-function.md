---
navigation: false
---

# 面試題目2 - 箭頭函式

### 問：請問箭頭函式與一般函式有何不同？

## 箭頭函式與一般函式的差別有下列幾點：

### 1️⃣ **綁定的 this 不同**

- **一般函式：透過物件呼叫function時，this為該物件。**
    
    決定一般函式中的this為誰，是由function被呼叫的時機點決定的。
    
    ```jsx
    function func(){
    	console.log(this.a)
    }
    
    var obj = {
    	a: 2,
    	foo: func
    }
    
    obj.foo()  //2
    
    var func2 = obj.foo
    func2()  //undefined
    ```
    
    `obj.foo()`會印出2，是因為我們透過`obj`這個物件去呼叫方法，所以`this`指向`obj`中的`a`。
    
    而`func2()`之所以印出`undefined`，是因為`func2()`呼叫的當下是在全域中，也就是說`this`指向`window`，而`window`並沒有`a`，所以印出`undefined`。
    
    ```jsx
    //但如果想讓func2的this可以綁到obj，可以強制指定:
    var func2 = obj.foo.bind(obj)
    func2()  //2
    ```
    

- **箭頭函式：this是看函數本身定義的語彙位置。**
    
    **箭頭函式的`this`和傳統函數的一個重大差異就是看的是語彙位置**。
    
    傳統函數每次呼叫函數，都會建立一個新的函數執行環境 (Function Execution Context)，然後建立一個新的`this`引用物件，指向當下的呼叫者。
    
    **但箭頭函式則不會有自己的`this`引用物件，呼叫`this`時，會沿用語彙環境外圍的`this`**。
    
    ```jsx
    let bunny = {
      name: 'Usagi',
      tasks: ['transform', 'eat cake', 'blow kisses'],
      showTasks() {
        this.tasks.forEach((task) => {
          console.log(this.name + " wants to " + task);
        });  
      }
    };
    
    bunny.showTasks();
    // Usagi wants to transform
    // Usagi wants to eat cake
    // Usagi wants to blow kisses
    ```
    
    第一個`this`，也就是showTasks function中的 `this.tasks`，因為執行showTasks是由bunny物件呼叫的，所以第一個`this`指向bunny物件。
    
    第二個`this`，是在forEach中的callback function同時也是箭頭函式，也就是說`this.name`的this等於showTasks的this，而showTasks由bunny物件呼叫執行，所以`this.name`的this等於showTask的this再等於bunny物件。
    
    ```jsx
    let getThis = () => this
    console.log(getThis() === window) // true
    
    //或是這樣:
    
    const obj = {
    	func: () => {
    		return this
    	}
    }
    
    console.log(obj.func() === window)  // true
    ```
    
    若外圍環境沒有其他Function Context ，那就會指向window ( 或global object )。
    

### 2️⃣ 箭頭函式不能使用在建構式

- **一般函式：**
    
    我們可以輕易地用一般function，透過new建立一個新的實體：
    
    ```jsx
    function Car(color){
    	this.color = color
    }
    
    const redCar = new Car('red')
    ```
    
- **箭頭函式：**
    
    由於上面所說，箭頭函式不會有自己的this引用物件，所以如果試圖用箭頭函式去建構會出錯：
    
    ```jsx
    const Car = (color) => {
      this.color = color
    };
    const redCar = new Car('red') // TypeError: Car is not a constructor
    ```
    

### 3️⃣ ****沒有 arguments 參數****

- **一般函式：**
    
    當函式被呼叫時，會產生一個arguments object，然後在傳遞至function中。這個arguments object他會包含所有我們所設的參數，而他是個看似很像array，但實際上跟array不一樣的object。
    
    ```jsx
    function myFunction() {
      console.log(arguments)
    }
    myFunction('a', 'b') // *Arguments(2)[a, b]*
    ```
    
- **箭頭函式**：
    
    實際上，箭頭函式的arguments object跟箭頭函式的this一樣，箭頭函式並沒有自己產生的arguments object，同樣**會沿用語彙環境外圍的arguments。**
    
    ```jsx
    function getObj(){
    	console.log(arguments);  // *Arguments(3) [1, 2, 3]*
        return {
            f: () => {
               console.log(arguments);  // *Arguments(3) [1, 2, 3]*
    	    }
    	};
    }
    
    getObj(1, 2, 3).f(4, 5);
    ```
    
    但沒有自己產生的arguments object，不代表傳入箭頭函式中的參數無法拿取。ES6提供了另一種特性，我們可以藉此來取得不確定數量的參數，此類語法稱為｢其餘參數｣(rest parameter)：
    
    ```jsx
    //改寫上面的code
    function getObj(){
    	console.log(arguments);  // *Arguments(3) [1, 2, 3]*
        return {
            f: (...args) => {
               console.log(args);  // *(2) [4, 5]*
    	    }
    	};
    }
    
    getObj(1, 2, 3).f(4, 5);
    ```
    

### 4️⃣ ****顯式綁定 (Explicit Binding)****

- **一般函式**：
    
    `bind()` / `apply()` / `call()`：
    
    ```jsx
    const obj = {
      num: 100,  //function的this綁到obj，數字從100往上加
    }
    
    window.num = 2020 // 如果this沒有綁到obj，數字就會從2020開始往上加
    
    const add = function (a, b, c) {
      return this.num + a + b + c;
    }
    
    //bind()
    const resultBind = add.bind(obj)
    console.log(resultBind(1, 2, 3))  // 106
    
    //call()
    const resultCall = add.call(obj, 1, 2, 3)
    console.log(resultCall)  // 106
    
    //apply()
    const arr = [1, 2, 3]
    const resultApply = add.apply(obj, arr)
    console.log(resultApply) // 106
    ```
    
- **箭頭函式**：
    
    `bind()` / `apply()` / `call()`：
    
    ```jsx
    const obj = {
      num: 100,  //function的this綁到obj，數字從100往上加
    }
    
    window.num = 2020 // 如果this沒有綁到obj，數字就會從2020開始往上加
    
    const add = (a, b, c) => {
      return this.num + a + b + c;
    }
    
    //bind()
    const bound = add.bind(obj)
    console.log(bound(1, 2, 3))  // 2026
    
    //call()
    console.log(add.call(obj, 1, 2, 3))  // 2026
    
    //apply()
    const arr = [1, 2, 3];
    console.log(add.apply(obj, arr))  // 2026
    ```
    
    箭頭函式不管是用哪個顯式綁定，this都不會綁到obj上，這是因為箭頭函式的this是看本身函式定義時的語彙位置，所以**不管是哪個顯示綁定對於箭頭函式來說都毫無作用**。
    

### 5️⃣ 更簡短的函式寫法

從傳統函式演進到箭頭函式，大概是這樣：

```jsx
const isEven = function(num){  // 一般函式寫法。
	return num % 2 === 0;  
};

const isEven = (num)=>{       // 把function拿掉，加上箭頭。
	return num % 2 === 0;  
};

const isEven = num =>{       // 如果是只有一個參數的話，小括弧可以省略。
	return num % 2 === 0;      // 但如果是無參數，小括弧一定要加！
};

const isEven = num =>(       // 使用小括弧可以把return省略，但使用大花括一定要return。
	num % 2 === 0  
);

const isEven = num => num % 2 === 0;  // one-liner，最終簡易寫法。
```

### 參考資料

[**MDN - Arrow function expressions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

**[5 Differences Between Arrow and Regular Functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)**

**[Demystifying the JavaScript this Keyword](https://www.javascripttutorial.net/javascript-this/)**

****[Learn ES6 The Dope Way Part II: Arrow functions and the ‘this’ keyword](https://www.freecodecamp.org/news/learn-es6-the-dope-way-part-ii-arrow-functions-and-the-this-keyword-381ac7a32881/)****

****[你不可不知的 JavaScript 二三事#Day20：ES6 的箭頭函數 (Arrow Functions)](https://ithelp.ithome.com.tw/articles/10207860)****

****[你不可不知的 JavaScript 二三事#Day21：箭頭函數 (Arrow Functions) 的 this 和你想的不一樣 (1)](https://ithelp.ithome.com.tw/articles/10207992)****

****[你不可不知的 JavaScript 二三事#Day22：箭頭函數 (Arrow Functions) 的 this 和你想的不一樣 (2)](https://ithelp.ithome.com.tw/articles/10208307)****