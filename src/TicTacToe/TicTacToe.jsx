import React, {useState } from "react";
import "./TicTacToe.css";


const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
	const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState()
  const [statuse, setStatus] = useState()
	const checkForWinner = (squares) => {
    let compos = {
			accros: [
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ],
			down: [
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
			diagnol: [
        [0,4,8],
        [2,4,6]
      ],
		};
    for (let comp in compos){
      compos[comp].forEach(pattern => {
        if(
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === '' 
        ){
          // do nothing
        }else if(
          squares[pattern[0]] === squares[pattern[1]] && 
          squares[pattern[1]] === squares[pattern[2]] 
        ){
          setWinner(squares[pattern[0]])
        }
      });
      if (!(squares.includes('')) && (winner === null)){
        setStatus('GameOver')
      }
    }
	};
	const handleClick = (num) => {
    if (winner){
      return;
    }
		if (cells[num] !== "") {
			alert("Funny!");
			return;
		}
		let squares = [...cells];
		squares[num] = turn;
		if (turn === "X") {
			setTurn("O");
		} else {
			setTurn("X");
		}
    checkForWinner(squares)
		setCells(squares);
		// console.log(squares);
	};

  const handelRestart = () =>{
    setWinner()
    setStatus()
    setTurn('X')
    setCells(Array(9).fill(""))
  }
	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};
	return (
		<div className="container">
			<table>
			  <h4>Turn: {turn}</h4>
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
      {winner && (
        <>
        <p>{winner} is the winner</p>
        <button onClick={handelRestart}>Play Again</button>
        </>
      )}
      {(statuse === 'GameOver') && (
        <>
        <p>{statuse}</p>
        <button onClick={handelRestart}>Play Again</button>
        </>
      )}

		</div>
	);
};

export default TicTacToe;
