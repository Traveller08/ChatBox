var current_id="";
var Id1="";
var Id2="";
document.querySelector('html').addEventListener('keypress',function(e){
    console.log('key pressed2');
     setupname();
     setupFriendList();
     if(Id1!="" && Id2!="")setupchats();
  });
  document.querySelector('html').addEventListener('click',function(e){
    console.log('mouse clicked2');
   setupname();
   setupFriendList();
   if(Id1!="" && Id2!="")setupchats();
 });
 function getUserName(userid){
    var name="";
    db1.ref('allUsers/'+userid).on('value',function(snapshot){
        name=(snapshot.val().username);        
    });
    return name;
}

function getemail(emailaddress){
    var ans="";
    for(var i=0;i<emailaddress.length;i++){
        if(emailaddress[i]==='@')break;
        else ans+=emailaddress[i];
    }
    return ans;
}
function setupname(){
    var user = auth.currentUser;
     if(user){
      document.querySelector('.nameOfTheUser').innerHTML=getUserName(getemail(auth.currentUser.email));
     }
     else console.log('user not ready');
  }
  
 
    
function sendRequest(reciever){
    const user=auth.currentUser;
   
        const sender_address=getemail(user.email);
        setupname();
        const reciever_address=reciever.id;
       console.log("request send to "+reciever_address+" by "+sender_address);
       
         db1.ref('users/'+reciever_address+"/"+"recieved_requests"+"/"+sender_address).set({
            senderId:sender_address,  
          });
          db1.ref('users/'+sender_address+"/"+"sent-requests"+"/"+reciever_address).set({
            recieverId:reciever_address,  
          });
   
   
}


function setupFriendRequest(){
    const user=auth.currentUser;
const sender_address=getemail(user.email);
 setupname();
    db1.ref('users/'+sender_address+"/"+'recieved_requests').on("value",function(snapshot){  
        const list=document.querySelector('.friend-request-area');
         db1.ref('users/'+sender_address+"/"+'recieved_requests').on('value',function(snapshot){
             let html="";
             setupname();
             snapshot.forEach(element => {
                
                 const senderName=getUserName(element.val().senderId);
                 //console.log("username of the sender "+senderName);
                 var id1=element.val().senderId;
                 var id2=id1+"#";
                const li=`
            <div class="recieved-request-list-item">
                <div class="request-icon-name">
                    <span class="material-icons md12 sender-logo">account_circle</span>
                    <div class="nameofthesender">${senderName}</div>
                </div>
                <div class="request-btn">
                    <button class="confirm-btn" id="${id1}" onclick="acceptRequest(this)">confirm</button>
                    <button class="cancel-btn" id="${id2}" onclick="cancelRequest(this)">cancel</button>
                </div>
            </div>
        </div>
                  `;
                  html+=li;
             });
             list.innerHTML=html;
        });
    });
}
document.querySelector('.show-request').addEventListener('click',e=>{
   setupFriendRequest();
   setupname();
   const notview=document.querySelector('.friend-request-area');
        if(notview.style.visibility=='visible'){
            Object.assign(document.querySelector('.show-request').style,white_color1);
            notview.style.visibility='hidden';}
        else{
             notview.style.visibility='visible';
             Object.assign(document.querySelector('.show-request').style,black_color1);
            }
});
function acceptRequest(acceptBtn){
    setupname();
 var idSender=acceptBtn.id;
 const user=auth.currentUser;
const idReciever=getemail(user.email);
console.log("id of the receiver : "+idReciever);
console.log("id of the sender "+idSender);
db1.ref('users/'+idSender+"/"+"friends"+"/"+idReciever).set({
    Id:idReciever,  
  });
  db1.ref('users/'+idReciever+"/"+"friends"+"/"+idSender).set({
    Id:idSender,  
  });
  db1.ref('users/'+idReciever+"/"+"recieved_requests"+"/"+idSender).remove();
  db1.ref('users/'+idSender+"/"+"sent-requests"+"/"+idReciever).remove();
  
}
function cancelRequest(cancelBtn){
    var temp=cancelBtn.id;
    var idSender=temp.slice(0,-1);
    const user=auth.currentUser;
    const idReciever=getemail(user.email);
    db1.ref('users/'+idReciever+"/"+"recieved_requests"+"/"+idSender).remove();
    db1.ref('users/'+idSender+"/"+"sent-requests"+"/"+idReciever).remove();
  
}
function setupFriendList(){
    const list=document.querySelector('.friends-list');
    db1.ref('users/'+getemail(auth.currentUser.email)+"/"+'friends').on('value',function(snapshot){
        let html="";
        setupname();
        snapshot.forEach(element => {    
            var id1=element.val().Id;
           const li=`
            <li class="friends-list-item" id="${id1}" onclick="openchat(this)">
            <span class="material-icons md23">account_circle</span>
            <p class="name-of-friend">${getUserName(id1)}</p>
            </li>
            <hr class="hr-1 col-body"></hr>
           `;
             html+=li;
        });
        list.innerHTML=html;
   });
}

db1.ref('users/'+getemail(auth.currentUser.email)+"/"+'friends').on("child_added",function(snapshot){  
    const list=document.querySelector('.friends-list');
     db1.ref('users/'+getemail(auth.currentUser.email)+"/"+'friends').on('value',function(snapshot){
         let html="";
         setupname();
         snapshot.forEach(element => {
            var id1=element.val().Id;
            const li=`
             <li class="friends-list-item" id="${id1}" onclick="openchat(this)">
             <span class="material-icons md23">account_circle</span>
             <p class="name-of-friend">${getUserName(id1)}</p>
             </li>
             <hr class="hr-1 col-body"></hr>
            `;
              html+=li;
         });
         list.innerHTML=html;
    });
});
function get_time_now(){
    const date = new Date();
    var hours = date.getHours();
    var endd="AM";
    if(hours>=12)endd="PM";
    if(hours>=13)hours-=12;
    var hr = hours.toString();
    if(hr.length<2)hr='0'+hr;
    var   mins = date.getMinutes().toString();
    if(mins.length<2)mins='0'+mins;
    var timeNow= hr+":"+mins+" "+endd;
    return timeNow;
}
db1.ref('users/'+Id1+'/chats/allChats/'+Id2).on("child_added",function(snapshot){
    var html="";
    const list=document.querySelector('.chat-area');
    db1.ref('users/'+Id1+'/chats/allChats/'+Id2).on('value',function(snapshot){
       snapshot.forEach(element=>{
           console.log(element.val());
           if(element.val().id===Id1){
            const mess=`
            <div class="dialogue-box-container">
            <div class="dialogue-box-me">
                <div class="message-content">${element.val().message}</div>
                <div class="time-container">
                    <p class="time">${element.val().time}</p>
                </div>
            </div>
         </div>
            `;
            html+=mess;
           }
           else{
            const mess=`
            <div class="dialogue-box-container">
            <div class="dialogue-box-other">
                <div class="message-content">${element.val().message}</div>
                <div class="time-container">
                    <p class="time">${element.val().time}</p>
                </div>
            </div>
         </div>
            `;
            html+=mess;
           }
         
           console.log(element.val());
       });
    });
   
    list.innerHTML=html;
});

function setupchats(){
    var html="";
    const list=document.querySelector('.chat-area');
    db1.ref('users/'+Id1+'/chats/allChats/'+Id2).on('value',function(snapshot){
       snapshot.forEach(element=>{
        console.log(element.val());
           if(element.val().id===Id1){
            const mess=`
            <div class="dialogue-box-container">
            <div class="dialogue-box-me">
                <div class="message-content">${element.val().message}</div>
                <div class="time-container">
                    <p class="time">${element.val().time}</p>
                </div>
            </div>
         </div>
            `;
            html+=mess;
           }
           else{
            const mess=`
            <div class="dialogue-box-container">
            <div class="dialogue-box-other">
                <div class="message-content">${element.val().message}</div>
                <div class="time-container">
                    <p class="time">${element.val().time}</p>
                </div>
            </div>
         </div>
            `;
            html+=mess;
           }
           
           console.log(element.val());
       });
    });
   
    list.innerHTML=html;
}
function openchat(ele){
    var frndid=ele.id;
    current_id=ele.id;
    db1.ref('allUsers/'+frndid).on('value',function(snapshot){
        
        document.querySelector('#friendNameId').innerHTML=snapshot.val().name;
    });
    // 
    
}  

function sendMessage(){
    var id1=getemail(auth.currentUser.email);
    if(auth.currentUser)
    { 
        const currdata=document.getElementById('text-input').value;
        id1=getemail(auth.currentUser.email);
        const user = auth.currentUser;
        var obj={
            message:currdata,
            time:get_time_now(),
        }
        var obj1={
            message:currdata,
            time:get_time_now(),
            id:id1,
        }
        db1.ref('users/'+id1+'/chats/sent/'+current_id).push(obj);
        db1.ref('users/'+current_id+'/chats/recieved/'+id1).push(obj);
        db1.ref('users/'+id1+'/chats/allChats/'+current_id).push(obj1);
        db1.ref('users/'+current_id+'/chats/allChats/'+id1).push(obj1);
        setupchats();
        console.log('message sent');
    }
    Id1=id1;
    Id2=current_id;
    document.getElementById('text-input').value="";
}
