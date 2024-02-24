function Progress({ index, numQuestions, answer, points, maxPossiblePoints }) {
  return (
    <header className="progress">
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
      <progress max={numQuestions} value={index + (answer != null)} />
    </header>
  );
}

export default Progress;
