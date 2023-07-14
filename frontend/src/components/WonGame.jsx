function WonGame({ user, restart }) {
  return (
    <>
      <h1>Congrats {user.name}</h1>
      <h3>You Won!</h3>
      <button onClick={restart} className="btn">
        Play Again
      </button>
    </>
  );
}

export default WonGame;
