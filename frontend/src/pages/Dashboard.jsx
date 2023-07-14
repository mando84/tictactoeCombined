import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getRecords, reset } from "../features/records/recordSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { records, isLoading, isError, message } = useSelector(
    (state) => state.records
  );

  const [results, setResults] = useState([]);
  const [firstMoves, setFirstMoves] = useState(0);
  const [char, setChar] = useState([]);

  const getResults = () => {
    let results = [0, 0, 0];
    for (let i = 0; i < records.length; i++) {
      if (records[i].result === "Win") {
        results[0]++;
      } else if (records[i].result === "Tie") {
        results[1]++;
      } else {
        results[2]++;
      }
    }
    setResults(results);
  };

  const getMoves = () => {
    let first = 0;
    let second = 0;
    for (let i = 0; i < records.length; i++) {
      if (records[i].firstMove) first++;
      else {
        second++;
      }
    }
    setFirstMoves(Math.round((first / (first + second)) * 100));
  };

  const getCharacters = () => {
    let xyCount = [0, 0];
    for (let i = 0; i < records.length; i++) {
      if (records[i].character == "X") {
        xyCount[0]++;
      } else {
        xyCount[1]++;
      }
    }
    let total = xyCount[0] + xyCount[1];
    xyCount[0] = Math.round((xyCount[0] / total) * 100);
    xyCount[1] = 100 - xyCount[0];
    setChar(xyCount);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getRecords());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  //The second useEffect must be implemented to run these methods that populate
  //the state because an infinate loop takes place if its placed in the first one.
  //I believe because every time records changes the dispatch will be called.
  useEffect(() => {
    getResults();
    getMoves();
    getCharacters();
  }, [records]);

  if (isLoading) {
    return <Spinner />;
  }

  const playAgain = () => {
    navigate("/game");
  };

  if (records.length > 0) {
    return (
      <>
        <section className="heading">
          <h1>Welcome {user && user.name}</h1>
          <p>Records Dashboard</p>
          <h5>Previous Results</h5>
          <h6>
            Wins: {results[0]} / Ties: {results[1]} / Losses: {results[2]}
          </h6>
          <h5>Character Frequency</h5>
          <h6>
            X: {char[0]}% / O: {char[1]}%
          </h6>
          <h5>First Move Frequency</h5>
          <h6>{firstMoves}%</h6>
        </section>
        <button onClick={playAgain} className="btn btn-block">
          Play Again
        </button>
      </>
    );
  } else {
    return (
      <>
        <section className="heading">
          <h1>Welcome {user && user.name}</h1>
          <p>Records Dashboard</p>
        </section>
        <button onClick={playAgain} className="btn btn-block">
          Start Playing TicTacToe
        </button>
      </>
    );
  }
}

export default Dashboard;
