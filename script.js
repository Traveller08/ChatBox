
var white_color={"color":"white","text-shadow": "0px 0px 5px rgba(255,255,255,0.82)",}
var black_color={"color":"black","text-shadow": "none",}
var white_color1={"color":"white","text-shadow": "none",}
var black_color1={"color":"wheat",}

function showMoreOptions(){
    const menuList=document.querySelector('.more-options');
    if(menuList.style.visibility=='visible'){
        menuList.style.visibility='hidden';
        Object.assign(document.getElementById('show-more').style,black_color);
    }
    else{
         menuList.style.visibility='visible';
         Object.assign(document.getElementById('show-more').style,white_color);
        }
}
function showEmoBar(){
    const emobox=document.querySelector('.emo-box');
    if(emobox.style.visibility=='visible'){
        Object.assign(document.getElementById('emo-icon').style,black_color);
        emobox.style.visibility='hidden';}
    else{
         emobox.style.visibility='visible';
         Object.assign(document.getElementById('emo-icon').style,white_color);
        }
}
function showAttachBar(){
    const emobox=document.querySelector('.attach-box');
    if(emobox.style.visibility=='visible'){
        Object.assign(document.getElementById('attach-icon').style,black_color);
        emobox.style.visibility='hidden';}
    else{
         emobox.style.visibility='visible';
         Object.assign(document.getElementById('attach-icon').style,white_color);
        }
}
function showNotification(){
    const notview=document.querySelector('.notification-area');
    if(notview.style.visibility=='visible'){
        Object.assign(document.querySelector('.show-notification').style,white_color1);
        notview.style.visibility='hidden';}
    else{
         notview.style.visibility='visible';
         Object.assign(document.querySelector('.show-notification').style,black_color1);
        }
}

function showExtra(){
    const notview=document.querySelector('.more-optons-area');
    if(notview.style.visibility=='visible'){
        Object.assign(document.querySelector('.show-extra').style,white_color1);
        notview.style.visibility='hidden';}
    else{
         notview.style.visibility='visible';
         Object.assign(document.querySelector('.show-extra').style,black_color1);
        }
}
document.querySelector('#search-box').addEventListener('input',function(){
 const listview=document.getElementById('frndList');
 listview.style.visibility='visible';
 setupList();
 const inputbar=document.getElementById('search-box');
 if(inputbar.value=="" || inputbar.value==null)listview.style.visibility='hidden';

});
document.getElementById('text-input').addEventListener('keypress',function(event){
if(event.key==='Enter'){
    document.getElementById('send-btn-icon').click();
}
});