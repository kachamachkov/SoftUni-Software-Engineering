let headerElement = document.querySelector('.header .nav').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A') {
        console.log('clicked');
        console.log(e.target.getAttribute('data-link'));
        console.log(e.target.href);
    } else {
        console.log('not A');
    }
});