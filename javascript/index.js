fetch('/json/itens_dc.json')
.then(Response => Response.json())
.then(json => criaCardscasamento(json))

function  criaCardscasamento(json){
const secaoProduto = document.querySelector('#pdt-casamentos')
for(let info of json){
  
  secaoProduto.innerHTML += `
  <div class="col-12 col-md-12 col-xxl-3 ">
  <div class="conteiner">
  <div class="card">
  <div>
    <img src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
  </div>
  <title></title>
  <rect width="100%" height="100%" fill="#868e96"></rect>
  </svg>
  <div class="card-header">
    <h1 class="text-center fs-4 my-3">${info.nome}</h1>
    <p class="text-center fs-4 mb-3 card__header__valor">R$ ${info.valor},00</p>
    <a href="${info.contato} ${info.link}" target="_blank" class="btn btn-primary  mb-2 d-flex">Entrar em contato</a>
  
  </div>
    </div>
  `
}
     

}

 

fetch('/json/dc_casamento.json')
.then(Response => Response.json())
.then(json => criaCardsrRevelacao(json))

function criaCardsrRevelacao(json){
const segundaSecao = document.querySelector('#pdt-revelacao')
for(let info of json){  
  segundaSecao.innerHTML +=`
  
  <div class="col-sm-6 col-md-6 col-xxl-3">
  <div class="conteiner">
  <div class="card">
  <div>
    <img src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
  </div>
  <title></title>
  <rect width="100%" height="100%" fill="#868e96"></rect>
  </svg>
  <div class="card-header">
    <h1 class="text-center fs-4 my-3">${info.nome}</h1>
    <p class="text-center fs-4 mb-3 card__header__valor">R$ ${info.valor}</p>
    <a href="${info.contato} ${info.link}" target="_blank" class="btn btn-primary  mb-2 d-flex">Entrar em contato</a>
  
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
  <div class="conteiner">
  <div class="card">
  <div>
    <img src="${info.image}" class="d-block w-100" width="100%" height="100%" alt="...">
  </div>
  <title></title>
  <rect width="100%" height="100%" fill="#868e96"></rect>
  </svg>
  <div class="card-header">
    <h1 class="text-center fs-4 my-3">${info.nome}</h1>
    <p class="text-center fs-4 mb-3 card__header__valor">R$ ${info.valor},00</p>
    <a href="${info.contato} ${info.link}" target="_blank" class="btn btn-primary  mb-2 d-flex">Entrar em contato</a>
  
  </div>
</div>
  </div>`

}

}




