import {ctx, GV, Tools, Keyboard, Fps, Mouse, MapData, Fullscreen, Player, Transition, canvas} from "../main.js";

class Log_Display
{
    displayLog()
    {
        if(GV.devmode)
        {
            ctx.font = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(0.5);

            Tools.logText("x : "+Mouse.x, 1125, 25); //mouse pos
            Tools.logText("y : "+Mouse.y, 1125, 50);

            Tools.logText(Keyboard.key_input, 1100, 75); //key pressed
            Tools.logText("|", 1141, 75);
            Tools.logText(Keyboard.key_id, 1152, 75);

            Tools.logText("Click : "+Mouse.click_left, 1091, 100); //Mouse.click_left

            Tools.logText("Fullscreen : "+Fullscreen.canvasfullscreen, 1043, 125); //fullscreen

            Tools.logText("Inputs : "+Object.values(Keyboard.keys_input), 800, 150); //input

            if(GV.menu === 2 || GV.menu === 9 || 1)
            {
                Tools.logText("Collisions : "+Object.values(MapData.collisions), 900, 175); //collisions

                Tools.logText("PX : "+Math.round(Player.x), 950, 200); //px
                Tools.logText("|", 1060, 200);
                Tools.logText("PosX : "+Player.positionning_x, 1070, 200);
                
                Tools.logText("PY : "+Math.round(Player.y), 950, 225); //py
                Tools.logText("|", 1060, 225);
                Tools.logText("PosY : "+Player.positionning_y, 1070, 225);
                
                Tools.logText("VX : "+Math.round(Player.vector_X), 950, 250); //vect
                Tools.logText("|", 1060, 250);
                Tools.logText("VY : "+Math.round(Player.vector_Y), 1070, 250);
                
                Tools.logText("OX : "+Math.round(MapData.offset_x), 950, 275); //offset
                Tools.logText("|", 1060, 275);
                Tools.logText("OY : "+Math.round(MapData.offset_y), 1070, 275);

                Tools.logText("SX : "+Math.round(MapData.camsmoother_x), 950, 300); //Smoothed offset
                Tools.logText("|", 1060, 300);
                Tools.logText("SY : "+Math.round(MapData.camsmoother_y), 1070, 300);

                Tools.logText("DX : "+Math.round(MapData.interpoled_difference_smoother_offset_x), 950, 325); //Difference between the offset and the smoothed offset (interpoled)
                Tools.logText("|", 1060, 325);
                Tools.logText("DY : "+Math.round(MapData.interpoled_difference_smoother_offset_y), 1070, 325);

                Tools.logText("X: (S : "+MapData.start_square_collisions_test_area[0]+", E : "+MapData.end_square_collisions_test_area[0]+")", 950, 350);
                Tools.logText("Y: (S : "+MapData.start_square_collisions_test_area[1]+", E : "+MapData.end_square_collisions_test_area[1]+")", 950, 375);

                Tools.logText("Execution loop : "+Fps.executionloop, 950, 400); 
                Tools.logText("Generated frame : "+1/Fps.interpolation_value, 950, 425); 
                Tools.logText("width : "+GV.canvas_width+" height : "+GV.canvas_height, 950, 450);
                // Tools.logText(MapData.pre_block_scaling, 950,450)
                
                Tools.logText(MapData.count , 1000, 500); //-------------------------------------------------------test var------------------------------------------------
            };
            if(GV.menu === 7){
                
                Tools.logText("OX : "+Math.round(MapEditor.offsetX), 985, 275); //offset
                Tools.logText("|", 1080, 275);
                Tools.logText("OY : "+MapEditor.offsetY, 1092, 275);

                Tools.logText(Transition.currentfadestate+"    " , 1000, 500); //-------------------------------------------------------test var-----------------------------------------------
            };
        };
    };
};

export{Log_Display};