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

function dataJSON() {
  const xhr = new XMLHttpRequest();
  const URL = './data.json';
  xhr.open('GET', URL, false);
  xhr.send();
  return xhr.response;
}

const data = JSON.parse(dataJSON());

const keyboard = document.querySelector('.keyboard');

data.class.code.forEach((btn) => {
  const btnKeyboard = document.createElement('button');
  btnKeyboard.className = `${btn} button`;
  keyboard.append(btnKeyboard);
});

const button = document.querySelectorAll('.button');

let language = 'ru';
let textCase = 'lower';
let languageWas = null;
let textCaseWas = null;
let isCapse = false;

data.ru.lowerCase.forEach((btn, index) => {
  button[index].textContent = `${btn}`;
});

function changeLanuage(langText, caseVal) {
  if (langText === 'ru' && caseVal === 'lower') {
    language = 'en';
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper') {
    language = 'en';
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper') {
    language = 'ru';
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower') {
    language = 'ru';
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}

function changeCaseCaps(langText) {
  if (langText === 'ru') {
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en') {
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
}

function changeSymbolShift(langText, caseVal) {
  if (langText === 'ru' && caseVal === 'lower') {
    data.ru.shiftRuLower.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper') {
    data.ru.shiftRuUpper.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower') {
    data.en.shiftEnLower.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper') {
    data.en.shiftEnUpper.forEach((btn, index) => {
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
    if (isCapse === false) {
      isCapse = true;
    } else {
      isCapse = false;
    }
    if (button[20].innerHTML === button[20].innerHTML.toLowerCase()) {
      textCaseWas = 'lower';
      changeCaseCaps(language);
    } else {
      textCaseWas = 'upper';
      changeCaseCaps(language);
    }
  }

  if (evt.ctrlKey && evt.altKey) {
    changeLanuage(language, textCase);
  }

  if (evt.code === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    }
  }
  if (evt.code === 'Delete') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
  }

  if (evt.key === 'Shift') {
    changeSymbolShift(language, textCase);
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

    if (btn.classList[0] === 'CapsLock' && isCapse === false) {
      btn.classList.remove('active');
    }

    if (evt.key === 'Shift') {
      btn.classList.remove('active');
      comeBackLangAndCase(language, textCase);
    }
  });
}

document.addEventListener('keyup', removeKeyPress);

function setActiveClass(evt) {
  textArea.focus();

  if (evt.target.closest('.button').innerText !== 'Caps Lock') {
    evt.target.closest('.button').classList.add('active');
  }

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

  if (evt.target.closest('.button').innerText === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    }
  }
  if (evt.target.closest('.button').innerText === 'Del') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
  }
}

function removeActiveClass(evt) {
  if (evt.target.closest('.button').innerText !== 'Caps Lock') {
    evt.target.closest('.button').classList.remove('active');
  }
}
button.forEach((btn) => {
  btn.addEventListener('mousedown', setActiveClass);
  btn.addEventListener('mouseup', removeActiveClass);
});

function capsClick(evt) {
  if (evt.target.closest('.button').innerText === 'Caps Lock') {
    if (isCapse === false) {
      isCapse = true;
      evt.target.closest('.button').classList.add('active');
    } else {
      isCapse = false;
      evt.target.closest('.button').classList.remove('active');
    }
    if (button[20].innerHTML === button[20].innerHTML.toLowerCase()) {
      textCaseWas = 'lower';
      changeCaseCaps(language);
    } else {
      textCaseWas = 'upper';
      changeCaseCaps(language);
    }
  }
}

keyboard.addEventListener('click', capsClick);
