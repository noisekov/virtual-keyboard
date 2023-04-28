const body = document.querySelector('body');
const div = document.createElement('div');
div.classList.add('content');
body.append(div);
const content = document.querySelector('.content');

const title = document.createElement('p');
title.classList.add('title');
title.textContent = 'Virtual keyboard';
content.append(title);

const textAreaCreate = document.createElement('textarea');
textAreaCreate.classList.add('textarea');
content.append(textAreaCreate);
const textArea = document.querySelector('.textarea');

const keyboardWrapper = document.createElement('div');
keyboardWrapper.classList.add('keyboard');
content.append(keyboardWrapper);

const description = document.createElement('p');
description.classList.add('description');
description.innerHTML = 'The keyboard has been created in Windows';
content.append(description);

const lang = document.createElement('p');
lang.classList.add('lang');
lang.innerHTML = 'Change language left combination Ctrl + Alt';
content.append(lang);

// получаем значения кнопок из JSON
function dataJSON() {
  const xhr = new XMLHttpRequest();
  const URL = './data.json';
  xhr.open('GET', URL, false);
  xhr.send();
  return xhr.response;
}

const data = JSON.parse(dataJSON());

const keyboard = document.querySelector('.keyboard');

// генерим кнопки с классом code
data.class.code.forEach((btn) => {
  const btnKeyboard = document.createElement('button');
  btnKeyboard.className = `${btn} button`;
  keyboard.append(btnKeyboard);
});

const button = document.querySelectorAll('.button');

let language = 'ru';
let textCase = 'lower';

// первоначальный язык на кнопках
data.ru.lowerCase.forEach((btn, index) => {
  button[index].textContent = `${btn}`;
});

// изменение языка
function changeLanuage(langText) {
  if (langText === 'ru') {
    language = 'en';
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else {
    language = 'ru';
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}

// изменение регистра
function changeCase(langText, caseVal) {
  if (langText === 'ru' && caseVal === 'lower') {
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'ru' && caseVal === 'upper') {
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'en' && caseVal === 'lower') {
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'en' && caseVal === 'upper') {
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}
// shift
function changeSymbol(langText) {
  if (langText === 'ru') {
    data.ru.shift.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'en') {
    data.en.shift.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}

function findKeyPress(evt) {
  textArea.focus();
  evt.preventDefault();

  button.forEach((btn) => {
    if (btn.classList[0] === evt.code) {
      btn.classList.add('active');
      if (btn.innerText.split('').length <= 2) {
        textArea.setRangeText(btn.innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
      }
    }
  });
  if (evt.code === 'Space') {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
  }
  if (evt.code === 'Enter') {
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end');
  }
  if (evt.code === 'Tab') {
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, 'end');
  }

  if (evt.code === 'CapsLock') {
    if (button[20].innerHTML === button[20].innerHTML.toLowerCase()) {
      textCase = 'lower';
      changeCase(language, textCase);
    } else {
      textCase = 'upper';
      changeCase(language, textCase);
    }
  }

  if (evt.code === 'ControlLeft' && evt.altKey) {
    changeLanuage(language);
  }

  if (evt.code === 'AltLeft' && evt.ctrlKey) {
    changeLanuage(language);
  }
  if (evt.code === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    }
  }
  if (evt.code === 'Delete') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
  }

  if (evt.code === 'ShiftLeft') {
    changeSymbol(language);
  }
}

function comeBackLangAndCase(langText, caseVal) {
  if (langText === 'ru' && caseVal === 'lower') {
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'ru' && caseVal === 'upper') {
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'en' && caseVal === 'lower') {
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else if (langText === 'en' && caseVal === 'upper') {
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}

document.addEventListener('keydown', findKeyPress);

function removeKeyPress(evt) {
  button.forEach((btn) => {
    if (btn.classList[0] === evt.code && btn.classList[0] !== 'CapsLock') {
      btn.classList.remove('active');
    }

    if (btn.classList[0] === 'CapsLock' && textCase === 'upper') {
      btn.classList.remove('active');
    }

    if (evt.code === 'ShiftLeft') {
      comeBackLangAndCase(language, textCase);
    }
  });
}

document.addEventListener('keyup', removeKeyPress);

function setActiveClass(evt) {
  evt.target.closest('.button').classList.add('active');
}

function removeActiveClass(evt) {
  evt.target.closest('.button').classList.remove('active');
}
button.forEach((btn) => {
  btn.addEventListener('mousedown', setActiveClass);
  btn.addEventListener('mouseup', removeActiveClass);
});

function writeLetter(evt) {
  textArea.focus();
  if (evt.target.closest('.button').innerText.split('').length <= 2) {
    textArea.setRangeText(evt.target.closest('.button').innerText, textArea.selectionStart, textArea.selectionEnd, 'end');
  }
  if (evt.target.closest('.button').innerHTML === ' ') {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
  }
  if (evt.target.closest('.button').innerHTML === 'Enter') {
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end');
  }
  if (evt.target.closest('.button').innerHTML === 'Tab') {
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, 'end');
  }

  if (evt.target.closest('.button').innerText === 'CapsLock') {
    if (button[20].innerHTML === button[20].innerHTML.toLowerCase()) {
      textCase = 'lower';
      changeCase(language, textCase);
    } else {
      textCase = 'upper';
      changeCase(language, textCase);
    }
  }

  if (evt.target.closest('.button').innerText === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    }
  }
  if (evt.target.closest('.button').innerText === 'Delete') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
  }
}

keyboard.addEventListener('click', writeLetter);
