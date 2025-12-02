const express = require("express");
const app = express();

app.use(express.json());

// Your TODO data
const data = {
  "todos": [
    {
      "id": 1,
      "title": "Todo 1",
      "description": "This is todo 1",
      "completed": false
    },
    {
      "id": 3,
      "title": "Todo 3",
      "description": "This is todo 3",
      "completed": false
    },
    {
      "id": 4,
      "title": "Todo 4",
      "description": "This is todo 4",
      "completed": false
    },
    {
      "id": 5,
      "title": "Todo 5",
      "description": "This is todo 5",
      "completed": false
    }
  ]
};

// GET route to return all todos
app.get("/todos", (req, res) => {
  res.json(data);
});

// Running server on port 3000, accessible from internet (0.0.0.0)
app.listen(3000, "0.0.0.0", () => {
  console.log("Todo API Server is running on http://0.0.0.0:3000");
});

