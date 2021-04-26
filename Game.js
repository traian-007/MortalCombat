import { Player } from "./Player.js"
import { logs, player2, HIT, ATTACK, player1 } from './date.js'

export class Game extends Player {
    constructor(props) {
        super(props);
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.logs = logs;
        this.HIT = HIT;
        this.ATTACK = ATTACK;
        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
        this.ab = this.ab.bind(this)
    }

    createElement = (tag, className) => {
        const $tag = document.createElement(tag);
        if (className) {
            $tag.classList.add(className);
        }
        return $tag
    };

    createReloadButton = () => {
        const $reloadButtonDiv = this.createElement('div', 'reloadWrap');
        const $reloadButton = this.createElement('button', 'button');
        $reloadButton.innerText = 'Reload';

        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        })

        $reloadButtonDiv.appendChild($reloadButton);
        this.$arenas.appendChild($reloadButtonDiv)
    }

    playerWins = (name) => {
        const $loseTitle = this.createElement('div', 'loseTitle');
        if (name) {
            $loseTitle.innerText = name + ' win';
        } else {
            $loseTitle.innerText = 'draw';
        }
        return $loseTitle;
    };
    enemyAttack = () => {
        const hit = this.ATTACK[this.getRandom(3) - 1];
        const defence = this.ATTACK[this.getRandom(3) - 1];
        return {
            value: this.getRandom(this.HIT[hit]),
            hit,
            defence
        }
    }

    playerAttack = () => {
        const attack = {}

        for (let item of this.$formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = this.getRandom(this.HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }
        return attack;
    }



    showResult = () => {
        const { hp: hp1, name: name1 } = this.player1;
        const { hp: hp2, name: name2 } = this.player2;
        if (hp1 === 0 || hp2 === 0) {
            this.$formFight[6].disabled = true;
            this.createReloadButton();
        }
        if (hp1 === 0 && hp1 <= hp2) {
            this.$arenas.appendChild(this.playerWins(name2));
            this.generateLogs("end", this.player2, this.player1);
        } else if (hp2 === 0 && hp2 < hp1) {
            this.$arenas.appendChild(this.playerWins(name1));
            this.generateLogs("end", this.player1, this.player2);
        } else if (hp1 === 0 && hp2 === 0) {
            this.$arenas.appendChild(this.playerWins());
            this.generateLogs("draw");
        }
    }
    ab = (e) => {
        e.preventDefault();
        const enemy = this.enemyAttack();
        const player = this.playerAttack();
        const { value: valueEnemy, defence: defenceEnemy, hit: hitEnemy } = enemy;
        const { value: valuePlayer, defence: defencePlayer, hit: hitPlayer } = player;
        if (defencePlayer !== hitEnemy) {
            this.player1.changeRenderHP(valueEnemy);
            this.generateLogs('hit', this.player2, this.player1, valueEnemy);
        } else {
            this.generateLogs('defance', this.player2, this.player1);
        }
        if (defenceEnemy !== hitPlayer) {
            this.player2.changeRenderHP(valuePlayer);
            this.generateLogs('hit', this.player1, this.player2, valuePlayer);
        } else {
            this.generateLogs('defence', this.player1, this.player2);

        }
        this.showResult();
    }
    fightPlayers = () => {
        this.$formFight.addEventListener('submit', this.ab)
    }

    createPlayer = ({ player, hp, name, img, attack }) => {
        const $player = this.createElement('div', `player${player}`);
        const $progressbar = this.createElement('div', 'progressbar');
        const $character = this.createElement('div', 'character');
        const $life = this.createElement('div', 'life');
        const $name = this.createElement('div', 'name');
        const $img = this.createElement('img');

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
    getRandom = (num) => {
        return Math.ceil(Math.random() * num)
    }
    getTime = () => {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}`
    }

    getTextLog = (type, playerName1, playerName2) => {
        switch (type) {
            case 'start':
                return this.logs[type]
                    .replace('[player1]', playerName1)
                    .replace('[player2]', playerName2)
                    .replace('[time]', this.getTime());
                break;
            case 'hit':
                return this.logs[type][this.getRandom(this.logs[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2)
                break;
            case 'defence':
                return this.logs[type][this.getRandom(this.logs[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2)
                break;
            case 'end':
                return this.logs[type][this.getRandom(this.logs[type].length - 1) - 1]
                    .replace('[playerWins]', playerName1)
                    .replace('[playerLose]', playerName2)
                break;
            case 'draw':
                return this.logs[type];
                break;
        }
    }
    generateLogs = (type, { name: name1 } = {}, { name: name2, hp } = {}, valueAttack) => {
        let text = this.getTextLog(type, name1, name2)

        switch (type) {
            case 'hit':
                text = `${this.getTime()} ${text} -${valueAttack} [${hp}/100]`;
                break;
            case 'defence':
            case 'end':
            case 'draw':
                text = `${this.getTime()} ${text}`;
                break;
        }
        const el = `<p>${text}</p>`;
        this.$chat.insertAdjacentHTML('afterbegin', el);
    }
    start = () => {

        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));
        this.generateLogs('start', this.player1, this.player2)
        this.fightPlayers()
    }

}
export default Game;
