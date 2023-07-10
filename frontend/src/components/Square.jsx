function Square({ val, chooseSquare, winSquare }) {
  return (
    <div className={winSquare ? "squareWin" : "square"} onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
