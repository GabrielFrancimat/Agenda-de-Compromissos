const inputTarefas = document.getElementById("input-tarefa");
const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");
const inputEditar = document.getElementById("input-editar");
const textoErro = document.getElementById("erros");
const pIndex = document.getElementById("p-index");

// Lógica para quando clicar dentro do input mostrar o elemento "p"
inputIndex.addEventListener("focus", function () {
  pIndex.style.display = "flex";
});

inputIndex.addEventListener("blur", function () {
  pIndex.style.display = "none";
});

function editarLista() {
  let indice = Number(inputIndex.value);
  const tarefaEditada = inputEditar.value;
  const itens = listaTarefas.querySelectorAll("li");

  // Checa se o índice é válido
  if (!mostrarError()) return;

  // Checa se a nova tarefa é válida
  if (tarefaEditada.trim() === "") {
    textoErro.style.visibility = "visible";
    textoErro.textContent = "Error!! Digite algo no campo de edição!";
    return;
  }

  if (tarefaExiste(tarefaEditada)) return;
  itens[indice - 1].firstChild.textContent = tarefaEditada; // mantém o botão
  inputEditar.value = "";
  inputIndex.value = "";
  textoErro.style.visibility = "hidden";
  alert("Tarefa editada com sucesso !");
}

function apagarTarefa() {
  let indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  // Checa se o índice é válido
  if (!mostrarError()) return;

  if (window.confirm("Deseja realmente excluir essa tarefa ?")) {
    itens[indice - 1].remove();
    inputIndex.value = "";
    alert("Tarefa excluída com sucesso !");
  } else {
    alert("Operação cancelada !");
    inputIndex.value = "";
  }

}

function mostrarError() {
  let indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  // Se o campo do index estiver vazio
  if (inputIndex.value.trim() === "") {
    textoErro.style.visibility = "visible";
    textoErro.textContent = "Error!! Digite um valor no campo de index!";
    return false;
  }

  // Se for menor ou igual a zero
  if (indice <= 0) {
    textoErro.style.visibility = "visible";
    textoErro.textContent = "Error!! O valor do index deve ser maior que zero!";
    return false;
  }

  // Se o index for maior que o tamanho da lista
  if (indice > itens.length) {
    textoErro.style.visibility = "visible";
    textoErro.textContent = `Error!! Não existe tarefa com esse index. Só existem ${itens.length} tarefas na lista.`;
    return false;
  }

  // Se passar em todas as validações
  textoErro.style.visibility = "hidden";
  return true;
}

function tarefaExiste(tarefa) {
  const itens = listaTarefas.querySelectorAll("li");
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].textContent.toLowerCase() === tarefa.toLowerCase()) {
      textoErro.style.visibility = "visible";
      textoErro.textContent = "Erro! Essa tarefa já existe na sua lista !";
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

  // Quando clicar, marca/desmarca como feito
  btnCheck.onclick = function() {
    tarefaFeita(li);
  };

  li.appendChild(btnCheck);
}

function enviarTarefa() {
  const novaTarefa = inputTarefas.value;

  if (tarefaExiste(novaTarefa)) return;

    // Checa se a nova tarefa é válida
  if (novaTarefa.trim() === "") {
    textoErro.style.visibility = "visible";
    textoErro.textContent = "Error!! Digite algo no campo de nova tarefa!";
    return;
  } else {
    const li = document.createElement("li");
    li.textContent = novaTarefa;
    li.classList.add("item-lista");
    textoErro.style.visibility = "hidden";

    // Adiciona o botão Check ao li
    criarBotaoCheck(li);

    listaTarefas.appendChild(li);
    inputTarefas.value = "";
  }
}