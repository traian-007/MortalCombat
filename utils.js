const $arenas = document.querySelector('.arenas');

export const getRandom = (num) => {
    return Math.ceil(Math.random() * num)
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
};

export const createReloadButton = () => {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv)
}

export const playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' win';
    } else {
        $loseTitle.innerText = 'draw';
    }
    return $loseTitle;
};
export default getRandom;