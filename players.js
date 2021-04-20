import { changeHP, elHP, renderHP, attack, changeRenderHP } from './playersHP.js'

export const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack,
    changeRenderHP
}
export const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['knife', 'machete', 'sword', 'bomb'],
    attack,
    changeRenderHP
};