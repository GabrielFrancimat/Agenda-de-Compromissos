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
let newId = 1;

window.onload = function () { carregarTarefas(); }

// Lógica para quando clicar dentro do input mostrar o elemento "p"
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

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
      enviarTarefa();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Delete") {
      apagarTarefa();
  }
});

function carregarTarefas() {
  for (let i = 1; i <= localStorage.length; i++) {
    const tarefa = localStorage.getItem("tarefa_" + i);
    if (tarefa) {
      criarTarefaNaLista(tarefa, i); // monta o <li> sem precisar do input
    }
  }
}

function tarefaExiste(tarefa) {
  const itens = listaTarefas.querySelectorAll("li");
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].textContent.toLowerCase() === tarefa.toLowerCase()) {
      textError.style.visibility = "visible";
      textError.textContent = "Erro! Essa tarefa já existe na sua lista !";
      inputTarefas.value = "";
      inputIndex.value = "";
      inputEditar.value = "";
      return true;
    }
  }
  return false;
}

function tarefaFeita(li) {
  li.classList.toggle("feito");
}

function criarBotaoCheck(li) {
  const btnCheck = document.createElement("button");
  btnCheck.textContent = "Check";
  btnCheck.classList.add("btn-check");
  btnCheck.classList.add("btn");

  // Quando clicar, marca/desmarca como feito
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
}

function enviarTarefa() {
  const novaTarefa = inputTarefas.value;

  if (tarefaExiste(novaTarefa)) return;

  if (novaTarefa.trim() === "") {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Digite algo no campo de adicionar a tarefa !";
    return;
  }

  // salva no localStorage
  localStorage.setItem("tarefa_" + newId, novaTarefa);

  criarTarefaNaLista(novaTarefa, newId);
  newId++;

  textError.style.visibility = "hidden";
  inputTarefas.value = "";
}
