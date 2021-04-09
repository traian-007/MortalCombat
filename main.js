const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack: function (name) {
        console.log(name + 'Fight...')
    }
}
const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack: function (name) {
        console.log(name + 'Fight...')
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
};

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    playerObj.attack(playerObj.name);
    return $player
};

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');

    player.hp -= Math.ceil(Math.random() * 20);
    if (player.hp < 0) {
        player.hp = 0;
        $playerLife.style.width = player.hp + '%';
        $randomButton.disabled = true;
        return true;
    }
    $playerLife.style.width = player.hp + '%';
};

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' win';
    return $loseTitle;
};

$randomButton.addEventListener('click', function () {
    const a = changeHP(player2);
    const b = changeHP(player1);
    if (a) {
        $arenas.appendChild(playerLose(player1.name));
    } else if (b) {
        $arenas.appendChild(playerLose(player2.name));
    }

});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

