fetch('/json/decoracoes.json')
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
      <div class="conteiner  ">
        <div class="card">
          <div>
            <img id="image-produto" src="${item.image}" class="d-block w-100" width="100%" height="100%" alt="...">
          </div>
          <title></title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
    
          </svg>
          <div class="card-header ">
            <h1 class="text-center card-text   fs-4" id="nome-produto">${item.nome}</h1>
            <p class="text-center fs-4" id="disc-produto"></p>
            <a href="${item.contato}" target="_blank" class="btn btn-primary fs-5">Falar sobre</a>
          </div>
        </div>
      `;
  });
}
const qtdItens = [];

let perPage = 20
const state = {
  page: 1,
  perPage: 20,
  totalPage: Math.ceil(qtdItens.length / perPage),
  maxVisibilete: calculateMaxVisible()
};
function calculateMaxVisible() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) {
    return 3;
  } else if (screenWidth < 1300) {
    return 8;
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
/*, "btn-md", "p-2" ,"g-col-6"  */
const buttons = {
  element: html.get('.pagination .numbers'),
  create(number) {
    const button = document.createElement('div');
    button.innerHTML = number;
    button.classList.add("btn", "btn-primary");

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
    const { maxLeft, maxRight } = buttons.calculateMaxVisible();
    for (let page = maxLeft; page <= maxRight; page++) {
      buttons.create(page);
    }
  },
  calculateMaxVisible() {
    const { maxVisible } = state;
    let maxLeft = state.page - Math.floor(maxVisible / 2);
    let maxRight = state.page + Math.floor(maxVisible / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxVisible;
    }
    if (maxRight > state.totalPage) {
      maxLeft = state.totalPage - (maxVisible - 1);
      maxRight = state.totalPage;
      if (maxLeft < 1) maxLeft = 1;
    }
    return { maxLeft, maxRight };
  }
};

const list = {
  create(item) {
    const div = document.createElement('div');
    div.classList.add('item', "col-sm-6", "col-md-6", "col-xxl-3","my-4","conteiner");
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
  state.maxVisible = calculateMaxVisible(); 
  update();
  controls.createListeners();
}

init();
window.addEventListener('resize', () => {
  state.maxVisible = calculateMaxVisible();
  update();
});