function LostGame({ user, restart }) {
  return (
    <>
      <h1>Damn {user.name}</h1>
      <h3>You Lost :*/</h3>
      <button onClick={restart} className="btn btn-primary">
        Play Again
      </button>
    </>
  );
}

export default LostGame;
