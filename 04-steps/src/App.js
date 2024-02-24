import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  // define state and initializing state
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    // update state on some handler
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }
  }

  function handleTogleIsOpen() {
    setIsOpen((is) => !is);
  }
  return (
    <>
      <div className="close" onClick={handleTogleIsOpen}>
        &times;
      </div>
      {isOpen && (
        <div className="steps">
          {/* numbers */}
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* message */}
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          {/* buttons */}
          {/* note that using onClick is declarative but using eventListner is imperative since it uses dom to select element */}
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7852F6", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7852F6", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
