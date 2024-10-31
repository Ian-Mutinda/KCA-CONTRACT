import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <button>get number</button>
       <br/> 
       <button>get message</button>
       <br/>
       <button>increase the number </button>
       <br/>
       <button>decrease the nubmer</button>
       <br/>
       <button>update message</button>

      </header>
    </div>
  );
}

export default App;
