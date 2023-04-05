// hiển thị và đóng pass
let count1 = 0;
let count2 = 0;
function eyeSlash1() {
  count1++;
  let passWord1 = document.getElementById("passUser1");
  let eye = document.getElementById("eyeSlash1");
  passWord1.type = "text";
  if (count1 == 1) {
    passUser1.type = "text";
    eye.classList.add("fa-eye");
  } else if (count1 == 2) {
    passUser1.type = "password";
    eye.classList.remove("fa-eye"); 
    count1 = 0;
  }
}

function eyeSlash2() {
  count2++;
  let passWord2 = document.getElementById("passUser2");
  let eye = document.getElementById("eyeSlash2");
  passWord2.type = "text";
  if (count2 == 1) {
    passUser2.type = "text";
    eye.classList.add("fa-eye");
  } else if (count2 == 2) {
    passUser2.type = "password";
    eye.classList.remove("fa-eye");
    count2 = 0;
  }
}

// passWork validation
function validationPass() {
  let pass = document.getElementById("passUser1").value; 
  let confirmPass = document.getElementById("passUser2").value;
  if (pass == confirmPass) {
    document.getElementById("passWordVali").innerHTML = "";
    return true;
  } else {
    document.getElementById("passWordVali").innerHTML =
      "Vui lòng nhập mật khẩu trùng khớp ! ";
    document.getElementById("passWordVali").style.color = "red"; 
    return false;
  }
}
passUser2.addEventListener("keyup", validationPass);
// -----------------------------------------------------

// email validation 
function checkEmail() {
  let userEmail = document.getElementById("userEmail"); 
  let emailFormat =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (userEmail.value != "" && userEmail.value.match(emailFormat)) {
    document.getElementById("email-error").innerHTML = "";
    return true;
  } else {
    userEmail.focus();
    document.getElementById("email-error").innerHTML =
      "Vui lòng nhập đúng định dạng email!";
    document.getElementById("email-error").style.color = "red";
    return false;
  }
}
userEmail.addEventListener("keyup", checkEmail);
// ---------------------------------------------

//  check thỏa mãn điều kiện thì thông báo đk thành công và cho đn .
function signUp() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let check1 = checkEmail();
  let check2 = validationPass();
  if (check1 && check2) {
    myFunction(0);      //hiển thị snackbar ra là đk thành công .  
    
    setTimeout(() => {
      window.location.href="login.html"
    }, 1000);

    // lấy email ; name ; pass của người dùng push vào object và lưu lên local .
    let email = document.getElementById("userEmail").value;
    let name = document.getElementById("userName").value;
    let pass1 = document.getElementById("passUser1").value;  
    let objectLogin = {
      name: name,
      pass1: pass1,
      email: email,
    };
    if (listUser == null) { 
      listUser = []; 
      listUser.push(objectLogin);  
      localStorage.setItem("listUser", JSON.stringify(listUser)); 
    } else {
      //  đặt cờ để xét trùng email sẽ ko cho đk nữa, còn lại là cho đk .
      let flag = true;
      for (i = 0; i < listUser.length; i++) {
        if (objectLogin.email == listUser[i].email) { 
          flag = false;
          break;
        } else {
          flag = true;
        }
      } 
      // nếu cờ mình đặt là false nghĩa là trùng email ko cho đăng ký và kko push vào local.
      if (flag == false) { 
        console.log("đã có tk");
        myFunction(1);    // hiển thị snackbar ra là error vì đã trùng email.
      } else {            // còn nó không trùng email thì push vào object và lưu lên local.
        listUser.push(objectLogin); 
        localStorage.setItem("listUser", JSON.stringify(listUser));   
      } 
    } 
    console.log("thanhcong");
  } else {     
    myFunction(1);    // hiển thị ra là đk thất bại 
    console.log("thất bại");
  }
}

function myFunction(id) {
  console.log(document.getElementById("snackbar" + id));  
  var x = document.getElementById("snackbar" + id);

  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", ""); 
  }, 3000);
}
// -------------------------------------------- 
