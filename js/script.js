'use strict';

let bookList = document.querySelectorAll('.book');
// books order
bookList[0].insertAdjacentElement('beforebegin', bookList[1]);
bookList[4].insertAdjacentElement('beforebegin', bookList[5]);
bookList[2].insertAdjacentElement('beforebegin', bookList[4]);
bookList[5].insertAdjacentElement('afterend', bookList[2]);
console.log(bookList);
// background update
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
// correct title of book 3
bookList[4].querySelector('h2 > a').textContent = 'Книга 3. this и Прототипы Объектов';
// hide adv label
document.querySelector('.adv').style.display = 'none';
// restore the contents of book 2
let secondBookContents = bookList[0].querySelectorAll('ul > li');
console.log(secondBookContents);
secondBookContents[10].insertAdjacentElement('beforebegin', secondBookContents[2]);
secondBookContents[9].insertAdjacentElement('beforebegin', secondBookContents[7]);
secondBookContents[8].insertAdjacentElement('afterend', secondBookContents[4]);
secondBookContents[4].insertAdjacentElement('afterend', secondBookContents[5]);
// restore the contents of book 5
let fifthBookContents = bookList[5].querySelectorAll('ul > li');
console.log(fifthBookContents);
fifthBookContents[4].insertAdjacentElement('afterend', fifthBookContents[2]);
fifthBookContents[8].insertAdjacentElement('beforebegin', fifthBookContents[5]);
fifthBookContents[1].insertAdjacentElement('afterend', fifthBookContents[9]);
// add 8th chapter to book 6
let sixthBook = bookList[2].querySelector('ul');
let newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
console.log(newChapter);
sixthBook.append(newChapter);
let sixthBookContents = sixthBook.querySelectorAll('li');
console.log(sixthBookContents);
sixthBookContents[8].insertAdjacentElement('afterend', sixthBookContents[10]);