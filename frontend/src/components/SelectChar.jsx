function SelectChar({ results, setChar }) {
  return (
    <>
      <h2>
        A coin-flip decided that you would go
        {results.firstMove ? " first " : " second "}
        choose your character.
      </h2>

      <button
        type="button"
        onClick={() => setChar("X")}
        className="btn btn-block"
      >
        X
      </button>

      <button
        type="button"
        onClick={() => setChar("O")}
        className="btn btn-block"
      >
        O
      </button>
    </>
  );
}

export default SelectChar;
