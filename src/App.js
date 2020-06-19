import React from 'react';
import Search from './component/search';
import Movies from './component/movies';
import './App.css';

function App() {
  return (
            <div className='app'>
               <Search />
               <Movies />
            </div>
  );
}

export default App;
