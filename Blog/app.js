const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const dbURL = "mongodb+srv://techhunter:pass1234@bloggy.4gv4jur.mongodb.net/Bloggy?retryWrites=true&w=majority";


mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: false, // Disable SSL
    // tls: false, // Disable TLS
  }).then((result) => console.log('Connected..'))



// register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

// middleware and static files

// app.use((req, res, next) => {
//   console.log('New request made: ');
//   console.log('Host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next(); 
// })

// app.use((req, res, next) => {
//   console.log("In the next middleware");
//   next();
// })

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const blogs = [
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"},
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"},
    // {title: "School event tommorrow", snippet: "HOD giving volunteer free sovernier"}
  ]
  res.render('index', { title: "Home", blogs });
});

app.get('/about', (req, res) => {
  res.render("about", { title: "About" });
});

app.get('/blogs/create', (req, res) => {
  res.render("create", { title: "Create a new blog" });
})

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});


