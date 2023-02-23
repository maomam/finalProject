const hamburger = document.querySelector('#hamburger')
const close = document.querySelector('#close')
const menu = document.querySelector('#menu')


function openMenu() {
    menu.classList.add('active')
    /*
    classList umfasst einige Methoden zur Manipulation von Klassen
    eines HTML-Elements: add, remove, toggle, contains, replace
    https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    */
  }
  function closeMenu() {
    menu.classList.remove('active')
  }

  // Event Listener
hamburger.addEventListener('click', openMenu)
close.addEventListener('click', closeMenu)