const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log(err);
    }
  });
  next();
});
app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/', (request, response)=>{
  //response.send('hello express');
  // response.send({
  //   name: 'rahul',
  //     dob:'16//04//1995',
  //   college: 'piet'
  // });
  response.render('home.hbs',{
    title: 'Home',
    welcomeMessage: 'Welcome, Good Morning'
  });
});

app.get('/about',(req, res)=>{
  //res.send('It\'s about time!');
  res.render('about.hbs',{
    title: 'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Bad Request'
  });
});
app.listen(port);
