var siteName = document.getElementById("site");
var siteLink = document.getElementById("link");
var tableContent = document.getElementById("tableContent");
var submit = document.getElementById("submitBtn");
var siteUpdat = document.getElementById("siteUpdat");
var linkUpdate = document.getElementById("updatelink");
var updateBtn = document.getElementById("updateBtn");

if (localStorage.getItem("dataArr")) {
  var dataArr = JSON.parse(localStorage.getItem("dataArr"));
} else {
  var dataArr = [];
}
disply();

function getData() {
  var objData = {
    sName: siteName.value,
    sLink: siteLink.value,
    id: Date.now(),
  };

  dataArr.push(objData);
  localStorage.setItem("dataArr", JSON.stringify(dataArr));

  disply();
  clearData();
}

submit.addEventListener("click", getData);

function disply() {
  var box = "";
  for (var i = 0; i < dataArr.length; i++) {
    box += `<tr id="${dataArr[i].id}">
              <th scope="row">${i + 1}</th>
              <td>${dataArr[i].sName}</td>
              <td>
               <a href="${dataArr[i].sLink}" target="_blank">
                <button class="btn btn-success">
                  <i class="fa-solid fa-eye"></i>
                </button>
                </a>
              </td>
              <td>
                <button class="btn btn-danger" onclick="deleteItem(${
                  dataArr[i].id
                })">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-info text-white" onclick="getElementUpdate(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

function getElementUpdate(index) {
  globalIndex = index;
  siteUpdat.value = dataArr[index].sName;
  linkUpdate.value = dataArr[index].sLink;
}

function update() {
  dataArr[globalIndex].sName = siteUpdat.value;
  dataArr[globalIndex].sLink = linkUpdate.value;
  localStorage.setItem("dataArr", JSON.stringify(dataArr));
  
  console.log(dataArr);
  disply();
}
