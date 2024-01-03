fetch('/json/casamentoHome.json')
  .then(response => response.json())
  .then(json => {
    const items = conta(json);
    qtdItens.push(...items);
    init();
  })
  .catch(error => console.error('Erro na requisição:', error));

function conta(json) {
  return json.map(item => {
    return `
      <div class="col-md-12 col-xxl-12">
        <div class="card">
          <div>
            <img id="image-produto" src="${item.image}" class="d-block w-100" width="100%" height="100%" alt="...">
          </div>
          <title></title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
    
          </svg>
          <div class="card-header ">
            <h1 class="text-center fs-12" id="nome-produto">${item.nome}</h1>
            <p class="text-center fs-12" id="disc-produto">${item.discricao}</p>
            <a href="${item.contato}" target="_blank" class="btn btn-primary fs-4">ver mais</a>
          </div>
        </div>
      `;
  });
}
const qtdItens = [];

let perPage = 20
const state = {
  page: 1,
  perPage: 21,
  totalPage: Math.ceil(qtdItens.length / perPage),
  maxVisibilete: 10
};

const html = {
  get(element) {
    return document.querySelector(element);
  }
};

const controls = {
  next() {
    state.page++;
    const lastPage = state.page > state.totalPage;
    if (lastPage) {
      state.page--;
    }
  },
  prev() {
    state.page--;
    if (state.page < 1) {
      state.page++;
    }
  },
  goTO(page) {
    if (page < 1) {
      page = 1;
    }
    state.page = +page;
    if (page > state.totalPage) {
      state.page = state.totalPage;
    }
  },
  createListeners() {
    html.get('.first').addEventListener('click', () => {
      controls.goTO(1);
      update();
    });
    html.get('.last').addEventListener('click', () => {
      controls.goTO(state.totalPage);
      update();
    });

    html.get('.next').addEventListener('click', () => {
      controls.next();
      update();
    });
    html.get('.prev').addEventListener('click', () => {
      controls.prev(1);
      update();
    });
  }
};

const buttons = {
  element: html.get('.pagination .numbers'),
  create(number) {
    const button = document.createElement('div');
    button.innerHTML = number;
    button.classList.add("btn", "btn-primary", "m-1", "btn-lg");

    if (state.page === number) {
      button.classList.add("btn", "btn-light");
    }
    button.addEventListener('click', (e) => {
      const page = e.target.innerText;
      controls.goTO(page);
      update();
    });
    buttons.element.appendChild(button);
  },
  update() {
    buttons.element.innerHTML = '';
    const { maxLeft, maxRight } = buttons.calculateMaxVisilibel();
    for (let page = maxLeft; page <= maxRight; page++) {
      buttons.create(page);
    }
  },
  calculateMaxVisilibel() {
    const { maxVisibilete } = state;
    let maxLeft = state.page - Math.floor(maxVisibilete / 2);
    let maxRight = state.page + Math.floor(maxVisibilete / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxVisibilete;
    }
    if (maxRight > state.totalPage) {
      maxLeft = state.totalPage - (maxVisibilete - 1);
      maxRight = state.totalPage;
      if (maxLeft < 1) maxLeft = 1;
    }
    return { maxLeft, maxRight };
  }
};

const list = {
  create(item) {
    const div = document.createElement('div');
    div.classList.add('item', "col-6", "col-md-6", "col-xxl-4");
    div.innerHTML = `${item}`;
    html.get('.list').appendChild(div);
  },
  update() {
    html.get('.list').innerHTML = '';
    let page = state.page - 1;
    let start = page * state.perPage;
    let end = start + state.perPage;

    const itensPaginados = qtdItens.slice(start, end);

    itensPaginados.forEach(list.create);
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
