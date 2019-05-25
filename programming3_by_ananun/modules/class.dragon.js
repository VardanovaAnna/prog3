var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Dragon extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 35;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 3],
            [this.x + 2, this.y - 2],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            dragonHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let dragon = new Dragon(x, y);
            dragonArr.push(dragon);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);
        let emptyCells2 = this.chooseCell(3);
        let newCell2 = random(emptyCells2);
        let emptyCells3 = this.chooseCell(2);
        let newCell3 = random(emptyCells3);
        

        if (newCell) {

            this.life = this.life + 4;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in birdArr) {
                if (birdArr[i].x == x && birdArr[i].y == y) {
                    birdArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 23) {
                this.mul();
            }
        }
       else if (newCell2) {

            this.life = this.life + 3;
            let x = newCell2[0];
            let y = newCell2[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                           predatorArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 23) {
                this.mul();
            }
        }
        else if (newCell3) {

            this.life = this.life + 2;
            let x = newCell3[0];
            let y = newCell3[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 23) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life = this.life - 5;
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);
        let emptyCells2 = this.chooseCell(0);
        let newCell2 = random(emptyCells2);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        else if(newCell2){
            let x = newCell2[0];
            let y = newCell2[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in dragonArr) {
            if (dragonArr[i].x == this.x && dragonArr[i].y == this.y) {
                dragonArr.splice(i, 1)
            }
        }
    }
}