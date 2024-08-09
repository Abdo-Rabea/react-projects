import styled from "styled-components";

//todo: Tagged Template Literals

// this is for this scope like css modules
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 1.2rem 1.6rem;
  margin: 20px;
  border-radius: 7px;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: purple;
  cursor: pointer;
  color: white;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 1.5rem;
`;
function App() {
  return (
    <StyledApp>
      <H1>hello world</H1>
      <Button onClick={() => alert("check in")}>check in</Button>
      <Button onClick={() => alert("check out")}>check out</Button>
      <Input type="input" placeholder="number of guests" />
    </StyledApp>
  );
}

export default App;
