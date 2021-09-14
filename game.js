const force_jump = 460;
const force_jump_big = 550;
const movement_speed = 120;



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
const map = addLevel(
    [
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '       ^                     #                                  ',
    '                                                      @         ',
    '           !   !    $                                          =',
    '===================================  ========= =================',
],
// Sprite assignment 
 {
    width: 20,
    height: 20,
    '=': () => [sprite('block'), solid(), area()],
    '!': () => [sprite('goomba'), solid(), area()],
    '*': () => [sprite('blank-box'), solid(), area()],
    '^': () => [sprite('item-box'), solid(), area(), 'mushroom-box'],
    '#': () => [sprite('item-box'), solid(), area(), 'coin-box'],
    '$': () => [sprite('coin')],
    '%': () => [sprite('mushroom'), 'mushroom', body(), area()],
    '@': () => [sprite('warp-pipe'), solid(), area()],
    
})
// const gameLevel = addLevel(map)
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

// Parameters for marios growth
function big() {
    let timer = 0
    let isBig = false
    return{
        update() {
        if(isBig) {
            timer -= dt()
            if (timer <= 0){
                this.smallify()
            }
        }}, 
        isBig() {
            return isBig
        },
        smallify() {
            this.scale = vec2(1) 
            timer=0
            isBig = false
        },
        biggify(time) {
            this.scale = vec2(2)
            timer = time
            isBig = true
        }
    }
}

// Mario Sprite Rendered
const player = add([
    sprite('mario'), solid(), area(),
    pos(30, 0),
    body(),
    big(),
    origin('bot')
])

// Grow 
player.collides('mushroom', m =>{
    destroy(m)
    player.biggify(5)
    
})

// Move spawned items
action('mushroom', m =>{
    m.move(10,0)
})

// Spawn Coins from Surpise Blocks (Work in Progress)
player.on("headbutt", (obj) => {
    if(obj.is('coin-box')) {
        map.spawn('$', obj.gridPos.sub(0,1))
        map.spawn('*', obj.gridPos.sub(0,0))
        destroy(obj)
    }
    if(obj.is('mushroom-box')){
        map.spawn('%', obj.gridPos.sub(0,1))
        map.spawn('*', obj.gridPos.sub(0,0))
        destroy(obj)
    }
})

// Character Controls
keyDown('left', () => {
    player.move(-movement_speed, 0)
})

keyDown('right', () => {
    player.move(movement_speed, 0)
})

keyPress('space', () => {
    if(player.grounded()){
        player.jump(force_jump)
    }
})
// Character Controls End 



})
// Emulates Script
go("game")