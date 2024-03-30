const navLinks = document.querySelectorAll('header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remover a classe "ativo" de todos os links
    navLinks.forEach(link => link.classList.remove('ativo'));

    // Adicionar a classe "ativo" ao link clicado
    link.classList.add('ativo');

    // Obter o ID da seção para rolar
    const sectionId = link.getAttribute('href');

    // Rolagem suave para a seção
    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
const formularioContato = document.getElementById('formulario-contato');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

formularioContato.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obter os dados do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  // Validar os dados
  if (empty(nome) || empty(email) || empty(mensagem)) {
    alert("Erro: Todos os campos são obrigatórios.");
    return;
  }

  // Enviar os dados para o servidor
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'enviar.js');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Mostrar mensagem de sucesso
      mensagemSucesso.style.display = 'block';
      formularioContato.reset();
      setTimeout(() => {
        mensagemSucesso.style.display = 'none';
      }, 3000);
    } else {
      // Mostrar mensagem de erro
      alert("Erro ao enviar o contato. Tente novamente mais tarde.");
    }
  };
  xhr.send(JSON.stringify({
    nome,
    email,
    mensagem,
  }));
});

function empty(value) {
  return value === "" || value === null || value === undefined;
}