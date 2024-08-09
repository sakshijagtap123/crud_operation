import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Display from './Display';

function App() {
  const [name,setName] = useState("")
  const [age,setAge] = useState("")

const add = (e) =>{
  e.preventDefault()
  
  axios.post("https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post",{name:name,age:age})

  setName("")
  setAge("")
}

  return (
    <div className="App">
      <form onSubmit={add}>
        <input type='text' value={name} placeholder='name'  onChange={(e)=>{setName(e.target.value)}}  />
        <input type='text' value={age} placeholder='age'  onChange={(e)=>{setAge(e.target.value)}}  />
        <input type='submit' value={"add it"} />
      </form>

<hr></hr>
<h1>Result</h1>

{ <Display /> }
    </div>

  );
}

export default App;