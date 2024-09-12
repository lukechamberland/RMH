import './App.css';
import Background from './components/Background';
import { useState } from 'react';

function App() {

  const [roundState, setRoundState] = useState(0);

  return (
    <div>
      <Background key={roundState} newState={roundState} setNewState={setRoundState} />
    </div>
  );
}

export default App;
