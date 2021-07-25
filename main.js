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
        this.menu = 1;
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

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

window.addEventListener('touchstart', function() {
    Mouse.click = true;
});



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
