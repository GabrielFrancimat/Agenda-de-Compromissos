import { apagarTarefa, apagarTodasTarefas } from "./apagarTarefa.js";
import { editarLista } from "./editarLista.js";

const inputTarefas = document.getElementById("input-tarefa");
const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");
const inputEditar = document.getElementById("input-editar");
const textError = document.getElementById("erros");
const pIndex = document.getElementById("p-index");
const btnAdd = document.getElementById("btn-add");
const btnDelete = document.getElementById("btn-delete");
const btnDeleteAll = document.getElementById("btnDeleteAll");
const btnEdit = document.getElementById("btn-edt");
const inputData = document.getElementById("data");
const inputCompromisso = document.getElementById("input_tarefa");
const btnAgenda = document.getElementById("btn_adc");
const totalTarefas = document.getElementById("total-tarefas");
const tarefasFeitas = document.getElementById("tarefas-feitas");
const dataAtual = document.getElementById("data-atual");
const emptyState = document.getElementById("empty-state");

window.onload = function () {
  carregarTarefas();
  atualizarResumo();
  mostrarDataAtual();
};

inputIndex.addEventListener("focus", function () {
  pIndex.style.display = "flex";
});

inputIndex.addEventListener("blur", function () {
  pIndex.style.display = "none";
});

btnAdd.addEventListener("click", () => enviarTarefa());
btnDelete.addEventListener("click", () => apagarTarefa());
btnDeleteAll.addEventListener("click", () => apagarTodasTarefas());
btnEdit.addEventListener("click", () => editarLista());
btnAgenda.addEventListener("click", () => adicionarCompromisso());

document.addEventListener("keypress", function (e) {
  if (e.key !== "Enter") return;

  if (document.activeElement === inputEditar) {
    editarLista();
    return;
  }

  if (
    document.activeElement === inputCompromisso ||
    document.activeElement === inputData
  ) {
    adicionarCompromisso();
    return;
  }

  enviarTarefa();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Delete") {
    apagarTarefa();
  }
});

function carregarTarefas() {
  const tarefasSalvas = [];

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith("tarefa_")) {
      const indice = Number(chave.replace("tarefa_", ""));
      tarefasSalvas.push({
        id: indice,
        texto: localStorage.getItem(chave),
      });
    }
  }

  tarefasSalvas.sort((a, b) => a.id - b.id);
  tarefasSalvas.forEach((tarefa) => criarTarefaNaLista(tarefa.texto, tarefa.id));
}

function tarefaExiste(tarefa) {
  const itens = listaTarefas.querySelectorAll("li");
  for (let i = 0; i < itens.length; i++) {
    const textoItem = itens[i]
      .childNodes[0]
      .nodeValue.trim()
      .toLowerCase();

    if (textoItem === tarefa.toLowerCase()) {
      mostrarErro("Erro! Essa tarefa ja existe na sua lista.");
      limparCamposTexto();
      return true;
    }
  }
  return false;
}

function tarefaFeita(li) {
  li.classList.toggle("feito");
  atualizarResumo();
}

function criarBotaoCheck(li) {
  const btnCheck = document.createElement("button");
  btnCheck.textContent = "Concluir";
  btnCheck.classList.add("btn-check");
  btnCheck.classList.add("btn");

  btnCheck.onclick = function () {
    tarefaFeita(li);
  };

  li.appendChild(btnCheck);
}

function criarTarefaNaLista(tarefa, id) {
  const li = document.createElement("li");
  li.textContent = tarefa;
  li.classList.add("item-lista");
  li.id = "tarefa_" + id;

  criarBotaoCheck(li);
  listaTarefas.appendChild(li);
  atualizarResumo();
}

function enviarTarefa() {
  const novaTarefa = inputTarefas.value.trim();
  const newId = listaTarefas.querySelectorAll("li").length + 1;

  if (novaTarefa === "") {
    mostrarErro("Erro! Digite algo no campo de adicionar tarefa.");
    return;
  }

  if (tarefaExiste(novaTarefa)) return;

  localStorage.setItem("tarefa_" + newId, novaTarefa);
  criarTarefaNaLista(novaTarefa, newId);

  esconderErro();
  inputTarefas.value = "";
}

function adicionarCompromisso() {
  const data = inputData.value;
  const compromisso = inputCompromisso.value.trim();
  const newId = listaTarefas.querySelectorAll("li").length + 1;

  if (data === "" || compromisso === "") {
    mostrarErro("Erro! Preencha a data e o compromisso antes de adicionar.");
    return;
  }

  const dataFormatada = new Date(`${data}T12:00:00`).toLocaleDateString(
    "pt-BR"
  );
  const tarefaComData = `${dataFormatada} - ${compromisso}`;

  if (tarefaExiste(tarefaComData)) return;

  localStorage.setItem("tarefa_" + newId, tarefaComData);
  criarTarefaNaLista(tarefaComData, newId);

  esconderErro();
  inputData.value = "";
  inputCompromisso.value = "";
}

function atualizarResumo() {
  const itens = listaTarefas.querySelectorAll("li");
  const concluidas = listaTarefas.querySelectorAll("li.feito");

  totalTarefas.textContent = itens.length;
  tarefasFeitas.textContent = concluidas.length;
  emptyState.style.display = itens.length === 0 ? "block" : "none";
}

function mostrarDataAtual() {
  const hoje = new Date();
  dataAtual.textContent = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function mostrarErro(mensagem) {
  textError.style.visibility = "visible";
  textError.textContent = mensagem;
}

function esconderErro() {
  textError.style.visibility = "hidden";
  textError.textContent = "";
}

function limparCamposTexto() {
  inputTarefas.value = "";
  inputIndex.value = "";
  inputEditar.value = "";
  inputCompromisso.value = "";
}

export { atualizarResumo, esconderErro, mostrarErro };
