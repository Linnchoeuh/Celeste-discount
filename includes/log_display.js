import {ctx, GV, Tools, Keyboard, Fps, Mouse, MapData, Fullscreen, Player, Transition} from "../../../main.js";

class Log_Display
{
    constructor(){
        this.push = 0;
        this.command = "false";
    };

    displayLog(){
        if(GV.devmode){
            ctx.font = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(1);
            ctx.fillStyle = "rgb(255,255,255)";

            Tools.logText("x : "+Mouse.x, 1125, 25); //mouse pos
            Tools.logText("y : "+Mouse.y, 1125, 50)

            Tools.logText(Keyboard.key_input, 1100, 75); //key pressed
            Tools.logText("|", 1141, 75);
            Tools.logText(Keyboard.key_id, 1152, 75);

            Tools.logText("Click : "+Mouse.click_left, 1091, 100); //Mouse.click_left

            Tools.logText("Fullscreen : "+Fullscreen.canvasfullscreen, 1043, 125); //fullscreen

            Tools.logText("Inputs : "+Object.values(Keyboard.keys_input), 945, 150); //input

            if(GV.menu === 2 | GV.menu === 9 | 1){
                ctx.fillStyle = "rgb(255,255,255)";

                Tools.logText("Collisions : "+MapData.collisions, 963, 175); //collisions

                Tools.logText("PX : "+Math.round(Player.playerX), 985, 200); //px
                Tools.logText("|", 1080, 200);
                Tools.logText("OffOnX : "+MapData.offsetX_on, 1092, 200);
                
                Tools.logText("PY : "+Math.round(Player.playerY), 985, 225); //py
                Tools.logText("|", 1080, 225);
                Tools.logText("OffOnY : "+MapData.offsetY_on, 1092, 225);
                
                // Tools.logText("VX : "+Math.round(GameMenu.vect[0]), 985, 250); //vect
                Tools.logText("|", 1080, 250);
                // Tools.logText("VY : "+GameMenu.vect[1], 1092, 250);
                
                Tools.logText("OX : "+Math.round(MapData.offsetX), 985, 275); //offset
                Tools.logText("|", 1080, 275);
                Tools.logText("OY : "+MapData.offsetY, 1092, 275);
                
                Tools.logText("BU : ["+MapData.bestup[0]+"]px ; ["+MapData.bestup[1]+"]py", 970, 300);
                Tools.logText("["+MapData.bestup[2]+"]ox ; ["+MapData.bestup[3]+"]oy", 1015, 325);
                
                Tools.logText("BD : ["+MapData.bestdown[0]+"]px ; ["+MapData.bestdown[1]+"]py", 970, 350);
                Tools.logText("["+MapData.bestdown[2]+"]ox ; ["+MapData.bestdown[3]+"]oy", 1015, 375);
                
                Tools.logText("BL : ["+MapData.bestleft[0]+"]px ; ["+MapData.bestleft[1]+"]py", 970, 400);
                Tools.logText("["+MapData.bestleft[2]+"]ox ; ["+MapData.bestleft[3]+"]oy", 1015, 425);
                
                Tools.logText("BR : ["+MapData.bestright[0]+"]px ; ["+MapData.bestright[1]+"]py", 970, 450);
                Tools.logText("["+MapData.bestright[2]+"]ox ; ["+MapData.bestright[3]+"]oy", 1015, 475);
                
                
                Tools.logText(MapData.i_define+"   "+Transition.selectedaction+"      "+Fps.fps/Fps.pfpslog , 1000, 500); //-------------------------------------------------------test var------------------------------------------------
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