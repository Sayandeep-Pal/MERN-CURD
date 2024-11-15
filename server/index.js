const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require("./models/Users.js")

const app = express();
app.use(
  cors({
    origin: ["https://mern-curd-frontend-alpha.vercel.app"],
    methods: ["POST", 'GET'],
    credentials: true
  })
);
app.use(express.json());


mongoose.connect(
  "mongodb+srv://sayandeep123:babusona@cluster0.0qugd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/" , (request, response) =>{
  res.json("HELLO");
    UserModel.find({})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
})

app.get("/getUser/:id",(req,res) =>{
    const id = req.params.id;
    UserModel.findById({_id : id})
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
})

app.put("/update/:id", (req,res) =>{
    const id = req.params.id;
    UserModel.findOneAndUpdate(
      { _id: id },
      { name: req.body.name, age: req.body.age, email: req.body.email }
    )
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
})

app.post("/createUser", (request,response) => {
    UserModel.create(request.body)
    .then(users => response.json(users))
    .catch(err => response.json(err))
})

app.delete("/deleteUser/:id", (req,res) =>{
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
})

app.listen(3000, () => {
  console.log("Server is running...");
});
