import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Transition, Fps, Fullscreen, Keyboard, MapData} from "../../../../main.js";

class Debug_Settings
{
    constructor()
    {

    };

    display()
    {
        if(GV.previous_setting_category !== 3)
        {
            GV.previous_setting_category = 3;
        }

        if(Fps.showfps)
        {
            ctx.fillStyle = GV.ColorPalette_.average_green;
        }
        else
        {
            ctx.fillStyle = GV.ColorPalette_.average_red;
        };
        if(Button3.text_type3("Show FPS", 111, 150, 320, 60, 125, 195, 40)) //show Fps.fps button
        {
            if(Fps.showfps)
            {
                Fps.showfps = false;
            }
            else
            {
                Fps.showfps = true;
            };
        };
    };
};

export{Debug_Settings};