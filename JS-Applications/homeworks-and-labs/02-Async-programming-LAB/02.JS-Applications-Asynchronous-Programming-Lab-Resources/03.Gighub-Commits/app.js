const list = document.getElementById('commits');
function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(onHeaders)
        .then(displayCommits)
        .catch(onError);
}


function onHeaders(response) {
    if (!response.ok) {
        throw 'Error';
    }
    return response.json();
}

function displayCommits(data) {
    list.replaceChildren(...data.map(createListCommitItem));

}

function onError(err) {
    const li = document.createElement('li');
    li.textContent = `Error: 404 (Not Found)`;

    list.appendChild(li);
}

// •	In case of success, for each entry add a list item (<li>) in the unordered list (<ul>) with id "commits" with text in the following format:
// "<commit.author.name>: <commit.message>" 

function createListCommitItem({ commit }) {

    const item = document.createElement('li');
    item.textContent = `${commit.author.name}: ${commit.message}`;

    return item;

}