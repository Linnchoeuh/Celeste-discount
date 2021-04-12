import {ctx, Tools} from "../main.js";

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";
class Map_Editor
{
    constructor()
    {
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
        this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png")
        console.log(this.grass_blocks)
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
        this.cache_data = [Math.round(this.offsetX/71), this.maplimit[0]+1, Math.round(this.offsetY/71), 0, Tools.resolutionScalerAddOne(71), 0, 0];
        ctx.font = Tools.resolutionScaler(15)+'px arial';
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.lineWidth = 1;
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
            this.cache_data[3] = Tools.resolutionScaler(this.maxi*71-this.offsetY);
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
                            ctx.drawImage(testblock, Tools.resolutionScaler(this.level_data_textures[k][2]-this.offsetX), this.cache_data[3], this.cache_data[4], this.cache_data[4]); //testblock
                            break;
                        case 1:
                            ctx.drawImage(this.grass_blocks, ((this.level_data_textures[k][2][1]+4)%4)*24, Math.floor(this.level_data_textures[k][2][1]/4)*24, 23, 23, 
                            Tools.resolutionScaler(this.level_data_textures[k][0]-this.offsetX), this.cache_data[3], this.cache_data[4], this.cache_data[4]);
                            break;
                    }
                    // ctx.fillStyle = "rgb(255,255,255)";
                    
                    if(this.devmode == true) //Affichage position de chaque block
                    {
                        ctx.fillText("["+this.level_data_textures[k][0]/71+" : "+this.level_data_textures[k][1]/71+"]", Tools.resolutionScaler(this.level_data_textures[k][2]-this.offsetX+5), this.cache_data[4]+20);
                    }                   
                }
   
            }
        }
        // console.log(this.spawn)
        if(spawnmodifier === false)
        {
            ctx.fillStyle = "rgba(255,25,0,0.2)";
            
            ctx.fillRect(Tools.resolutionScaler(this.spawn[0]*71-this.offsetX), Tools.resolutionScaler(this.spawn[1]*71-this.offsetY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
            ctx.drawImage(this.spawn_icon, Tools.resolutionScaler(this.spawn[0]*71-this.offsetX+10), Tools.resolutionScaler(this.spawn[1]*71-this.offsetY+10), Tools.resolutionScaler(50), Tools.resolutionScaler(50))
        }

        for (let i = this.cache_data[2]; i < this.cache_data[2]+11; i++) //Affichage des croix
        {
            this.cache_data[3] = Tools.resolutionScaler(i*71-this.offsetY);
            for (let k = this.cache_data[0]; k < 18+this.cache_data[0]; k++)
            {
                this.cache_data[5] = Tools.resolutionScaler(k*71-this.offsetX-1);
                this.cache_data[6] = Tools.resolutionScaler(k*71-this.offsetX);
                ctx.fillStyle = "rgba(255,255,255,0.8)";
                ctx.fillRect(this.cache_data[6], this.cache_data[3], Tools.resolutionScaler(2), Tools.resolutionScaler(10));
                ctx.fillRect(this.cache_data[6], this.cache_data[3], Tools.resolutionScaler(2), Tools.resolutionScaler(-10));
                ctx.fillRect(this.cache_data[6]+2, this.cache_data[3]-1, Tools.resolutionScaler(10), Tools.resolutionScaler(2));
                ctx.fillRect(this.cache_data[6]+1, this.cache_data[3]-1, Tools.resolutionScaler(-10), Tools.resolutionScaler(2));
            }
        }
    }
}


export{Map_Editor}