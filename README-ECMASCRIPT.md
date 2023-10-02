# ECMAScript

ECMAScript is a standard for scripting languages  
JavaScript is an example of an ECMAScript implementation

## ECMAScript Versions

### ECMAScript 2015, ES6, ECMAScript 6
	let, const, arrow functions, Promises, Classes, Spread Operator (...), for(let item of iterable)

### ES6, ECMAScript 2015, (ECMAScript 6) was finalized in June 2015 
	class, import/export, arrow functions, for ... in loop, let/const, promises, template literals `, 
	spread operator 
		const q1 = ["Jan", "Feb", "Mar"];
		const q2 = ["Apr", "May", "Jun"];
		const q3 = ["Jul", "Aug", "Sep"];
		const q4 = ["Oct", "Nov", "May"];

		const year = [...q1, ...q2, ...q3, ...q4];

### ES7, ECMAScript 2016, June 2016 
	async/await, destructuring patterns, exponential operator ** equivalent to Math.pow

### ES8, ECMAScript 2017, June 2017 
	Object.values, Object.entries

### ES9, ECMAScript 2018, June 2018
	spread operator (...) allows for the easy copying of object properties, create clones
	let objectClone = Object.assign({}, object) // before ES2018
	let objectClone = {...object} // ES2018 syntax

## 3 ways to clone an object:

### Spread Method
let clone = { ...userDetails }

### Object.assign() Method
let clone = Object.assign({}, userDetails)

### JSON.parse() Method - deep clone
let clone = JSON.parse(JSON.stringify(userDetails))