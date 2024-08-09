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

    fetchData();
  }, []);

  const handleSave = (id, updatedItem) => {
    setData(data.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    setEditingId(null);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://66b2f6937fba54a5b7eaee54.mockapi.io/yes/post/${id}`);
    setData(data.filter(item => item.id !== id));
  };

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
