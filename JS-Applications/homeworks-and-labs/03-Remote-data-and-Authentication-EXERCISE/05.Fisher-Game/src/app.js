// if we have logged in user?
document.querySelector("a[id='home']").classList.add('active');
document.getElementById('logout').addEventListener('click', onLogout);
document.querySelector('.load').addEventListener('click', onLoadCatch);

let userData = JSON.parse(sessionStorage.getItem('userData'));


const userNavRef = document.getElementById('user');
const guestNavRef = document.getElementById('guest');
const addBtnRef = document.querySelector('.add');
const endpoints = {
    logout: 'http://localhost:3030/users/logout',


};

updateNav();
//update nav
function updateNav() {
    if (userData) {
        document.querySelector('nav p span').textContent = userData.email;
        userNavRef.style.display = 'inline-block';
        guestNavRef.style.display = 'none';
        addBtnRef.disabled = false;

    } else {
        document.querySelector('nav p span').textContent = 'guest';
        userNavRef.style.display = 'none';
        guestNavRef.style.display = 'inline-block';
        addBtnRef.disabled = true;
    }
}



async function onLogout(e) {
    let option = {
        method: 'GET',
        headers: {
            'X-Authorization': userData.accessToken
        }
    };
    await fetch(endpoints.logout, option);
    sessionStorage.clear();
    userData = null;
    updateNav();

}

async function onLoadCatch() {

}