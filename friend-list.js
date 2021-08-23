document.querySelector('.logout').addEventListener('click',e=>{
  if(auth.currentUser){
      auth.signOut();
      location.replace('signout.html');
  }
})


  

db1.ref('allUsers').on("child_added",function(snapshot){  
    const list=document.querySelector('#frndList');
     db1.ref('allUsers').on('value',function(snapshot){
         let html="";
         snapshot.forEach(element => {
            const li=`
            <div class="user-list-item col-in ptr">
            <div class="profile-photo">
              <span class="material-icons md">account_circle</span>
            </div>
            <div class="name-user">
                <p class="user-name-name">${element.val().username}</p>
               
            </div>
            <div class="add-friend-icon ptr">
              <span class="material-icons md1" id="${element.val().address}" onclick="sendRequest(this)">person_add_alt_1</span>
            </div>
        </div>
              `;
              html+=li;
         });
         list.innerHTML=html;
    });
});
function setupList(){
    db1.ref('allUsers').on('value',function(snapshot){
        snapshot.forEach(element => {
            const list=document.querySelector('#frndList');
            db1.ref('allUsers').on('value',function(snapshot){
                let html="";
                snapshot.forEach(element => {
                   const li=`
                   <div class="user-list-item">
                   <div class="profile-photo">
                     <span class="material-icons md">account_circle</span>
                   </div>
                   <div class="name-user col-3">
                       <p class="user-name-name">${element.val().username}</p>
                      
                   </div>
                   <div class="add-friend-icon">
                     <span class="material-icons md1" id="${element.val().address}" onclick="sendRequest(this)">person_add_alt_1</span>
                   </div>
               </div>
                     `;
                     html+=li;
                });
                list.innerHTML=html;
           });
        });
   });
}