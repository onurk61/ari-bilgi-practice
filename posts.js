let userPosts = document.getElementById('userPosts');


function printUsersPosts(myData) {
    userPosts.innerHTML = `
    <div class="d-flex align-items-start justify-content-start mb-3">
        <img src="${myData[0].owner.picture}" alt="${myData[0].owner.firstName}" style="width:150px;height:150px;border-radius:50%;border:1px solid red" class="img-fluid">
    </div>`;
    myData.map(item => {
        userPosts.innerHTML += `
        <div class="col-md-4 col-12 mt-2 mb-2">
        <div class="card card-posts">
        <div class="card-body">
        <h6 class="date" style="font-size:14px">Published Date - ${item.publishDate}</h6>
        <div class="d-flex align-item-center justify-conten-center">
        <p class="card-title"><strong>${item.text}</strong></p>
        </div>
        <div class="d-flex align-items-center justify-content-between">
        <p class="tags p-0 m-0" style="font-size:14px"><strong>Tags :</strong> #${item.tags.join(' #')}</p>
        <span class="likes" style="font-size:14px"><strong>Likes :</strong> ${item.likes}</span>
        </div>
        </div>
        <div class="card-footer d-flex flex-column align-items-center" style="background:#fff;border:none">
        <a href="post-detail.html?pid=${item.id}" class="btn btn-dark">Click Me</a>
        </div>
        </div>
    </div>
        `;
    })
}


function myFunction() {
    const urlParam = new URLSearchParams(window.location.search);
    const users_id = urlParam.get('uid');

    let postsArr = [];
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            let deneme = JSON.parse(this.responseText).data;
            deneme.map(item => {
                postsArr.push(item);
            })
            printUsersPosts(postsArr);
        }
    });
    xhr.open('GET', 'https://dummyapi.io/data/v1/user/' + users_id + '/post');
    xhr.setRequestHeader('app-id', "61c47163e3d41c08fd1df7f7");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

myFunction();