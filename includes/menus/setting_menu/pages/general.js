import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Transition, Fps, Fullscreen, Keyboard, MapData} from "../../../../main.js";

class General_Settings
{
    constructor()
    {

    };

    display()
    {
        if(GV.previous_setting_category !== 0)
        {
            GV.previous_setting_category = 0;
        }
        
        if(Fullscreen.canvas_fullscreen)
        {
            ctx.fillStyle = GV.ColorPalette_.average_green;
        }
        else
        {
            ctx.fillStyle = GV.ColorPalette_.average_red;
        };
        if(Button3.text_type3(Fullscreen.ablefullscreen+" fullscreen", 0, 150, 535, 60, 20, 195, 40)) //fullscreen button
        {
            Fullscreen.first_game_frame = true;
            Fullscreen.toggle(canvas);
        };
    };
};

export{General_Settings}