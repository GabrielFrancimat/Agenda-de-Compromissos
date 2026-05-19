const listaTarefas = document.getElementById("lista");
const inputIndex = document.getElementById("input-index");
const textError = document.getElementById("erros");

function mostrarError() {
  let indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  // Se o campo do index estiver vazio
  if (inputIndex.value.trim() === "") {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Digite o index de qual item deseja excluir!";
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
    textError.textContent = "Error!! Não existe nenhuma tarefa na lista para ser excluída!";
    return false;
  }

  // Se o index for maior que o tamanho da lista
  if (indice > itens.length) {
    textError.style.visibility = "visible";
    textError.textContent = `Error!! Não existe tarefa com esse index. Só existe(em) ${itens.length} tarefa(s) na lista.`;
    return false;
  }

  // Se passar em todas as validações
  textError.style.visibility = "hidden";
  return true;
}

function apagarTarefa() {
  let indice = Number(inputIndex.value);
  const itens = listaTarefas.querySelectorAll("li");

  if (!mostrarError()) return;

  if (window.confirm("Deseja realmente excluir essa tarefa ?")) {
    itens[indice - 1].remove();
    localStorage.removeItem("tarefa_" + indice);

    // Reorganizar todas as tarefas
    const novasTarefas = [];
    for (let i = 1; i <= listaTarefas.children.length; i++) {
      novasTarefas.push(listaTarefas.children[i - 1].textContent.replace("Check", "").trim());
    }

    // Limpa e regrava com novos índices
    localStorage.clear();
    novasTarefas.forEach((tarefa, i) => {
      localStorage.setItem("tarefa_" + (i + 1), tarefa);
    });

    inputIndex.value = "";
    alert("Tarefa excluída com sucesso !");
  } else {
    alert("Operação cancelada !");
    inputIndex.value = "";
  }
}


function apagarTodasTarefas() {
  const itens = listaTarefas.querySelectorAll("li");

  // Se não existir itens na lista
  if (itens.length === 0) {
    textError.style.visibility = "visible";
    textError.textContent = "Error!! Não existe nenhuma tarefa na lista para ser excluída!";
    return false;
  }

  if (window.confirm("Deseja realmente excluir todas as tarefas ?")) {
    itens.forEach(item => item.remove());
    localStorage.clear();
    inputIndex.value = "";
    alert("Todas as tarefas foram excluídas com sucesso !");
  } else {
    alert("Operação cancelada !");
    inputIndex.value = "";
  }
}

export { apagarTarefa, apagarTodasTarefas };