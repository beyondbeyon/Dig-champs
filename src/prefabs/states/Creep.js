export default class Creep{
    worm

    constructor(worm){
        this.worm = worm
    }

    enter(){
        this.Left = this.worm.x - 20
        this.Right = this.worm.x + 20
        const speed = 200
        if(this.worm.x == Left){
            this.worm.setVelocityX(-speed)
        } else if(this.worm.x == Right){
            this.worm.setVelocityX(speed)
        }
        
    }
}