/*console.log('Loaded!');

//change the text of main-text div
var element=document.getElementById("main-text");
element.innerHTML="NewValue";

//Move the image
var img=document.getElementById("madi");
var marginLeft=0;
function moveRight(){
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick=function() {
    var interval = setInterval(moveRight, 50);
};*/

//counter code
var button= document.getElementById('counter');

button.onclick= function(){
    //Create a request to counter endpoint 
   var request = new XMLHttpRequest();
    
    //Capture the res and store  it in a variable
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200) {
               var counter =request.responseText;
               var span =document.getElementById('count');
               span.innerHTML = counter.toString();
                
            }
        }        
    };
    
    //Make a request to coounter endpoint 
    request.open('GET','http://khanmohsin3011.imad.hasura-app.io/counter',true);
    request.send(null);
  
    //Render the  variable  in correct span
   /*  counter= counter + 1;
     var span =document.getElementById('count');
     span.innerHTML = counter.toString();*/
};



///Submit Name
var submit =document.getElementById('submit-btn');
submit.onclick= function(){
    
    //Make a request to a server and send the name
     //Create a request to counter endpoint 
    var request = new XMLHttpRequest();
    
    //Capture the res and store  it in a variable
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200) {
                //Capture the list of name and render the list
                var names = request.responseText;
                names=JSON.parse(names);  //converted into array
                var list='';
                
                for(var i=0; i< names.length; i++){
                    list+='<li>'+names[i]+'</li>';
                }
                
                var ul= document.getElementById('ul_list');
                ul.innerHTML= list;
            }
        }        
    };
     //Make a request to coounter endpoint 
    var nameInput =document.getElementById('name');
    var name= nameInput.value;
    request.open('GET','http://khanmohsin3011.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
};

///Submit Name
var submit =document.getElementById('submit-comment');
submit.onclick= function(){
    
    //Make a request to a server and send the name
     //Create a request to counter endpoint 
    var request = new XMLHttpRequest();
    
    //Capture the res and store  it in a variable
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200) {
                //Capture the list of name and render the list
                var names = request.responseText;
                names=JSON.parse(names);  //converted into array
                var list='';
                
                for(var i=0; i< names.length; i++){
                    list+='<li>'+names[i]+'</li>';
                }
                
                var ul= document.getElementById('commentList');
                ul.innerHTML= list;
            }
        }        
    };
     //Make a request to coounter endpoint 
    var commentInput =document.getElementById('comment');
    var comment= commentInput.value;
    request.open('GET','http://khanmohsin3011.imad.hasura-app.io/submit-name?name='+comment,true);
    request.send(null);
    
};








