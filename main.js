
import { Game } from "./Game.js"

const game = new Game({})
game.start()
console.log(JSON.parse(localStorage.getItem('player1')))

// let player1;
// let player2;
// let hit;
// let defence;
// let value;
// class Game {

//     getRandom = (num) => {
//         return Math.ceil(Math.random() * num)
//     }
//     getPlayers = async () => {
//         const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json()).then(data => data)
//         return body;
//     }
//     getFight = async () => {
//         const fight = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
//             method: 'POST',
//             body: JSON.stringify({
//                 hit,
//                 defence,
//             })
//         });
//         return fight
//     }
//     start = async () => {
//         const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json()).then(data => data);
//         const f = await this.getFight();
//         const p1 = players[this.getRandom(players.length) - 1]
//         const p2 = players[this.getRandom(players.length) - 1]
//         console.log(f)
//         console.log(players)
//         console.log(p1, p2);
//         player1 = new Player({
//             ...p1,
//             player: 1,
//             rootSelector: 'arenas',
//         })
//         player2 = new Player({
//             ...p2,
//             player: 2,
//             rootSelector: 'arenas',
//         })
//     }
// }

// const game = new Game();
// game.start();
// import { logs } from "./date.js"
// import { getRandom, createElement, playerWins, createReloadButton } from './utils.js'
// // import { player1, player2 } from './players.js'
// import { enemyAttack, playerAttack } from './attack.js';
// import { Player } from "./Player.js";

// const player1 = new Player({
//     player: 1,
//     name: 'SCORPION',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
// })

// const player2 = new Player({
//     player: 2,
//     name: 'KITANA',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
// })

// const $arenas = document.querySelector('.arenas');
// const $formFight = document.querySelector('.control')
// const $chat = document.querySelector('.chat');

// function createPlayer({ player, hp, name, img, attack }) {

//     const $player = createElement('div', `player${player}`);
//     const $progressbar = createElement('div', 'progressbar');
//     const $character = createElement('div', 'character');
//     const $life = createElement('div', 'life');
//     const $name = createElement('div', 'name');
//     const $img = createElement('img');

//     $life.style.width = hp + '%';
//     $name.innerText = name;
//     $img.src = img;

//     $progressbar.appendChild($name);
//     $progressbar.appendChild($life);

//     $character.appendChild($img);

//     $player.appendChild($progressbar);
//     $player.appendChild($character);

//     attack(name);
//     return $player
// };
// const av = (e) => {
//     e.preventDefault();
//     const enemy = this.enemyAttack();
//     const player = this.playerAttack();
//     const { value: valueEnemy, defence: defenceEnemy, hit: hitEnemy } = enemy;
//     const { value: valuePlayer, defence: defencePlayer, hit: hitPlayer } = player;
//     if (defencePlayer !== hitEnemy) {
//         this.player1.changeRenderHP(valueEnemy);
//         this.generateLogs('hit', this.player2, this.player1, valueEnemy);
//     } else {
//         this.generateLogs('defance', this.player2, this.player1);
//     }
//     if (defenceEnemy !== hitPlayer) {
//         this.player2.changeRenderHP(valuePlayer);
//         this.generateLogs('hit', this.player1, this.player2, valuePlayer);
//     } else {
//         this.generateLogs('defence', this.player1, this.player2);

//     }
//     this.showResult();
// }
// $formFight.addEventListener('submit', av)

// function getTime() {
//     const date = new Date();
//     return `${date.getHours()}:${date.getMinutes()}`
// }

// function getTextLog(type, playerName1, playerName2) {
//     switch (type) {
//         case 'start':
//             return logs[type]
//                 .replace('[player1]', playerName1)
//                 .replace('[player2]', playerName2)
//                 .replace('[time]', getTime());
//             break;
//         case 'hit':
//             return logs[type][getRandom(logs[type].length) - 1]
//                 .replace('[playerKick]', playerName1)
//                 .replace('[playerDefence]', playerName2)
//             break;
//         case 'defence':
//             return logs[type][getRandom(logs[type].length) - 1]
//                 .replace('[playerKick]', playerName1)
//                 .replace('[playerDefence]', playerName2)
//             break;
//         case 'end':
//             return logs[type][getRandom(logs[type].length) - 1]
//                 .replace('[playerWins]', playerName1)
//                 .replace('[playerLose]', playerName2)
//             break;
//         case 'draw':
//             return logs[type];
//             break;
//     }
// }
// function generateLogs(type, { name: name1 } = {}, { name: name2, hp } = {}, valueAttack) {
//     let text = getTextLog(type, name1, name2)

//     switch (type) {
//         case 'hit':
//             text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
//             break;
//         case 'defence':
//         case 'end':
//         case 'draw':
//             text = `${getTime()} ${text}`;
//             break;
//     }

//     const el = `<p>${text}</p>`;
//     $chat.insertAdjacentHTML('afterbegin', el);

// }


// $formFight.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const enemy = enemyAttack();
//     const player = playerAttack($formFight);
//     console.log(player)

//     const { value: valueEnemy, defence: defenceEnemy, hit: hitEnemy } = enemy;
//     const { value: valuePlayer, defence: defencePlayer, hit: hitPlayer } = player;
//     if (defencePlayer !== hitEnemy) {
//         player1.changeRenderHP(valueEnemy);
//         generateLogs('hit', player2, player1, valueEnemy);
//     } else {
//         generateLogs('defance', player2, player1);
//     }
//     if (defenceEnemy !== hitPlayer) {
//         player2.changeRenderHP(valuePlayer);
//         generateLogs('hit', player1, player2, valuePlayer);
//     } else {
//         generateLogs('defence', player1, player2);

//     }

//     showResult();

// })

// const showResult = () => {
//     const { hp: hp1, name: name1 } = player1;
//     const { hp: hp2, name: name2 } = player2;
//     if (hp1 === 0 || hp2 === 0) {
//         $formFight[6].disabled = true;
//         createReloadButton();
//     }
//     if (hp1 === 0 && hp1 < hp2) {
//         $arenas.appendChild(playerWins(name2));
//         generateLogs("end", player2, player1);
//     } else if (hp2 === 0 && hp2 < hp1) {
//         $arenas.appendChild(playerWins(name1));
//         generateLogs("end", player1, player2);
//     } else if (hp1 === 0 && hp2 === 0) {
//         $arenas.appendChild(playerWins());
//         generateLogs("draw");
//     }
// }

// function init() {
//     $arenas.appendChild(createPlayer(player1));
//     $arenas.appendChild(createPlayer(player2));
//     generateLogs('start', player1, player2)
// }
// init();
