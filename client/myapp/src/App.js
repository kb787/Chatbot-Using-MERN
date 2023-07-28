import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
import Homepage from './Homepage'  ;
import ImageGeneration from './ImageGeneration' ;
import LoginPage from './LoginPage' ;
import RegisterPage from './RegisterPage' ;
import SearchEngine from './SearchEngine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
             <Route path = "/" element = {<Homepage/>} />
             <Route path = "/ImageGeneration" element = {<ImageGeneration/>} />
             <Route path = "/RegisterPage" element = {<RegisterPage/>} />
             <Route path = "/LoginPage" element = {<LoginPage/>} />
             <Route path = "/SearchEngine" element = {<SearchEngine/>} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
