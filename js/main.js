var siteName = document.getElementById("site");
var siteLink = document.getElementById("link");
var tableContent = document.getElementById("tableContent");
var submit = document.getElementById("submitBtn");
var siteUpdat = document.getElementById("siteUpdat");
var linkUpdate = document.getElementById("updatelink");
var updateBtn = document.getElementById("updateBtn");
var inputSearch = document.getElementById("inputSearch");

if (localStorage.getItem("dataArr")) {
  var dataArr = JSON.parse(localStorage.getItem("dataArr"));
} else {
  var dataArr = [];
}
disply();

function errorData() {}
function getData() {
  if (siteLink.value && siteName.value) {
    var objData = {
      sName: siteName.value,
      sLink: siteLink.value,
      id: Date.now(),
    };

    dataArr.push(objData);
    localStorage.setItem("dataArr", JSON.stringify(dataArr));

    disply();
    clearData();
  } else {
    console.log("empty");
  }
}

function disply(data=dataArr) {
  var box = "";
  for (var i = 0; i < data.length; i++) {
    box += `<tr id="${data[i].id}">
              <th scope="row">${i + 1}</th>
              <td>${data[i].sName}</td>
              <td>
               <a href="${data[i].sLink}" target="_blank">
                <button class="btn btn-success">
                  <i class="fa-solid fa-eye"></i>
                </button>
                </a>
              </td>
              <td>
                <button class="btn btn-danger" onclick="deleteItem(${
                  data[i].id
                })">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-info text-white" onclick="getElementUpdate(${data[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
            </tr>`;
  }
  tableContent.innerHTML = box;
}

function clearData() {
  siteName.value = null;
  siteLink.value = null;
}

function deleteItem(i) {
  //   dataArr.splice(i, 1);
  dataArr = dataArr.filter(function (ele) {
    return ele.id !== i;
  });
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  disply();
}

var dataUpdate;
function getElementUpdate(id) {

 dataUpdate = dataArr.filter(function(ele){
    return ele.id == id;
  })

  siteUpdat.value = dataUpdate[0].sName;
  linkUpdate.value = dataUpdate[0].sLink;
}

// updateBtn.addEventListener("click", update());
function update() {
  for (let i = 0; i < dataArr.length; i++) {
   
    if (dataArr[i].id==dataUpdate[0].id) {
    
      dataArr[i].sName = siteUpdat.value;
      dataArr[i].sLink = linkUpdate.value;
    }
    
  }

  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  disply();
}

siteName.addEventListener("input", nameValidation);
function nameValidation() {
  var Regex = /^[\w]{3,}$/;
  var isDuplicate = false;
  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i].sName.toLowerCase() === siteName.value.toLowerCase()) {
      isDuplicate = true;
      break;
    }
  }
  if (Regex.test(siteName.value) && !isDuplicate) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    siteName.nextElementSibling.classList.replace("d-block", "d-none");
    // make submit buttom work when its valid
    submit.onclick = getData;
    submit.removeAttribute("data-bs-toggle");
    submit.removeAttribute("data-bs-target");
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    siteName.nextElementSibling.classList.replace("d-none", "d-block");
    // prevint submit buttom from work
    submit.setAttribute("data-bs-toggle", "modal");
    submit.setAttribute("data-bs-target", "#errorModal");
    submit.onclick = errorData;
  }
}
siteUpdat.addEventListener("input", nameUpdateValidation);
function nameUpdateValidation() {
  var Regex = /^[a-zA-z]{3,}$/;
  var isDuplicate = false;
  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i].sName.toLowerCase() === siteUpdat.value.toLowerCase()) {
      isDuplicate = true;
      break;
    }
  }
  if (Regex.test(siteUpdat.value) && !isDuplicate) {
    siteUpdat.classList.add("is-valid");
    siteUpdat.classList.remove("is-invalid");

    // make submit buttom work when its valid
    updateBtn.onclick = update;
    updateBtn.removeAttribute("data-bs-toggle");
    updateBtn.removeAttribute("data-bs-target");
    updateBtn.setAttribute("data-bs-dismiss", "modal");
    updateBtn.setAttribute("aria-label", "Close");
  } else {
    siteUpdat.classList.add("is-invalid");
    siteUpdat.classList.remove("is-valid");
    // prevint updateBtn buttom from work
    updateBtn.setAttribute("data-bs-toggle", "modal");
    updateBtn.setAttribute("data-bs-target", "#errorModal");
    updateBtn.removeAttribute("data-bs-dismiss");
    updateBtn.removeAttribute("aria-label");
    updateBtn.onclick = errorData;
  }
}

siteLink.addEventListener("input", urlValidation);
function urlValidation() {
  var Regex2 =
    /^(https:\/\/www.|http:\/\/www\.|https:\/\/|http:\/\/)[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(.){1,}$/;

  if (Regex2.test(siteLink.value)) {
    siteLink.classList.add("is-valid");
    siteLink.classList.remove("is-invalid");
    siteLink.nextElementSibling.classList.replace("d-block", "d-none");
    // make submit buttom work when its valid
    submit.onclick = getData;
    submit.removeAttribute("data-bs-toggle");
    submit.removeAttribute("data-bs-target");
  } else {
    siteLink.classList.add("is-invalid");
    siteLink.classList.remove("is-valid");
    siteLink.nextElementSibling.classList.replace("d-none", "d-block");
    // prevint submit buttom from work
    submit.setAttribute("data-bs-toggle", "modal");
    submit.setAttribute("data-bs-target", "#errorModal");
    submit.onclick = errorData;
  }
}
linkUpdate.addEventListener("input", urlUpdateValidation);
function urlUpdateValidation() {
  var Regex2 = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  if (Regex2.test(linkUpdate.value)) {
    linkUpdate.classList.add("is-valid");
    linkUpdate.classList.remove("is-invalid");
    // make submit buttom work when its valid
    updateBtn.onclick = update;
    updateBtn.removeAttribute("data-bs-toggle");
    updateBtn.removeAttribute("data-bs-target");
    updateBtn.setAttribute("data-bs-dismiss", "modal");
    updateBtn.setAttribute("aria-label", "Close");
  } else {
    linkUpdate.classList.add("is-invalid");
    linkUpdate.classList.remove("is-valid");
    // prevint updateBtn buttom from work
    updateBtn.setAttribute("data-bs-toggle", "modal");
    updateBtn.setAttribute("data-bs-target", "#errorModal");
    updateBtn.onclick = errorData;
    updateBtn.removeAttribute("data-bs-dismiss");
    updateBtn.removeAttribute("aria-label");
  }
}

inputSearch.oninput=function(){
  var searchArr=[];

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i].sName.trim().toLowerCase().includes(inputSearch.value.trim().toLowerCase())) {
      searchArr.push(dataArr[i])
    }
    
  }

  disply(searchArr);
}
