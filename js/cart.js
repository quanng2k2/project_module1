const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function renderCart() {
  let dataCart = JSON.parse(localStorage.getItem("listFruitCart")); 
  if (dataCart == null) {
    dataCart = [];
  } else {
    let result = "";
    let totalProduct = 0;
    for (let i = 0; i < dataCart.length; i++) {
      let price1 = dataCart[i].price;
      priceCart = VND.format(price1);
      let sumPrice = dataCart[i].sl * dataCart[i].price;
      totalProduct += sumPrice;
      result += `  
    <div id="cssCart"> 
      <div class="row g-0">  
        <div class="col-md-3">  
          <img src="${dataCart[i].image1}"  alt="...">  
          <h5 class="card-title"> ${dataCart[i].name}</h5>    
      </div>  
      <div class="col-md-9">  
      <button onclick="remoCart(${i})" type="button" class="btn-close" aria-label="Close"></button>   
  <div class="card-body">  
    <h5 id="priceAlcohol">${priceCart} /kg </h5>     
      <div class="iconCart">   
        <button onclick = "minusProduct(${
          dataCart[i].id
        })"> <i class="fa-solid fa-minus"></i> </button> 
        <label id="numberAlcohol" >${dataCart[i].sl} </label> 
      <button onclick = "plusProduct(${
        dataCart[i].id
      })"> <i class="fa-solid fa-plus"></i> </button>  
       </div>
      <h5>Giá : ${VND.format(sumPrice)}</h5> 
       </div>
         <div>
           </div>
         </div> 
       </div>
    </div>
      <hr>
      `;
    }
    let resultMoney = VND.format(totalProduct);

    // document.getElementById("sumMoney").innerHTML = resultMoney;
    document.getElementById("cssCart").innerHTML = result;
    document.getElementById(
      "sumMoney"
    ).innerHTML = `Tổng tiền của tôi là: ${resultMoney}`;
  }
}
renderCart();

// tăng  số lượng sản phẩm của khách hàng
function plusProduct(index) {
  console.log("111id", index);
  let dataPlus = JSON.parse(localStorage.getItem("listFruitCart")); 
  for (let i = 0; i < dataPlus.length; i++) {
    if (dataPlus[i].id == index) {
      dataPlus[i].sl = ++dataPlus[i].sl;
      localStorage.setItem("listFruitCart", JSON.stringify(dataPlus)); 
      renderCart();
      break;
    }
  }
}

//  giảm số lượng sản phẩm của khách hàng
function minusProduct(index) {
  let dataMinus = JSON.parse(localStorage.getItem("listFruitCart"));
  for (let i = 0; i < dataMinus.length; i++) {
    if (dataMinus[i].id == index) {
      if (dataMinus[i].sl == 1) {
        let confirmDelete = confirm(
          "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không ?"
        );
        if (confirmDelete) {
          // confirmdelete là true thì thực hiện đoạn code sau
          dataMinus.splice(i, 1);
          localStorage.setItem("listFruitCart", JSON.stringify(dataMinus));
          renderCart();
          break;
        } else {
          // confirmDelete là false thì thoát khỏi hàm....
          return;
        }
      } else {
        dataMinus[i].sl = --dataMinus[i].sl;
        localStorage.setItem("listFruitCart", JSON.stringify(dataMinus));  
        renderCart();
        break;
      }
    }
  }
}

function remoCart(id) {
  let data = JSON.parse(localStorage.getItem("listFruitCart"));
  data.splice(id, 1);
  localStorage.setItem("listFruitCart", JSON.stringify(data));  
  renderCart(); 
}
renderCart(); 

function addToCart() {

}