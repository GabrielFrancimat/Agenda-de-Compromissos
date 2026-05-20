import { esconderErro, mostrarErro } from "./script.js";

const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");
const inputEditar = document.getElementById("input-editar");

function mostrarValidacao() {
  const indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  if (inputIndex.value.trim() === "") {
    mostrarErro("Erro! Digite um valor no campo de indice.");
    return false;
  }

  if (indice <= 0) {
    mostrarErro("Erro! O valor do indice deve ser maior que zero.");
    return false;
  }

  if (itens.length === 0) {
    mostrarErro("Erro! Nao existe nenhuma tarefa na lista para ser editada.");
    return false;
  }

  if (indice > itens.length) {
    mostrarErro(
      `Erro! Nao existe tarefa com esse indice. So existem ${itens.length} tarefas na lista.`
    );
    return false;
  }

  esconderErro();
  return true;
}

function tarefaExiste(tarefa) {
  const itens = listaTarefas.querySelectorAll("li");
  for (let i = 0; i < itens.length; i++) {
    const textoItem = itens[i].childNodes[0].nodeValue.trim().toLowerCase();
    if (textoItem === tarefa.toLowerCase()) {
      mostrarErro("Erro! Essa tarefa ja existe na sua lista.");
      inputIndex.value = "";
      inputEditar.value = "";
      return true;
    }
  }
  return false;
}

function editarLista() {
  const indice = Number(inputIndex.value);
  const tarefaEditada = inputEditar.value.trim();
  const itens = listaTarefas.querySelectorAll("li");

  if (!mostrarValidacao()) return;

  if (tarefaEditada === "") {
    mostrarErro("Erro! Digite algo no campo de edicao.");
    return;
  }

  if (tarefaExiste(tarefaEditada)) return;

  const li = itens[indice - 1];
  li.childNodes[0].nodeValue = tarefaEditada;
  localStorage.setItem(`tarefa_${indice}`, tarefaEditada);
  inputEditar.value = "";
  inputIndex.value = "";
  esconderErro();
  alert("Tarefa editada com sucesso!");
}

export { editarLista };
