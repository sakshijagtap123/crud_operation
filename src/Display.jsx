import { useState, useEffect } from "react";
import axios from 'axios';
import './Display.css'; 
import Edit from './Edit'; // Import the Edit component

function Display() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post");
      setData(result.data);
    };
// This useEffect hook runs once when the component mounts (the empty dependency array [] ensures this).
//Inside useEffect, fetchData is an asynchronous function that fetches data from a given API endpoint using axios.get.
//The fetched data is then stored in the data state using setData.
    
   fetchData();
    
  }, []);

  const handleSave = (id, updatedItem) => {
    setData(data.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    setEditingId(null);
  };
  //handleSave is a function that updates an item in the data array.
//It takes the id of the item to be updated and updatedItem, which contains the new data.
//setData updates the data state by mapping through the current data array:
//If the id of the item matches the id being edited, the item is updated with updatedItem.
//If the id doesn’t match, the item remains unchanged.
//After updating, setEditingId(null) is called to reset editingId, indicating that no item is being edited.

  const handleEdit = (id) => {
    setEditingId(id);
  };
/*
handleEdit is a function that sets the editingId to the id of the item that the user wants to edit.
This allows the application to keep track of which item is currently being edited.
*/
  const handleCancel = () => {
    setEditingId(null);
  };

  /* handleCancel is a function that resets editingId to null, effectively canceling the edit operation. */

  const handleDelete = async (id) => {
    await axios.delete(`https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post/${id}`);
    setData(data.filter(item => item.id !== id));
  };

  /* handleDelete is an asynchronous function that deletes an item from the API and removes it from the data state.
It takes the id of the item to be deleted.
First, it sends a DELETE request to the API using axios.delete.
Once the item is successfully deleted from the server, setData is used to filter out the deleted item from the data state, removing it from the UI. */

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {editingId === item.id ? (
                <td colSpan={3}>
                  <Edit item={item} onSave={handleSave} onCancel={handleCancel} />
                </td>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>
                    <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDelete(item.id)}></i>
                    <i className="fas fa-edit" onClick={() => handleEdit(item.id)}></i>
                  </td>
                  
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Display;
