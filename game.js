kaboom({
    global: true, 
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0,0,1,1]
})

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'KPO3fR9.png')
loadSprite('goomba', 'LmseqUG.png')
loadSprite('mario','Wb1qfhK.png' )
loadSprite('mushroom', "0wMd92p.png")
loadSprite('block', 'M6rwarW.png')
loadSprite('jump-brick', 'pogC9x5.png')
loadSprite('fire-flower', 'uaUm9sN.png')
loadSprite('warp-pipe', 'rl3cTER.png')
loadSprite('item-box', 'gesQ1KP.png')
loadSprite('blank-box', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'c1cYSbt.png')
loadSprite('pipe-top-right', 'nqQ79eI.png')
loadSprite('pipe-bottom-left', 'hj2GK4n.png')
loadSprite('pipe-bottom-right', 'ReTPiWY.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-goomba', 'SvV4ueD.png')
loadSprite('unbreakable-block', 'gqVoI2b.png')

scene("game", () => {
layers(['bg', 'obj', 'ui'], 'obj')

const map = [
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '                                             ',
    '===================================  ========',
]

const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()]
}

const gameLevel = addLevel(map, levelCfg)

})

start("game")