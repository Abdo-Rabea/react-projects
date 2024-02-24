function Options({ question, answer, dispatch }) {
  const isChecked = answer != null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            isChecked
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={isChecked}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
