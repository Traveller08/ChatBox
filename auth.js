  //--------------------------------------sign up-------------------------------------------------------------------------\\
const fname = document.getElementById('fname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const sec_pass = document.getElementById("confirm-Password");
const dob=document.getElementById('dob');
const submitBtn=document.getElementById('signup-submit');    
const password=document.getElementById('pass');     
function resetform(){
    fname.value="";
    username.value="";
    email.value="";
    sec_pass.value="";
    dob.value="";
    password.value="";
}
function getemail(emailaddress){
    var ans="";
    for(var i=0;i<emailaddress.length;i++){
        if(emailaddress[i]==='@')break;
        else ans+=emailaddress[i];
    }
    return ans;
}
submitBtn.addEventListener('click',e=>{
    e.preventDefault();
   
    if(password.value!=sec_pass.value){
        alert("Password didn't match..\n Please enter same password");
        return false;
    }
  else{
      auth.createUserWithEmailAndPassword(email.value,password.value).then(cred=>{    
        const user = auth.currentUser;
        
            db1.ref('users/'+getemail(email.value)+"/"+"userData").set({
                fname:fname.value,
                username:username.value,
                dob:dob.value,
                gender:"male",
                uid:user.uid,
                password:password.value,
             });
             user.displayName=username.value;
             const add=getemail(email.value);
             db1.ref('allUsers/'+add).set({
                username:username.value,
                address:add,
                name:fname.value,
             });
             
             alert('Account created successfully \n Please login to continue');
      }).catch(err=>{
         document.getElementById('err-mess-id').innerHTML='*'+err.message;
      });
  }
   
});



// -------------------------------------------------------------sign  in--------------------------------------------------------------------\\
document.getElementById('login-submit').addEventListener('click',e=>{
   e.preventDefault();
   console.log('clicked');
   const loginemail=document.getElementById('login-email').value;
   const loginpass=document.getElementById('login-password').value;
   auth.signInWithEmailAndPassword(loginemail,loginpass).then(cred=>{
      location.replace('cheemstalk.html');
     
   }).catch(err=>{
        document.getElementById('err-message').innerHTML='*'+err.message;
   });
});
// -------------------------------sign out------------------------------------------//

