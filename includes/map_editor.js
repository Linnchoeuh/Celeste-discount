import {upscale, gupscale} from "./tools.js";

var ground_list = [];

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";


var dirt_full = new Image(); //0
dirt_full.src = "graphics/map_content/dirt_full.png";
ground_list.push(dirt_full);
var dirt_L = new Image(); //1
dirt_L.src = "graphics/map_content/dirt_L.png";
ground_list.push(dirt_L);
var dirt_R = new Image(); //2
dirt_R.src = "graphics/map_content/dirt_R.png";
ground_list.push(dirt_R)
var dirt = new Image(); //3
dirt.src = "graphics/map_content/dirt.png";
ground_list.push(dirt);

var ground_up_full = new Image(); //4
ground_up_full.src = "graphics/map_content/ground_up_full.png";
ground_list.push(ground_up_full);
var ground_up_L = new Image(); //5
ground_up_L.src = "graphics/map_content/ground_up_L.png";
ground_list.push(ground_up_L);
var ground_up_R = new Image(); //6
ground_up_R.src = "graphics/map_content/ground_up_R.png";
ground_list.push(ground_up_R);
var ground_up = new Image(); //7
ground_up.src = "graphics/map_content/ground_up.png";
ground_list.push(ground_up);


var ground_down_full = new Image(); //8
ground_down_full.src = "graphics/map_content/ground_down_full.png";
ground_list.push(ground_down_full);
var ground_down_L = new Image(); //9
ground_down_L.src = "graphics/map_content/ground_down_L.png";
ground_list.push(ground_down_L);
var ground_down_R = new Image(); //10
ground_down_R.src = "graphics/map_content/ground_down_R.png";
ground_list.push(ground_down_R);
var ground_down = new Image(); //11
ground_down.src = "graphics/map_content/ground_down.png";
ground_list.push(ground_down);

var ground_up_down_full = new Image(); //12
ground_up_down_full.src = "graphics/map_content/ground_up_down_full.png";
ground_list.push(ground_up_down_full);
var ground_up_down_L = new Image(); //13
ground_up_down_L.src = "graphics/map_content/ground_up_down_L.png";
ground_list.push(ground_up_down_L);
var ground_up_down_R = new Image(); //14
ground_up_down_R.src = "graphics/map_content/ground_up_down_R.png";
ground_list.push(ground_up_down_R);
var ground_up_down = new Image(); //15
ground_up_down.src = "graphics/map_content/ground_up_down.png";
ground_list.push(ground_up_down);

class MapEditor
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.offsetX = 0;
        this.offsetY = 0;
        this.maplimit = [0, 0];
        this.spawn = [0, 0];
        this.mouse_cursor = new Image();
        this.mouse_cursor.src = "graphics/map_editor/mouse_cursor.png";
        this.add_block_icon = new Image();
        this.add_block_icon.src = "graphics/map_editor/add_block_icon.png";
        this.remove_block_icon = new Image();
        this.remove_block_icon.src = "graphics/map_editor/remove_block_icon.png";
        this.add_water_icon = new Image();
        this.add_water_icon.src = "graphics/map_editor/add_water_icon.png";
        this.add_ennemy_icon = new Image();
        this.add_ennemy_icon.src = "graphics/map_editor/add_ennemy_icon.png";
        this.add_interactive_block_icon = new Image();
        this.add_interactive_block_icon.src = "graphics/map_editor/add_interactive_block_icon.png";
        this.add_decoration_icon = new Image();
        this.add_decoration_icon.src = "graphics/map_editor/add_decoration_icon.png";
        this.modification_icon = new Image();
        this.modification_icon.src = "graphics/map_editor/modification_icon.png";
        this.move_block_icon = new Image();
        this.move_block_icon.src = "graphics/map_editor/move_block_icon.png";
        this.move_decoration_icon = new Image();
        this.move_decoration_icon.src = "graphics/map_editor/move_decoration_icon.png";
        this.remove_decoration_icon = new Image();
        this.remove_decoration_icon.src = "graphics/map_editor/remove_decoration_icon.png";
        this.spawn_icon = new Image();
        this.spawn_icon.src = "graphics/ui/icon.png";
        this.end_block_icon = new Image();
        this.end_block_icon.src = "graphics/map_editor/end_block_icon.png";
        this.play_icon = new Image();
        this.play_icon.src = "graphics/map_editor/play_icon.png";
    }

    load(map, editedlevelid)
    {
        this.maplimit = [map[3][editedlevelid][0][1], map[3][editedlevelid][0][2]];
        this.spawn = [map[3][editedlevelid][0][3], map[3][editedlevelid][0][4]];
        console.log(map[3][editedlevelid][1])
        this.level_data_textures = map[3][editedlevelid][1]
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
    }

    display(spawnmodifier)
    {
        this.cache_data = [Math.round(this.offsetX/71), this.maplimit[0]+1, Math.round(this.offsetY/71), 0, gupscale(71), 0, 0];
        this.ctx.font = upscale(15)+'px arial';
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.lineWidth = 1;
        // console.log(this.level_data_textures[8][0])
        for (let i = this.cache_data[2]-1; i < this.cache_data[2]+10; i++) //Affichage des textures
        {
            if(i <= this.maplimit[1])
            {
                this.maxi = i;
            }
            else
            {
                this.maxi = this.maplimit[1];
            }
            this.cache_data[3] = upscale(this.maxi*71-this.offsetY);
            for (let k = this.cache_data[0]+(this.cache_data[1]*this.maxi)-1; k < this.cache_data[0]+(this.cache_data[1]*this.maxi)+19; k++)
            {
                if(k > 0 & k < this.level_data_textures_len-1)
                {
                    this.maxk = k;
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
                    switch(this.level_data_textures[k][2][0]) // selection des textures
                    {
                        case 0:
                            this.ctx.drawImage(testblock, upscale(this.level_data_textures[k][2]-this.offsetX), this.cache_data[3], this.cache_data[4], this.cache_data[4]); //testblock
                            break;
                        case 1:
                            this.ctx.drawImage(ground_list[this.level_data_textures[k][2][1]], upscale(this.level_data_textures[k][0]-this.offsetX), this.cache_data[3], this.cache_data[4], this.cache_data[4]);
                            break;
                    }
                    // this.ctx.fillStyle = "rgb(255,255,255)";
                    
                    if(this.devmode == true) //Affichage position de chaque block
                    {
                        this.ctx.fillText("["+this.level_data_textures[k][0]/71+" : "+this.level_data_textures[k][1]/71+"]", upscale(this.level_data_textures[k][2]-this.offsetX+5), this.cache_data[4]+20);
                    }                   
                }
   
            }
        }
        // console.log(this.spawn)
        if(spawnmodifier === false)
        {
            this.ctx.fillStyle = "rgba(255,25,0,0.2)";
            
            this.ctx.fillRect(upscale(this.spawn[0]*71-this.offsetX), upscale(this.spawn[1]*71-this.offsetY), upscale(71), upscale(71));
            this.ctx.drawImage(this.spawn_icon, upscale(this.spawn[0]*71-this.offsetX+10), upscale(this.spawn[1]*71-this.offsetY+10), upscale(50), upscale(50))
        }

        for (let i = this.cache_data[2]; i < this.cache_data[2]+11; i++) //Affichage des croix
        {
            this.cache_data[3] = upscale(i*71-this.offsetY);
            for (let k = this.cache_data[0]; k < 18+this.cache_data[0]; k++)
            {
                this.cache_data[5] = upscale(k*71-this.offsetX-1);
                this.cache_data[6] = upscale(k*71-this.offsetX);
                this.ctx.fillStyle = "rgba(255,255,255,0.8)";
                this.ctx.fillRect(this.cache_data[6], this.cache_data[3], upscale(2), upscale(10));
                this.ctx.fillRect(this.cache_data[6], this.cache_data[3], upscale(2), upscale(-10));
                this.ctx.fillRect(this.cache_data[6]+2, this.cache_data[3]-1, upscale(10), upscale(2));
                this.ctx.fillRect(this.cache_data[6]+1, this.cache_data[3]-1, upscale(-10), upscale(2));
            }
        }
    }
}


export{MapEditor}