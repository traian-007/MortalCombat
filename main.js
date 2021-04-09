const scorpion = {
    name: 'SCORPION',
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack: function () {
        console.log(`${this.name} + Fight...`)
    }
}
const kitana = {
    name: 'KITANA',
    hp: 30,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack: function (name) {
        console.log(name + 'Fight...')
    }
}

const $arenas = document.querySelector('.arenas')

// function createElement(parent, child, elem, classEl) {
//     child = document.createElement(elem)
//     child.classList.add(classEl)
//     parent.appendChild(child)
// }

function createPlayer(playerClass, player) {

    const $player = document.createElement('div')
    $player.classList.add(playerClass)
    $arenas.appendChild($player)

    const $progressbar = document.createElement('div')
    $progressbar.classList.add('progressbar')
    $player.appendChild($progressbar)

    const $life = document.createElement('div')
    $life.style.width = player.hp + '%'
    $life.classList.add('life')
    $progressbar.appendChild($life)

    const $name = document.createElement('div');
    $name.innerText = player.name
    $name.classList.add('name')
    $progressbar.appendChild($name)

    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($character)

    const $img = document.createElement('img')
    $img.src = player.img
    $character.appendChild($img)

    player.attack(player.name)
}

createPlayer('player1', scorpion)
createPlayer('player2', kitana)
