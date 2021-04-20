import { logs } from "./date.js"
import { getRandom, createElement, playerWins, createReloadButton } from './utils.js'
import { player1, player2 } from './players.js'
import { enemyAttack, playerAttack } from './attack.js';
const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat');

function createPlayer({ player, hp, name, img, attack }) {

    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    attack(name);
    return $player
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

let hp1 = 0;
let hp2 = 0;
const generateLogs = (type, { name: name1 }, { name: name2 }, val) => {
    let text = ''
    const a = logs[type][getRandom(type.length) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
    const b = logs[type][getRandom(type.length) - 1].replace('[playerDefence]', name1).replace('[playerKick]', name2);
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`
    switch (type) {
        case "start":
            text = logs["start"]
                .replace('[time]', time)
                .replace('[player1]', name1)
                .replace('[player2]', name2);
            break;
        case "hit":
            hp1 += val;
            text = `${time} ${a} -${val} [${100 - hp1}/100]`;
            break;
        case "defence":
            hp2 += val;
            text = `${time} ${b} -${val} [${100 - hp2}/100]`;
            break;
        case "end":
            text = logs["end"][getRandom(type.length) - 1].replace('[playerWins]', name2).replace('[playerLose]', name1);
            break;
        case "draw":
            text = logs["draw"];
            break;
        default:
            text = "ups something wrong!";
            break;
    }
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

generateLogs("start", player1, player2)
$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack($formFight);
    const { value: valueEnemy, defence: defenceEnemy, hit: hitEnemy } = enemy;
    const { value: valuePlayer, defence: defencePlayer, hit: hitPlayer } = player;
    if (defencePlayer !== hitEnemy) {
        player1.changeRenderHP(valueEnemy);
        generateLogs('hit', player2, player1, valueEnemy);
    }
    if (defenceEnemy !== hitPlayer) {
        player2.changeRenderHP(valuePlayer);
        generateLogs('defence', player1, player2, valuePlayer);
    }

    showResult();

})

const showResult = () => {
    const { hp: hp1, name: name1 } = player1;
    const { hp: hp2, name: name2 } = player2;
    if (hp1 === 0 || hp2 === 0) {
        $formFight[6].disabled = true;
        createReloadButton();
    }
    if (hp1 === 0 && hp1 < hp2) {
        $arenas.appendChild(playerWins(name2));
        generateLogs("end", player1, player2);
    } else if (hp2 === 0 && hp2 < hp1) {
        $arenas.appendChild(playerWins(name1));
        generateLogs("end", player1, player2);
    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(playerWins());
        generateLogs("draw", player1, player2);
    }
}
