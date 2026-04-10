let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  let input = document.getElementById("inputTarefa");
  let texto = input.value.trim();

  if (texto === "") return;

  tarefas.push({
    texto: texto,
    feita: false
  });

  input.value = "";
  salvar();
  renderizar();
}

function alternarStatus(index) {
  tarefas[index].feita = !tarefas[index].feita;
  salvar();
  renderizar();
}

function deletar(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}

function filtrar(tipo) {
  filtroAtual = tipo;
  renderizar();
}

function renderizar() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtual === "ativas") return !tarefa.feita;
    if (filtroAtual === "concluidas") return tarefa.feita;
    return true;
  });

  tarefasFiltradas.forEach((tarefa) => {
    let indexOriginal = tarefas.indexOf(tarefa);

    let li = document.createElement("li");

    if (tarefa.feita) {
      li.classList.add("feita");
    }

    li.innerHTML = `
      <span onclick="alternarStatus(${indexOriginal})">${tarefa.texto}</span>
      <button onclick="deletar(${indexOriginal})">X</button>
    `;

    lista.appendChild(li);
  });
}

renderizar();
