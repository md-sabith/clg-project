import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup'
import Attentence from './pages/Attentence'
import ClassWIsePriv from './pages/ClassWIsePriv';
import TestAtt from './components/attentence/TestAtt';
import EditClassPage from './pages/EditClassPage';
import EditAttentence from './pages/EditAttetence'
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/attentence/:id' element={<Attentence/>}/>
          <Route path='/class-wise' element={<ClassWIsePriv/>}/>
          <Route path='/test' element={<TestAtt/>}/>
          <Route path='/edit-attentence-classes' element={<EditClassPage/>}/>
          <Route path='/edit-attentence/:id' element={<EditAttentence/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;