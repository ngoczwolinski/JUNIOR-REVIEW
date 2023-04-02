import React from 'react';
import {useEffect,useState} from 'react'
 
const MakerSquare = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // I copied this  
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const getSquares = async() => {
      const squareArray = await fetch('/makersquare/getsquares');
      setSquares(squareArray);
    };

    getSquares();

    return () => {
      setSquares([]);
    }
  }, []);
  
  return (
    <div>
       <h1>MakerSquare</h1> 
       <form action="/makersquare" method="POST">
          <input name="color" placeholder="color" type="text"></input>
          <button type="submit"> Create </button> 
       </form>
       <Squares squares={squares} />
    </div>
  )
}
 
export default MakerSquare