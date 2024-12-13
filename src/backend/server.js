const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://jagadeesh:Jaga@cluster0.ln86d.mongodb.net/DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Item schema and model
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  checked: { type: Boolean, default: false },
});
const Item = mongoose.model('Item', itemSchema);

// GET all items
app.get('/data', async (req, res) => {
  try {
    const items = await Item.find();
    console.log("Items fetched:", items); // Debug log
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new item
app.post('/data', async (req, res) => {
  const { item, checked } = req.body;
  const newItem = new Item({ item, checked: checked || false });
  try {
    const savedItem = await newItem.save();
    console.log("Item added:", savedItem); // Debug log
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an entire item (either name or checked status)
app.put('/data/:id', async (req, res) => {
  const { id } = req.params;
  const { item, checked } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { item, checked },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("Item updated:", updatedItem); // Debug log
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an item
app.delete('/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("Item deleted:", deletedItem); // Debug log
    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
