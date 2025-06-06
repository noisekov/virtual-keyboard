import dataJSON from './module/get-data.js';

const data = JSON.parse(dataJSON());

const createComponent = (create, className, text) => {
  const node = document.createElement(create);
  node.classList.add(className);
  node.textContent = text;
  return node;
};

const body = document.querySelector('body');
body.append(createComponent('div', 'content'));

const content = document.querySelector('.content');
content.append(createComponent('p', 'title', 'Virtual keyboard'));

content.append(createComponent('textarea', 'textarea'));
const textArea = document.querySelector('.textarea');

content.append(createComponent('div', 'keyboard'));
content.append(createComponent('p', 'description', 'The keyboard was created in Windows'));
content.append(createComponent('p', 'lang', 'Change language left combination Ctrl + Alt'));

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

const changeLanuage = (langText, caseVal, shift) => {
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
};

const changeCaseCaps = (langText, caseVal, shift) => {
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
};

const changeSymbolShift = (langText, caseVal) => {
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
};

const findKeyPress = (evt) => {
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
    if (!evt.repeat) {
      if (isCapse === false) {
        isCapse = true;
        changeCaseCaps(language, textCase, isShift);
      } else {
        isCapse = false;
        changeCaseCaps(language, textCase, isShift);
      }
    }
  }

  if (evt.ctrlKey && evt.altKey) {
    changeLanuage(language, textCase, isShift);
  }

  if (evt.code === 'Backspace') {
    if (textArea.selectionStart > 0) {
      if (textArea.selectionStart === textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
      } else {
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd, 'end');
      }
      textArea.focus();
    }
  }

  if (evt.code === 'Delete') {
    if (textArea.selectionStart === textArea.selectionEnd) {
      textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    } else {
      textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd, 'end');
    }
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
};

const comeBackLangAndCase = (langText, caseVal) => {
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
};

document.addEventListener('keydown', findKeyPress);

const removeKeyPress = (evt) => {
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
};

document.addEventListener('keyup', removeKeyPress);

const setActiveClass = (evt) => {
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
      if (textArea.selectionStart === textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart - 1, textArea.selectionEnd, 'end');
      } else {
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd, 'end');
      }
    }
  }

  if (evt.target.closest('.button').innerText === 'Del') {
    if (textArea.selectionStart === textArea.selectionEnd) {
      textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd + 1, 'end');
    } else {
      textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd, 'end');
    }
  }
  if (evt.target.closest('.button').innerText === 'Shift' && isShift === false) {
    isShift = true;
    if (textCase === 'lower') {
      textCase = 'upper';
      changeSymbolShift(language, textCase);
    } else {
      textCase = 'lower';
      changeSymbolShift(language, textCase);
    }
  }
};

const removeActiveClass = (evt) => {
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
};

button.forEach((btn) => {
  btn.addEventListener('mousedown', setActiveClass);
  btn.addEventListener('mouseup', removeActiveClass);
  btn.addEventListener('mouseleave', removeActiveClass);
});
