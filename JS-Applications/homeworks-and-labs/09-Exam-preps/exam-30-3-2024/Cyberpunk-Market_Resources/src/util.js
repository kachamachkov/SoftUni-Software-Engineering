export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function getUserData(data) {
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
    localStorage.removeItem('user');
}


export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);


        callback(Object.fromEntries(data), event.target);
    };
}

export function updateNavBar() {

    const userData = getUserData();

    document.querySelector('nav .guest').style.display = userData ? 'none' : 'block';
    document.querySelector('nav .user').style.display = userData ? 'block' : 'none';
}