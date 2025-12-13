namespace SpriteKind {
    export const BOSS = SpriteKind.create()
    export const Middle = SpriteKind.create()
    export const Overhead = SpriteKind.create()
    export const Hazard = SpriteKind.create()
    export const Rok = SpriteKind.create()
    export const KillerRock = SpriteKind.create()
    export const KaBOOM = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Hazard, SpriteKind.Player, function (sprite, otherSprite) {
    music.stopAllSounds()
    list = [sprites.create(assets.image`myImage`, SpriteKind.KaBOOM)]
    for (let index = 0; index < 4; index++) {
        list.push(sprites.create(assets.image`myImage`, SpriteKind.KaBOOM))
    }
    for (let value of list) {
        value.setPosition(otherSprite.x, otherSprite.y)
        value.setBounceOnWall(true)
        animation.runImageAnimation(
        value,
        assets.animation`Ball`,
        75,
        true
        )
    }
    list[0].vx = 100
    list[1].vx = 65
    list[1].vy = -65
    list[2].vy = -100
    list[3].vx = -65
    list[3].vy = -65
    list[4].vx = -100
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 255, 242, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 159, 98, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 98, 35, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 17, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    timer.after(3000, function () {
        game.reset()
    })
})
function createAnimations () {
    characterAnimations.loopFrames(
    Derpo,
    assets.animation`DerpoWalkR`,
    100,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    Derpo,
    assets.animation`DerpoWalkL`,
    100,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    Derpo,
    assets.animation`DerpoStandR`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Derpo,
    assets.animation`DerpoStandL0`,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
}
sprites.onOverlap(SpriteKind.Hazard, SpriteKind.Rok, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDead = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Rok)
    sprites.destroyAllSpritesOfKind(SpriteKind.Overhead)
    sprites.destroyAllSpritesOfKind(SpriteKind.Hazard)
    animation.stopAnimation(animation.AnimationTypes.All, Cloaker)
    music.stopAllSounds()
    animation.runImageAnimation(
    Cloaker,
    assets.animation`CloakerDying`,
    150,
    true
    )
})
sprites.onOverlap(SpriteKind.BOSS, SpriteKind.KillerRock, function (sprite, otherSprite) {
    statusbar.value += -4
    sprites.destroy(otherSprite)
    animation.runImageAnimation(
    sprite,
    assets.animation`CloakerHurt`,
    100,
    true
    )
    timer.after(600, function () {
        animation.runImageAnimation(
        sprite,
        assets.animation`CloakerIdle`,
        150,
        true
        )
    })
})
function CheckPatterns () {
    if (doPattern == true) {
        doPattern = false
        BossPattern()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rok, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        otherSprite.vy = Math.abs(KickDirection) * -200
        otherSprite.vx = KickDirection * 200
        otherSprite.setKind(SpriteKind.KillerRock)
    }
})
function BossPattern () {
    doPattern = false
}
sprites.onCreated(SpriteKind.Rok, function (sprite) {
    timer.after(5000, function () {
        sprites.destroy(sprite)
    })
})
let Warning: Sprite = null
let KickDirection = 0
let list: Sprite[] = []
let statusbar: StatusBarSprite = null
let Cloaker: Sprite = null
let Derpo: Sprite = null
let doPattern = false
let enemyDead = false
let isAttacking = false
let currentAttackTime = 0
let currentAttack = 0
let runningTime = 0
let CheckTime = 4000
enemyDead = false
doPattern = false
scene.setBackgroundColor(15)
tiles.setCurrentTilemap(tilemap`level1`)
Derpo = sprites.create(assets.image`Derpo`, SpriteKind.Player)
tiles.placeOnTile(Derpo, tiles.getTileLocation(0, 14))
scene.cameraFollowSprite(Derpo)
createAnimations()
Cloaker = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.BOSS)
animation.runImageAnimation(
Cloaker,
assets.animation`CloakerIdle`,
150,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
statusbar.value = 2
statusbar.attachToSprite(Cloaker)
statusbar.setColor(7, 15)
statusbar.setOffsetPadding(-25, -15)
tiles.placeOnTile(Cloaker, tiles.getTileLocation(7, 0))
Cloaker.vy = 50
let Center = sprites.create(assets.image`yay`, SpriteKind.Middle)
tiles.placeOnTile(Center, tiles.getTileLocation(8, 10))
Center.x += -8
music.play(music.createSong(assets.song`Boss`), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    runningTime += 2
    info.setScore(runningTime)
    if (isAttacking == false) {
        if (runningTime - currentAttackTime > 250) {
            if (true) {
                Warning = sprites.create(assets.image`Uh Oh_`, SpriteKind.Overhead)
                Warning.x = Derpo.x + KickDirection * 32
                Warning.y = Derpo.y - 32
            }
            currentAttackTime = runningTime
        }
    }
})
game.onUpdate(function () {
    if (controller.right.isPressed()) {
        KickDirection = 1
        Derpo.vx += 2
    } else if (controller.left.isPressed()) {
        KickDirection = -1
        Derpo.vx += -2
    } else {
        Derpo.vx += Derpo.vx * -0.15
    }
    if (Derpo.vx > 76) {
        Derpo.vx = 76
    } else if (Derpo.vx < -76) {
        Derpo.vx = -76
    }
    Derpo.vy += 10
    // Convert percentage to pixels
    // Percentage of Cloaker from center
    // Ratio of Cloaker to Derpo
    // Derpo's percentage from center
    // Derpo's distance from center (Center=128)
    Cloaker.x = (Derpo.x - 128) / 128 / 4 * 128 + 128
})
game.onUpdate(function () {
    if (Cloaker.y > 170) {
        doPattern = true
        Cloaker.vy = 0
    }
})
game.onUpdateInterval(CheckTime, function () {
    if (enemyDead == false) {
        CheckPatterns()
    }
})
