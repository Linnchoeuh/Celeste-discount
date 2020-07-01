import {upscale} from "./ui.js";

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";
var dirt = new Image();
dirt.src = "graphics/map_content/dirt.png";
var ground_up = new Image();
ground_up.src = "graphics/map_content/ground_up.png";


var ctx;
var colliding = [0,0,0,0];

function level_reader_var_getter(vartarg, varcont)
{
    switch(vartarg)
    {
        case "ctx":
            ctx = varcont;
            break
    }
}

class MapData
{   
    constructor(file)
    {
        var temp;
        var tempoftemp;
        this.maplimit = [file[0], file[1]];
        this.spawn = [file[2], file[3]];
        this.mapcontent = file.slice(4);
        for(let i = 0; i < this.mapcontent.length; ++i)
        {
            temp = this.mapcontent[i];
            tempoftemp = temp[0] 
            switch(tempoftemp[0])
            {
                case -1:
                    temp.splice(0, 1, testblock); // test block
                    break
                case 0:
                    temp.splice(0, 1, testblock); //trap
                    break
                case 1:
                    switch(tempoftemp[1]) // grass block
                    {
                        case 0:
                            temp.splice(0, 1, dirt);
                            break
                        case 1:
                            temp.splice(0, 1, ground_up);
                            break
                    }
                    break
            }  
            temp.splice(2, 1, temp[2]*48);
            temp.splice(3, 1, temp[3]*48);
            this.mapcontent.splice(i, 1, temp)
        }
    }

    displayer(pX,pY)
    {
        colliding = [0,0,0,0];
        for(let i = 0; i < this.mapcontent.length; ++i)
        {
            var tempblock = this.mapcontent[i]
            ctx.drawImage(tempblock[0], upscale(tempblock[2]), upscale(tempblock[3]), upscale(48), upscale(48)*1.01);
            if(tempblock[1] > 0)
            {    
                if(pY+48 > tempblock[3] & pY < tempblock[3]+48 & pX+40 > tempblock[2] & pX < tempblock[2])
                {
                    colliding.splice(1, 1, 1);
                }
                else if(pY+48 > tempblock[3] & pY < tempblock[3]+48 & pX > tempblock[2] & pX < tempblock[2]+40)
                {
                    colliding.splice(2, 1, 1);
                }
                else if(pY+65 > tempblock[3] & pY < tempblock[3] & pX+35 > tempblock[2] & pX < tempblock[2]+35)
                {
                    colliding.splice(0, 1, 1);
                }
                if(pY+15 > tempblock[3] & pY-48 < tempblock[3] & pX+35 > tempblock[2] & pX < tempblock[2]+35)
                {
                    colliding.splice(3, 1, 1);
                }
            }

        } 
        return colliding
    }
}

export{MapData, level_reader_var_getter}