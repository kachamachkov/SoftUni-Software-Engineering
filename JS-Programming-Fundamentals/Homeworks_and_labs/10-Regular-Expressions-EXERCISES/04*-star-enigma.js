function enigma(arr) {
    let msgsCount = Number(arr.shift());
    let decryptedMsgs = [];

    let starPattern = /[star]/gi;

    for (let i = 0; i < msgsCount; i++) {
        let msg = arr[i];
        let decryptedMsg = '';
        let matches = msg.match(starPattern);

        if (matches != null) {
            let count = matches.length;

            for (let char of msg) {
                let code = char.charCodeAt();
                code -= count;

                let newChar = String.fromCharCode(code);
                decryptedMsg += newChar;
            }
        } else {
            decryptedMsg = msg;
        }

        decryptedMsgs.push(decryptedMsg);
    }
    let planetPattern =
        /@(?<name>[A-Za-z]+)[^@\-!:>]*:(?<population>\d+)[^@\-!:>]*!(?<type>[A|D])![^@\-!:>]*->(?<soldiers>\d+)/;

    let attackedPlanets = [];
    let destroyedPlanets = [];

    for (let msg of decryptedMsgs) {
        let match = msg.match(planetPattern);

        if (match) {
            let { name, type } = match.groups;

            if (type == 'A') {
                attackedPlanets.push(name);
            } else {
                destroyedPlanets.push(name);
            }
        }
    }

    attackedPlanets.sort((a,b) => a.localeCompare(b))
    destroyedPlanets.sort((a,b) => a.localeCompare(b))

    console.log(`Attacked planets: ${attackedPlanets.length}`);
    attackedPlanets.forEach((planet) => console.log(`-> ${planet}`));

    console.log(`Destroyed planets: ${destroyedPlanets.length}`);
    destroyedPlanets.forEach((planet) => console.log(`-> ${planet}`));
}
enigma(['2', 'STCDoghudd4=63333$D$0A53333', 'EHfsytsnhf?8555&I&2C9555SR']);
enigma(['3',
"tt(''DGsvywgerx>6444444444%H%1B9444",
'GQhrr|A977777(H(TTTT',
'EHfsytsnhf?8555&I&2C9555SR']
)
