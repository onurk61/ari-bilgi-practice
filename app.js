let demoDiv = document.getElementById('demo');
let dataAjaxUrl = demoDiv.getAttribute('data-ajax-url');

let page = 0;
var limit = 0;
var myData = [];

function loadMore() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function (e) {
        if (this.readyState === 4) {
            let datam = JSON.parse(this.responseText).data;
            // let firstSixData = datam.slice(0,6);
            // firstSixData.map(item => {
            // demoDiv.innerHTML += `
            // <div class="col-md-4 mt-2 mb-2">
            // <div class="card" style="border:2px solid #fecb00">
            // <div class="d-flex align-items-center justify-content-center pt-2">
            // <img src="${item.picture}" class="img-fluid" style="border-radius:50%;width:150px;height:150px;border:1px solid red" alt="">
            // </div>
            // <div class="card-body">
            //     <div class="d-flex align-items-center justify-content-center">
            //     <h1 class="fName">${item.firstName} ${item.lastName}</h1>
            //     </div>
            //     <div class="d-flex align-items-center justify-content-center">
            //     <button class="btn btn-danger">See Posts</button>
            //     </div>
            // </div>
            //      </div>
            // </div>
            // `
            // })
            datam.map(item => {
                myData.push(item)
            })
            incrementLimit(myData);
        }
    });
    let params = "?page=" + page + "&limit=50";
    xhr.open('GET', dataAjaxUrl + params);
    xhr.setRequestHeader('app-id', "61c47163e3d41c08fd1df7f7");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}


function incrementLimit(dataList) {
    dataList.slice(limit, limit + 6).map((item) => {
        demoDiv.innerHTML += `
        <div class="col-md-4 mt-2 mb-2">
        <div class="card" style="border:2px solid #fecb00" onmouseover="hoverButton(this)" data-id="${item.id}">
        <div class="d-flex align-items-center justify-content-center pt-2">
        <div class="d-block">
        </div>
        <img src="${item.picture}" class="img-fluid" style="border-radius:50%;width:150px;height:150px;border:1px solid red" alt="${item.firstName}">
        </div>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-center">
            <h1 class="fName">${item.firstName} ${item.lastName}</h1>
            </div>
            <div class="d-flex align-items-center justify-content-center">
            <a href="posts.html?uid=${item.id}" class="btn btn-danger">See Posts</a>
            </div>
        </div>
        </div>
        </div>
        `
    });
    limit += 6;
    if (limit === 50) {
        document.getElementById('myButton').disabled = true;
    }
}

function hoverButton(x) {
    // let uid = x.getAttribute('data-id');
    // let xhr = new XMLHttpRequest();
    // xhr.addEventListener('readystatechange', function (e) {
    //     if (this.readyState === 4) {
    //         console.log(JSON.parse(this.responseText))
    //     }
    // });
    // xhr.open('GET', dataAjaxUrl + '/' + uid);
    // xhr.setRequestHeader('app-id', "61c47163e3d41c08fd1df7f7");
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send();
}

function searchByTitle() {
    let searchNames = document.getElementById('searchNames').value;
    let newValue = searchNames.trim().toLocaleLowerCase();
    let searchedResult = myData.filter(item => item.firstName.trim().toLocaleLowerCase().includes(newValue));
    demoDiv.innerHTML = '';
    limit = 0;
    incrementLimit(searchedResult);
}

loadMore();
