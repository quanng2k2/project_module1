const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let flag = localStorage.getItem("login");
if (flag == 1) {
  document.getElementById("none").innerHTML = `<button class ="nav-item" onclick="deleteNow()"><b> Đăng xuất</b></button>`; 
  document.getElementById("notNone").innerHTML = ``
}

// let listFruit = [
//   {
//     image1: "../image/boom.jpg",
//     name: "Bom mỹ",
//     price: "180000",
//     sl: 1,
//     id: 0,
//   },
//   {
//     image1: "../image/cachua.jpg",
//     name: "Cà chua đà lạt",
//     price: "80000",
//     sl: 1,
//     id: 1,
//   },
//   {
//     image1: "../image/tao.jpg",
//     name: "Táo nhập khẩu",
//     price: "70000",
//     sl: 1,
//     id: 2,
//   },
//   {
//     image1: "../image/vai.jpg",
//     name: "Vãi nhập khẩu",
//     price: "60000",
//     sl: 1,
//     id: 3,
//   },
//   {
//     image1: "../image/cam.jpg",
//     name: "Cam vùng cao",
//     price: "40000",
//     sl: 1,
//     id: 4,
//   },
//   {
//     image1: "../image/dau.png", 
//     name: "Dâu nhập khẩu",
//     price: "80000",
//     sl: 1,
//     id: 5,
//   },
//   {
//     image1: "../image/luu.jpg",
//     name: "Lựu Đà lạt",
//     price: "50000",
//     sl: 1,
//     id: 6,
//   },
//   {
//     image1: "../image/cherry.jpg",
//     name: "Cherry nhập khẩu",
//     price: "100000",
//     sl: 1,
//     id: 7,
//   },
// ];
// localStorage.setItem("listFruit", JSON.stringify(listFruit));

let listFruit1 = JSON.parse(localStorage.getItem("listFruit")); 
console.log(listFruit1);

function renderFruit() {
  let result = ``;
  for (let i = 0; i < listFruit1.length; i++) {
    let price1 = listFruit1[i].price;
    priceNow = VND.format(price1);

    result += ` 
    <div class="card" style="width: 18rem;">
    <div class="hoverImg">
    <img id="imageAlcohol" src="${listFruit1[i].image1}" class="card-img-top" alt="..." /> 
    </div>
    <div class="card-body">
      <h5 id="nameAlcohol"> ${listFruit1[i].name}</h5>
      <h5 id="priceAlcohol">${priceNow} /1kg</h5>  
      <button class="buttonaddProduct" onclick = "addToCart(${listFruit1[i].id})">Thêm Sản Phẩm</button>
    </div>
  </div>
        `; 
  }
  document.getElementById("container").innerHTML = result; 
}
renderFruit();

function addToCart(id) {
  let listProductFruit = JSON.parse(localStorage.getItem("listFruitCart"));
  // check nếu chưa có tài khoản thì không cho mua hàng ; 
  let loginDemo = localStorage.getItem("login");   
  if (loginDemo == null) {
    myFunction(0); // bạn chưa đăng ký đăng nhập ko cho mua hàng  
    return; 
  } 
  if (listProductFruit == null) { 
    listProductFruit = [];  
    for (i = 0; i < listFruit1.length; i++) { 
      if (listFruit1[i].id == id) { 
        listProductFruit.push(listFruit1[i]); 
        localStorage.setItem("listFruitCart", JSON.stringify(listProductFruit)); 
        myFunction(1); /////////////////// bạn đã thêm vào giỏ hàng   
        break; 
      } 
    } 
  } else { 
    for (let j = 0; j < listFruit1.length; j++) { 
      if (listFruit1[j].id == id) { 
        //kiểm tra cái listFruit1 đã có cái sản phẩm đấy chưa  
        let flag = true; 
        for (let i = 0; i < listProductFruit.length; i++) { 
          if (listProductFruit[i].id == id) { 
            flag = false; 
            break; 
          } else {
            flag = true;
          }
        }
        
        if (!flag) {
          myFunction(1); /////////////////// bạn đã thêm vào giỏ hàng 
          break;
        } else {
          listProductFruit.push(listFruit1[j]); 
          localStorage.setItem(
            "listFruitCart",
            JSON.stringify(listProductFruit)
          );
          myFunction(1); /////////////////// bạn đã thêm vào giỏ hàng
          break; 
        }
      }
    }
  }
  // console.log("dataCart", dataCart); 
  function myFunction(id) {
    console.log(document.getElementById("snackbar" + id));
    var x = document.getElementById("snackbar" + id);
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }
}

function deleteNow() {
  localStorage.removeItem("login"); 
  localStorage.removeItem("listFruitCart") ;
  window.location.href = "index.html"; 
}
