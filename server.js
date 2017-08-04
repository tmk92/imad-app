var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={
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
};


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
                    
                    <h3>${heading}</h3><div><b>${date}</b></div>
                    
                    <div>
                        ${content}
                    </div>
                    
                </div>
                
            </body>
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    //articleName==articleOne
    //articles[articleName] ={} content object for articleOne

  var articleName= req.params.articleName;  //extract the name functionality provided by express    
  res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
