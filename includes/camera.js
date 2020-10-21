import {upscale, ui_var_getter, twPleinEcran} from "./ui.js";
import {MapData, level_reader_var_getter} from "./level_reader.js";

var ctx;
var devmode;
var player

function cam_var_getter(vartarg, varcont)
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

class Camera
{
    constructor(x,y)
    {
        this.posX = x;
        this.posY = y;
    }

    
}

export{cam_var_getter, Camera}