const force_jump = 460;
const force_jump_big = 550;
const movement_speed = 120;
const enemy_speed = 20
let current_jump_force = force_jump;
let isJumping = true;
const death_fall = 400;





kaboom({
    global: true, 
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0,0,1,1]
})

// Local Sprite
loadSound('pinapark', '/assets/pinaparkbeach.mp3');

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

// Level Music Control

scene("game", ({level,score}) => {
layers(['bg', 'obj', 'ui'], 'obj')
const music = play("pinapark", { loop: true, });

// Level One
const maps = 
[
    [
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '       ^          $          #                                  ',
    '                                                      @         ',
    '                        !               !         !             ',
    '================================================================',
],
[
    'b                                                                ',
    'b                                                                ',
    'b                                                                ',
    'b                                                                ',
    'b                                                                ',
    'b                                                                ',
    'b                                                                ',
    'b                     G             G       G                    ',
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
]
]
// Sprite assignment 
 const levelCfg = {
    width: 20,
    height: 20,
    '=': () => [sprite('block'), solid(), area()],
    '!': () => [sprite('goomba'), solid(), area(), 'dangerous'],
    'G': () => [sprite('blue-goomba'), solid(), area(), 'dangerous'],
    '*': () => [sprite('blank-box'), solid(), area()],
    '^': () => [sprite('item-box'), solid(), area(), 'mushroom-box'],
    '#': () => [sprite('item-box'), solid(), area(), 'coin-box'],
    '$': () => [sprite('coin'), 'coin', body(), area()],
    '%': () => [sprite('mushroom'), 'mushroom', body(), area()],
    '@': () => [sprite('warp-pipe'), solid(), area(), 'pipe'],
    'b': () => [sprite('blue-brick'), scale(0.5), solid(), area()],
    
}
const gameLevel = addLevel(maps[level], levelCfg)
// Score of Game
const scoreKeep = add([
    text(score),
    pos(10,60),
    layer('ui'),
    {
        value: score,
    }
])




// Display Current Level 
add([text('level' + parseInt(level + 1, pos(4, 6)))])

// Parameters for marios growth
function big() {
    let timer = 0
    let isBig = false
    return{
        update() {
        if(isBig) {
            current_jump_force=force_jump_big
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
            current_jump_force=force_jump
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
// Grab Coin plus points 
player.collides('coin', (c) =>{
    destroy(c)
    scoreKeep.value++
    scoreKeep.text= scoreKeep.value
})

// Sprites with the label dangerous end the game
player.collides('dangerous', (d) =>{
    if (isJumping){
        destroy(d)
    }else{
        go('lose', {score: scoreKeep.value})
    }
})
// Transistion to next level
player.collides('pipe', () =>{
    keyPress('down', () => {
        go('game', {
            level: (level + 1),
            score: scoreKeep.value
        })
    })
})
// Fall Death 
player.action(() =>{
    camPos(player.pos)
    if(player.pos.y >= death_fall){
        go('lose', {score: scoreKeep.value})
    }
})
// Enemies Move
action('dangerous', (d) =>{
    d.move(-enemy_speed,0)
})

// Move spawned items
action('mushroom', m =>{
    m.move(10,0)
})

// Spawn Coins from Surpise Blocks (Work in Progress)
player.on("headbutt", (obj) => {
    if(obj.is('coin-box')) {
        gameLevel.spawn('$', obj.gridPos.sub(0,1))
        gameLevel.spawn('*', obj.gridPos.sub(0,0))
        destroy(obj)
    }
    if(obj.is('mushroom-box')){
        gameLevel.spawn('%', obj.gridPos.sub(0,1))
        gameLevel.spawn('*', obj.gridPos.sub(0,0))
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

player.action(() =>{
    if(player.grounded()){
        isJumping = false
    }

})

keyPress('space', () => {
    if(player.grounded()){
        isJumping = true
        player.jump(current_jump_force)
    }
})
// Character Controls End 



})

scene('lose', ({score}) =>{
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
})
// Emulates Script
go("game", {level:0,score:0})