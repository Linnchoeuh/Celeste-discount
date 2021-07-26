import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Transition, Fps, Fullscreen, Keyboard, MapData} from "../../../../main.js";

class Audio_Settings
{
    constructor()
    {

    };

    display()
    {
        if(GV.previous_setting_category !== 2)
        {
            GV.previous_setting_category = 2;
        }

        ctx.font = "Bold "+Tools.resolutionScaler(40)+"px arial";
        ctx.fillStyle = "#ffffff";
        Tools.logText("Nothing here for the moment :/", Tools.placeFromHorizontalCenter(295), 200, false);
    };
};

export{Audio_Settings};