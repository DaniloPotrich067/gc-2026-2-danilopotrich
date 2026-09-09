// Agenda de Consultas — versão 1.0.0
// As consultas ficam no localStorage do navegador. Nada sai da máquina.

const CHAVE = "agenda-consultas";

const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");
const botao = formulario.querySelector('button[type="submit"]');

let memoria = [];
let temArmazenamento = true;

function semArmazenamento() {
  temArmazenamento = false;
  if (aviso) aviso.hidden = false;
}

function carregar() {
  if (!temArmazenamento) return memoria;

  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  } catch (erro) {
    semArmazenamento();
    return memoria;
  }
}

function salvar(consultas) {
  memoria = consultas;

  if (!temArmazenamento) return;

  try {
    localStorage.setItem(CHAVE, JSON.stringify(consultas));
  } catch (erro) {
    semArmazenamento();
  }
}

function horarioOcupado(consultas, nova) {
  return consultas.some(
    (c) =>
      c.data === nova.data &&
      c.hora === nova.hora &&
      c.profissional === nova.profissional
  );
}

function obterConsultaFormulario() {
  return {
    paciente: document.getElementById("paciente").value.trim(),
    profissional: document.getElementById("profissional").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
  };
}

function verificarDisponibilidade() {
  const nova = obterConsultaFormulario();

  // Só verifica quando os campos necessários estiverem preenchidos
  if (!nova.profissional || !nova.data || !nova.hora) {
    botao.disabled = false;
    mensagem.textContent = "";
    return;
  }

  const consultas = carregar();
  const ocupado = horarioOcupado(consultas, nova);

  if (ocupado) {
    mensagem.textContent =
      "Horário indisponível. Esta profissional já possui uma consulta nesse horário.";

    botao.disabled = true;
  } else {
    mensagem.textContent = "";
    botao.disabled = false;
  }
}

function renderizar(consultas = carregar()) {
  consultas.sort((a, b) =>
    (a.data + a.hora).localeCompare(b.data + b.hora)
  );

  lista.innerHTML = "";

  if (consultas.length === 0) {
    lista.innerHTML =
      '<tr><td colspan="4" class="vazio">Nenhuma consulta agendada.</td></tr>';
    return;
  }

  for (const c of consultas) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${c.data}</td>
      <td>${c.hora}</td>
      <td>${c.profissional}</td>
      <td>${c.paciente}</td>
    `;

    lista.appendChild(linha);
  }
}

function filtraProfissional() {
  const profissionalSelecionado =
    document.getElementById("profissional").value;

  const consultas = carregar().filter(
    (c) => c.profissional === profissionalSelecionado
  );

  renderizar(consultas);
}

// Verifica disponibilidade sempre que um dos campos mudar
document.getElementById("profissional").addEventListener(
  "change",
  verificarDisponibilidade
);

document.getElementById("data").addEventListener(
  "change",
  verificarDisponibilidade
);

document.getElementById("hora").addEventListener(
  "change",
  verificarDisponibilidade
);

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nova = obterConsultaFormulario();
  const consultas = carregar();

  // Validação final de segurança
  if (horarioOcupado(consultas, nova)) {
    mensagem.textContent =
      "Horário indisponível. Esta profissional já possui uma consulta nesse horário.";

    botao.disabled = true;
    return;
  }

  consultas.push(nova);

  salvar(consultas);

  mensagem.textContent = "Consulta agendada.";

  formulario.reset();
  botao.disabled = false;

  renderizar();
});

renderizar();
