# React Notes 

## React Component Lifecycle Methods
The _Mounting Phase_ begins when a component is first created and inserted into the DOM. 
The _Updating Phase_ occurs when a component's state or props change. 
The _Unmounting Phase_ occurs when a component is removed from the DOM.

```js
useEffect( () => console.log("mount"), [] );
useEffect( () => console.log("data1 update"), [ data1 ] );
useEffect( () => console.log("any update") );
useEffect( () => () => console.log("data1 update or unmount"), [ data1 ] );
useEffect( () => () => console.log("unmount"), [] );
```

### componentWillUnmount
```js
useEffect(() => {
  return () => {};
}, []);
```

## class-based React lifecycle methods

### Component Mounting Phase
The constructor() lifecycle method
The render() lifecycle method
The getDerivedStateFromProps() lifecycle method
The componentDidMount() lifecycle method

### Component Updating Phase
The shouldComponentUpdate() lifecycle method
The componentWillUpdate() lifecycle method
The componentDidUpdate lifecycle method
The getSnapshotBeforeUpdate lifecycle method

### Component Unmounting Phase
The componentWillUnmount() lifecycle method

## notes 

- Browsers don't understand JSX out of the box, so most React users rely on a compiler like Babel or TypeScript to transform JSX code into regular JavaScript.
- The Virtual DOM is a lightweight representation (of the actual DOM) in memory. Only part of the page is updated/refreshed, which speeds up performance.
- A key is a unique identifier that helps to determine which components need to be re-rendered. It increases performance, as only the updated components are re-rendered .
- Components are reusable parts of the UI that can be processed separately. Each component has a render() method.