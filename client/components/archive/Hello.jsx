import React, {useState, useCallback} from 'react'

export const Hello = () => {
  const [height, setHeight] = useState(0);
  const [count, setCount] = useState(0);
  console.log('WASABI')

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      console.log('height', height)
  
    }
  }, [count]);

  return (
    <div>
      <h1 ref={measuredRef}><div>Hola, mundo</div>{new Array(count).fill('').map(() => <div>:)</div>)}</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <button onClick={() => setCount(count => count + 1)}>Add More</button>
    </div>
  );
}
