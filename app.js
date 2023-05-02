import dataJSON from './module/get-data.js';

const data = JSON.parse(dataJSON());

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
description.innerHTML = 'The keyboard was created in Windows';
content.append(description);

const lang = document.createElement('p');
lang.classList.add('lang');
lang.innerHTML = 'Change language left combination Ctrl + Alt';
content.append(lang);

const keyboard = document.querySelector('.keyboard');

data.class.code.forEach((btn) => {
  const btnKeyboard = document.createElement('button');
  btnKeyboard.className = `${btn} button`;
  keyboard.append(btnKeyboard);
});

const button = document.querySelectorAll('.button');

let language = 'ru';
let textCase = 'lower';
let isCapse = false;
let isShift = false;

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('language') === null || localStorage.getItem('language') === 'ru') {
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  } else {
    language = localStorage.getItem('language');
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
});

function changeLanuage(langText, caseVal, shift) {
  if (langText === 'ru' && caseVal === 'lower' && shift === false) {
    language = 'en';
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper' && shift === false) {
    language = 'en';
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper' && shift === false) {
    language = 'ru';
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower' && shift === false) {
    language = 'ru';
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'lower' && shift === true) {
    language = 'en';
    data.en.shiftEnLower.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper' && shift === true) {
    language = 'en';
    data.en.shiftEnUpper.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower' && shift === true) {
    language = 'ru';
    data.ru.shiftRuLower.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper' && shift === true) {
    language = 'ru';
    data.ru.shiftRuUpper.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  localStorage.setItem('language', `${language}`);
}

function changeCaseCaps(langText, caseVal, shift) {
  if (langText === 'ru' && caseVal === 'lower' && shift === false) {
    textCase = 'upper';
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper' && shift === false) {
    textCase = 'lower';
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower' && shift === false) {
    textCase = 'upper';
    data.en.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper' && shift === false) {
    textCase = 'lower';
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'lower' && shift === true) {
    textCase = 'upper';
    data.ru.shiftRuUpper.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper' && shift === true) {
    textCase = 'lower';
    data.ru.shiftRuLower.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower' && shift === true) {
    textCase = 'upper';
    data.en.shiftEnUpper.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper' && shift === true) {
    textCase = 'lower';
    data.en.shiftEnLower.forEach((btn, index) => {
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
        textArea.focus();
      }
    }
  });
  if (evt.code === 'Space') {
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }
  if (evt.code === 'Enter') {
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }
  if (evt.code === 'Tab') {
    textArea.setRangeText('\t', textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }

  if (evt.code === 'CapsLock') {
    if (isCapse === false) {
      isCapse = true;
    } else {
      isCapse = false;
    }
    changeCaseCaps(language, textCase, isShift);
  }

  if (evt.ctrlKey && evt.altKey) {
    changeLanuage(language, textCase, isShift);
  }

  if (evt.code === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
      textArea.focus();
    }
  }
  if (evt.code === 'Delete') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    textArea.focus();
  }

  if (evt.key === 'Shift' && isShift === false) {
    isShift = true;
    if (textCase === 'lower') {
      textCase = 'upper';
      changeSymbolShift(language, textCase);
    } else {
      textCase = 'lower';
      changeSymbolShift(language, textCase);
    }
  }
}

function comeBackLangAndCase(langText, caseVal) {
  if (langText === 'ru' && caseVal === 'lower') {
    data.ru.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'ru' && caseVal === 'upper') {
    data.ru.upperCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'lower') {
    data.en.lowerCase.forEach((btn, index) => {
      button[index].textContent = `${btn}`;
    });
  }
  if (langText === 'en' && caseVal === 'upper') {
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

    if (evt.key === 'Shift' && isShift) {
      isShift = false;
      if (textCase === 'lower') {
        textCase = 'upper';
        comeBackLangAndCase(language, textCase);
      } else {
        textCase = 'lower';
        comeBackLangAndCase(language, textCase);
      }
      if (btn.innerText === 'Shift') {
        btn.classList.remove('active');
      }
    }
  });
}

document.addEventListener('keyup', removeKeyPress);

function setActiveClass(evt) {
  textArea.focus();

  if (evt.target.closest('.button').innerText !== 'Caps Lock') {
    evt.target.closest('.button').classList.add('active');
  }

  if (evt.target.closest('.button').innerText === 'Caps Lock') {
    if (isCapse === false) {
      isCapse = true;
      evt.target.closest('.button').classList.add('active');
    } else {
      isCapse = false;
      evt.target.closest('.button').classList.remove('active');
    }
    changeCaseCaps(language, textCase, isShift);
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
    textArea.setRangeText('\t', textArea.selectionStart, textArea.selectionEnd, 'end');
  }

  if (evt.target.closest('.button').innerText === 'Backspace') {
    if (textArea.selectionStart > 0) {
      textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
    }
  }
  if (evt.target.closest('.button').innerText === 'Del') {
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
  }
  if (evt.target.closest('.button').innerText === 'Shift') {
    isShift = true;
    if (textCase === 'lower') {
      textCase = 'upper';
      changeSymbolShift(language, textCase);
    } else {
      textCase = 'lower';
      changeSymbolShift(language, textCase);
    }
  }
}

function removeActiveClass(evt) {
  if (evt.target.closest('.button').innerText !== 'Caps Lock' && evt.target.closest('.button').innerText !== 'Shift') {
    evt.target.closest('.button').classList.remove('active');
  }
  if (evt.target.closest('.button').innerText === 'Shift' && isShift) {
    isShift = false;
    if (textCase === 'lower') {
      textCase = 'upper';
      comeBackLangAndCase(language, textCase);
    } else {
      textCase = 'lower';
      comeBackLangAndCase(language, textCase);
    }
    evt.target.closest('.button').classList.remove('active');
  }
}

button.forEach((btn) => {
  btn.addEventListener('mousedown', setActiveClass);
  btn.addEventListener('mouseup', removeActiveClass);
  btn.addEventListener('mouseleave', removeActiveClass);
});
