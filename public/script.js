
const bin = document.querySelectorAll('.fa-trash');
bin.forEach(e => e.addEventListener('click', deleteItem));

const thumbsUp = document.querySelectorAll('.fa-thumbs-up');
thumbsUp.forEach(e => e.addEventListener('click', likeIt));

async function likeIt() {
    let sName = this.parentNode.childNodes[1].innerText;
    let bName = this.parentNode.childNodes[3].innerText;
    let lCount = this.parentNode.childNodes[5].innerText;
    this.parentNode.childNodes[5].innerText = Number(lCount) + 1
    try {
        let res = await fetch('increaseLike', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'stageName': sName,
                'birthName': bName,
                'likeCount': lCount
            })
        })
        let data = await res.json();
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }

}

async function deleteItem() {
    let sName = this.parentNode.childNodes[1].innerText;
    let bName = this.parentNode.childNodes[3].innerText;
    try {
        let res = await fetch('deleteRapper', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'stageName': sName,
                'birthName': bName
            })
        })
        let data = await res.json();
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
    this.parentNode.remove(); // this is 👈👈 a better way as you wont have to refresh the page and database will also be updated by the server 
    // location.reload(); // refreshes the current page by sending a get request to the server.
}


async function checkInput(event) {
    let stgName = document.getElementById('stageName').value;
    let bthName = document.getElementById('birthName').value;
    event.preventDefault();

    let response = await fetch('submitData', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'stageName': stgName,
            'birthName': bthName
        })
    })
    let data = await response.json();
    console.log(data);
    location.reload();
}