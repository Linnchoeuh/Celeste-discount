import {ctx, GV, Tools, Keyboard, Fps, Mouse, MapData, Fullscreen, Player, Transition} from "../main.js";

class Log_Display
{
    constructor(){
        this.push = 0;
        this.command = "false";
    };

    displayLog(){
        if(GV.devmode){
            ctx.font = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(0.5);
            ctx.fillStyle = "rgb(255,255,255)";

            Tools.logText("x : "+Mouse.x, 1125, 25); //mouse pos
            Tools.logText("y : "+Mouse.y, 1125, 50)

            Tools.logText(Keyboard.key_input, 1100, 75); //key pressed
            Tools.logText("|", 1141, 75);
            Tools.logText(Keyboard.key_id, 1152, 75);

            Tools.logText("Click : "+Mouse.click_left, 1091, 100); //Mouse.click_left

            Tools.logText("Fullscreen : "+Fullscreen.canvasfullscreen, 1043, 125); //fullscreen

            Tools.logText("Inputs : "+Object.values(Keyboard.keys_input), 800, 150); //input

            if(GV.menu === 2 || GV.menu === 9 || 1){
                ctx.fillStyle = "rgb(255,255,255)";

                Tools.logText("Collisions : "+Object.values(MapData.collisions), 900, 175); //collisions

                Tools.logText("PX : "+Math.round(Player.x), 985, 200); //px
                Tools.logText("|", 1080, 200);
                Tools.logText("PosX : "+Player.positionning_x, 1092, 200);
                
                Tools.logText("PY : "+Math.round(Player.y), 985, 225); //py
                Tools.logText("|", 1080, 225);
                Tools.logText("PosY : "+Player.positionning_y, 1092, 225);
                
                Tools.logText("VX : "+Math.round(Player.vector_X), 985, 250); //vect
                Tools.logText("|", 1080, 250);
                Tools.logText("VY : "+Math.round(Player.vector_Y), 1092, 250);
                
                Tools.logText("OX : "+Math.round(MapData.offset_x), 985, 275); //offset
                Tools.logText("|", 1080, 275);
                Tools.logText("OY : "+Math.round(MapData.offset_y), 1092, 275);

                Tools.logText("[x: ("+MapData.start_square_collisions_test_area[0]+", "+MapData.end_square_collisions_test_area[0]+") | y: ("
                                     +MapData.start_square_collisions_test_area[1]+", "+MapData.end_square_collisions_test_area[1]+")]", 985, 300);

                Tools.logText("x: "+MapData.camsmoother_x+" | y: "+MapData.camsmoother_y, 985, 325);
                Tools.logText("x: "+Number.parseFloat(MapData.interpoled_offset_x).toPrecision(3)+" | y: "+Number.parseFloat(MapData.interpoled_offset_y).toPrecision(3), 985, 350)
                Tools.logText("x: "+Number.parseFloat(MapData.interpoled_offset_x-MapData.interpoled_camsmoother_x).toPrecision(3)+" | y: "+Number.parseFloat(MapData.interpoled_offset_y-MapData.interpoled_camsmoother_y).toPrecision(3), 985, 375);
                // Tools.logText("smooth x : "+Math.round(MapData.offset_x)+" : "+Math.round((MapData.previousoffset[0][0] + MapData.previousoffset[1][0] + MapData.previousoffset[2][0] + MapData.previousoffset[3][0] +
                //     MapData.previousoffset[4][0] + MapData.previousoffset[5][0] + MapData.previousoffset[6][0] + MapData.previousoffset[7][0] )/8)+" : "+
                //     Math.round(MapData.offset_x-(MapData.previousoffset[0][0] + MapData.previousoffset[1][0] + MapData.previousoffset[2][0] + MapData.previousoffset[3][0] +
                //         MapData.previousoffset[4][0] + MapData.previousoffset[5][0] + MapData.previousoffset[6][0] + MapData.previousoffset[7][0] )/8), 985, 350)

                // Tools.logText("Start zone : ["+MapData.start_square_collisions_test_area[0]+"]px ; ["+MapData.start_square_collisions_test_area[1]+"]py", 970, 300);
                
                
                Tools.logText(Fps.nbofframewithoutphysics , 1000, 500); //-------------------------------------------------------test var------------------------------------------------
            }
            if(GV.menu === 7){
                
                Tools.logText("OX : "+Math.round(MapEditor.offsetX), 985, 275); //offset
                Tools.logText("|", 1080, 275);
                Tools.logText("OY : "+MapEditor.offsetY, 1092, 275);

                Tools.logText(Transition.currentfadestate+"    " , 1000, 500); //-------------------------------------------------------test var-----------------------------------------------
            }
        }
    };
}

export{Log_Display};