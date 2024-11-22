var siteName = document.getElementById("site");
var siteLink = document.getElementById("link");
var tableContent = document.getElementById("tableContent");
var submit = document.getElementById("submitBtn");

console.log(JSON.parse(localStorage.getItem("dataArr")));
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

// function valid() {
//   dataArr.filter(function (ele) {
//     if (ele.sName.toLowerCase() !== siteName.value.toLowerCase()) {
//       console.log("valid");
//     } else {
//       console.log("not valid");
//     }
//   });
// }
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
