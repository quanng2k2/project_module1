let count = 0;
function eyeSlash() {
  count++;
  let passWord = document.getElementById("passUser");
  let eye = document.getElementById("eyeSlash1");
  passWord.type = "text";
  if (count == 1) {
    passUser.type = "text";
    eye.classList.add("fa-eye");
  } else if (count == 2) {
    passUser.type = "password";
    eye.classList.remove("fa-eye");
    count = 0;
  }
}

function loginPage() {
  let data = JSON.parse(localStorage.getItem("listUser"));
  let email = document.getElementById("userEmail").value;
  let pass = document.getElementById("passUser").value;
  let loginSuccessful = false;
  for (let i = 0; i < data.length; i++) {
    if (pass == data[i].pass1 && email == data[i].email) {
      console.log("đăng nhập thành công");
      //  lưu cờ để đăng nhập mua hàng
      localStorage.setItem("login", 1);
      // thỏa mãn điều kiện thì cho qua trang chủ
      window.location.href = "http://127.0.0.1:5502/index.html";
      loginSuccessful = true;
      break;
    }
  }
  if (!loginSuccessful) {
    myFunction("snackbar");
  }
}

function myFunction(id) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}


