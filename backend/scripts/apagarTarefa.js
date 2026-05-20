import { atualizarResumo, esconderErro, mostrarErro } from "./script.js";

const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");

function mostrarValidacao() {
  const indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  if (inputIndex.value.trim() === "") {
    mostrarErro("Erro! Digite o indice do item que deseja excluir.");
    return false;
  }

  if (indice <= 0) {
    mostrarErro("Erro! O valor do indice deve ser maior que zero.");
    return false;
  }

  if (itens.length === 0) {
    mostrarErro("Erro! Nao existe nenhuma tarefa na lista para ser excluida.");
    return false;
  }

  if (indice > itens.length) {
    mostrarErro(
      `Erro! Nao existe tarefa com esse indice. So existe(m) ${itens.length} tarefa(s) na lista.`
    );
    return false;
  }

  esconderErro();
  return true;
}

function regravarLocalStorage() {
  const tarefas = [];
  const itens = listaTarefas.querySelectorAll("li");

  itens.forEach((item) => {
    tarefas.push(item.childNodes[0].nodeValue.trim());
  });

  localStorage.clear();
  tarefas.forEach((tarefa, i) => {
    localStorage.setItem(`tarefa_${i + 1}`, tarefa);
    itens[i].id = `tarefa_${i + 1}`;
  });
}

function apagarTarefa() {
  const indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  if (!mostrarValidacao()) return;

  if (window.confirm("Deseja realmente excluir essa tarefa?")) {
    itens[indice - 1].remove();
    regravarLocalStorage();
    inputIndex.value = "";
    atualizarResumo();
    alert("Tarefa excluida com sucesso!");
    return;
  }

  inputIndex.value = "";
  alert("Operacao cancelada!");
}

function apagarTodasTarefas() {
  const itens = listaTarefas.querySelectorAll("li");

  if (itens.length === 0) {
    mostrarErro("Erro! Nao existe nenhuma tarefa na lista para ser excluida.");
    return false;
  }

  if (window.confirm("Deseja realmente excluir todas as tarefas?")) {
    itens.forEach((item) => item.remove());
    localStorage.clear();
    inputIndex.value = "";
    atualizarResumo();
    esconderErro();
    alert("Todas as tarefas foram excluidas com sucesso!");
    return;
  }

  inputIndex.value = "";
  alert("Operacao cancelada!");
}

export { apagarTarefa, apagarTodasTarefas };
