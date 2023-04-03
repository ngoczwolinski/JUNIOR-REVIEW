import React from 'react';
import { useEffect, useState } from 'react';
import Squares from './Squares.jsx';

const MakerSquare = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // I copied this
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const getSquares = async () => {
      // Ngoc.....I think the fetch request is not working because it's not proxying to localhost:3000
      // due to bypass in webpack --OOOHHH. Let me check
      // I will just change it to squareAPI --kk
      //  It is not JSON-ing:() -- I will look at squareController

      const response = await fetch('/squareAPI');
      const squareArray = await response.json();
      console.log({ squareArray });
      setSquares(squareArray);
    };

    getSquares();
    return () => {
      setSquares([]);
    };
  }, []);

  return (
    <div>
      <h1>MakerSquare</h1>
      <form action="/squareAPI" method="POST">
        <input name="color" placeholder="color" type="text"></input>
        <button type="submit"> Create </button>
      </form>
      {/* <Squares squares={squares} /> */}
    </div>
  );
};

export default MakerSquare;
