var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Bird extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 30;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 1, this.y],
            [this.x + 2, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 2]
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
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let bird = new Bird(x, y);
            birdArr.push(bird);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);
        let emptyCells2 = this.chooseCell(2);
        let newCell2= random(emptyCells2);
        let emptyCells3= this.chooseCell(1);
        let newCell3= random(emptyCells3);


        if (newCell) {

            this.life = this.life + 3;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 22) {
                this.mul();
            }
        }
        else if (newCell2) {

            this.life = this.life + 2;
            let x = newCell2[0];
            let y = newCell2[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 22) {
                this.mul();
            }
        }
        else if (newCell3) {

            this.life++
            let x = newCell3[0];
            let y = newCell3[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 22) {
                this.mul();
            }
        }
         
        else {
            this.move()
        }
    }
    move() {
        this.life = this.life - 2;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
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

        for (let i in birdArr) {
            if (birdArr[i].x == this.x && birdArr[i].y == this.y) {
                birdArr.splice(i, 1)
            }
        }
    }
}