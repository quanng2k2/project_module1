const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

let listFruit = JSON.parse(localStorage.getItem("listFruit"));
function addProduct() {
  let image1 = document.getElementById("imageProduct").value; 
  let nameProduct = document.getElementById("nameProduct").value; 
  let priceProduct = document.getElementById("priceProduct").value; 
  let urser = {
    image1: image1,  
    name: nameProduct,  
    price: priceProduct,  
  }; 
  
  if (listFruit == null) {  
    listFruit = [];
    listFruit.push(urser); 
    console.log("kkk",listFruit);  
    localStorage.setItem("listFruit", JSON.stringify(listFruit));  
  } else {
    listFruit.push(urser);  
    localStorage.setItem("listFruit", JSON.stringify(listFruit));  
  }
  document.getElementById("imageProduct").value = "";  
  document.getElementById("nameProduct").value = ""; 
  document.getElementById("priceProduct").value = ""; 
  renderArr(); 
}

function renderArr() {
  let listFruit = JSON.parse(localStorage.getItem("listFruit"));
  let result = `
    <tr>
    <td>Stt</td>
    <td>Ảnh Sản Phẩm</td>
    <td>Tên Sản Phẩm</td>
    <td>Giá Sản Phẩm</td>
    <td colspan=2></td> 
    
</tr>
    `;
  for (let i = 0; i < listFruit.length; i++) {
    let priceAdmin = listFruit[i].price ;
    listedPrice = VND.format(priceAdmin) ; 
    result += ` 
        <tr>
        <td>${i + 1}</td>
        <td><img id="imageAlcohol" src="${ 
          listFruit[i].image1 
        }" class="card-img-top" alt="..." /></td>  
        <td>${listFruit[i].name}</td> 
        <td>${listedPrice} / 1 kg</td>  
        <td><button onclick="hanldeDelete(${i})">Xóa</button> </td>   
        <td><button onclick = "hanldeEdit(${i})">Sửa</button> </td>  
    </tr>
        `;
  }
  document.getElementById("tableProduct").innerHTML = result; 
}
renderArr(); 

function singId() {
  let result = Math.floor(Math.random() * 100000000); 
  // console.log("kk",result);
  return result; 
}

function addProduct() {
  let data = {};
  let dataImage = JSON.parse(localStorage.getItem("listFruit")); 
  let changeFolder = document.getElementById("imageProduct");   
    //   lấy thẻ input ra  
  changeFolder.addEventListener("change", (event) => {
    //  add event cho thẻ input vừa lấy 
    console.log(event.target.files[0]);  
    var reader = new FileReader(); 
    console.log("kkk",reader); 
    reader.onload = function (e) {
    // console.log("111", e.target.result);
    //   localStorage.setItem("image1111", e.target.result); 
    // document.getElementById('bannerImg').src = e.target.result; 
      data.image1 = e.target.result;  
      console.log("1111", data); 
      let name = document.getElementById("nameProduct").value;  
      let price = document.getElementById("priceProduct").value; 
      data.name = name; 
      data.price = price ;
      console.log(data); 
      dataImage.push(data); 
      localStorage.setItem("listFruit", JSON.stringify(dataImage)) ;
      renderArr(); 
    };
    reader.readAsDataURL(event.target.files[0]);   
  }); 
} 
addProduct(); 

function hanldeDelete(idMyProduct) { 
  listFruit.splice(idMyProduct, 1); 
  localStorage.setItem("listFruit", JSON.stringify(listFruit));
  renderArr();
}

function hanldeEdit(idMyProduct) {
  let listFruit = JSON.parse(localStorage.getItem("listFruit")) ;  
  document.getElementById("imageProduct").src  = listFruit[idMyProduct].image1 ;  
  document.getElementById("nameProduct").value = listFruit[idMyProduct].name ; 
  document.getElementById("priceProduct").value = listFruit[idMyProduct].price ;  
  // console.log(listFruit[idMyProduct].image1);  
  localStorage.setItem("flagEdit",idMyProduct) ;
} ; 

