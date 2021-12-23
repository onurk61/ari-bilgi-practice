let userPosts = document.getElementById('userPosts');


function printUsersPosts(myData) {
    userPosts.innerHTML = `
    <div class="d-flex align-items-start justify-content-start">
        <img src="${myData[0].owner.picture}" alt="${myData[0].owner.firstName}" style="width:150px;height:150px;border-radius:50%;border:1px solid red" class="img-fluid">
    </div>`;
    myData.map(item => {
        userPosts.innerHTML += `
        <div class="col-md-8 col-12">
        <div class="card-body">
                <h6 class="date">${item.publishDate}</h6>
                <p class="card-title">${item.text}</p>
                <p class="tags">${item.tags.join('<br/>')}</p>
                <span class="likes">${item.likes}</span>
                <a href="post-detail.html?pid=${item.id}" class="btn btn-dark">Click Me</a>
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