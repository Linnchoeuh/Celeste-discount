import {ctx} from "../main.js";
import {Tools} from "../main.js";
import {Timer_Log} from "./tools.js";

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";


var a = 0;

function collider_up(offset_on, p, best, offset, v)
{
    a = 0;
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
        offset = best[3];
        v = 0;
        p = 324;
    }
    return [offset_on, p, offset, v, a];
}

function collider_down(offset_on, p, best, offset, v, maplimit)
{
    a = 0;
    if(offset_on != 0 & p+71+v >= best[1] & best[1] !== false)
    {
        a = 1;
        p = best[1]-71;
        if(p > 324 & offset_on == -1)
        {
            offset_on = 0;
            if(p >= best[3])
            {
                offset = best[3];
                v = 0;
                p = 324;
            }
        }
    }
    if(offset+v >= best[3] & offset_on == 0 & best[1] !== false)
    {
        a = 1;
        if(best[3] > maplimit[1]*71-604)
        {
            offset = maplimit[1]*71-604;
            p = 324+(best[3]-(maplimit[1]*71-604));
            offset_on = 1;
        }
        else
        {    
            offset = best[3];
            v = 0;
        }
    } 
    return [offset_on, p, offset, v, a];
}

function collider_right(offset_on, p, best, offset, v, maplimit)
{
    a = 0;
    if(offset_on != 0 & p+50+v >= best[0] & best[0] !== false)
    {
        a = 1;
        p = best[0]-50;
        if(p > 575 & offset_on == -1)
        {
            offset_on = 0;
            if(p >= best[2])
            {
                offset = best[2];
                v = 0;
                p = 576;
            }
        }
    }
    if(offset+v >= best[2] & offset_on == 0 & best[0] !== false)
    {
        a = 1;
        if(best[2] > maplimit[0]*71-1129)
        {
            offset = maplimit[0]*71-1129;
            p = 576+(best[2]-(maplimit[0]*71-1129));
            offset_on = 1;
        }
        else
        {    
            offset = best[2];
            v = 0;
        }
    } 
    return [offset_on, p, offset, v, a];
}

function collider_left(offset_on, p, best, offset, v)
{
    a = 0;
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
                offset = 0;
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
    return [offset_on, p, offset, v, a];
}


class Map_Data
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

        this.maxi = 0; //Potentiellement suprimé bientôt
        this.i_define = 0;

        this.block_map = [0]
        this.block_map_snap_position = [0]
        this.block_index = [0]
        this.index_value = 0;
        this.block_map_type_texture = [0]
        this.copy_file = [0];
        this.all_block_map_count = 0;
        this.operation_count = 0;

        //Camera smoother
        this.player_vect_x = 0;
        this.player_vect_y = 0;

        //Optimisation
        this.pre_block_scale = 24;
        this.pre_block_scaling = 71;
        this.pre_block_scaling_unround = 71;
        this.pre_snap_offset_smooth_X = 0;
        this.pre_snap_offset_smooth_Y = 0;
        this.pre_snap_offset_smooth_X_minus_05 = 0;
        // this.pre_snap_offset_smooth_Y_minus_05 = 0;
        this.pre_vertical_position_line_block_displayed = 0;


        this.stock = [];
        this.bestup = [false,false,false,false]; //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
        this.bestdown = [false,false,false,false,false]; // ordre px,py;ox,oy
        this.bestleft = [false,false,false,false];
        this.bestright = [false,false,false,false];
        this.previousoffset = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
        this.camsmoother = [0, 0];
        this.previouscamsmoother = [0,0];
        this.level_data_textures = [];
        this.data_temp = [];
        this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png");
        this.testblock = Tools.textureLoader("graphics/map_content/test_block.png");
        this.CollisionsLoop = new Timer_Log();
        this.GraphicsLoop = new Timer_Log();
        this.CamSmootherLoop = new Timer_Log();
        this.collisions_loop_log = 0;
        this.graphics_loop_log = 0;
        this.cam_smoother_loop_log = 0;
    }

    start(file, editedlevelid)
    {   
        this.copy_file = file;
        this.collisions = [1,1,1,1,1,1,1,1];
        this.maplimit = [file[3][editedlevelid][0][1], file[3][editedlevelid][0][2]];
        this.spawn = [file[3][editedlevelid][0][3], file[3][editedlevelid][0][4]];
        console.log(file[3][editedlevelid][1])
        this.level_data_textures = file[3][editedlevelid][1]

        this.data_temp = [];
        for (let i = 0; i < this.maplimit[1]+1; i++)
        {
            this.data_temp.push([]);
        }
        for (let i = 0; i <= this.level_data_textures.length-1; i++)
        {
            try
            {
                this.data_temp[this.level_data_textures[i][1]].push(this.level_data_textures[i]);
            }
            catch
            {
                console.log("Failed to get the block "+this.level_data_textures[i]);
            }
        }
        this.level_data_textures = [0];
        var valueexist = false;
        for (let i = 0; i < this.data_temp.length; i++)
        {
            for (let k = 0; k < this.maplimit[0]+1; k++)
            {
                valueexist = false;
                for (let l = 0; l < this.data_temp[i].length; l++)
                {
                    if(this.data_temp[i][l][0] == k)
                    {
                        valueexist = true;
                        this.level_data_textures.push([this.data_temp[i][l][0]*71, this.data_temp[i][l][1]*71, this.data_temp[i][l][2], this.data_temp[i][l][3]]);
                        break;
                    }
                }
                if(valueexist == false)
                {
                    this.level_data_textures.push(0);
                }
            }
        }
        this.level_data_textures.push(0);
        console.log(this.level_data_textures);
        this.level_data_textures_len = this.level_data_textures.length;
        this.data_temp = [];
        
        
        
        
        this.offsetX = this.spawn[0]*71-576;
        var px = 576;
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
        
        this.previousoffset = [[this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                               [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                               [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY],
                               [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY], [this.offsetX, this.offsetY]];
        
        // console.log(px,py);

        this.block_map = [];
        this.block_map_type_texture = [];
        this.block_index = [];
        this.block_map_snap_position = [];
        for(let i = 0; i < this.maplimit[1]+1; i++)
        {
            this.block_map_type_texture.push({});
            this.block_map.push([]);
            this.block_index.push([]);
            this.block_map_snap_position.push([]);
        }
        this.all_block_map_count = this.copy_file[3][editedlevelid][1].length;
        for(let i = 0; i < this.all_block_map_count; i++)
        {
            this.block_map[this.copy_file[3][editedlevelid][1][i][1]].push(this.copy_file[3][editedlevelid][1][i][0]*this.pre_block_scaling);
            this.block_map_snap_position[this.copy_file[3][editedlevelid][1][i][1]].push(this.copy_file[3][editedlevelid][1][i][0]);
            this.block_map_type_texture[this.copy_file[3][editedlevelid][1][i][1]][this.copy_file[3][editedlevelid][1][i][0]] = this.copy_file[3][editedlevelid][1][i][2];
            this.block_map[this.copy_file[3][editedlevelid][1][i][1]].sort(function(a, b) {return a - b;});
            this.block_map_snap_position[this.copy_file[3][editedlevelid][1][i][1]].sort(function(a, b) {return a - b;});
        }
        
        for(let i = 0; i < this.maplimit[1]+1; i++)
        {
            this.index_value = 0;
            for(let k = 0; k < this.maplimit[0]+1; k++)
            {

                this.block_index[i].push(this.index_value)
                if(k >= this.block_map[i][this.index_value]/71 && this.index_value < this.block_map[i].length-1)
                {
                    this.index_value++;
                }
            }
        }
        for(let i = 0; i < this.block_map_type_texture.length; i++)
        {
            this.cache_data = [];
            
            for(let k = 0; k < this.block_map_snap_position[i].length; k++)
            {
                this.cache_data.push(this.block_map_type_texture[i][this.block_map_snap_position[i][k]]);
            }
            this.block_map_type_texture[i] = this.cache_data
        }
        console.log(this.block_map)
        console.log(this.block_map_snap_position)
        console.log(this.block_index)
        console.log(this.block_map_type_texture)
        

        return [px,py];
    }

    collider(px, py, vx, vy, pause)
    {
        this.CollisionsLoop.startTime();
        if(pause == false)    
        {    
            
            this.collisions = [0,0,0,0,0,0,0,0]; //colldown,collup,collleft,collright,precolldoxn,precollup,precollleft,precollright,
            
            //DETECTION DES COLLISIONS
            // up collisions
            this.stock = collider_up(this.offsetY_on, py, this.bestup, this.offsetY, vy, this.maplimit);
            this.offsetY_on = this.stock[0];
            py = this.stock[1];
            this.offsetY = this.stock[2];
            vy = this.stock[3];
            this.collisions.splice(1, 1, this.stock[4]);
            
            // down collisions
            this.stock = collider_down(this.offsetY_on, py, this.bestdown, this.offsetY, vy, this.maplimit);
            this.offsetY_on = this.stock[0];
            py = this.stock[1];
            this.offsetY = this.stock[2];
            vy = this.stock[3];
            this.collisions.splice(0, 1, this.stock[4]);
            
            // left collisions
            this.stock = collider_left(this.offsetX_on, px, this.bestleft, this.offsetX, vx);
            this.offsetX_on = this.stock[0];
            px = this.stock[1];
            this.offsetX = this.stock[2];
            vx = this.stock[3];
            this.collisions.splice(2, 1, this.stock[4]);
            
            // right collisions
            this.stock = collider_right(this.offsetX_on, px, this.bestright, this.offsetX, vx, this.maplimit);
            this.offsetX_on = this.stock[0];
            px = this.stock[1];
            this.offsetX = this.stock[2];
            vx = this.stock[3];
            this.collisions.splice(3, 1, this.stock[4]);

            if(this.collisions[0] == 1)
            {
                this.offsetX = Math.round(this.offsetX);
            }
            if(px > 576 & this.offsetX_on == -1 | this.offsetX_on == 0 | px < 576 & this.offsetX_on == 1) //Camera X
            { 
                if(this.offsetX >= 0 & this.offsetX <= this.maplimit[0]*71-1129) // X offset
                {
                    this.offsetX += vx;
                    this.offsetX_on = 0;
                    px = 576;
                    if(this.offsetX < 1) //left
                    {
                        this.offsetX_on = -1;
                        this.stock = collider_left(this.offsetX_on, px, this.bestleft, this.offsetX, vx);
                        this.offsetX_on = this.stock[0];
                        px = this.stock[1];
                        this.offsetX = this.stock[2];
                        vx = this.stock[3];
                        this.collisions.splice(2, 1, this.stock[4]);
                    }
                    else if(this.offsetX > this.maplimit[0]*71-1130) //right
                    {
                        this.offsetX_on = 1
                        this.stock = collider_right(this.offsetX_on, px, this.bestright, this.offsetX, vx, this.maplimit);
                        this.offsetX_on = this.stock[0];
                        px = this.stock[1];
                        this.offsetX = this.stock[2];
                        vx = this.stock[3];
                        this.collisions.splice(3, 1, this.stock[4]);
                    }
                }
                if(this.offsetX < 0) //replacer camera si elle sort du cadre
                {
                    this.offsetX = 0;
                }
                else if(this.offsetX > this.maplimit[0]*71-1129)
                {
                    this.offsetX = this.maplimit[0]*71-1129;
                }
            }

            if(py > 324 & this.offsetY_on == -1 | this.offsetY_on == 0 | py < 324 & this.offsetY_on == 1) //Camera Y
            {    
                if(this.offsetY >= 0 & this.offsetY <= this.maplimit[1]*71-604) // Y offset
                {
                    this.offsetY += vy;
                    this.offsetY_on = 0;
                    py = 324;
                    if(this.offsetY < 1) //up
                    {
                        this.offsetY_on = -1;
                        py = 324+vy;
                    }
                    else if(this.offsetY > this.maplimit[1]*71-603) //down
                    {
                        this.offsetY_on = 1;
                        py = 324+vy;
                    }
                }
                if(this.offsetY < 0) //replacer camera si elle sort du cadre
                {
                    this.offsetY = 0;
                }
                else if(this.offsetY > this.maplimit[1]*71-604)
                {
                    this.offsetY = this.maplimit[1]*71-604;
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

            this.bestup = [false,false,false,false]; //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
            this.bestdown = [false,false,false,false,false]; // ordre px,py;ox,oy
            this.bestleft = [false,false,false,false];
            this.bestright = [false,false,false,false];

            this.cache_data = [this.level_data_textures_len-1, py+65, py-65, px-49, px+49];
            for (let i = Math.round((py+this.offsetY)/71-1)*(this.maplimit[0]+1); i < Math.round((py+this.offsetY)/71+2)*(this.maplimit[0]+1); i++) //Collisions horizontales
            {
                if(i > 0 & i < this.cache_data[0])
                {
                    this.maxi = i;
                }
                else if(i < 0)
                {
                    this.maxi = 0;
                }
                else
                {
                    this.maxi = this.cache_data[0];
                }
                
                if(this.level_data_textures[this.maxi] != 0) //condition qui vérifie s'il y a bien un bloc
                {
                    if(this.level_data_textures[this.maxi][3][2] === 1 | this.level_data_textures[this.maxi][3][3] === 1) // vérifie si une de ses collisions latérale sont active
                    {
                        if(this.level_data_textures[this.maxi][1]-this.offsetY <= this.cache_data[1] & this.level_data_textures[this.maxi][1]-this.offsetY >= this.cache_data[2]) //x
                        {
                            if(this.level_data_textures[this.maxi][3][0] === 1)
                            {     
                                if(this.bestleft[0] < this.level_data_textures[this.maxi][0]-this.offsetX & this.cache_data[3] > this.level_data_textures[this.maxi][0]-this.offsetX |
                                    this.bestleft[0] == false & this.cache_data[3] > this.level_data_textures[this.maxi][0]-this.offsetX) //left
                                {
                                    this.collisions.splice(6, 1, 1);
                                    this.bestleft = [this.level_data_textures[this.maxi][0]-this.offsetX, this.level_data_textures[this.maxi][1]-this.offsetY,
                                                    this.level_data_textures[this.maxi][0]-526, this.level_data_textures[this.maxi][1]-py];
                                }
                            }
                            if(this.level_data_textures[this.maxi][3][1] === 1)
                            {
                                if(this.bestright[0] > this.level_data_textures[this.maxi][0]-this.offsetX & this.cache_data[4] < this.level_data_textures[this.maxi][0]-this.offsetX |
                                    this.bestright[0] == false & this.cache_data[4] < this.level_data_textures[this.maxi][0]-this.offsetX) //right
                                {
                                    this.collisions.splice(7, 1, 1);
                                    this.bestright = [this.level_data_textures[this.maxi][0]-this.offsetX, this.level_data_textures[this.maxi][1]-this.offsetY,
                                                    this.level_data_textures[this.maxi][0]-626, this.level_data_textures[this.maxi][1]-py];
                                }
                            }
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
                    if(this.level_data_textures[this.maxk] != 0)
                    {
                        if(this.level_data_textures[this.maxk][3][0] === 1 | this.level_data_textures[this.maxk][3][1] === 1)
                        {    
                            if(this.level_data_textures[this.maxk][0]-this.cache_data[4] <= px & this.level_data_textures[this.maxk][0]-this.cache_data[5] >= px) //y 
                            {
                                if(this.level_data_textures[this.maxk][3][0] === 1)
                                {    
                                    if(this.bestdown[1] > this.level_data_textures[this.maxk][1]-this.offsetY & py < this.level_data_textures[this.maxk][1]-this.offsetY |
                                        this.bestdown[1] == false & py < this.level_data_textures[this.maxk][1]-this.offsetY) //down
                                    {
                                        this.collisions.splice(4, 1, 1);
                                        this.bestdown = [this.level_data_textures[this.maxk][0]-this.offsetX, this.level_data_textures[this.maxk][1]-this.offsetY,
                                                        this.level_data_textures[this.maxk][0], this.level_data_textures[this.maxk][1]-395, (this.level_data_textures[this.maxk][1])-this.offsetY-py-71];
                                    }
                                }
                                if(this.level_data_textures[this.maxk][3][1] === 1)
                                {
                                    if(this.bestup[1] < this.level_data_textures[this.maxk][1]-this.offsetY & py > this.level_data_textures[this.maxk][1]-this.offsetY |
                                        this.bestup[1] == false & py > this.level_data_textures[this.maxk][1]-this.offsetY) //up
                                    {
                                        this.collisions.splice(5, 1, 1);
                                        this.bestup = [this.level_data_textures[this.maxk][0]-this.offsetX, this.level_data_textures[this.maxk][1]-this.offsetY,
                                                        this.level_data_textures[this.maxk][0], this.level_data_textures[this.maxk][1]-253];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.collisions_loop_log = this.CollisionsLoop.endLogTime();
        return [px, py];
    }

    display(px, py, pause, offsetX, offsetY, smoothX, smoothY)
    {
        this.GraphicsLoop.startTime()
        this.operation_count = 0;
        if(pause === false)    
        {
            this.offsetsmoothX = Math.round(Tools.resolutionScaler(offsetX-smoothX));
            this.offsetsmoothY = Math.round(Tools.resolutionScaler(offsetY-smoothY));
        }
        this.pre_snap_offset_smooth_X = Math.round(this.offsetsmoothX/this.pre_block_scaling);
        this.pre_snap_offset_smooth_Y = Math.round(this.offsetsmoothY/this.pre_block_scaling);
        this.pre_snap_offset_smooth_X_minus_05 = Math.round(this.offsetsmoothX/this.pre_block_scaling-0.5)
        // this.pre_snap_offset_smooth_Y_minus_05 = Math.round(this.pre_snap_offset_smooth_Y-0.5);
        if(this.devmode)
        {
            ctx.lineWidth = Tools.resolutionScaler(0.5);
            ctx.font = Tools.resolutionScaler(15)+'px arial';
        }
        this.i_define = 0;
        if(this.i_define < this.pre_snap_offset_smooth_Y)
        {
            this.i_define = Math.round(this.offsetsmoothY/this.pre_block_scaling-0.5)
        }
        for (let i = this.i_define; i < this.pre_snap_offset_smooth_Y+10; i++) //Affichage des textures
        {
            this.pre_vertical_position_line_block_displayed = i*this.pre_block_scaling_unround-this.offsetsmoothY;
            this.index_value = this.block_index[i][this.pre_snap_offset_smooth_X_minus_05];
            for (let k = this.index_value; k < this.index_value+18; k++)
            {
                if(this.block_map_snap_position[i][k] > this.pre_snap_offset_smooth_X_minus_05+18 || this.block_map_snap_position[i][k] === this.block_map_snap_position[i][-1])
                {
                    if(this.devmode)
                    {
                        ctx.fillStyle = "rgba(0,0,255,0.25)";
                        ctx.fillRect(this.block_map[i][k-1]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, this.pre_block_scaling, this.pre_block_scaling);
                    }
                    break;
                }
                switch(this.block_map_type_texture[i][k][0]) // selection des textures
                {
                    case 0:
                        ctx.drawImage(this.testblock, 
                                           this.block_map[i][k]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                                           this.pre_block_scaling, this.pre_block_scaling); //testblock
                        break
                    case 1:
                        ctx.drawImage(this.grass_blocks, 
                                         ((this.block_map_type_texture[i][k][1]+4)%4)*this.pre_block_scale, Math.floor(this.block_map_type_texture[i][k][1]/4)*this.pre_block_scale, 
                                           this.pre_block_scale, this.pre_block_scale, 
                                           this.block_map[i][k]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                                           this.pre_block_scaling, this.pre_block_scaling);
                        break;
                }
                if(this.devmode) //Affichage position de chaque block
                {
                    this.operation_count++;
                    Tools.logText("["+Math.round(this.block_map[i][k]/this.pre_block_scaling)+" : "+i+"]", (this.block_map[i][k]-this.offsetsmoothX+5)/Tools.ratio, (this.pre_vertical_position_line_block_displayed)/Tools.ratio+20);
                    Tools.logText("["+this.operation_count+"]", (this.block_map[i][k]-this.offsetsmoothX+5)/Tools.ratio, (this.pre_vertical_position_line_block_displayed)/Tools.ratio+60);
                }
                
                
            }
            if(this.devmode)
            {
                ctx.fillStyle = "rgba(255,255,0,0.25)";
                ctx.fillRect(this.block_map[i][this.index_value]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, this.pre_block_scaling, this.pre_block_scaling);
            }
        }

        if(this.devmode) //Affichage debug des collisions
        {
            ctx.font = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(1);
            Tools.logText("-Count : "+this.operation_count, 40, 225, "rgb(0,255,0)", "rgb(0,100,0)");
            ctx.lineWidth = Tools.resolutionScaler(0.5);
            ctx.font = Tools.resolutionScaler(15)+'px arial';
            if(this.collisions[5] == 1) //Up red
            {
                ctx.fillStyle = "rgb(255,0,0)";
                ctx.fillRect(Tools.resolutionScaler(this.bestup[2])-this.offsetsmoothX, Tools.resolutionScaler(this.bestup[3]+320)-this.offsetsmoothY,this.pre_block_scaling,Tools.resolutionScaler(5));
            }

            if(this.collisions[4] == 1) //Down green
            {
                ctx.fillStyle = "rgb(0,255,0)";
                ctx.fillRect(Tools.resolutionScaler(this.bestdown[2])-this.offsetsmoothX, Tools.resolutionScaler(this.bestdown[3]+395)-this.offsetsmoothY,this.pre_block_scaling,Tools.resolutionScaler(5));
            }

            if(this.collisions[6] == 1) //Left blue
            {
                ctx.fillStyle = "rgb(0,0,255)";
                ctx.fillRect(Tools.resolutionScaler(this.bestleft[2]+593)-this.offsetsmoothX, Tools.resolutionScaler(py+this.bestleft[3])-this.offsetsmoothY,Tools.resolutionScaler(5),this.pre_block_scaling);
            }

            if(this.collisions[7] == 1) //Right yellow
            {
                ctx.fillStyle = "rgb(255,255,0)";
                ctx.fillRect(Tools.resolutionScaler(this.bestright[2]+625)-this.offsetsmoothX, Tools.resolutionScaler(py+this.bestright[3])-this.offsetsmoothY,Tools.resolutionScaler(5),this.pre_block_scaling);
            }
            Tools.logText("["+Math.round((offsetX+px)/71)+" : "+Math.round((offsetY+py)/71)+"]", px+smoothX+50, py+smoothY+20);
            ctx.lineWidth= Tools.resolutionScaler(2);
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.strokeRect(Tools.resolutionScaler(px+smoothX), Tools.resolutionScaler(py+smoothY),this.pre_block_scaling,this.pre_block_scaling);
            ctx.strokeStyle = "rgb(150,150,150)";
            ctx.strokeRect(Tools.resolutionScaler(px+smoothX+22), Tools.resolutionScaler(py+smoothY),Tools.resolutionScaler(28),this.pre_block_scaling);
        }
        this.graphics_loop_log = this.GraphicsLoop.endLogTime()
    }

    requiredDisplayVariableUpdater()
    {
        this.pre_block_scale = 24;
        this.pre_block_scaling_unround = Tools.resolutionScalerUnround(71);
        this.pre_block_scaling = Tools.resolutionScaler(71);
        this.block_map = [];
        
        for(let i = 0; i < this.maplimit[1]+1; i++)
        {
            this.block_map.push([]);
        }
        for(let i = 0; i < this.maplimit[1]+1; i++)
        {
            for(let k = 0; k < this.block_map_snap_position[i].length; k++)
            {
                this.block_map[i].push(Math.round(this.block_map_snap_position[i][k]*this.pre_block_scaling_unround));
            }
        }
    }

    fcamsmoother(camsmootherenable, pause)
    {
        this.CamSmootherLoop.startTime()
        if(pause == false)    
        {     
            if(camsmootherenable == true) //smooth the camera
            {    
                this.previouscamsmoother = this.camsmoother;
                this.camsmoother = [Math.round(this.offsetX-((this.previousoffset[0][0]+this.previousoffset[1][0]+this.previousoffset[2][0]+this.previousoffset[3][0]+
                                                                this.previousoffset[4][0]+this.previousoffset[5][0]+this.previousoffset[6][0]+this.previousoffset[7][0])/8))
                                    ,Math.round(this.offsetY-((this.previousoffset[0][1]+this.previousoffset[1][1]+this.previousoffset[2][1]+this.previousoffset[3][1]+
                                                                this.previousoffset[4][1]+this.previousoffset[5][1]+this.previousoffset[6][1]+this.previousoffset[7][1]+
                                                                this.previousoffset[8][1]+this.previousoffset[9][1]+this.previousoffset[10][1]+this.previousoffset[11][1]+
                                                                this.previousoffset[12][1]+this.previousoffset[13][1]+this.previousoffset[14][1]+this.previousoffset[15][1])/16))]
                
                this.previousoffset.unshift([this.offsetX, this.offsetY]);
                this.previousoffset.lenght = 16;
            }
            else
            {
                this.previouscamsmoother = [0,0];
                this.camsmoother = [0, 0];
            }
        }
        this.cam_smoother_loop_log = this.CamSmootherLoop.endLogTime()
    }

    reset()
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
        this.level_data_textures = [];
        this.data_temp = [];
    }
}

export{Map_Data}

