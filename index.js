import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("DB connection successfu!l"))
.catch((err) => console.log(err));

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//   name: "complete todo list",
// });
// const item2 = new Item({
//   name: "wake up at 6am lol",
// });
// const item3 = new Item({
//   name: "go to gym",
// });
// const defaultItems = [item1,item2,item3];

// Item.insertMany(defaultItems)
//     .then(function() {
//       console.log("Successfully saved.");
//     })
//     .catch(function(err){
//       console.log(err);
//     });

app.get("/", (req,res) => {
  Item.find({}, function(err, foundItems){
    res.render("index.ejs", {tasks : foundItems});
  });
  
});

app.post("/list", (req,res) => {
  const listItem = req.body.newItem ;
  if(listItem.trim() !== ""){
    list.push(listItem);
  }
//   res.render("index.ejs", {tasks : list});
  res.redirect("/");
  console.log(listItem);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});