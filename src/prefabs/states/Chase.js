export default class Chase{
    worm

    constructor(worm){
        this.worm = worm
    }

    enter(){
        const speed = 200
        this.physics.moveToObject(worm, this.p, speed)
    }
}