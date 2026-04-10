const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("lista");
const mensagemVazia = document.getElementById("mensagemVazia");
const botoesFiltro = document.querySelectorAll(".filtro");

let tarefas = JSON.parse(localStorage.getItem("taskflow_tarefas")) || [];
let filtroAtual = "todas";

function salvarTarefas() {
  localStorage.setItem("taskflow_tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === "") {
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false
  };

  tarefas.push(novaTarefa);
  inputTarefa.value = "";
  salvarTarefas();
  renderizarTarefas();
}

function alternarTarefa(id) {
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return {
        ...tarefa,
        concluida: !tarefa.concluida
      };
    }
    return tarefa;
  });

  salvarTarefas();
  renderizarTarefas();
}

function deletarTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefas();
  renderizarTarefas();
}

function obterTarefasFiltradas() {
  if (filtroAtual === "ativas") {
    return tarefas.filter((tarefa) => !tarefa.concluida);
  }

  if (filtroAtual === "concluidas") {
    return tarefas.filter((tarefa) => tarefa.concluida);
  }

  return tarefas;
}

function atualizarBotoesFiltro() {
  botoesFiltro.forEach((botao) => {
    botao.classList.remove("ativo");

    if (botao.dataset.filtro === filtroAtual) {
      botao.classList.add("ativo");
    }
  });
}

function renderizarTarefas() {
  lista.innerHTML = "";

  const tarefasFiltradas = obterTarefasFiltradas();

  if (tarefasFiltradas.length === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }

  tarefasFiltradas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = "item-tarefa";

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.innerHTML = `
      <div class="conteudo-tarefa">
        <span class="texto-tarefa">${tarefa.texto}</span>
      </div>

      <div class="acoes">
        <button class="btn-acao btn-check" onclick="alternarTarefa(${tarefa.id})">
          ${tarefa.concluida ? "Desfazer" : "Concluir"}
        </button>
        <button class="btn-acao btn-delete" onclick="deletarTarefa(${tarefa.id})">
          Excluir
        </button>
      </div>
    `;

    lista.appendChild(li);
  });

  atualizarBotoesFiltro();
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;
    renderizarTarefas();
  });
});

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

renderizarTarefas();
