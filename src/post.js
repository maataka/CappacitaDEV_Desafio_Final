 
const url= 'http://127.0.0.1:3000/postagens'  

function enviaComentario(url, body) {
    console.log("Body1=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function salvaComentario(url, body) {
    console.log(body)
    axios.post(url).then((response) => {
    console.log(response)
    })
}

function escreveComentario() {
    event.preventDefault()
  
    let email = document.getElementById("email").value
    let comentario = document.getElementById("comentario").value
    let url='http://127.0.0.1:3000/postagens'   



    body = {
        "email": email,
        "comentario": comentario       
    }

    
    enviaComentario(url, body)

}


async function leComentarios() {
    try {      
        const response = await(axios.get(url));
        const data = response.data;
console.log(data)
console.log(response)

let output = '';
for (const res of data) {
  //  console.log(`data2:${res.email}`)
  //  output += `<li>${res.email} ::: ${res.comentario}</li>`

    output += 
    `<p></p>
    <div class="card">
         <div class="card-header">
         De: ${res.email}
        </div>
        <div class="card-body">
        <p>Comentário:</p>
        <p class="card-text">${res.comentario}</p>
        </div>
    </div>
    `



}
document.querySelector('main').innerHTML = output;



      //  mostraComentarios(data);
    } 
    catch (error) {
        console.log(error);
    }
}

leComentarios(url);
/*
function mostraComentarios(data) {
    let output = '';
    for (const comentario of data) {
        console.log(`data2:${data}`)
        output += `<li>${email} ::: ${comentario}></li>`
    }
    document.querySelector('main').innerHTML = output;
}
*/