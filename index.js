const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://rafay:6XauHWQ1qJJPfb1Y@cluster0.teqzo.mongodb.net/login-app-database?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true });

const loginSchema = {
  username: String, // String is shorthand for {type: String}
  password: String,
};

const Login = mongoose.model("logins", loginSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;

  const newLogin = new Login({ username: user, password: pass });
  newLogin.save();

  res.redirect("/signin");
});

app.get("/signin", function (req, res) {
  res.render("signin");
});

app.post("/auth", (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;

  Login.findOne({username: user}, function(err, user){
    console.log(user);
    if(!(user === null))
    {
      if(user.password === pass){
        // res.render("index.html");
        res.redirect("index.html")
      }
      else {
        res.send("Wrong password");
      }
    }
    else {
      res.send("user not found");
    }
  })
    
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
