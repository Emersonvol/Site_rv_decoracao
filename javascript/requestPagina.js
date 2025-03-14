fetch('/json/todas_as_decoracaoes.json')
  .then(response => response.json())
  .then(json => {
    const items = conta(json);
    qtdItens.push(...items);
    originalItems.push(...items); 
    init();
  })
  .catch(error => console.error('Erro na requisição:', error));
 
function conta(json) {
  
  return json.map(item => {
    return `
      <div class="conteiner">
      <div class="card">
      <div>
        <img src="${item.image}" class="d-block w-100" width="100%" height="100%" alt="...">
      </div>
      <title></title>
      <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <div class="card-header">
        <h2 class="text-center fs-4 my-3">${item.nome}${item.id}</h2>
        <p class="text-center fs-4 mb-3 card__header__valor">R$ ${item.valor}</p>
        <a href="${item.contato} ${item.link} " target="_blank" class="btn btn-primary mb-2 d-flex">Entrar em contato</a>
         <a class="btn btn-primary d-flex btn-adicionar-carrinho" data-nome="${item.nome} ${item.id}" data-valor="${item.valor}">Adicionar ao carrinho</a>
        </div>
    </div>
    
      `;
  
  });
}







/*adciona no carrinho*/
fetch('/json/todas_as_decoracaoes.json')
  .then(response => response.json())
  .then(json => criaCardsCasamento(json));

const precoTotalSpan = document.querySelector('.precoTotal');
let valorTotal = 0;

function criaCardsCasamento(json) {
  
  for (let info of json) {
    `
      <div class="col-12 col-md-12 col-xxl-3">
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
            <a href="${info.contato}" target="_blank" class="btn btn-primary  text-center d-flex">Entrar em contato</a>
            <a class="btn btn-primary d-flex btn-adicionar-carrinho" data-nome="${info.nome}" data-valor="${info.valor}">Adicionar ao carrinho</a>
          </div>
        </div>
      </div>
    `;

  }
 
  
  const botoesAdicionarCarrinho = document.querySelectorAll('.btn-adicionar-carrinho');
  botoesAdicionarCarrinho.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const nomeProduto = e.target.getAttribute('data-nome');
      const valorProduto = parseFloat(e.target.getAttribute('data-valor'));
      const imagemProduto = e.target.closest('.card').querySelector('img').src;

      const carrinhoAlugar = document.querySelector('.carrinho_alugar');
      const div = document.createElement('div');
      div.classList.add('d-flex');
      div.innerHTML = `
        <div class="card">
          <div>
            <img src="${imagemProduto}" class="d-block w-100" width="100%" height="100%" alt="...">
          </div>
          <div class="card-header">
            <p class="text-center my-3">${nomeProduto}</p>
            <small class="text-center fs-4 mb-3 card__header__valor">R$ ${valorProduto.toFixed(2).replace('.' ,',')}</small>
          </div>
        </div>
      `;
      carrinhoAlugar.appendChild(div);
      

      valorTotal += valorProduto;
      precoTotalSpan.innerHTML = `Valor Total: R$<span class="mx-2">${valorTotal.toFixed(2).replace('.' ,',')}</span>`;
    });
  });
}
/*adciona no carrinho -- fim */




const qtdItens = [];
const originalItems = []; // Lista original dos itens
let perPage = 20;

const state = {
  page: 1,
  perPage: 20,
  totalPage: 0,
  maxVisible: calculateMaxVisible()
};

function calculateMaxVisible() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) {
    return 3;
  } else if (screenWidth < 1300) {
    return 5;
  } else {
    return 10;
  }
}

const html = {
  get(element) {
    return document.querySelector(element);
  }
};

const controls = {
  next() {
    state.page++;
    if (state.page > state.totalPage) {
      state.page = state.totalPage;
    }
    update();
  },
  prev() {
    state.page--;
    if (state.page < 1) {
      state.page = 1;
    }
    update();
  },
  goTo(page) {
    state.page = parseInt(page);
    if (state.page < 1) {
      state.page = 1;
    } else if (state.page > state.totalPage) {
      state.page = state.totalPage;
    }
    update();
  },
  createListeners() {
    html.get('.first').addEventListener('click', () => {
      controls.goTo(1);
    });
    html.get('.last').addEventListener('click', () => {
      controls.goTo(state.totalPage);
    });
    html.get('.next').addEventListener('click', controls.next);
    html.get('.prev').addEventListener('click', controls.prev);
  }
};

const buttons = {
  element: html.get('.pagination .numbers'),
  create(number) {
    const button = document.createElement('a');
    button.innerHTML = number;
    button.classList.add("btn", "btn-primary");
    button.setAttribute("href", "#navContainer")
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', () => {
      controls.goTo(number);
    });
    this.element.appendChild(button);
  },
  update() {
    this.element.innerHTML = '';
    const { maxLeft, maxRight } = this.calculateMaxVisible();
    for (let page = maxLeft; page <= maxRight; page++) {
      this.create(page);
    }
  },
  calculateMaxVisible() {
    const { maxVisible } = state;
    let maxLeft = state.page - Math.floor(maxVisible / 2);
    let maxRight = state.page + Math.floor(maxVisible / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = Math.min(state.totalPage, maxVisible);
    }
    if (maxRight > state.totalPage) {
      maxLeft = Math.max(1, state.totalPage - maxVisible + 1);
      maxRight = state.totalPage;
    }
    return { maxLeft, maxRight };
  }
};

const list = {
  create(item) {
    const div = document.createElement('div');
    div.classList.add('item', 'col-sm-6', 'col-md-6', 'col-xxl-3', 'my-4', 'conteiner');
    div.innerHTML = item;
    html.get('.list').appendChild(div);
  },
  update() {
    html.get('.list').innerHTML = '';
    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;
    const itemsToDisplay = qtdItens.slice(start, end);
    itemsToDisplay.forEach(this.create);
  }
};

function update() {
  list.update();
  buttons.update();
}

function init() {
  state.totalPage = Math.ceil(qtdItens.length / state.perPage);
  update();
  controls.createListeners();
}

init();

const inputSearch = document.querySelector("input[type='search']");

function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const matrix = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[m][n];
}

function normalizeText(text) {
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

let filteredItems = []; // Mantém os itens filtrados da pesquisa anterior

inputSearch.addEventListener('input', () => {
  const searchTerms = normalizeText(inputSearch.value.trim()).split(/\s+/);
  if (searchTerms.length === 0) {
    state.page = 1;
    qtdItens.length = 0;
    qtdItens.push(...originalItems); // Exibir a lista original novamente
    state.totalPage = Math.ceil(qtdItens.length / state.perPage);
    update();
    return;
  }

  const filteredItems = originalItems.filter(item => {
    const normalizedItem = normalizeText(item);
    return searchTerms.every(term => normalizedItem.includes(term));
  });

  qtdItens.length = 0;
  qtdItens.push(...filteredItems);
  state.totalPage = Math.ceil(qtdItens.length / state.perPage);
  state.page = 1;
  update();
});





