import Header from "./Header"; 
import Content from "./Content";
import Footer from "./Footer"; 
import { useState, useEffect } from 'react'; 
import AddItem from "./AddItem"; 
import SearchItem from "./SearchItem"; 
import axios from "axios";

function App() { 
  const API_URL = "http://localhost:5000/data"; 

  const [values, setValues] = useState([]); 
  const [newItem, setNewItem] = useState(''); 
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null); 
  const [editItemId, setEditItemId] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

  // Fetch items from backend 
  useEffect(() => { 
    const fetchItems = async () => { 
      try { 
        const res = await axios.get(API_URL); 
        setValues(res.data); 
        setFetchError(null); 
        setLoading(false);
      } catch (err) { 
        console.error("Fetch error:", err.message); 
        setFetchError("Failed to fetch items from server."); 
      } 
    }; 
    fetchItems(); 
  }, []);

  // Show pop-up and hide after 2 seconds 
  const triggerPopup = () => { 
    setShowPopup(true); 
    setTimeout(() => setShowPopup(false), 3000); 
  };

  // Add item 
  const addItem = async (item) => { 
    const newItem = { item, checked: false }; 
    try { 
      const res = await axios.post(API_URL, newItem); 
      // Add the new item at the start of the array
      setValues([res.data, ...values]); 
      setFetchError(null); 
      triggerPopup(); 
    } catch (err) { 
      console.error("Add item error:", err.message); 
      setFetchError("Failed to add item."); 
    } 
  };

  // Toggle item check/uncheck and update the backend
  const handleCheck = async (id) => { 
    try {
      // Find the item by id and toggle its checked state
      const updatedItems = values.map(item => 
        item._id === id ? { ...item, checked: !item.checked } : item
      );
      
      // Update the item on the backend
      const updatedItem = updatedItems.find(item => item._id === id);
      await axios.put(`${API_URL}/${id}`, updatedItem);

      // Update the local state after backend update
      setValues(updatedItems);
    } catch (err) {
      console.error("Error toggling check:", err.message);
      setFetchError("Failed to update item.");
    }
  };

  // Delete item 
  const handleDelete = async (id) => { 
    try { 
      await axios.delete(`${API_URL}/${id}`); 
      setValues(values.filter(item => item._id !== id)); 
      setFetchError(null); 
    } catch (err) { 
      console.error("Delete error:", err.message); 
      setFetchError("Failed to delete item."); 
    } 
  };

  // Edit item 
  const handleEdit = (id) => { 
    const itemToEdit = values.find(item => item._id === id); 
    if (itemToEdit) { 
      setNewItem(itemToEdit.item); 
      setEditItemId(id); 
    } else { 
      setFetchError("Edit error: Item not found."); 
    } 
  };

  // Submit item (either add or edit) 
  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!newItem) return;

    if (editItemId) { 
      try { 
        const updatedItem = { 
          item: newItem, 
          checked: values.find(item => item._id === editItemId).checked 
        };
        const res = await axios.put(`${API_URL}/${editItemId}`, updatedItem);
        setValues(values.map(item => (item._id === editItemId ? res.data : item))); 
        setEditItemId(null); 
        setFetchError(null); 
      } catch (err) { 
        console.error("Submit edit error:", err.message); 
        setFetchError("Failed to edit item."); 
      } 
    } else { 
      await addItem(newItem); 
    }

    setNewItem(''); // Clear input 
  };

  return ( 
    <div className="App"> 
      <Header /> 
      {showPopup && <div className="popup">New item added!</div>} 
      <AddItem 
        newItem={newItem} 
        setNewItem={setNewItem} 
        handleSubmit={handleSubmit} 
      /> 
      <SearchItem 
        search={search} 
        setSearch={setSearch} 
      /> 
      <main> 
      {loading ? (
        <div className="loader">Loading...</div> // Show loader while fetching
      ) : (
        <> 
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>} 
        <Content 
          values={values.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))} 
          handleCheck={handleCheck} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
        /> 
        </> )}
      </main> 
      <Footer length={values.length} /> 
    </div> 
  ); 
}

export default App;
