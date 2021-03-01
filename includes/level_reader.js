import {upscale, gupscale} from "./ui.js";

var ground_list = []

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";


var dirt_full = new Image(); //0
dirt_full.src = "graphics/map_content/dirt_full.png";
ground_list.push(dirt_full)
var dirt_L = new Image(); //1
dirt_L.src = "graphics/map_content/dirt_L.png";
ground_list.push(dirt_L)
var dirt_R = new Image(); //2
dirt_R.src = "graphics/map_content/dirt_R.png";
ground_list.push(dirt_R)
var dirt = new Image(); //3
dirt.src = "graphics/map_content/dirt.png";
ground_list.push(dirt)

var ground_up_full = new Image(); //4
ground_up_full.src = "graphics/map_content/ground_up_full.png";
ground_list.push(ground_up_full)
var ground_up_L = new Image(); //5
ground_up_L.src = "graphics/map_content/ground_up_L.png";
ground_list.push(ground_up_L)
var ground_up_R = new Image(); //6
ground_up_R.src = "graphics/map_content/ground_up_R.png";
ground_list.push(ground_up_R)
var ground_up = new Image(); //7
ground_up.src = "graphics/map_content/ground_up.png";
ground_list.push(ground_up)


var ground_down_full = new Image(); //8
ground_down_full.src = "graphics/map_content/ground_down_full.png";
ground_list.push(ground_down_full)
var ground_down_L = new Image(); //9
ground_down_L.src = "graphics/map_content/ground_down_L.png";
ground_list.push(ground_down_L)
var ground_down_R = new Image(); //10
ground_down_R.src = "graphics/map_content/ground_down_R.png";
ground_list.push(ground_down_R)
var ground_down = new Image() //11
ground_down.src = "graphics/map_content/ground_down.png"
ground_list.push(ground_down)

var ground_up_down_full = new Image(); //12
ground_up_down_full.src = "graphics/map_content/ground_up_down_full.png";
ground_list.push(ground_up_down_full)
var ground_up_down_L = new Image(); //13
ground_up_down_L.src = "graphics/map_content/ground_up_down_L.png";
ground_list.push(ground_up_down_L)
var ground_up_down_R = new Image(); //14
ground_up_down_R.src = "graphics/map_content/ground_up_down_R.png";
ground_list.push(ground_up_down_R)
var ground_up_down = new Image() //15
ground_up_down.src = "graphics/map_content/ground_up_down.png"
ground_list.push(ground_up_down)


function collider_up(offset_on, p, best, offset, v)
{
    var a = 0;
    if(offset_on != 0 & p-71+v <= best[1] & best[1] !== false)
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
    if(offset+v <= best[3] & best[1] !== false & offset_on == 0)
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
    if(offset_on != 0 & p+71+v >= best[1] & best[1] !== false)
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
    if(offset+v >= best[3] & offset_on == 0 & best[1] !== false)
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
    if(offset_on != 0 & p+50+v >= best[0] & best[0] !== false)
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
    if(offset+v >= best[2] & offset_on == 0 & best[0] !== false)
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
    if(offset_on != 0 & p-50+v <= best[0] & best[0] !== false)
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
    if(offset+v <= best[2] & offset_on == 0 & best[0] !== false)
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
        this.offsetY = 0;
        this.offsetX = 0;
        this.previousoffsetX = 0;
        this.previousoffsetY = 0;
        this.offsetX_on = 0;
        this.offsetY_on = 0;
        this.cache_data = 0;
        this.collisions = [0,0,0,0,0,0,0,0];
        this.stock = [];
        this.bestup = [false,false,false,false]; //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
        this.bestdown = [false,false,false,false,false]; // ordre px,py;ox,oy
        this.bestleft = [false,false,false,false];
        this.bestright = [false,false,false,false];
        this.previousoffset = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
        this.camsmoother = [0, 0];
        this.previouscamsmoother = [0,0];

    }

    start(file)
    {   

        this.maplimit = [file[0], file[1]];
        this.spawn = [file[2], file[3]];
        this.level_data_textures = file.slice(4, file.length);
        this.data_temp = []
        console.log(this.level_data_textures.length)
        for (let i = 0; i < this.maplimit[1]+1; i++)
        {
            this.data_temp.push([])
        }
        for (let i = 0; i <= this.level_data_textures.length-1; i++)
        {
            try
            {
                this.data_temp[this.level_data_textures[i][3]].push(this.level_data_textures[i])
            }
            catch
            {
                console.log("Failed to get the block "+this.level_data_textures[i])
            }
        }
        console.log(this.data_temp)
        this.level_data_textures = [0]
        var valueexist = false
        console.log(this.data_temp.length)
        for (let i = 0; i < this.data_temp.length; i++)
        {
            for (let k = 0; k < this.maplimit[0]+1; k++)
            {
                valueexist = false
                for (let l = 0; l < this.data_temp[i].length; l++)
                {
                    if(this.data_temp[i][l][2] == k)
                    {
                        valueexist = true
                        this.level_data_textures.push([this.data_temp[i][l][0], this.data_temp[i][l][1], this.data_temp[i][l][2]*71, this.data_temp[i][l][3]*71])
                        break
                    }
                }
                if(valueexist == false)
                {
                    this.level_data_textures.push(0)
                }
            }
        }
        this.level_data_textures.push(0)
        console.log(this.level_data_textures);
        this.level_data_textures_len = this.level_data_textures.length
        this.data_temp = [];
        
        
        
        
        this.offsetX = this.spawn[0]*71-576;
        var px = 576
        if(this.offsetX < 0)
        {
            this.offsetX = 0;
            this.offsetX_on = -1;
            px = this.spawn[0]*71;
        }
        else if(this.offsetX > this.maplimit[0]*71-1130)
        {
            this.offsetX = this.maplimit[0]*71-1130;
            this.offsetX_on = 1;
            px = 1130-(this.maplimit[0]-this.spawn[0])*71;
            
        }
        this.offsetY = this.spawn[1]*71-325;
        var py = 325;
        if(this.offsetY < 0)
        {
            this.offsetY = 0;
            this.offsetY_on = -1;
            py = this.spawn[1]*71;
        }
        else if(this.offsetY > this.maplimit[1]*71-609) //down
        {
            this.offsetY = this.maplimit[1]*71-609;
            this.offsetY_on = 1;
            py = 609-(this.maplimit[1]-this.spawn[1])*71;
        }
        this.previousoffset = [ [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                                [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                                [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                                [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY]]
        return [px,py]
    }

    var_update(ctx)
    {
        this.ctx = ctx
    }
    var_update2(devmode)
    {
        this.devmode = devmode
    }    

    collider(px, py, vx, vy, pause)
    {
        if(pause == false)    
        {    
            this.collisions = [0,0,0,0,0,0,0,0] //colldown,collup,collleft,collright,precolldoxn,precollup,precollleft,precollright,
            
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
            if(px > 576 & this.offsetX_on == -1 | this.offsetX_on == 0 | px < 576 & this.offsetX_on == 1) //Camera X
            { 
                if(this.offsetX >= 0 & this.offsetX <= this.maplimit[0]*71-1129) // X offset
                {
                    this.offsetX += vx
                    this.offsetX_on = 0
                    px = 576
                    if(this.offsetX < 1) //left
                    {
                        this.offsetX_on = -1
                        this.stock = collider_left(this.offsetX_on, px, this.bestleft, this.offsetX, vx)
                        this.offsetX_on = this.stock[0]
                        px = this.stock[1]
                        this.offsetX = this.stock[2]
                        vx = this.stock[3]
                        this.collisions.splice(2, 1, this.stock[4]);
                    }
                    else if(this.offsetX > this.maplimit[0]*71-1130) //right
                    {
                        this.offsetX_on = 1
                        this.stock = collider_right(this.offsetX_on, px, this.bestright, this.offsetX, vx, this.maplimit)
                        this.offsetX_on = this.stock[0];
                        px = this.stock[1];
                        this.offsetX = this.stock[2];
                        vx = this.stock[3];
                        this.collisions.splice(3, 1, this.stock[4]);
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
            if(py < 1)
            {
                py = 0;
                this.collisions.splice(1, 1, 1);
            }

            this.bestup = [false,false,false,false] //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
            this.bestdown = [false,false,false,false,false] // ordre px,py;ox,oy
            this.bestleft = [false,false,false,false]
            this.bestright = [false,false,false,false]

            this.cache_data = [this.level_data_textures_len-1, py+65, py-65, px-49, px+49]
            for (let i = Math.round((py+this.offsetY)/71-1)*(this.maplimit[0]+1); i < Math.round((py+this.offsetY)/71+2)*(this.maplimit[0]+1); i++) //Collisions horizontales
            {
                if(i > 0 & i < this.cache_data[0])
                {
                    this.maxi = i
                }
                else if(i < 0)
                {
                    this.maxi = 0;
                }
                else
                {
                    this.maxi = this.cache_data[0];
                }
                if(this.level_data_textures[this.maxi] != 0 & this.level_data_textures[this.maxi][1] == true)
                {
                    if(this.level_data_textures[this.maxi][3]-this.offsetY <= this.cache_data[1] & this.level_data_textures[this.maxi][3]-this.offsetY >= this.cache_data[2]) //x
                    {
                        if(this.bestleft[0] < this.level_data_textures[this.maxi][2]-this.offsetX & this.cache_data[3] > this.level_data_textures[this.maxi][2]-this.offsetX |
                            this.bestleft[0] == false & this.cache_data[3] > this.level_data_textures[this.maxi][2]-this.offsetX) //left
                        {
                            this.collisions.splice(6, 1, 1);
                            this.bestleft = [this.level_data_textures[this.maxi][2]-this.offsetX, this.level_data_textures[this.maxi][3]-this.offsetY,
                                            this.level_data_textures[this.maxi][2]-526, this.level_data_textures[this.maxi][3]-py]
                        }
                        if(this.bestright[0] > this.level_data_textures[this.maxi][2]-this.offsetX & this.cache_data[4] < this.level_data_textures[this.maxi][2]-this.offsetX |
                            this.bestright[0] == false & this.cache_data[4] < this.level_data_textures[this.maxi][2]-this.offsetX) //right
                        {
                            this.collisions.splice(7, 1, 1);
                            this.bestright = [this.level_data_textures[this.maxi][2]-this.offsetX, this.level_data_textures[this.maxi][3]-this.offsetY,
                                            this.level_data_textures[this.maxi][2]-626, this.level_data_textures[this.maxi][3]-py]
                        }
                    }
                }
            }
            
            this.cache_data = [this.level_data_textures_len-1, this.maplimit[0]+1, Math.round((px+this.offsetX)/71+0.8), Math.round((px+this.offsetX)/71+2.2), this.offsetX+49, this.offsetX-49]
            for (let i = 0; i < this.maplimit[1]+1; i++) //Collisions verticales
            {
                for (let k = this.cache_data[2]+this.cache_data[1]*i; k < this.cache_data[3]+this.cache_data[1]*i; k++)
                {  
                    if(k > 0 & k < this.cache_data[0])
                    {
                        this.maxk = k
                    }
                    else if(k < 0)
                    {
                        this.maxk = 0;
                    }
                    else
                    {
                        this.maxk = this.cache_data[0];
                    }
                    if(this.level_data_textures[this.maxk] != 0 & this.level_data_textures[this.maxk][1] == true)
                    {
                        if(this.level_data_textures[this.maxk][2]-this.cache_data[4] <= px & this.level_data_textures[this.maxk][2]-this.cache_data[5] >= px) //y 
                        {
                            if(this.bestdown[1] > this.level_data_textures[this.maxk][3]-this.offsetY & py < this.level_data_textures[this.maxk][3]-this.offsetY |
                                this.bestdown[1] == false & py < this.level_data_textures[this.maxk][3]-this.offsetY) //down
                            {
                                this.collisions.splice(4, 1, 1);
                                this.bestdown = [this.level_data_textures[this.maxk][2]-this.offsetX, this.level_data_textures[this.maxk][3]-this.offsetY,
                                                this.level_data_textures[this.maxk][2], this.level_data_textures[this.maxk][3]-395, (this.level_data_textures[this.maxk][3])-this.offsetY-py-71]
                            }
                            if(this.bestup[1] < this.level_data_textures[this.maxk][3]-this.offsetY & py > this.level_data_textures[this.maxk][3]-this.offsetY |
                                this.bestup[1] == false & py > this.level_data_textures[this.maxk][3]-this.offsetY) //up
                            {
                                this.collisions.splice(5, 1, 1);
                                this.bestup = [this.level_data_textures[this.maxk][2]-this.offsetX, this.level_data_textures[this.maxk][3]-this.offsetY,
                                                this.level_data_textures[this.maxk][2], this.level_data_textures[this.maxk][3]-253]
                            } 
                        }
                    }
                }
            }
        }
        return [px, py]
    }

    display(px, py, pause, offsetX, offsetY, smoothX, smoothY)
    {
        if(pause == false)    
        {
            this.offsetsmoothX = Math.round(offsetX)-smoothX;
            this.offsetsmoothY = Math.round(offsetY)-smoothY;
            this.cache_data = [Math.round(this.offsetsmoothX/71), this.maplimit[0]+1, Math.round(this.offsetsmoothY/71), 0, gupscale(71)]
        }
        this.ctx.font = upscale(15)+'px arial';
        this.ctx.fillStyle = "rgb(255,255,255)";
        for (let i = Math.round(this.offsetsmoothY/71)-1; i < Math.round(this.offsetsmoothY/71)+10; i++) //Affichage des textures
        {
            if(i <= this.maplimit[1])
            {
                this.maxi = i;
            }
            else
            {
                this.maxi = this.maplimit[1];
            }
            this.cache_data[3] = upscale(this.maxi*71-this.offsetsmoothY)
            for (let k = this.cache_data[0]+(this.cache_data[1]*this.maxi)-1; k < Math.round(this.offsetsmoothX/71)+(this.cache_data[1]*this.maxi)+19; k++)
            {
                if(k > 0 & k < this.level_data_textures_len-1)
                {
                    this.maxk = k
                }
                else if(k < 0)
                {
                    this.maxk = 0;
                }
                else
                {
                    this.maxk = this.level_data_textures_len-1;
                }
                if(this.level_data_textures[this.maxk] != 0)
                {
                    switch(this.level_data_textures[k][0][0]) // selection des textures
                    {
                        case 0:
                            this.ctx.drawImage(testblock, upscale(this.level_data_textures[k][2]-this.offsetsmoothX), this.cache_data[3], this.cache_data[4], this.cache_data[4]); //testblock
                            break
                        case 1:
                            this.ctx.drawImage(ground_list[this.level_data_textures[k][0][1]], upscale(this.level_data_textures[k][2]-this.offsetsmoothX), this.cache_data[3], this.cache_data[4], this.cache_data[4])
                            break
                    }
                    if(this.devmode == true) //Affichage position de chaque block
                    {
                        this.ctx.fillText("["+this.level_data_textures[k][2]/71+" : "+this.level_data_textures[k][3]/71+"]", upscale(this.level_data_textures[k][2]-this.offsetsmoothX+5), this.cache_data[3]+20);
                    }                   
                }
            }
            
        }


        if(this.devmode == true) //Affichage debug des collisions
        {
            if(this.collisions[5] == 1)
            {
                this.ctx.fillStyle = "rgb(255,0,0)";
                this.ctx.fillRect(upscale(this.bestup[0]+smoothX), upscale(this.bestup[1]+smoothY+66),this.cache_data[4],upscale(5));
            }

            if(this.collisions[4] == 1)
            {
                this.ctx.fillStyle = "rgb(0,255,0)";
                this.ctx.fillRect(upscale(this.bestdown[0]+smoothX), upscale(this.bestdown[1]+smoothY),this.cache_data[4],upscale(5));
            }

            if(this.collisions[6] == 1) //Left blue
            {
                this.ctx.fillStyle = "rgb(0,0,255)";
                this.ctx.fillRect(upscale(this.bestleft[0]+smoothX+66), upscale(this.bestleft[1]+smoothY),upscale(5),this.cache_data[4]);
            }

            if(this.collisions[7] == 1) //Right yellow
            {
                this.ctx.fillStyle = "rgb(255,255,0)";
                this.ctx.fillRect(upscale(this.bestright[0]+smoothX), upscale(this.bestright[1]+smoothY),upscale(5),this.cache_data[4]);
            }
            this.ctx.lineWidth="2"
            this.ctx.strokeStyle = "rgb(0,0,0)";
            this.ctx.strokeRect(upscale(px+smoothX), upscale(py+smoothY),upscale(71),upscale(71));
            this.ctx.strokeStyle = "rgb(150,150,150)";
            this.ctx.strokeRect(upscale(px+smoothX+22), upscale(py+smoothY),upscale(28),upscale(71));
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillText("["+Math.round((offsetX+px)/71)+" : "+Math.round((offsetY+py)/71)+"]", upscale(px+smoothX+50), upscale(py+smoothY+20));
            this.ctx.strokeStyle = "rgb(0,0,0)";
            this.ctx.lineWidth="1"
            this.ctx.strokeText("["+Math.round((offsetX+px)/71)+" : "+Math.round((offsetY+py)/71)+"]", upscale(px+smoothX+50), upscale(py+smoothY+20));
            
        }
    }

    fcamsmoother(camsmootherenable, pause)
    {
        if(pause == false)    
        {     
            if(camsmootherenable == true) //smooth the camera
            {    
                this.previouscamsmoother = this.camsmoother
                this.camsmoother = [Math.round(this.offsetX-((this.previousoffset[0][0]+this.previousoffset[1][0]+this.previousoffset[2][0]+this.previousoffset[3][0]+
                                                                this.previousoffset[4][0]+this.previousoffset[5][0]+this.previousoffset[6][0]+this.previousoffset[7][0])/8))
                                    ,Math.round(this.offsetY-((this.previousoffset[0][1]+this.previousoffset[1][1]+this.previousoffset[2][1]+this.previousoffset[3][1]+
                                                                this.previousoffset[4][1]+this.previousoffset[5][1]+this.previousoffset[6][1]+this.previousoffset[7][1]+
                                                                this.previousoffset[8][1]+this.previousoffset[9][1]+this.previousoffset[10][1]+this.previousoffset[11][1]+
                                                                this.previousoffset[12][1]+this.previousoffset[13][1]+this.previousoffset[14][1]+this.previousoffset[15][1])/16))]
                                    
                this.previousoffset.splice(15, 1, this.previousoffset[14]);
                this.previousoffset.splice(14, 1, this.previousoffset[13]);
                this.previousoffset.splice(13, 1, this.previousoffset[12]);
                this.previousoffset.splice(12, 1, this.previousoffset[11]);
                this.previousoffset.splice(11, 1, this.previousoffset[10]);
                this.previousoffset.splice(10, 1, this.previousoffset[9]);
                this.previousoffset.splice(9, 1, this.previousoffset[8]);
                this.previousoffset.splice(8, 1, this.previousoffset[7]);
                this.previousoffset.splice(7, 1, this.previousoffset[6]);
                this.previousoffset.splice(6, 1, this.previousoffset[5]);
                this.previousoffset.splice(5, 1, this.previousoffset[4]);
                this.previousoffset.splice(4, 1, this.previousoffset[3]);
                this.previousoffset.splice(3, 1, this.previousoffset[2]);
                this.previousoffset.splice(2, 1, this.previousoffset[1]);
                this.previousoffset.splice(1, 1, this.previousoffset[0]);
                this.previousoffset.splice(0, 1, [this.offsetX, this.offsetY]);
            }
            else
            {
                this.previouscamsmoother = [0,0]
                this.camsmoother = [0, 0]
            }
        }
    }    
}

export{MapData}