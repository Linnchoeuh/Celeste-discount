//TO DO:
//add MapData editor
//add New MapData assets
//Rework collisions
//add Particles

//DID:
//  New features :
//-Cap the at 30fps is now avaible in the setting
//-Double click for fullscreen
//-New animated button type

//  Fix :
//-Adapting speed of the GUI animation for variable framerate (pause animation, transition animation)

//  Improvement :
//-MapData displaying up to 90% faster
//-Physic clock more stable
//-Interpolation accuracy improved

//  Rework :
//-Player physics
//  -Player jump
//  -Player acceleration
//  -Player dash
//-MapData background

//SYNTAXE :
//Variables  : two_words
//Constantes : TWO_WORDS
//Fonctions  : Two_words
//Classes    : Two_Words et objets
//    Dans une variable : TwoWords
//Méthodes   : twoWords


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {alpha : false});
canvas.width = 1200;
canvas.height = 675;

import * as levels from "./includes/menus/game_menu/levels.js";
class Globals_Variable
{
    constructor(){
        this.devmode = true;
        this.godmode = false;
        this.camsmootherenable = true;
        this.menu = 1;
        this.last_menu = -1;
        this.start = true;
        this.level = ["testlevel", levels.leveltest1]; 
        this.levelid = 1;
        this.editedlevelid = 0;

        this.keys_input = [0,0,0,0,0,0,0,0,0,0];
        this.keypressed = false;

        this.return_arrow = new Image();
        this.return_arrow.src = "graphics/ui/return_arrow.png";
    }
}
const GV = new Globals_Variable()


const Menus_ = {
    Main : 1,
    Game : 2,
    Game_From_Map_Editor : 9

};


export{ctx, canvas, GV, Menus_};

import{Mouse_Data} from "./includes/mouse.js";
const Mouse = new Mouse_Data();
export{Mouse};

import{Keyboard_Data} from "./includes/keyboard.js";
const Keyboard = new Keyboard_Data();
export{Keyboard};

import {Tool_Kit, Timer_Log} from "./includes/tools.js";
const MainLoop = new Timer_Log();
const Tools = new Tool_Kit();
export{Tools};

import {Map_Data} from "./includes/menus/game_menu/level_reader.js";
const MapData = new Map_Data();
export{MapData};

import {Transition_} from "./includes/gui/transition.js";
const Transition = new Transition_();
export{Transition};

import {Fps_} from "./includes/display/fps_cap.js";
const Fps = new Fps_();
export{Fps};

import {Animatic_} from "./includes/gui/animatic.js";
const Button1  = new Animatic_();
const Button2  = new Animatic_();
const Button3  = new Animatic_();
const Button4  = new Animatic_();
const Button5  = new Animatic_();
const Button6  = new Animatic_();
const Button7  = new Animatic_();
const Button8  = new Animatic_();
const Button9  = new Animatic_();
const Button10 = new Animatic_();
const Button11 = new Animatic_();
export{Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Button10, Button11};

import {Player_Data} from "./includes/menus/game_menu/player.js";
const Player = new Player_Data();
export{Player};

import {Map_Editor} from "./includes/menus/map_editor_menu/map_editor.js";
const MapEditor = new Map_Editor();

import{Pause_} from "./includes/gui/pause.js";
const Pause = new Pause_();
export{Pause};

import {Canvas_Resolution_Asset} from "./includes/gui/fullscreen_asset.js";
const Fullscreen = new Canvas_Resolution_Asset();
export{Fullscreen};

import{Main_Menu} from "./includes/menus/main_menu/main_menu.js";
const MainMenu = new Main_Menu();

import{Game_Menu} from "./includes/menus/game_menu/game_menu.js";
const GameMenu = new Game_Menu();

import{Setting_Menu} from "./includes/menus/setting_menu/setting_menu.js";
const SettingMenu = new Setting_Menu();

import{Map_Editor_Create_Or_Load_Menu} from "./includes/menus/map_editor_menu/map_editor_new_or_load_menu.js";
const MapEditorCreateOrLoadMenu = new Map_Editor_Create_Or_Load_Menu();

import{Map_Editor_Set_New_Map_Properties} from "./includes/menus/map_editor_menu/map_editor_set_new_map_properties.js";
const MapEditorSetNewMapProperties = new Map_Editor_Set_New_Map_Properties();

import{Map_Editor_Menu} from "./includes/menus/map_editor_menu/map_editor_menu.js";
const MapEditorMenu = new Map_Editor_Menu();

var command = "false"; //command
var push = 0;








var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";

var MapDatamousetranslationX = Mouse.x;
var MapDatamousetranslationY = Mouse.y;
var previousmouseX = Mouse.x;
var previousmouseY = Mouse.y;

var mousepressed = false;



var stock = [0, 0];



//MapEditor
var MapData_move_speed = 20;
var edition_mode = 0;
var sub_edition_mode = 0;
var spawnmodifier = false;
var spawnmodifpossible = true;


// MapData editor
var block = {
    "x" : 0,
    "y" : 0,
    "Type" : {
        "Main" : 0,
        "Sub" : 0
    },
    "Collisions" : {
        "Top" : true,
        "Bottom" : true,
        "Left" : true,
        "Right" : true,
    }
};

var other_element = {
    "x" : 0,
    "y" : 0,
    "Type" : 0
};

var MapData_element = {
    "Name" : "",
    "MapData_limit" : {
        "x" : 50,
        "y" : 50
    },
    "Player_spawn" : {
        "x" : 0,
        "y" : 0
    },
    "Blocks" : [block],
    "Water" : [],
    "Interactive_blocks" : [],
    "Ennemies" : [],
    "Decorations" : [],

};

var MapData_pack = {
    "MapData_certificate" : "CelesteDiscountMapDataApprovedCerticate",
    "MapData_count" : 1,
    "Name" : "",
    "MapDatas" : [MapData_element]
};
// console.log(MapData_pack.MapDatas[0].Blocks[0].Collisions.Top)
var MapData_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[],[]]]]; //[MapDataCertifcate, number of MapData, name of the MapData pack,
                                                                                                 //    [MapDatas
                                                                                                 //        [Nom, MapDatalimitx, MapDatalimity, playerspawnx, playerspawny],
                                                                                                 //        [Blocks[snap_x, snap_y, [category,sub category], collisions]]
                                                                                                 //            category:
                                                                                                 //                -testblock
                                                                                                 //                -block
                                                                                                 //                -damage block
                                                                                                 //            collision:
                                                                                                 //                -[up,down,left,right]
                                                                                                 //        [Water[snap_x, snap_y, type]]
                                                                                                 //        [Interactive object[snap_x, snap_y, content, type]]
                                                                                                 //        [Enemies[snap_x, snap_y, type]] (0.7)
                                                                                                 //        [Decorations[x,y]]
                                                                                                 //    ]
                                                                                                 //]





function main(){
    MainLoop.startTime();
    requestAnimationFrame(main);
    
    Mouse.canvasfullscreen = 
    Tools.canvasfullscreen = 
    Fullscreen.canvasfullscreen;
    
    Keyboard.varUpdater();
    Mouse.varUpdater();
    Fullscreen.varUpdater();
    
    Mouse.resolutionAdapter();
    Fullscreen.doubleClickToggle();
    Fullscreen.screenScaler();
    ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;
    
    if(Fps.Graphic_Cap(Fps.cap30fps/*75*/)){
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Fps.Log();
        Transition.dt = Fps.dt;
        
        switch(GV.menu) {
            case 1: //Main menu
                MainMenu.displayMenu();
                break;
            case 2: case 9: //Game 
                GameMenu.displayMenu();
                break;
            case 3 : case 4: case 8://Setting
                SettingMenu.displayMenu();
                break;
            case 5: //Map editor select menu
                MapEditorCreateOrLoadMenu.displayMenu();
                break;
            case 6: //Map editor init menu
                MapEditorSetNewMapProperties.displayMenu();
                break;
            case 7: //Map editor edit menu
                MapEditorMenu.displayMenu();
                break;
        }
        if(GV.keys_input[7] === 1 | command === "true"){ //To enter some usefull commands ingame
            push++
            if(push > 60*Fps.dt | GV.devmode){
                if(GV.keys_input[7] === 1){
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
                    ctx.fillText("Release C", Tools.resolutionScaler(385), Tools.resolutionScaler(350));
                    command = "true";
                }else{
                    command = prompt("Enter a command:");
                    switch(command)
                    {
                        case null:
                            break
                        case "devmode true": case "devmode enable":
                            GV.devmode = true;
                            break
                        case "devmode false": case "devmode disable":
                            GV.devmode = false;
                            break
                        case "godmode true": case "godmode enable":
                            GV.godmode = true;
                            break
                        case "godmode false": case "godmode disable" :
                            GV.godmode = false;
                            break
                        case "reset":
                            
                            break
                        default:
                            alert("invalid command")
                            break
                    }
                    push = 0;
                    key_press = "N/A";
                    keynb = "N/A";
                }
            }
        }else{
            push = 0;
        }
        // console.log(Keyboard.any_key_press, Keyboard.any_key_pressed)
        Mouse.mousePressed()
        Keyboard.keyPressed()

        Transition.displayer()
        ctx.font = Tools.resolutionScaler(20)+'px arial';
        ctx.lineWidth = Tools.resolutionScaler(1);
        if(GV.devmode){
            ctx.fillStyle = "rgb(255,255,255)";

            Tools.logText("x : "+Mouse.x, 1125, 25); //mouse pos
            Tools.logText("y : "+Mouse.y, 1125, 50)

            Tools.logText(Keyboard.key_input, 1100, 75); //key pressed
            Tools.logText("|", 1141, 75);
            Tools.logText(Keyboard.key_id, 1152, 75);

            Tools.logText("Click : "+Mouse.click_left, 1091, 100); //Mouse.click_left

            Tools.logText("Fullscreen : "+Fullscreen.canvasfullscreen, 1043, 125); //fullscreen

            Tools.logText("Inputs : "+GV.keys_input, 945, 150); //input

            if(GV.menu === 2 | GV.menu === 9 | 1){
                ctx.fillStyle = "rgb(255,255,255)";

                Tools.logText("Collisions : "+MapData.collisions, 963, 175); //collisions

                Tools.logText("PX : "+Math.round(Player.playerX), 985, 200); //px
                Tools.logText("|", 1080, 200);
                Tools.logText("OffOnX : "+MapData.offsetX_on, 1092, 200);
                
                Tools.logText("PY : "+Math.round(Player.playerY), 985, 225); //py
                Tools.logText("|", 1080, 225);
                Tools.logText("OffOnY : "+MapData.offsetY_on, 1092, 225);
                
                Tools.logText("VX : "+Math.round(GameMenu.vect[0]), 985, 250); //vect
                Tools.logText("|", 1080, 250);
                Tools.logText("VY : "+GameMenu.vect[1], 1092, 250);
                
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
        if(Fps.showfps){    
            ctx.fillStyle = "rgb(0,255,0)";
            Tools.logText(Fps.fps+" GFPS "+Number.parseFloat(Fps.dt).toPrecision(3)+" DT", 20, 25, "rgb(0,255,0)", "rgb(0,100,0)"); //GFPS = Frame d'affichage
            Tools.logText(Fps.pfpslog+" PFPS ", 20, 50, "rgb(0,255,0)", "rgb(0,100,0)"); // PFPS = frame de physique
            Tools.logText("Main : "+Number.parseFloat(MainLoop.log).toPrecision(3)+" ms", 20, 75, "rgb(0,255,0)", "rgb(0,100,0)"); //Temps de latence entre le début et la fin de la frame
            Tools.logText("-Player velocity : "+Number.parseFloat(Player.physics_loop_log).toPrecision(3)+" ms", 40, 100, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Collisions : "+Number.parseFloat(MapData.collisions_loop_log).toPrecision(3)+" ms", 40, 125, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Camsmoother : "+Number.parseFloat(MapData.cam_smoother_loop_log).toPrecision(3)+" ms", 40, 150, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Map display : "+Number.parseFloat(MapData.graphics_loop_log).toPrecision(3)+" ms", 40, 175, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Player display : "+Number.parseFloat(Player.display_loop_log).toPrecision(3)+" ms", 40, 200, "rgb(0,255,0)", "rgb(0,100,0)");
        }
        previousmouseX = Mouse.animatic_mouse_value[0];
        previousmouseY = Mouse.animatic_mouse_value[1];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
        ctx.fillText("pre 0.6", Tools.resolutionScaler(565), Tools.resolutionScaler(660));
    }
    MainLoop.endLogTime()
}

main();