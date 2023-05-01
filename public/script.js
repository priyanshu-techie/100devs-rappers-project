const bin = document.querySelectorAll('.fa-trash');
bin.forEach(e=>e.addEventListener('click',deleteItem));

async function deleteItem(){
    let sName=this.parentNode.childNodes[1].innerText;
    let bName=this.parentNode.childNodes[3].innerText;
    try{
        let res=await fetch('deleteRapper',{
            method:'DELETE',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({
                'stageName':sName,
                'birthName':bName
            })
        })
        let data=await res.json();
        console.log(data);
    }
    catch(e){
        console.log(e);
    }
    this.parentNode.remove(); // this is 👈👈 a better way as you wont have to refresh the page and database will also be updated by the server 
    // location.reload(); // refreshes the current page by sending a get request to the server.
}