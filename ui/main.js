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
var button= docunment.getElementById("counter");
var counter= 0; 
button.onclick= function(){
    //Make a request to coounter endpoint 
    
    //Capture the res and store  it in a variable
    
    //Render the  variable  in correct span
     counter= counter + 1;
     var span =docunment.getElementById("count");
     span.innerHTML = counter.toString();
};
