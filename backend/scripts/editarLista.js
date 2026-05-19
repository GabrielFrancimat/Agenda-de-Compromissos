const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");
const inputEditar = document.getElementById("input-editar");
const textError = document.getElementById("erros");

function mostrarError() {
  let indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  // Se o campo do index estiver vazio
  if (inputIndex.value.trim() === "") {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Digite um valor no campo de index!";
    return false;
  }

  // Se for menor ou igual a zero
  if (indice <= 0) {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! O valor do index deve ser maior que zero!";
    return false;
  }

  // Se não existir itens na lista
  if (itens.length === 0) {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Não existe nenhuma tarefa na lista para ser editada!";
    return false;
  }

  // Se o index for maior que o tamanho da lista
  if (indice > itens.length) {
    textError.style.visibility = "visible";
    textError.textContent = `Error!! Não existe tarefa com esse index. Só existem ${itens.length} tarefas na lista.`;
    return false;
  }

  // Se passar em todas as validações
  textError.style.visibility = "hidden";
  return true;
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

// Como resolver: Minutagem 45:12 da gravação do dia 20/09/2025
function editarLista() {
  let indice = Number(inputIndex.value);
  const tarefaEditada = inputEditar.value;
  const itens = listaTarefas.querySelectorAll("li");

  if (!mostrarError()) return;

  if (tarefaEditada.trim() === "") {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Digite algo no campo de edição!";
    return;
  }

  if (tarefaExiste(tarefaEditada)) return;
  const li = itens[indice - 1];
  li.childNodes[0].nodeValue = tarefaEditada;
  inputEditar.value = "";
  inputIndex.value = "";
  textError.style.visibility = "hidden";
  alert("Tarefa editada com sucesso !");
}

export { editarLista };