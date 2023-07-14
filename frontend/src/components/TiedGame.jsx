function TiedGame({ user, restart }) {
  return (
    <>
      <h1>{user.name}</h1>
      <h3>You Tied :/</h3>
      <button onClick={restart} className="btn">
        Play Again
      </button>
    </>
  );
}

export default TiedGame;
