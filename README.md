# Agenda de Consultas

Sistema de agendamento de consultas por profissional, data e horário. Projeto-base da disciplina de
Gerência de Configuração (UNIGRAN, 2026/2).

## Como rodar

Não precisa instalar nada. Abra o arquivo `index.html` no navegador.

As consultas ficam salvas no próprio navegador (`localStorage`). Para começar do zero, apague os
dados do site nas configurações do navegador, ou rode `localStorage.clear()` no console.

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | a tela: formulário de agendamento e lista de consultas |
| `agenda.js` | a lógica: salvar, listar e verificar horário ocupado |
| `CHANGELOG.md` | o que mudou em cada versão, escrito para quem usa o sistema |

## Regras de versionamento

- Toda mudança começa por uma **issue**, com o que acontece hoje, o que deveria acontecer e o
  critério de aceite.
- O trabalho é feito em um **ramo por issue**, nomeado `tipo/numero-descricao` (`fix/1-mensagem-horario`).
- As mensagens de commit seguem o padrão **Conventional Commits**: `tipo(escopo): resumo`, com
  `Refs #N` no rodapé.
- Nada entra no `main` sem **pull request**. A descrição do PR traz `Closes #N`, e é o merge que
  fecha a issue.
- Versões seguem o **versionamento semântico** e são marcadas com etiqueta anotada (`git tag -a`).

## Ideias para as próximas versões

Cada uma cabe numa issue própria:

- Cancelar uma consulta já agendada.
- Filtrar a lista por profissional.
- Impedir agendamento em data que já passou.
- Mostrar quantas consultas cada profissional tem no dia.
- Avisar quando o mesmo paciente já tem consulta no mesmo dia.
