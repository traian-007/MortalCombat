const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    r: 20,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    r: 20,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

// function changeHP(player) {
//     const $playerLife = document.querySelector('.player' + player.player + ' .life');

//     player.hp -= getRandom(20);
//     if (player.hp < 0) {
//         player.hp = 0;
//     }
//     $playerLife.style.width = player.hp + '%';
// };

function changeHP(num) {
    this.hp -= getRandom(num);
    if (this.hp < 0) {
        this.hp = 0;
    }
}
function elHP() {
    const a = this.renderHP();
    a.style.width = this.hp + '%';
}
function renderHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' win';
    } else {
        $loseTitle.innerText = 'draw';
    }
    return $loseTitle;
};

function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(20)
    player2.changeHP(20)
    player1.elHP();
    player2.elHP();
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

