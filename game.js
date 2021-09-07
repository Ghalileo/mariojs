const force_jump = 460;




kaboom({
    global: true, 
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0,0,1,1]
})

// Sprite Loading from Src
loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
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
// Level One
const map = [
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                       ^                                        ',
    '                                                      @         ',
    '           !   !    $                                           =',
    '================ ==================  ========= ==================',
]
// Sprite assignment 
const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid(), area()],
    '!': [sprite('goomba'), solid(), area()],
    '^': [sprite('item-box'), solid(), area()],
    '$': [sprite('coin')],
    '@': [sprite('warp-pipe'), solid(), area()],
    
}

// Score of Game
// const scoreKeep = add([
//     text('Test'),
//     pos(30,6),
//     layer('ui'),
//     {
//         value: 'score',
//     }
// ])

add([text('Level' + ' Score', pos(4,6))])

// Mario Sprite Rendered
const player = add([
    sprite('mario'), solid(), area(),
    pos(30, 0),
    body(),
    origin('bot')
])

// Character Controls


keyDown('left', ()=>{
    player.move(-120, 0)
})

keyDown('right', ()=>{
    player.move(120, 0)
})

keyPress('space', () => {
    if(player.grounded()){
        player.jump(force_jump)
    }
})
// Character Controls End 
const gameLevel = addLevel(map, levelCfg)

})
// Emulates Script
go("game")