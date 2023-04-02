import React from 'react';
import {useEffect,useState} from 'react'

const Squares = ({ squares }) => {
    const [squareElements, setSquareElements] = useState([]);

    // sorry, didn't not include cleanup function...
    useEffect(() => {
        array = [];
        squares.forEach(square => {
            array.push(<div style={{"width": "100px", "height": "100px", "backgroundColor":square.color}}></div>)
        })
        setSquareElements(array);
    });

    return (
        <div>
            {{ squareElements }}
        </div>
    )
    
}

export default Squares;