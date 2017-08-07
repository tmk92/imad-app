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
        alert("he ");
        if(request.readystate == XMLHttpRequest.DONE){
            //Take some action
            alert("hello ");
            if(request.status == 200){
                alert("hello 0");
                var counter =request.responceText;
                alert("hello 1");
                var span =document.getElementById('count');
                alert("hello 2");
                span.innerHTML = counter.toString();
            }
        }        
    };
    
    //Make a request to coounter endpoint 
    request.open('GET','http://khanmohsin3011.imad.hasura-app.io/counter',true);
    request.send(null);
    
    //Render the  variable  in correct span
     /*counter= counter + 1;
     var span =document.getElementById('count');
     span.innerHTML = counter.toString();*/
};
