import {upscale, gupscale} from "./ui.js";

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";
var dirt = new Image();
dirt.src = "graphics/map_content/dirt.png";
var dirt_L = new Image();
dirt_L.src = "graphics/map_content/dirt_L.png";
var dirt_R = new Image();
dirt_R.src = "graphics/map_content/dirt_R.png";
var ground_up = new Image();
ground_up.src = "graphics/map_content/ground_up.png";
var ground_up_L = new Image();
ground_up_L.src = "graphics/map_content/ground_up_L.png";
var ground_up_R = new Image();
ground_up_R.src = "graphics/map_content/ground_up_R.png";
var ground_down = new Image()
ground_down.src = "graphics/map_content/ground_down.png"

var ctx;
var devmode = false;
var player;
var mapcoordsX;
var mapcoordsY;
var colliding = [0,0,0,0,0,0,0,0];
var test = 0;
var mapposx = 0;
var mapposy = 0;
var offsetX;
var offsetY;
var offsetX_on;
var offsetY_on;
var bestup = ["None",0];
var bestdown = ["None",0];
var bestleft = [0,"None"];
var bestright = [0,"None"];

function level_reader_var_getter(vartarg, varcont)
{
    switch(vartarg)
    {
        case "ctx":
            ctx = varcont;
            break
        case "devmode":
            devmode = varcont;
            break
        case "player":
            player = varcont;
            break
    }
}

class MapData
{   
    constructor(file)
    {
        this.maplimit = [file[0], file[1]];
        this.spawn = [file[2], file[3]];
        this.level_data = file
        this.temp = 0
        this.ttemp = 0
        this.tempcontentmap = []
        this.offsetY = 0;
        this.offsetX = 0;
        this.offsetX_on = 0
        this.offsetY_on = 0
        this.collisions = [0,0,0,0,0,0,0,0]
        this.bestup = ["None",0]
        this.bestdown = ["None",0]
        this.bestleft = [0,"None"]
        this.bestright = [0,"None"]

        if(this.spawn[1]*71 > 324 & this.spawn[1]*71 < this.maplimit[1]*71-324) // Y offset init
        {
            this.offsetY = this.spawn[1]*71-324
            this.offsetY_on = 0
        }
        if(this.spawn[0]*71 > 624 & this.spawn[0]*71 < this.maplimit[0]*71-567) // X offset init
        {
            this.offsetX = this.spawn[0]*71-576
            this.offsetX_on = 0
        }
        console.log(this.offsetX_on,this.offsetY_on)
        console.log(this.offsetY)
    }

    displayer(px, py, vx, vy)
    {
        if(py > 324 & this.offsetY_on == -1 | this.offsetY_on == 0 | py < 324 & this.offsetY_on == 1) //Camera Y
        {    
            if(this.offsetY >= 0 & this.offsetY <= this.maplimit[1]*71-610) // Y offset
            {
                this.offsetY += vy
                this.offsetY_on = 0
                if(this.offsetY < 1) //up
                {
                    this.offsetY_on = -1
                }
                else if(this.offsetY > this.maplimit[1]*71-609) //down
                {
                    this.offsetY_on = 1
                }
            }
            if(this.offsetY < 0) //replacer camera si elle sort du cadre
            {
                this.offsetY = 0
            }
            else if(this.offsetY > this.maplimit[1]*71-610)
            {
                this.offsetY = this.maplimit[1]*71-610
            }
        }

        if(px > 575 & this.offsetX_on == -1 | this.offsetX_on == 0 | px < 575 & this.offsetX_on == 1) //Camera X
        { 
            if(this.offsetX >= 0 & this.offsetX <= this.maplimit[0]*71-1129) // X offset
            {
                this.offsetX += vx
                this.offsetX_on = 0
                if(this.offsetX < 1) //left
                {
                    this.offsetX_on = -1
                }
                else if(this.offsetX > this.maplimit[0]*71-1130) //right
                {
                    this.offsetX_on = 1
                }
            }
            if(this.offsetX < 0) //replacer camera si elle sort du cadre
            {
                this.offsetX = 0
            }
            else if(this.offsetX > this.maplimit[0]*71-1129)
            {
                this.offsetX = this.maplimit[0]*71-1129
            }
        }
        this.collisions = [0,0,0,0,0,0,0,0]
        
        this.bestup = ["None",0] //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
        this.bestdown = ["None",0]
        this.bestleft = [0,"None"]
        this.bestright = [0,"None"]
        
        for (let i = 4; i < this.level_data.length; i++) //recherche des blocs sujets a une possible collision
        {
            this.temp = this.level_data[i]
            this.ttemp = this.temp[0]
            this.tempcontentmap = []
            
            if(this.temp[2]*71-this.offsetX <= px+45 & this.temp[2]*71-this.offsetX >= px-45)
            {
                if(this.bestup[0] < this.temp[3]*71-this.offsetY & py-20 > this.temp[3]*71-this.offsetY | this.bestup[0] == "None" & py-20 > this.temp[3]*71-this.offsetY)
                {
                    this.bestup = [this.temp[3]*71-this.offsetY, this.temp[2]*71-this.offsetX]
                }
                if(this.bestdown[0] > this.temp[3]*71-this.offsetY & py+20 < this.temp[3]*71-this.offsetY | this.bestdown[0] == "None" & py+20 < this.temp[3]*71-this.offsetY)
                {
                    this.bestdown = [this.temp[3]*71-this.offsetY, this.temp[2]*71-this.offsetX]
                }
            }
            if(this.temp[3]*71-this.offsetY <= py+35 & this.temp[3]*71-this.offsetY >= py-35)
            {
                if(this.bestleft[1] < this.temp[2]*71-this.offsetX & px > this.temp[2]*71-this.offsetX | this.bestleft[1] == "None" & px > this.temp[2]*71-this.offsetX)
                {
                    this.bestleft = [this.temp[3]*71-this.offsetY, this.temp[2]*71-this.offsetX]
                }
                if(this.bestright[1] > this.temp[2]*71-this.offsetX & px < this.temp[2]*71-this.offsetX | this.bestright[1] == "None" & px < this.temp[2]*71-this.offsetX)
                {
                    this.bestright = [this.temp[3]*71-this.offsetY, this.temp[2]*71-this.offsetX]
                }
            }
        }
        
        if(this.bestup[0] != "None") //detection des collisions
        {
            this.collisions.splice(4, 1, 1);
        }
        if(this.bestdown[0] != "None" | py > 610)
        {
            this.collisions.splice(5, 1, 1);
            if(py < this.bestdown[0] & py > this.bestdown[0]-71 | py > 610)
            {
                this.collisions.splice(0, 1, 1)
                if(this.offsetY_on == 0)
                {
                    this.offsetY = Math.ceil(this.offsetY/71)*71-39
                }
                else if(this.offsetY_on == -1)
                {
                    py = Math.floor((this.bestdown[0]-this.offsetY)/71)*71-70
                }
                else if(this.offsetY_on == 1)
                {
                    py = Math.round(py/71)*71-28
                }
            }
        }
        if(this.bestleft[1] != "None")
        {
            this.collisions.splice(6, 1, 1);
        }
        if(this.bestright[1] != "None")
        {
            this.collisions.splice(7, 1, 1);
        }
        
        offsetX = this.offsetX; //import des variables
        offsetY = this.offsetY;
        offsetX_on = this.offsetX_on;
        offsetY_on = this.offsetY_on;
        bestup = this.bestup;
        bestdown = this.bestdown;
        bestleft = this.bestleft;
        bestright = this.bestright
        
        
        for (let i = 4; i < this.level_data.length; i++) //Affichage de textures
        {
            this.temp = this.level_data[i]
            this.ttemp = this.temp[0]
            this.tempcontentmap = []

            switch(this.ttemp[0]) // selection des textures
            {
                case 0:
                    ctx.drawImage(testblock, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                    break
                case 1:
                    switch(this.ttemp[1])
                    {
                        case 0:    
                            ctx.drawImage(dirt, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 1:
                            ctx.drawImage(ground_up, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 2:
                            ctx.drawImage(ground_up_L, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 3:
                            ctx.drawImage(ground_up_R, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 4:    
                            ctx.drawImage(dirt_L, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 5:    
                            ctx.drawImage(dirt_R, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                        case 6:    
                            ctx.drawImage(ground_down, upscale(this.temp[2]*71-this.offsetX), upscale(this.temp[3]*71-this.offsetY), gupscale(71), gupscale(71));
                            break
                    }
            }
        }
        if(devmode == true) //Affichage debug des collisions
        {
            if(this.bestup[0] != "None")
            {
                ctx.fillStyle = "rgb(255,0,0)";
                ctx.fillRect(upscale(this.bestup[1]), upscale(this.bestup[0]+66),upscale(71),upscale(5));
            }
            if(this.bestdown[0] != "None")
            {
                ctx.fillStyle = "rgb(0,255,0)";
                ctx.fillRect(upscale(this.bestdown[1]), upscale(this.bestdown[0]),upscale(71),upscale(5));
            }
            if(this.bestleft[1] != "None")
            {
                ctx.fillStyle = "rgb(0,0,255)";
                ctx.fillRect(upscale(this.bestleft[1]+66), upscale(this.bestleft[0]),upscale(5),upscale(71));
            }
            if(this.bestright[1] != "None")
            {
                ctx.fillStyle = "rgb(255,255,0)";
                ctx.fillRect(upscale(this.bestright[1]), upscale(this.bestright[0]),upscale(5),upscale(71));
            }
        }
        return [this.collisions, px, py]
    }
}

export{MapData, level_reader_var_getter, offsetX, offsetY, offsetX_on, offsetY_on, bestup, bestdown, bestleft, bestright}