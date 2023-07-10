import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecord } from "../features/records/recordSlice";
import { opponentMove, isGameOver, isWin } from "../gameMethods/gameMethods";
import Board from "../components/Board";
import CurrentGameMessage from "../components/CurrentGameMessage";
import WonGame from "../components/WonGame";
import TiedGame from "../components/TiedGame";
import LostGame from "../components/LostGame";
import SelectChar from "../components/SelectChar";

function Game() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isOver, setIsOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isTie, setIsTie] = useState(false);
  const [opponent, setOpponent] = useState("");
  const [currentMove, setCurrentMove] = useState("");
  const [winSquares, setWinSquares] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [lineWin, setLineWin] = useState([]);

  const [results, setResults] = useState({
    result: "",
    character: "",
    firstMove: null,
  });

  const { result, character, firstMove } = results;

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

  const initialState = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsOver(false);
    setIsWon(false);
    setIsTie(false);
    setOpponent("");
    setCurrentMove("");

    setResults((data) => ({
      ...data,
      result: "",
      character: "",
      firstMove: null,
    }));

    setLineWin([]);

    setWinSquares([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  };

  const coinFlip = () => {
    let result = Math.floor(Math.random() * 100);
    let move = null;
    if (result < 50) {
      move = false;
      setCurrentMove("opponent");
    } else {
      move = true;
      setCurrentMove("player");
    }
    setResults((existingValues) => ({
      ...existingValues,
      firstMove: move,
    }));
  };

  const setChar = (char) => {
    setResults((existingValues) => ({
      ...existingValues,
      character: char,
    }));

    char === "O" ? setOpponent("X") : setOpponent("O");
  };

  const chooseSquare = (square, char) => {
    let goodMove = false;
    if (isWin(board, winningPatterns) === false) {
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            goodMove = true;
            return char;
          }
          return val;
        })
      );

      if (goodMove) {
        currentMove === "player"
          ? setCurrentMove("opponent")
          : setCurrentMove("player");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (results.firstMove === null) coinFlip();

    if (currentMove) {
      isGameOver(
        board,
        isOver,
        setIsOver,
        results.character,
        setResults,
        setIsWon,
        setIsTie,
        setLineWin
      );
    }

    if (
      currentMove === "opponent" &&
      board.filter((elem) => elem === "").length > 0 &&
      results.character !== ""
    ) {
      let move = opponentMove(board, opponent, results.character);
      chooseSquare(move, opponent);
    }

    if (isOver) {
      const recordData = {
        result,
        character,
        firstMove,
      };

      let newArr = [];

      for (let i = 0; i < winSquares.length; i++) {
        if (lineWin.includes(i)) {
          newArr.push(true);
        } else {
          newArr.push(false);
        }
      }

      setWinSquares(newArr);
      dispatch(createRecord(recordData));
    }
  }, [board, opponent, currentMove, isTie, isOver]);

  const restart = () => {
    initialState();
    navigate("/game");
  };

  if (isOver && isWon) {
    return (
      <>
        <WonGame user={user} restart={restart} />

        <Board
          board={board}
          chooseSquare={chooseSquare}
          char={results.character}
          winSquares={winSquares}
        />
      </>
    );
  } else if (isOver && isTie) {
    return (
      <>
        <TiedGame user={user} restart={restart} />

        <Board
          board={board}
          chooseSquare={chooseSquare}
          char={results.character}
          winSquares={winSquares}
        />
      </>
    );
  }
  if (isOver && !isWon) {
    return (
      <>
        <LostGame user={user} restart={restart} />

        <Board
          board={board}
          chooseSquare={chooseSquare}
          char={results.character}
          winSquares={winSquares}
        />
      </>
    );
  } else if (results.character !== "") {
    return (
      <>
        <CurrentGameMessage results={results} />

        <Board
          board={board}
          chooseSquare={chooseSquare}
          char={results.character}
          winSquares={winSquares}
        />
      </>
    );
  } else {
    return <SelectChar results={results} setChar={setChar} />;
  }
}

export default Game;
