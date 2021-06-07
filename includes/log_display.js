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

            if(GV.menu === 2 | GV.menu === 9 | 1){
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

                // Tools.logText("Start zone : ["+MapData.start_square_collisions_test_area[0]+"]px ; ["+MapData.start_square_collisions_test_area[1]+"]py", 970, 300);
                
                // Tools.logText("BU : ["+MapData.bestup[0]+"]px ; ["+MapData.bestup[1]+"]py", 970, 300);
                // Tools.logText("["+MapData.bestup[2]+"]ox ; ["+MapData.bestup[3]+"]oy", 1015, 325);
                
                // Tools.logText("BD : ["+MapData.bestdown[0]+"]px ; ["+MapData.bestdown[1]+"]py", 970, 350);
                // Tools.logText("["+MapData.bestdown[2]+"]ox ; ["+MapData.bestdown[3]+"]oy", 1015, 375);
                
                // Tools.logText("BL : ["+MapData.bestleft[0]+"]px ; ["+MapData.bestleft[1]+"]py", 970, 400);
                // Tools.logText("["+MapData.bestleft[2]+"]ox ; ["+MapData.bestleft[3]+"]oy", 1015, 425);
                
                // Tools.logText("BR : ["+MapData.bestright[0]+"]px ; ["+MapData.bestright[1]+"]py", 970, 450);
                // Tools.logText("["+MapData.bestright[2]+"]ox ; ["+MapData.bestright[3]+"]oy", 1015, 475);
                
                
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