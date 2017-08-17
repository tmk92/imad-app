var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;  // to connect to db
var crypto=require('crypto');   // to encrypt the pwd
var bodyParser=require('body-parser'); //to understand the body is in JSON format

var config={                            // configuration of db
    user:'khanmohsin3011',
    databases: 'khanmohsin3011',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


/*var articles={
        'article-one':{
            title:'Article-One | Mohsin Khan',
            heading :'Article-One',
            date: '3rd Aug 2017',
            content:`
                        <p>
                            I am Software Engineer at Persistent Systems Limited from last 1.11 years, ultimately gaining experience in software development and deployment. As Developer, my responsibility is to understand the requirement and delivered the same efficiently.
                        </p>
                        <p>
                            I am currently working in Apigee. I am very proficient in OOPS, Data Structure, Java, MySql and also good at JavaScript, Bootstrap.
                        </p>`
                        
                        
                        
        },
        'article-two':{
            title:'Article-Two| Mohsin Khan',
            heading :'Article-Two',
            date: '3rd Aug 2017',
            content:`
                        <p>
                            I am Software Engineer at Persistent Systems Limited from last 1.11 years, ultimately gaining experience in software development and deployment. As Developer, my responsibility is to understand the requirement and delivered the same efficiently.
                        </p>`
        },
        'article-three':{
            title:'Article-Three | Mohsin Khan',
            heading :'Article-Three',
            date: '3rd Aug 2017',
            content:`
                        <p>
                            I am Software Engineer at Persistent Systems Limited from last 1.11 years, ultimately gaining experience in software development and deployment. As Developer, my responsibility is to understand the requirement and delivered the same efficiently.
                        </p>
                        <p>
                            I am currently working in Apigee. I am very proficient in OOPS, Data Structure, Java, MySql and also good at JavaScript, Bootstrap.
                        </p>`
        }
};*/
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
        var htmlTemplate=`
        <html>
            <head>
                <title>${title} </title>
                <meta name="viewport" content ="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
                
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    
                    <h3>${heading}</h3><div><b>${date.toDateString()}</b></div>
                    
                    <div>
                        ${content}
                    </div>
                    <br><hr/>
                    <textarea id="comment" type="text" placeholder="Comment" rows="4" cols="50"></textarea>
                    <input id="submit-comment" type="submit" value="Submit"/>
                    
                    <ol id="commentList"> </ol>   
                </div>
                
            </body>
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName', function (req, res) {
    //articleName==articleOne
    //articles[articleName] ={} content object for articleOne
  /*var articleName= req.params.articleName;  //extract the name functionality provided by express    
  /:articleName
  res.send(createTemplate(articles[articleName]));
  res.send(createTemplate(articleData));
  */
  //SQL Injection FLAW-->pool.query("SELECT * FROM user WHERE title ='"+ req.params.articleName + "'",function (err, result)
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.lenght === 0){
                res.ststus(404).send("Article-One not Found");
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
      });
});


var counter= 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
    
});

//Query param parameter used to pass name 
var names =[];
app.get('/submit-name', function (req, res) {   //submit-name?name=xyz
  //Get the name from req obj
  var name=req.query.name;
  
  names.push(name);
  //JSON : JavaScript Object Notation
  res.send(JSON.stringify(names)); //This will convert the array into string 
});

//Path param parameter used to pass name 
/*var names =[];
app.get('/submit-name/:name', function (req, res) {  // submit-name/name
  //Get the name from req obj
  var name=req.params.name;
  
  names.push(name);
  //JSON : JavaScript Object Notation
  res.send(JSON.stringify(names)); //This will convert the array into string 
});*/

//Connect to database
var pool= new Pool(config);
app.get('/test-db', function (req, res) {
    //Make a select request
    //retun a response with the result
    pool.query('SELECT * FROM article', function (err, res) {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringfy(res.rows));
        }
        
    });
});

function hash(input, salt){
    //how to we create a hash..?
    var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pdkdf2", 10000, salt, hashed.toString('hex')].join('$');  // Make hash into readable
    
}

app.get('/hash/:input', function (req, res) {
  var hashingString = hash(req.params.input, 'this-is-some-random-string');
  res.send(hashingString);
  
});


app.post('/create-user', function (req, res) {
  //username ,password
  //{"username":"MOHSIN" , "password":"password"}
  
  var username= req.body.username;
  var password= req.body.password;
  var salt= crypto.randomBytes(128).toString('hex');
  var dbString = hash(password, salt);
  
  pool.query('INSERT into "user" (username,password) VALUES ($1, $2)',[username, dbString], function (err, result) {
        if(err){
            result.status(500).send(err.toString());
        }
        else{
            result.send('User successfully created:' +username);
        }
    });
});


app.post('/login', function (req, res) {
  var username= req.body.username;
  var password= req.body.password;
  
  pool.query('SELECT * from "user" username=$1)',[username], function (err, result) {
        if(err){
            result.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.send(403).send('username/password is invalid');
            }
            else{
                //Match the password
                var dbString =result.rows[0].password;
                var salt= dbString.split('$')[2];
                var hashedPassword= hash(password, salt); //Creating the hash based on the password submitted  and the original salt 
                if(hashedPassword === dbString ){
                    result.send('Credentials are correct');    
                }
                else{
                    res.send(403).send('username/password is invalid');
                }
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port =80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
