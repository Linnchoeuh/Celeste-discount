//TO DO:
//add MapData editor
//add New MapData assets
//Rework collisions
//add Particles
//wall jump

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
//Objets     : TwoWords_

import * as levels from "./includes/menus/game_menu/levels.js";
class Globals_Variable
{
    constructor(){
        this.initial_canvas_width  = 1200; //(4/3) = 900px | (18/9) = 1350 | (21/9) = 1575 | (32/9) = 2400 //default 1200
        this.initial_canvas_height = 675; //default 675
        this.canvas_width  = this.initial_canvas_width; 
        this.canvas_height = this.initial_canvas_height;
        this.scaled_screen_width = screen.width/(screen.height/this.initial_canvas_height);
        this.scaled_screen_height = screen.height/(screen.height/this.initial_canvas_height);
        
        this.interpolation_toggle = true;
        this.devmode = true;
        this.godmode = true;
        this.camsmootherenable = false;
        this.stroking_text = true;
        this.menu = 2;
        this.last_menu = -1;
        this.start = true;
        this.level = ["testlevel", levels.leveltest1]; 
        this.levelid = 1;
        this.editedlevelid = 0;

        // this.keys_input = [0,0,0,0,0,0,0,0,0,0];
        // this.keypressed = false;

        //Colors
        this.ColorPalette_ = {
            white         : "#ffffff",
            light_gray    : "#e1e1e1", // (225,225,225)
            gray          : "#969696", // (150,150,150)
            average_gray  : "#646464", // (100,100,100)
            dark_gray     : "#4b4b4b", // (75 ,75 ,75 )
            black         : "#000000",

            red           : "#ff0000",
            average_red   : "#ff324b", // (255,50 ,75  )
            dark_red      : "#640000", // (100,0  ,0  )

            green         : "#00ff00",
            average_green : "#64c832", // (100,200,50 )
            dark_green    : "#006400", // (0  ,100,0  )

            blue          : "#0000ff",
            dark_blue     : "#000064", // (0  ,0  ,100)

            yellow        : "#ffff00",
            dark_yellow   : "#646400", // (100,100,0  )

            cyan          : "#00ffff",
            dark_cyan     : "#006464", // (0  ,100,100)

            purple        : "#ff00ff",
            dark_purple   : "#640064", // (100,0  ,100)
        }
        

        //Images
        this.return_arrow = new Image();
        this.return_arrow.src = "graphics/ui/return_arrow.png";
    }
}
const GV = new Globals_Variable()

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {alpha : false});
canvas.width  = GV.canvas_width;
canvas.height = GV.canvas_height;

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
const MainLoopWithLog = new Timer_Log();
const Tools = new Tool_Kit();
export{Tools, MainLoop, MainLoopWithLog};

import {Player_Data} from "./includes/menus/game_menu/player.js";
const Player = new Player_Data();
export{Player};

import {Map_Data} from "./includes/menus/game_menu/level_reader.js";
const MapData = new Map_Data();
export{MapData};

import {Fps_} from "./includes/display/fps_cap.js";
const Fps = new Fps_();
export{Fps};

import {Transition_} from "./includes/gui/transition.js";
const Transition = new Transition_();
export{Transition};

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
export{GameMenu}

import{Setting_Menu} from "./includes/menus/setting_menu/setting_menu.js";
const SettingMenu = new Setting_Menu();

import{Map_Editor_Create_Or_Load_Menu} from "./includes/menus/map_editor_menu/map_editor_new_or_load_menu.js";
const MapEditorCreateOrLoadMenu = new Map_Editor_Create_Or_Load_Menu();

import{Map_Editor_Set_New_Map_Properties} from "./includes/menus/map_editor_menu/map_editor_set_new_map_properties.js";
const MapEditorSetNewMapProperties = new Map_Editor_Set_New_Map_Properties();

import{Map_Editor_Menu} from "./includes/menus/map_editor_menu/map_editor_menu.js";
const MapEditorMenu = new Map_Editor_Menu();

import{Command_} from "./includes/command.js";
const Command = new Command_();

import{Log_Display} from "./includes/log_display.js";
const LogDisplay = new Log_Display();

// document.addEventListener("visibilitychange", event => {
//     if (document.visibilityState == "visible") {
//         Fps.varUpdater()
//     } else {
//     //   console.log("tab is inactive")
//     }
//   })

function main(){
    requestAnimationFrame(main);

    if(Fps.Graphic_Cap(Fps.cap30fps)){
        MainLoop.startTime();
        MainLoopWithLog.startTime();
        ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;
    
        Mouse.canvasfullscreen = 
        Tools.canvasfullscreen = 
        Fullscreen.canvasfullscreen;
        Player.pre_player_scaling = MapData.pre_block_scaling;
        
        Keyboard.varUpdater();
        Mouse.varUpdater();
        Fullscreen.varUpdater();
        
        Fullscreen.fullscreenChecker();
        Fullscreen.doubleClickToggle();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Fps.varUpdater();
        Fps.Log();
        switch(GV.menu){
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
        };
        
        Mouse.mousePressed();
        Keyboard.keyPressed();
        

        Transition.displayer();
        Command.commandTrigger();
        

        
        MainLoop.endLogTime();

        LogDisplay.displayLog();
        Fps.display();

        ctx.fillStyle = GV.ColorPalette_.white;
        ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
        ctx.fillText("pre 0.6", Tools.resolutionScaler(Tools.placeFromHorizontalCenter(40)), Tools.resolutionScaler(Tools.placeFromBottom(10)));
        MainLoopWithLog.endLogTime();
    };

    
};

main();

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
