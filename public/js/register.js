$(document).ready(function(){
    var user;
    var password;
    var password2;
   
    $("#submit").click(function(e){
      e.preventDefault();
      user=$("#username").val();
      password=$("#password").val();
      password2=$("#password2").val();

      //console.log(user)
      //console.log(password)

      if(user.length<6){
        alert("Username has to be at least 6 characters long")
      }else if(password.length<6){
        alert("Password has to be at least 6 characters long")
      }else if (password !== password2){
        alert("Passwords doesn't consistent")
      }else{
        var userdata = {
            user_name:user,
            password:password,
            portfolio:null
           }
        $.post("/account",userdata,function(data) {
            if(data="success"){
              window.location.href = "/login"
            }
          });
      }
    });
  });