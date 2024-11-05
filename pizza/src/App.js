import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
         <Router>
          <div>
            <Routes>
              <Route path="/" /* element={<M/>} */ />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
