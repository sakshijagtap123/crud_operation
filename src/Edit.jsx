import { useState } from "react";
import axios from 'axios';

function Edit({ item, onSave, onCancel }) {
/*
item: The current item being edited, which contains at least id, name, and age properties.
onSave: A function to be called when the user saves the changes.
onCancel: A function to be called when the user cancels the editing process
*/
  
  const [name, setName] = useState(item.name);
  const [age, setAge] = useState(item.age);

  /*
  Two state variables, name and age, are initialized with the name and age values from the item prop.
setName and setAge are functions used to update these state variables when the user changes the input fields.
  */

  const save = async (e) => {
    e.preventDefault();
    await axios.put(`https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post/${item.id}`, { name, age });
    onSave(item.id, { name, age });
  };
/* e.preventDefault() prevents the default form submission behavior, so the page doesn’t reload.
axios.put sends an HTTP PUT request to update the item on the server. The request URL includes the id of the item being updated, and the request body contains the updated name and age.
After the item is successfully updated on the server, the onSave function is called, passing the id of the item and the updated data ({ name, age }). This usually updates the parent component's state to reflect the changes. */
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
