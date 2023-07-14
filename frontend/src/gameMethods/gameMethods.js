export const isTieFunc = (board) => {
  if (board.includes("")) return false;
  return true;
};

export const isGameOver = (
  board,
  isOver,
  setIsOver,
  player,
  setResults,
  setIsWon,
  setIsTie,
  setLineWin
) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (isTieFunc(board) && isOver === false && !isWin(board, winningPatterns)) {
    setResults((values) => ({
      ...values,
      result: "Tie",
    }));
    setIsTie(true);
    setIsOver(true);
    return true;
  } else if (!isOver) {
    winningPatterns.map((pattern) => {
      if (
        board[pattern[0]] !== "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[0]] === board[pattern[2]]
      ) {
        board[pattern[0]] === player ? setIsWon(true) : setIsWon(false);
        board[pattern[0]] === player
          ? setResults((values) => ({
              ...values,
              result: "Win",
            }))
          : setResults((values) => ({
              ...values,
              result: "Loss",
            }));

        setLineWin([pattern[0], pattern[1], pattern[2]]);
        setIsOver(true);

        return true;
      }
    });
    return false;
  }
};

export function isWin(board, patterns) {
  let found = false;
  patterns.map((pattern) => {
    if (
      board[pattern[0]] !== "" &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[0]] === board[pattern[2]]
    ) {
      found = true;
      return;
    }
  });
  return found;
}

export const opponentMove = (board, opponent, player) => {
  if (board[0] === opponent && board[1] === opponent && board[2] === "") {
    return 2;
  }
  if (board[0] === opponent && board[1] === "" && board[2] === opponent) {
    return 1;
  }
  if (board[0] === "" && board[1] === opponent && board[2] === opponent) {
    return 0;
  }
  if (board[3] === opponent && board[4] === opponent && board[5] === "") {
    return 5;
  }
  if (board[3] === opponent && board[4] === "" && board[5] === opponent) {
    return 4;
  }
  if (board[3] === "" && board[4] === opponent && board[5] === opponent) {
    return 3;
  }
  if (board[6] === opponent && board[7] === opponent && board[8] === "") {
    return 8;
  }
  if (board[6] === opponent && board[7] === "" && board[8] === opponent) {
    return 7;
  }
  if (board[6] === "" && board[7] === opponent && board[8] === opponent) {
    return 6;
  }
  if (board[0] === opponent && board[4] === opponent && board[8] === "") {
    return 8;
  }
  if (board[0] === opponent && board[4] === "" && board[8] === opponent) {
    return 4;
  }
  if (board[0] === "" && board[4] === opponent && board[8] === opponent) {
    return 0;
  }
  if (board[2] === opponent && board[4] === opponent && board[6] === "") {
    return 6;
  }
  if (board[2] === opponent && board[4] === "" && board[6] === opponent) {
    return 4;
  }
  if (board[2] === "" && board[4] === opponent && board[6] === opponent) {
    return 2;
  }
  if (board[2] === "" && board[5] === opponent && board[8] === opponent) {
    return 2;
  }
  if (board[2] === opponent && board[5] === "" && board[8] === opponent) {
    return 5;
  }
  if (board[2] === opponent && board[5] === opponent && board[8] === "") {
    return 8;
  }
  if (board[1] === "" && board[4] === opponent && board[7] === opponent) {
    return 1;
  }
  if (board[1] === opponent && board[4] === "" && board[7] === opponent) {
    return 4;
  }
  if (board[1] === opponent && board[4] === opponent && board[7] === "") {
    return 7;
  }
  if (board[0] === "" && board[3] === opponent && board[6] === opponent) {
    return 0;
  }
  if (board[0] === opponent && board[3] === "" && board[6] === opponent) {
    return 3;
  }
  if (board[0] === opponent && board[3] === opponent && board[6] === "") {
    return 6;
  }

  if (board[0] === player && board[1] === player && board[2] === "") {
    return 2;
  }
  if (board[0] === player && board[1] === "" && board[2] === player) {
    return 1;
  }
  if (board[0] === "" && board[1] === player && board[2] === player) {
    return 0;
  }
  if (board[3] === player && board[4] === player && board[5] === "") {
    return 5;
  }
  if (board[3] === player && board[4] === "" && board[5] === player) {
    return 4;
  }
  if (board[3] === "" && board[4] === player && board[5] === player) {
    return 3;
  }
  if (board[6] === player && board[7] === player && board[8] === "") {
    return 8;
  }
  if (board[6] === player && board[7] === "" && board[8] === player) {
    return 7;
  }
  if (board[6] === "" && board[7] === player && board[8] === player) {
    return 6;
  }
  if (board[0] === player && board[4] === player && board[8] === "") {
    return 8;
  }
  if (board[0] === player && board[4] === "" && board[8] === player) {
    return 4;
  }
  if (board[0] === "" && board[4] === player && board[8] === player) {
    return 0;
  }
  if (board[2] === player && board[4] === player && board[6] === "") {
    return 6;
  }
  if (board[2] === player && board[4] === "" && board[6] === player) {
    return 4;
  }
  if (board[2] === "" && board[4] === player && board[6] === player) {
    return 2;
  }
  if (board[2] === "" && board[5] === player && board[8] === player) {
    return 2;
  }
  if (board[2] === player && board[5] === "" && board[8] === player) {
    return 5;
  }
  if (board[2] === player && board[5] === player && board[8] === "") {
    return 8;
  }
  if (board[1] === "" && board[4] === player && board[7] === player) {
    return 1;
  }
  if (board[1] === player && board[4] === "" && board[7] === player) {
    return 4;
  }
  if (board[1] === player && board[4] === player && board[7] === "") {
    return 7;
  }
  if (board[0] === "" && board[3] === player && board[6] === player) {
    return 0;
  }
  if (board[0] === player && board[3] === "" && board[6] === player) {
    return 3;
  }
  if (board[0] === player && board[3] === player && board[6] === "") {
    return 6;
  }

  while (true) {
    let potentialSquare = Math.floor(Math.random() * 9);
    if (board[potentialSquare] === "") {
      return potentialSquare;
    }
  }
};
