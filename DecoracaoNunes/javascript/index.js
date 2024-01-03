fetch('/json/casamento.json')
.then(Response => Response.json())
.then(json => criaCardscasamento(json))

function  criaCardscasamento(json){
const secaoProduto = document.querySelector('#pdt-casamentos')
for(let info of json){
  
  secaoProduto.innerHTML += `
  <div class="col-sm-6 col-md-6 col-xxl-3">
    <div class="card">
      <div>
        <img id="image-produto" src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
      </div>
      <title></title>
      <rect width="100%" height="100%" fill="#868e96"></rect>

      </svg>
      <div class="card-header ">
        <h1 class="text-center fs-4" id="nome-produto">${info.nome}</h1>
        <p class="text-center fs-4" id="disc-produto"></p>
        <a href="${info.contato}" target="_blank" class="btn btn-primary">ver mais</a>
      </div>
    </div>
  `
}

}

 

fetch('/json/chaRevelacao.json')
.then(Response => Response.json())
.then(json => criaCardsrRevelacao(json))

function criaCardsrRevelacao(json){
const segundaSecao = document.querySelector('#pdt-revelacao')
for(let info of json){  
  segundaSecao.innerHTML +=`
  
  <div class="col-sm-6 col-md-6 col-xxl-3">
  <div class="card">
    <div>
      <img id="image-produto" src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
    </div>
    <title></title>
    <rect width="100%" height="100%" fill="#868e96"></rect>

    </svg>
    <div class="card-header ">
      <h1 class="text-center fs-4" id="nome-produto">${info.nome}</h1>
      <p class="text-center fs-4" id="disc-produto"></p>
      <a href="${info.contato}" target="_blank" class="btn btn-primary">ver mais</a>
    </div>
  </div>`

}
}


fetch('/json/aniversario.json')
.then(Response => Response.json())
.then(json => criaCardsAnivesario(json))

function  criaCardsAnivesario(json){
const terceiraSecao = document.querySelector('#pdt-aniversario')
for(let info of json){
  terceiraSecao.innerHTML +=`
  <div class="col-sm-6 col-md-6 col-xxl-3">
  <div class="card">
    <div>
      <img id="image-produto" src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
    </div>
    <title></title>
    <rect width="100%" height="100%" fill="#868e96"></rect>

    </svg>
    <div class="card-header ">
      <h1 class="text-center fs-4" id="nome-produto">${info.nome}</h1>
      <p class="text-center fs-4" id="disc-produto"></p>
      <a href="${info.contato}" target="_blank" class="btn btn-primary">ver mais</a>
    </div>
  </div>`

}

}