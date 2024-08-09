import { useState } from "react";
import axios from 'axios';

function Edit({ item, onSave, onCancel }) {
  const [name, setName] = useState(item.name);
  const [age, setAge] = useState(item.age);

  const save = async (e) => {
    e.preventDefault();
    await axios.put(`https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post/${item.id}`, { name, age });
    onSave(item.id, { name, age });
  };

  return (
    <form onSubmit={save}>
      <input 
        type='text' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type='text' 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
      />
      <button type='submit'>Save</button>
      <button type='button' onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default Edit;
