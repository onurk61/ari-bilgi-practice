function myFunction() {
    const urlParam = new URLSearchParams(window.location.search);
    const postId = urlParam.get('pid');

    let postsArr = [];
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText))
        }
    });
    xhr.open('GET', 'https://dummyapi.io/data/v1/post/' + postId);
    xhr.setRequestHeader('app-id', "61c47163e3d41c08fd1df7f7");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

myFunction()