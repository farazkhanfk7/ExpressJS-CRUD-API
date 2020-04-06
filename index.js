const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./members');

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('index',{members});
});

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/members',require('./routes/api/users')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running at ${PORT}`));