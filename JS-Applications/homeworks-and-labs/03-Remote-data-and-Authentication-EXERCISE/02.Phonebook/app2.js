function attachEvents() {
    // select load btn
    // get for all entries
    // attach each entry inside the ul as li
    // format "<person>: <phone> "
    // attach delete button to each entry

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const ulRef = document.getElementById('phonebook');

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    async function onCreate() {
        // get inputRefs
        // get inputVals
        // check if valid?
        // reload phonebook
        // create obj to send to server in JSON format
        // {
        //     "person": "<person>",
        //     "phone": "<phone>"
        //   }
        // clear inputs

        const personRef = document.getElementById('person');
        const phoneRef = document.getElementById('phone');
        const person = personRef.value;
        const phone = phoneRef.value;

        if (!person || !phone) {
            return;
        }

        const newContact = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                person: person,
                phone: phone,
            })
        };

        await fetch(url, newContact);
        phoneRef.value = '';
        personRef.value = '';

        // reload
        onLoad();

    }
    async function onLoad() {

        const response = await fetch(url);
        const data = await response.json();

        // clear
        ulRef.innerHTML = '';

        Object.values(data).forEach(rec => {
            createAndAppendLi(rec);
        });


    }

    function createAndAppendLi(rec) {
        let li = document.createElement('li');
        li.textContent = `${rec.person}: ${rec.phone}`;

        let btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.dataset.id = rec._id;
        btn.addEventListener('click', onDeleteClick);

        li.appendChild(btn);
        ulRef.appendChild(li);
    }


    async function onDeleteClick(e) {
        // delete to http://localhost:3030/jsonstore/phonebook/:key> 
        let id = e.target.dataset.id;

        await fetch(url + '/' + id, {
            method: 'DELETE'
        });

        onLoad();

    }
}

attachEvents();