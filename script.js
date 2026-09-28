const quizData = [
  {
    question: 'Tokoh dalam cerita adalah...',
    options: [
      'Pilihannya',
      'Pelaku dalam cerita',
      'Waktu terjadinya cerita',
      'Pesan moral'
    ],
    answer: 1
  },
  {
    question: 'Kalimat berikut yang termasuk kalimat transitif adalah ...',
    options: [
      'Adik tidur',
      'Burung terbang',
      'Ibu memasak nasi',
      'Mereka berlari'
    ],
    answer: 2
  },
  {
    question: 'Kalimat berikut yang termasuk kalimat intransitif adalah ...',
    options: [
      'Ayah membaca koran',
      'Kakak menulis surat',
      'Rina menyapu lantai',
      'Adik tersenyum'
    ],
    answer: 3
  },
  {
    question: 'Awalan me- pada kata “sapu” menjadi ...',
    options: ['mesapu', 'mensapu', 'menyapu', 'memsapu'],
    answer: 2
  },
  {
    question: 'Kata yang benar sesuai awalan ber- adalah ...',
    options: ['berlari', 'belari', 'melari', 'berlali'],
    answer: 0
  },
  {
    question: 'Kalimat majemuk setara yang tepat adalah ...',
    options: [
      'Rani membaca buku',
      'Rani membaca buku dan menulis ringkasan',
      'Buku dibaca Rani',
      'Rani sedang membaca'
    ],
    answer: 1
  },
  {
    question: 'Pendapat yang baik harus disampaikan dengan ...',
    options: [
      'Cepat dan keras',
      'Jelas dan sopan',
      'Tanpa alasan',
      'Dengan marah'
    ],
    answer: 1
  },
  {
    question: 'Paragraf yang menggambarkan sesuatu secara rinci disebut paragraf ...',
    options: ['narasi', 'deskripsi', 'argumentasi', 'persuasi'],
    answer: 1
  },
  {
    question: 'Dari kata dasar “tulis”, bentuk me- yang benar adalah ...',
    options: ['metulis', 'mentulis', 'menulis', 'mengtulis'],
    answer: 2
  },
  {
    question: 'Kata penghubung yang sering dipakai dalam kalimat majemuk setara adalah ...',
    options: ['karena', 'sampai', 'dan', 'meskipun'],
    answer: 2
  }
];

const quizContainer = document.getElementById('quiz');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreBox = document.getElementById('scoreBox');

let currentQuestion = 0;
let selectedAnswers = Array(quizData.length).fill(null);

function renderQuestion() {
  const q = quizData[currentQuestion];
  const questionHtml = `
    <div class="question-block">
      <div class="question-title">${currentQuestion + 1}. ${q.question}</div>
      <div class="option-list">
        ${q.options
          .map(
            (option, index) => `
              <div class="option">
                <input type="radio" id="q${currentQuestion}-opt${index}" name="q${currentQuestion}" value="${index}" ${selectedAnswers[currentQuestion] === index ? 'checked' : ''}>
                <label for="q${currentQuestion}-opt${index}">${option}</label>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;

  quizContainer.innerHTML = questionHtml;

  document.querySelectorAll(`input[name="q${currentQuestion}"]`).forEach((input) => {
    input.addEventListener('change', (event) => {
      selectedAnswers[currentQuestion] = Number(event.target.value);
    });
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Selesai' : 'Selanjutnya';
}

function showScore() {
  const total = quizData.length;
  const correct = quizData.reduce((acc, item, index) => {
    return acc + (selectedAnswers[index] === item.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((correct / total) * 100);
  scoreBox.classList.remove('hidden');
  scoreBox.innerHTML = `Skor kamu: ${correct}/${total} (${percentage}%). ${
    percentage >= 70 ? 'Bagus! Kamu sudah siap menghadapi ujian.' : 'Tetap semangat! Ayo ulangi materi dan coba lagi.'
  }`;
}

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
    scoreBox.classList.add('hidden');
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    scoreBox.classList.add('hidden');
    return;
  }

  showScore();
});

renderQuestion();
