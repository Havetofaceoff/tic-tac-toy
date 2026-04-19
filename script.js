// Получаем HTML-элементы
// cells - массив всей ячеек, поэтому ALL
const cells = document.querySelectorAll(".container__cell");
const modal = document.querySelector(".container__modal");
const modalBtn = document.querySelector(".modal__btn");
const modalTitle = document.querySelector(".modal__title");
const xValue = document.querySelector(".x-value");
const drawValue = document.querySelector(".draw-value");
const oValue = document.querySelector(".o-value");

// Создаем двумерный массив с выигышными комбинациями,
//  которые состоят из индексов ячеек

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Создаем переменную с игроком
let player = "x";
// создаем переменную с признаком окончания игры
let gameEnd = false;

// проходимся по массиву ячеек методом фор ич, после назначали онклик
// и использовали функцию (см. ниже)
cells.forEach((cell) => {
  cell.onclick = () => handleClick(cell);
});

// назначаем на кнопку в модадьном окне назначам онклик с функцией (см. ниже)
modalBtn.onclick = newGame;

//функция обработка клика по ячейке
function handleClick(cell) {
  //если значение клетки пустое и игра не закончена
  if (cell.innerHTML == "" && !gameEnd) {
    //в ячеку подставляем текущего игрока
    cell.innerHTML = player;
    //добавляем класс с названием как у игрока
    cell.classList.add(player);
    //вызываем функцию проверки победителя
    checkWin();
    //если игра не закончена
    if (!gameEnd) {
      //вызываем проверку нечьи
      checkDraw();
    }
    //меняем игрока на противоположного
    if (player == "x") {
      player = "o";
    } else {
      player = "x";
    }
  }
}

//создаем функцию проверки победителя
function checkWin() {
  //проходимся методом по выигрышным комбинациям
  combinations.forEach((combination) => {
    //достаем с помощью деструктуризации из комбинаций ее три индекса
    const [index1, index2, index3] = combination;
    //проверяем
    if (
      //если совпадает три ячейки и не пустое
      cells[index1].innerHTML == cells[index2].innerHTML &&
      cells[index2].innerHTML == cells[index3].innerHTML &&
      cells[index1].innerHTML !== ""
    ) {
      //то игра окончена
      gameEnd = true;
      //показываем какой игрок выиграл
      showWinner(`Player ${player} win!`);
      //актулизация счета
      calcScore(player);
      //заканчиваем функцию
      return;
    }
  });
}

function showWinner(text) {
  //открывваем модальное окно и подставляем текст в него
  modal.classList.add("modal__active");
  modalTitle.innerHTML = text;
}

//создаем функцию для новой игры
function newGame() {
  //удаляем класс и закрываем модальное окно
  modal.classList.remove("modal__active");
  //пиводим значения переменных в начальное состояние
  player = "x";
  gameEnd = false;
  //очищаем ячейки
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("x", "o");
  });
}

//создаем функцию для подсчета счета
function calcScore(winner) {
  if (winner == "x") {
    xValue.innerHTML = +xValue.innerHTML + 1;
  } else if (winner == "o") {
    oValue.innerHTML = +oValue.innerHTML + 1;
  } else {
    //+ в начале переводит выражение из строки в число
    drawValue.innerHTML = +drawValue.innerHTML + 1;
  }
}
//Создаем функцию для проверки ничьи
function checkDraw() {
  //по умолчанию объявляем пременную признака ничьи
  let isDraw = true;
  // проходимся массивом в поиске пустой ячейки
  cells.forEach((cell) => {
    //если нашли
    if (cell.innerHTML == "") {
      // то ничья не правда
      isDraw = false;
      //завершаем функцию
      return;
    }
  });
  //если после цикла у ничьи не поменялось значение
  if (isDraw) {
    //то игра окончена
    gameEnd = true;
    //показываем что ничья
    showWinner("Draw!");
    // актулизируем счет
    calcScore();
  }
}
