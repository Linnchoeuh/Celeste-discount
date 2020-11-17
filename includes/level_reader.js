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

function collider_up(offset_on, p, best, offset, v)
{
    var a = 0;
    if(offset_on != 0 & p-71+v <= best[1] & best[1] != "None")
    {
        a = 1;
        p = best[1]+71;
        if(p < 324 & offset_on == 1)
        {
            if(best[3] > 0)
            {
                offset_on = 0;
                offset = best[3];
                v = 0;
                p = 324;
            }
            if(best[3] <= 0)
            {
                offset = 0;
                p = 324-best[3];
                v = 0;
                offset_on = -1; 
            }
        }
    }
    if(offset+v <= best[3] & best[1] != "None" & offset_on == 0)
    {
        a = 1;
        offset = best[3]
        v = 0;
        p = 324;
    }
    return [offset_on, p, offset, v, a]
}

function collider_down(offset_on, p, best, offset, v, maplimit)
{
    var a = 0
    if(offset_on != 0 & p+71+v >= best[1] & best[1] != "None")
    {
        a = 1
        p = best[1]-71;
        if(p > 324 & offset_on == -1)
        {
            offset_on = 0;
            if(p >= best[3])
            {
                offset = best[3]
                v = 0;
                p = 324;
            }
        }
    }
    if(offset+v >= best[3] & offset_on == 0 & best[1] != "None")
    {
        a = 1
        if(best[3] > maplimit[1]*71-604)
        {
            offset = maplimit[1]*71-604
            p = 324+(best[3]-(maplimit[1]*71-604))
            offset_on = 1;
        }
        else
        {    
            offset = best[3]
            v = 0;
        }
    } 
    return [offset_on, p, offset, v, a]
}

function collider_right(offset_on, p, best, offset, v, maplimit)
{
    var a = 0
    if(offset_on != 0 & p+50+v >= best[0] & best[0] != "None")
    {
        a = 1
        p = best[0]-50;
        if(p > 575 & offset_on == -1)
        {
            offset_on = 0;
            if(p >= best[2])
            {
                offset = best[2]
                v = 0;
                p = 576;
            }
        }
    }
    if(offset+v >= best[2] & offset_on == 0 & best[0] != "None")
    {
        a = 1
        if(best[2] > maplimit[0]*71-1129)
        {
            offset = maplimit[0]*71-1129
            p = 576+(best[2]-(maplimit[0]*71-1129))
            offset_on = 1;
        }
        else
        {    
            offset = best[2]
            v = 0;
        }
    } 
    return [offset_on, p, offset, v, a]
}

function collider_left(offset_on, p, best, offset, v)
{
    var a = 0;
    if(offset_on != 0 & p-50+v <= best[0] & best[0] != "None")
    {
        a = 1;
        p = best[0]+50;
        if(p < 575 & offset_on == 1)
        {
            if(best[2] > 0)
            {
                offset_on = 0;
                offset = best[2];
                v = 0;
                p = 576;
            }
            if(best[2] <= 0)
            {
                offset = 0
                p = 576-best[2];
                v = 0;
                offset_on = -1;
            }
        }
    }
    if(offset+v <= best[2] & offset_on == 0 & best[0] != "None")
    {
        a = 1;
        offset = best[2]
        v = 0;
        p = 576;
    }
    return [offset_on, p, offset, v, a]
}




class MapData
{   
    constructor()
    {
        this.maplimit = [0, 0];
        this.spawn = [0, 0];
        this.level_data = []
        this.temp = 0
        this.ttemp = 0
        this.tempcontentmap = []
        this.offsetY = 0;
        this.offsetX = 0;
        this.offsetX_on = 0
        this.offsetY_on = 0
        this.collisions = [0,0,0,0,0,0,0,0]
        this.stock = []
        this.bestup = ["None","None","None","None"]
        this.bestupminus = ["None","None","None","None"]
        this.bestupplus = ["None","None","None","None"]
        this.bestdown = ["None","None","None","None"] 
        this.bestdownminus = ["None","None","None","None"]
        this.bestdownplus = ["None","None","None","None"]
        this.bestleft = ["None","None","None","None"]
        this.bestright = ["None","None","None","None"]
    }

    start(file)
    {
        this.maplimit = [file[0], file[1]];
        this.spawn = [file[2], file[3]];
        this.level_data = file;
        this.offsetX = file[2]*71-576;
        var px = 576
        if(this.offsetX < 0)
        {
            this.offsetX = 0;
            this.offsetX_on = -1;
            px = file[2]*71;
        }
        else if(this.offsetX > this.maplimit[0]*71-1130)
        {
            this.offsetX = this.maplimit[0]*71-1130;
            this.offsetX_on = 1;
            px = 1130-(this.maplimit[0]-file[2])*71;
            
        }
        this.offsetY = file[3]*71-325;
        var py = 325;
        if(this.offsetY < 0)
        {
            this.offsetY = 0;
            this.offsetY_on = -1;
            py = file[3]*71;
        }
        else if(this.offsetY > this.maplimit[1]*71-609) //down
        {
            this.offsetY = this.maplimit[1]*71-609;
            this.offsetY_on = 1;
            py = 609-(this.maplimit[1]-file[3])*71;
        }
        return [px,py]
    }

    

    displayer(px, py, vx, vy)
    {
        this.collisions = [0,0,0,0,0,0,0,0,0,0] //colldoxn,collup,collleft,collright,precolldoxn,precollup,precollleft,precollright,
        
        //DETECTION DES COLLISIONS
        // up collisions
        this.stock = collider_up(this.offsetY_on, py, this.bestup, this.offsetY, vy, this.maplimit)
        this.offsetY_on = this.stock[0];
        py = this.stock[1];
        this.offsetY = this.stock[2];
        vy = this.stock[3];
        this.collisions.splice(1, 1, this.stock[4]);
        
        // down collisions
        this.stock = collider_down(this.offsetY_on, py, this.bestdown, this.offsetY, vy, this.maplimit)
        this.offsetY_on = this.stock[0];
        py = this.stock[1];
        this.offsetY = this.stock[2];
        vy = this.stock[3];
        this.collisions.splice(0, 1, this.stock[4]);
        
        // left collisions
        this.stock = collider_left(this.offsetX_on, px, this.bestleft, this.offsetX, vx)
        this.offsetX_on = this.stock[0]
        px = this.stock[1]
        this.offsetX = this.stock[2]
        vx = this.stock[3]
        this.collisions.splice(2, 1, this.stock[4]);
        
        // right collisions
        this.stock = collider_right(this.offsetX_on, px, this.bestright, this.offsetX, vx, this.maplimit)
        this.offsetX_on = this.stock[0];
        px = this.stock[1];
        this.offsetX = this.stock[2];
        vx = this.stock[3];
        this.collisions.splice(3, 1, this.stock[4]);

        if(this.collisions[0] == 1)
        {
            this.offsetX = Math.round(this.offsetX)
        }
        if(px > 575 & this.offsetX_on == -1 | this.offsetX_on == 0 | px < 575 & this.offsetX_on == 1) //Camera X
        { 
            if(this.offsetX >= 0 & this.offsetX <= this.maplimit[0]*71-1129) // X offset
            {
                this.offsetX += vx
                this.offsetX_on = 0
                px = 576
                if(this.offsetX < 1) //left
                {
                    this.offsetX_on = -1
                    px = 576+vx
                }
                else if(this.offsetX > this.maplimit[0]*71-1130) //right
                {
                    this.offsetX_on = 1
                    px = 576+vx
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

        if(py > 324 & this.offsetY_on == -1 | this.offsetY_on == 0 | py < 324 & this.offsetY_on == 1) //Camera Y
        {    
            if(this.offsetY >= 0 & this.offsetY <= this.maplimit[1]*71-604) // Y offset
            {
                this.offsetY += vy
                this.offsetY_on = 0
                py = 324
                if(this.offsetY < 1) //up
                {
                    this.offsetY_on = -1
                    py = 324+vy
                }
                else if(this.offsetY > this.maplimit[1]*71-603) //down
                {
                    this.offsetY_on = 1
                    py = 324+vy
                }
            }
            if(this.offsetY < 0) //replacer camera si elle sort du cadre
            {
                this.offsetY = 0
            }
            else if(this.offsetY > this.maplimit[1]*71-604)
            {
                this.offsetY = this.maplimit[1]*71-604
            }
        }
        
        // block the player moving when he reach a border of the canvas
        if(px < -20)
        {
            px = -21;
            this.collisions.splice(2, 1, 1);
        }
        if(px > 1147)
        {
            px = 1148;
            this.collisions.splice(3, 1, 1);
        }
        if(py > 603)
        {
            py = 604;
            this.collisions.splice(0, 1, 1);
        }
        if(py < 0)
        {
            py = 0;
            this.collisions.splice(1, 1, 1);
        }

        this.bestup = ["None","None","None","None"] //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision 
        this.bestupminus = ["None","None","None","None"] // ordre px,py;ox,oy
        this.bestupplus = ["None","None","None","None"]
        this.bestdown = ["None","None","None","None"] 
        this.bestdownminus = ["None","None","None","None"]
        this.bestdownplus = ["None","None","None","None"]
        this.bestleft = ["None","None","None","None"]
        this.bestright = ["None","None","None","None"]

        for (let i = 4; i < this.level_data.length; i++) //recherche des blocs sujets a une possible collision
        {
            this.temp = this.level_data[i]
            this.ttemp = this.temp[0]
            this.tempcontentmap = []
            
            if(this.temp[2]*71-this.offsetX-49 <= px & this.temp[2]*71-this.offsetX+49 >= px) //y 
            {
                if(this.bestdown[1] > this.temp[3]*71-this.offsetY & py+35 < this.temp[3]*71-this.offsetY | this.bestdown[1] == "None" & py+35 < this.temp[3]*71-this.offsetY) //down
                {
                    this.collisions.splice(4, 1, 1);
                    this.bestdown = [this.temp[2]*71-this.offsetX, this.temp[3]*71-this.offsetY, this.temp[2]*71, this.temp[3]*71-395, (this.temp[3]*71)-this.offsetY-py-71]
                }
                if(this.bestup[1] < this.temp[3]*71-this.offsetY & py-35 > this.temp[3]*71-this.offsetY | this.bestup[1] == "None" & py-35 > this.temp[3]*71-this.offsetY) //up
                {
                    this.collisions.splice(5, 1, 1);
                    this.bestup = [this.temp[2]*71-this.offsetX, this.temp[3]*71-this.offsetY, this.temp[2]*71, this.temp[3]*71-253]
                } 
            }
            if(this.temp[3]*71-this.offsetY <= py+70 & this.temp[3]*71-this.offsetY >= py-70) //x
            {
                if(this.bestleft[0] < this.temp[2]*71-this.offsetX & px-49 > this.temp[2]*71-this.offsetX | this.bestleft[0] == "None" & px-49 > this.temp[2]*71-this.offsetX) //left
                {
                    this.collisions.splice(6, 1, 1);
                    this.bestleft = [this.temp[2]*71-this.offsetX, this.temp[3]*71-this.offsetY, this.temp[2]*71-526, this.temp[3]*71-py]
                }
                if(this.bestright[0] > this.temp[2]*71-this.offsetX & px+49 < this.temp[2]*71-this.offsetX | this.bestright[0] == "None" & px+49 < this.temp[2]*71-this.offsetX) //right
                {
                    this.collisions.splice(7, 1, 1);
                    this.bestright = [this.temp[2]*71-this.offsetX, this.temp[3]*71-this.offsetY, this.temp[2]*71-626, this.temp[3]*71-py]
                }
            }
        }
        // console.log(this.bestdownplus)
        
        // offsetX = this.offsetX; //import des variables
        // offsetY = this.offsetY;
        // offsetX_on = this.offsetX_on;
        // offsetY_on = this.offsetY_on;
        // bestup = this.bestup;
        // bestdown = this.bestdown;
        // bestleft = this.bestleft;
        // bestright = this.bestright
        
        
        
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
                ctx.fillRect(upscale(this.bestup[0]), upscale(this.bestup[1]+66),upscale(71),upscale(5));
            }
            if(this.bestupplus[0] != "None")
            {
                ctx.fillStyle = "rgb(255,150,150)";
                ctx.fillRect(upscale(this.bestupplus[0]), upscale(this.bestupplus[1]+66),upscale(71),upscale(5));
            }
            
            if(this.bestdown[0] != "None")
            {
                ctx.fillStyle = "rgb(0,255,0)";
                ctx.fillRect(upscale(this.bestdown[0]), upscale(this.bestdown[1]),upscale(71),upscale(5));
            }
            if(this.bestdownplus[0] != "None")
            {
                ctx.fillStyle = "rgb(150,255,150)";
                ctx.fillRect(upscale(this.bestdownplus[0]), upscale(this.bestdownplus[1]),upscale(71),upscale(5));
            }
            
            if(this.collisions[6] == 1) //Left blue
            {
                ctx.fillStyle = "rgb(0,0,255)";
                ctx.fillRect(upscale(this.bestleft[0]+66), upscale(this.bestleft[1]),upscale(5),upscale(71));
            }
            
            if(this.collisions[7] == 1) //Right yellow
            {
                ctx.fillStyle = "rgb(255,255,0)";
                ctx.fillRect(upscale(this.bestright[0]), upscale(this.bestright[1]),upscale(5),upscale(71));
            }
            ctx.lineWidth="2"
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.strokeRect(upscale(px), upscale(py),upscale(71),upscale(71));
            ctx.strokeStyle = "rgb(150,150,150)";
            ctx.strokeRect(upscale(px+22), upscale(py),upscale(28),upscale(71));
            ctx.lineWidth="1"
        }
        return [this.collisions, px, py]
    }
}

export{MapData, level_reader_var_getter}