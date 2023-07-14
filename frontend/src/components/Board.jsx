import Square from "./Square";

const Board = ({ board, chooseSquare, char, winSquares }) => {
  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0, char);
            }}
            winSquare={winSquares[0]}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1, char);
            }}
            winSquare={winSquares[1]}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2, char);
            }}
            winSquare={winSquares[2]}
          />
        </div>
        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3, char);
            }}
            winSquare={winSquares[3]}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4, char);
            }}
            winSquare={winSquares[4]}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5, char);
            }}
            winSquare={winSquares[5]}
          />
        </div>
        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6, char);
            }}
            winSquare={winSquares[6]}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7, char);
            }}
            winSquare={winSquares[7]}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8, char);
            }}
            winSquare={winSquares[8]}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
