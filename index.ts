type Question = {
  question: string;
  options: string[];
  answer: number; // índice correto em options
};

const questions: Question[] = [
  {
    question: "Qual é a linguagem que adiciona tipagem ao JavaScript?",
    options: ["Elm", "TypeScript", "CoffeeScript", "ReasonML"],
    answer: 1,
  },
  {
    question: "Qual método converte uma string para número inteiro em JS?",
    options: ["parseInt()", "JSON.parse()", "toFixed()", "map()"],
    answer: 0,
  },
  {
    question: "Qual seletor CSS seleciona elementos por id?",
    options: [".classe", "#id", "tag", "[atributo]"],
    answer: 1,
  },
  {
    question: "Qual é o resultado de 2 ** 3 no JavaScript moderno?",
    options: ["6", "8", "9", "Erro"],
    answer: 1,
  },
  {
    question: "Em HTTP, qual método é usado para criar um recurso?",
    options: ["GET", "PUT", "POST", "DELETE"],
    answer: 2,
  },
];

let current = 0;
let score = 0;
let selectedIndex: number | null = null;

const perguntaEl = document.getElementById("pergunta") as HTMLHeadingElement;
const opcoesEl = document.getElementById("opcoes") as HTMLDivElement;
const proximaBtn = document.getElementById("proxima") as HTMLButtonElement;
const resultadoBox = document.getElementById("resultado") as HTMLDivElement;
const placarEl = document.getElementById("placar") as HTMLParagraphElement;
const reiniciarBtn = document.getElementById("reiniciar") as HTMLButtonElement;
const progressoEl = document.getElementById("progresso") as HTMLParagraphElement;

function renderQuestion() {
  const q = questions[current];
  perguntaEl.textContent = q.question;
  progressoEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  opcoesEl.innerHTML = "";
  selectedIndex = null;
  proximaBtn.disabled = true;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.setAttribute("role", "option");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      // limpar seleção anterior
      const anteriores = opcoesEl.querySelectorAll(".option");
      anteriores.forEach(b => b.classList.remove("selecionada"));
      btn.classList.add("selecionada");
      selectedIndex = i;
      proximaBtn.disabled = false;
    });
    opcoesEl.appendChild(btn);
  });
}

function next() {
  if (selectedIndex === null) return;
  if (selectedIndex === questions[current].answer) score++;
  current++;

  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  (document.getElementById("quiz") as HTMLDivElement).classList.add("hidden");
  resultadoBox.classList.remove("hidden");
  placarEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
}

function restart() {
  current = 0;
  score = 0;
  selectedIndex = null;
  (document.getElementById("quiz") as HTMLDivElement).classList.remove("hidden");
  resultadoBox.classList.add("hidden");
  renderQuestion();
}

proximaBtn.addEventListener("click", next);
reiniciarBtn.addEventListener("click", restart);

// inicializa
renderQuestion();
