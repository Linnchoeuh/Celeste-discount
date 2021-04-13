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
//Classes    : Two_Words
//    Dans une variable : TwoWords
//Méthodes   : twoWords


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {alpha : false});
canvas.width = 1200;
canvas.height = 675;

var keys_input = [0,0,0,0,0,0,0,0,0,0];

ctx.canvas.addEventListener('mousemove', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
});
ctx.canvas.addEventListener('mousedown', function(event)
{
    click = true;
});
ctx.canvas.addEventListener('mouseup', function(event)
{
    click = false;
});
document.addEventListener("keydown", function(event)
{
    key_press = String.fromCharCode(event.keyCode);
    switch(event.keyCode)
    {
        case 90:
            keys_input.splice(0, 1, 1); //z
            break
        case 81:
            keys_input.splice(1, 1, 1); //q
            break
        case 83:
            keys_input.splice(2, 1, 1); //s
            break
        case 68:
            keys_input.splice(3, 1, 1); //d
            break
        case 32:
            keys_input.splice(4, 1, 1); //space
            break
        case 16:
            keys_input.splice(5, 1, 1); //shift
            break
        case 80:
            keys_input.splice(6, 1, 1); //p
            break
        case 67:
            keys_input.splice(7, 1, 1); //c
            break
        case 13:
            keys_input.splice(8, 1, 1); //enter
            break
        case 27:
            keys_input.splice(9, 1, 1); //escape
            break
    }
});
document.addEventListener("keyup", function(event)
{
    keynb = event.keyCode
    switch(keynb)
    {
        case 90:
            keys_input.splice(0, 1, 0);
            break
        case 81:
            keys_input.splice(1, 1, 0);
            break
        case 83:
            keys_input.splice(2, 1, 0);
            break
        case 68:
            keys_input.splice(3, 1, 0);
            break
        case 32:
            keys_input.splice(4, 1, 0);
            break
        case 16:
            keys_input.splice(5, 1, 0);
            break
        case 80:
            keys_input.splice(6, 1, 0);
            break
        case 67:
            keys_input.splice(7, 1, 0); //c
            break
        case 13:
            keys_input.splice(8, 1, 0); //enter
            break
        case 27:
            keys_input.splice(9, 1, 0); //escape
            break        
    }
});
document.addEventListener("fullscreenchange", function ()
{
    Fullscreen.canvasfullscreen = (document.fullscreen)? true : false;
}, false);
document.addEventListener("webkitfullscreenchange", function () {
    Fullscreen.canvasfullscreen = (document.webkitIsFullScreen) ? true : false;
}, false);

import * as levels from "./includes/levels.js";
class Globals_Variable
{
    constructor()
    {
        this.godmode = false;
        this.camsmootherenable = true;
        this.devmode = false;
        this.menu = 1;
        this.last_menu = -1;
        this.start = true;
        this.level = ["testlevel", levels.leveltest1]; 
        this.levelid = 1;
        this.editedlevelid = 0;
        this.keypressed = false;
        this.firstgameframe = false;
    }
}
const GV = new Globals_Variable()




export{ctx, GV, keys_input}

import {Tool_Kit, Timer_Log} from "./includes/tools.js";
const MainLoop = new Timer_Log()
const Tools = new Tool_Kit(false, 0, 0);
export{Tools};

import {Map_Data} from "./includes/level_reader.js";
const MapData = new Map_Data();
export{MapData};

import {Transition_} from "./includes/gui/transition.js";
const Transition = new Transition_(ctx);
export{Transition};

import {Fps_} from "./includes/display/fps_cap.js";
const Fps = new Fps_();
export{Fps};

import {Animatic_} from "./includes/animatic.js";
const Button1 = new Animatic_();
const Button2 = new Animatic_();
const Button3 = new Animatic_();
const Button4 = new Animatic_();
const Button5 = new Animatic_();
const Button6 = new Animatic_();
const Button7 = new Animatic_();
const Button8 = new Animatic_();
const Button9 = new Animatic_();
const Button10 = new Animatic_();
const Button11 = new Animatic_();
export{Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Button10, Button11};

import {Player_Data} from "./includes/player.js";
const Player = new Player_Data();
export{Player};

import {Map_Editor} from "./includes/map_editor.js";
const MapEditor = new Map_Editor();

import{Pause_} from "./includes/gui/pause.js";
const Pause = new Pause_()
export{Pause};

import {Canvas_Resolution_Asset} from "./includes/gui/fullscreen_asset.js";
const Fullscreen = new Canvas_Resolution_Asset();
export{Fullscreen};

import{Main_Menu} from "./includes/menus/main_menu/main_menu.js";
const MainMenu = new Main_Menu();

import{Game_Menu} from "./includes/menus/game_menu/game_menu.js";
const GameMenu = new Game_Menu();

// import{Setting_Menu} from "./includes/menus/setting_menu/setting_menu.js";
// const SettingMenu = new Setting_Menu();

var command = "false"; //command
var push = 0;





var return_arrow = Tools.textureLoader("graphics/ui/return_arrow.png");
var no_preview   = Tools.textureLoader("graphics/ui/no_preview.png");

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;

var mouseX = 0;
var mouseY = 0;
var MapDatamousetranslationX = mouseX;
var MapDatamousetranslationY = mouseY;
var previousmouseX = mouseX;
var previousmouseY = mouseY;

var mousepressed = false;



var stock = [0, 0];



//MapEditor
var MapData_move_speed = 20;
var edition_mode = 0;
var sub_edition_mode = 0;
var spawnmodifier = false;
var spawnmodifpossible = true;


// Buttons

var animaticmousevalue = [0, 0];


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
var previousMapDatapropertiesvalue = "";


function openFileOption()
{
    document.getElementById("file1").click();
}

function main()
{
    MainLoop.startTime()
    requestAnimationFrame(main);

    Tools.canvasfullscreen = Fullscreen.canvasfullscreen;
    Tools.mouseX           = mouseX;
    Tools.mouseY           = mouseY;

    Button1.click = Button2.click = 
    Button3.click = Button4.click = 
    Button5.click = Button6.click = 
    Button7.click = Button8.click = 
    Button9.click = Button10.click = 
    Button11.click = click;

    Button1.mouseX = Button2.mouseX = 
    Button3.mouseX = Button4.mouseX = 
    Button5.mouseX = Button6.mouseX = 
    Button7.mouseX = Button8.mouseX = 
    Button9.mouseX = Button10.mouseX = 
    Button11.mouseX = animaticmousevalue[0];

    Button1.mouseY = Button2.mouseY = 
    Button3.mouseY = Button4.mouseY = 
    Button5.mouseY = Button6.mouseY = 
    Button7.mouseY = Button8.mouseY = 
    Button9.mouseY = Button10.mouseY = 
    Button11.mouseY = animaticmousevalue[1];
    
    GV.firstgameframe = Fullscreen.Double_Click_Toggle(click, GV.firstgameframe);
    animaticmousevalue = Fullscreen.Mouse_adapter(mouseX, mouseY, canvas, screen);
    GV.firstgameframe = Fullscreen.Screen_Scaler(canvas, screen, GV.firstgameframe, keys_input);
    ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;

    
    if(Fps.Graphic_Cap(Fps.cap30fps/*75*/))
    {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Fps.Log()
        Transition.dt = Fps.dt
        
        switch(GV.menu) 
        {
            case 1: //Main menu
                MainMenu.displayMenu()
                break;
            case 2: case 9: //Game 
                GameMenu.displayMenu()
                break
            case 3 : case 4: case 8://Setting
                SettingMenu.displayMenu()
                break;
            case 5:
                if(GV.last_menu != 5)
                {
                    GV.last_menu = 5;
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
                ctx.fillText("MapData editor", Tools.resolutionScaler(345), Tools.resolutionScaler(75));

                if(Button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | Transition.transition_state === "finish" & Transition.selectedaction === "menu1")
                {
                    ctx.fillStyle = "rgb(255,255,255)";
                    stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 1)
                    GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                }

                if(Button2.text_type1("New", 0, 225, 320, 100, 20, 300, 80, 85, 90, 95, 3.6, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu6") //create a new file
                {
                    stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 6)
                    GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                }

                if(Button3.text_type1("Load", 0, 400, 320, 100, 20, 475, 80, 85, 90, 95, 3.6, 0.4)) //load a file
                {
                    openFileOption();
                    // console.log(document.getElementById('fileItem').files[0])
                    Button1.click = Button2.click = 
                    Button3.click = Button4.click = 
                    Button5.click = Button6.click = 
                    Button7.click = Button8.click = 
                    Button9.click = Button10.click = 
                    Button11.click = click = false;
                }
                break
            case 6: //MapData creator init GV.menu
                if(GV.last_menu != 6)
                {
                    MapData_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]]
                    GV.last_menu = 6
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
                ctx.fillText("MapData properties", Tools.resolutionScaler(250), Tools.resolutionScaler(75));
                if(Button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Cancel", 50, 70, 20) | Transition.transition_state === "finish" & Transition.selectedaction === "menu5")
                {
                    stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 5)
                    GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                }
                ctx.drawImage(no_preview, Tools.resolutionScaler(262), Tools.resolutionScaler(255), Tools.resolutionScaler(75), Tools.resolutionScaler(75));
                ctx.strokeStyle = "rgb(255,255,255)";
                ctx.strokeRect(Tools.resolutionScaler(12),Tools.resolutionScaler(130),Tools.resolutionScaler(576),Tools.resolutionScaler(324));
                if(Button2.text_type2("Name : "+MapData_pack[3][0][0][0], 600, 130, 600, 60, 620, 180, 40))
                {
                    previousMapDatapropertiesvalue = MapData_pack[3][0][0][0];
                    MapData_pack[3][0][0][0] = prompt("Name GV.level:");
                    if(MapData_pack[3][0][0][0] === null)
                    {
                        MapData_pack[3][0][0][0] = previousMapDatapropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(Button3.text_type2("MapData width : "+MapData_pack[3][0][0][1], 600, 230, 600, 60, 620, 280, 40))
                {
                    previousMapDatapropertiesvalue = MapData_pack[3][0][0][1];
                    MapData_pack[3][0][0][1] = prompt("Set width:");
                    if(MapData_pack[3][0][0][1] === null)
                    {
                        MapData_pack[3][0][0][1] = previousMapDatapropertiesvalue;
                    }
                    MapData_pack[3][0][0][1] = Number(MapData_pack[3][0][0][1])
                    if(isNaN(MapData_pack[3][0][0][1]))
                    {
                        alert("Invalid value.")
                        MapData_pack[3][0][0][1] = previousMapDatapropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(Button4.text_type2("MapData height : "+MapData_pack[3][0][0][2], 600, 330, 600, 60, 620, 380, 40))
                {
                    previousMapDatapropertiesvalue = MapData_pack[3][0][0][2];
                    MapData_pack[3][0][0][2] = prompt("Set height:");
                    if(MapData_pack[3][0][0][2] === null)
                    {
                        MapData_pack[3][0][0][2] = previousMapDatapropertiesvalue;
                    }
                    MapData_pack[3][0][0][2] = Number(MapData_pack[3][0][0][2])
                    if(isNaN(MapData_pack[3][0][0][2]))
                    {
                        alert("Invalid value.")
                        MapData_pack[3][0][0][2] = previousMapDatapropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(Button5.text_type2("Create", 0, 470, 1200, 205, 250, 650, 225, "rgb(255,255,255)", 5) | Transition.transition_state === "finish" & Transition.selectedaction === "menu7")
                {
                    stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 7)
                    GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                }
                break
            case 7:
                if(GV.last_menu != 7)
                {
                    MapData_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]];
                    editedGV.levelid = 0;
                    MapData_pack = GV.level[GV.levelid];
                    GV.start = true;
                    Pause.pause = false;
                    edition_mode = 0;
                    GV.last_menu = 7;
                }
                if(GV.start)
                {
                    // MapEditor.load(MapData_pack);
                    MapEditor.load(GV.level[GV.levelid], editedGV.levelid);
                    GV.start = false;
                }
                MapEditor.display(spawnmodifier);
                
                ctx.font = "Bold "+Tools.resolutionScaler(20)+'px arial';
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillText("["+Math.round(((animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71)+";"+Math.round(((animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)+"]", mouseX+Tools.resolutionScaler(10), mouseY-Tools.resolutionScaler(10));
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth = Tools.resolutionScaler(1);
                ctx.strokeText("["+Math.round(((animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71)+";"+Math.round(((animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)+"]", mouseX+Tools.resolutionScaler(10), mouseY-Tools.resolutionScaler(10));
                
                if(Pause.pause === false)
                {
                    if(Button1.texture_type2(1160, 10, MapEditor.add_block_icon, "Add"))
                    {
                        edition_mode = 0;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    if(Button2.texture_type2(1160, 50, MapEditor.modification_icon, "Modifications"))
                    {
                        edition_mode = 1;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    if(Button3.texture_type2(1160, 90, MapEditor.remove_block_icon, "Delete"))
                    {
                        edition_mode = 2;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    switch(edition_mode)
                    {
                        case 0:
                            ctx.fillText("Add", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                            ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                            
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("block", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("water", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 2:
                                    ctx.fillText("ennemies", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 3:
                                    ctx.fillText("interactive blocks", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 4:
                                    ctx.fillText("decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(13), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                            if(Button4.texture_type2(1160, 170, MapEditor.add_block_icon, "Add blocks"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(Button5.texture_type2(1160, 210, MapEditor.add_water_icon, "Add water"))
                            {
                                sub_edition_mode = 1;
                            }
                            if(Button6.texture_type2(1160, 250, MapEditor.add_ennemy_icon, "Add ennemies"))
                            {
                                sub_edition_mode = 2;
                            }
                            if(Button7.texture_type2(1160, 290, MapEditor.add_interactive_block_icon, "Add interactive blocks"))
                            {
                                sub_edition_mode = 3;
                            }
                            if(Button8.texture_type2(1160, 330, MapEditor.add_decoration_icon, "Add decorations"))
                            {
                                sub_edition_mode = 4;
                            }
                            break
                        case 1:
                            ctx.fillText("Modifications", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                            ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("Move objects", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("Move decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 2:
                                    ctx.fillText("Modify properties", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(53), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                            if(Button4.texture_type2(1160, 170, MapEditor.move_block_icon, "Move objects"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(Button5.texture_type2(1160, 210, MapEditor.move_decoration_icon, "Move decorations"))
                            {
                                sub_edition_mode = 1;
                            }
                            if(Button6.texture_type2(1160, 250, MapEditor.modification_icon, "Modify properties"))
                            {
                                sub_edition_mode = 2;
                            }
                            break
                        
                        case 2:
                            ctx.fillText("Delete", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                            ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("blocks", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(93), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                            if(Button4.texture_type2(1160, 170, MapEditor.remove_block_icon, "Remove blocks"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(Button5.texture_type2(1160, 210, MapEditor.remove_decoration_icon, "Remove decorations"))
                            {
                                sub_edition_mode = 1;
                            }
                            break
                    }
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(173+sub_edition_mode*40), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                    
                    if(Button3.texture_type2(90, 635, MapEditor.play_icon, "Test the MapData", true) | Transition.transition_state === "finish" & Transition.selectedaction === "menu9")
                    {
                        switch(Transition.transition_state)
                        {
                            case "false":
                                Transition.transition_state = "true";
                                Transition.selectedaction = "menu9";
                                break;
                            case "finish":
                                GV.menu = 9;
                                Transition.transition_state = "false";
                                Transition.selectedaction = "N/A";
                                break;
                        }
                        mousepressed = true;
                    }
                    if(Button2.texture_type2(50, 635, MapEditor.end_block_icon, "Add end GV.level zone", true))
                    {
                        mousepressed = true;
                    }
                    if(Button1.texture_type2(10, 635, MapEditor.spawn_icon, "Set spawn point", true))
                    {
                        spawnmodifier = true
                        mousepressed = true;
                    }

                    if(keys_input[5] === 0 & animaticmousevalue[0]-previousmouseX === 0 & animaticmousevalue[1]-previousmouseY === 0 & click & spawnmodifier === false)
                    {
                        MapDatamousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX;
                        MapDatamousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY;
                        mousepressed = true;
                    }
                    
                    if(keys_input[5] === 1)
                    {
                        MapData_move_speed = 0;
                        if(click)
                        {
                            if(mousepressed === false)
                            {
                                MapDatamousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX;
                                MapDatamousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY;
                                mousepressed = true;
                            }
                            if(MapEditor.offsetX >= MapEditor.MapDatalimit[0]*71 & animaticmousevalue[0]-previousmouseX <= 0)
                            {
                                MapEditor.offsetX = MapEditor.MapDatalimit[0]*71;
                                MapDatamousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX;
                            }
                            else if(MapEditor.offsetX <= -1129 & animaticmousevalue[0]-previousmouseX >= 0)
                            {
                                MapEditor.offsetX = -1129;
                                MapDatamousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX;
                            }
                            else
                            {
                                MapEditor.offsetX = Math.round(MapDatamousetranslationX-(animaticmousevalue[0]*(1200/canvas.width)));
                            }

                            if(MapEditor.offsetY >= MapEditor.MapDatalimit[1]*71 & animaticmousevalue[1]-previousmouseY <= 0)
                            {
                                MapEditor.offsetY = MapEditor.MapDatalimit[1]*71;
                                MapDatamousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY;
                            }
                            else if(MapEditor.offsetY <= -604 & animaticmousevalue[1]-previousmouseY >= 0)
                            {
                                MapEditor.offsetY = -604;
                                MapDatamousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY;
                            }
                            else
                            {
                                MapEditor.offsetY = Math.round(MapDatamousetranslationY-(animaticmousevalue[1]*(675/(canvas.height))));
                            }

                        }
                        ctx.fillStyle = "rgba(50,50,50,0.6)";
                        ctx.fillRect(Math.round((animaticmousevalue[0]-Tools.resolutionScaler(35-MapEditor.offsetX%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetX%71), 
                                     Math.round((animaticmousevalue[1]-Tools.resolutionScaler(35-MapEditor.offsetY%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetY%71), 
                                     Tools.resolutionScalerAddOne(71), Tools.resolutionScalerAddOne(71));

                    }
                    else
                    {
                        MapData_move_speed = Math.round(20/Fps.dt);
                        if(spawnmodifier)
                        {
                            ctx.fillStyle = "rgba(255,25,0,0.2)";
                            ctx.fillRect(Math.round((animaticmousevalue[0]-Tools.resolutionScaler(35-MapEditor.offsetX%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetX%71), 
                                         Math.round((animaticmousevalue[1]-Tools.resolutionScaler(35-MapEditor.offsetY%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetY%71), 
                                         Tools.resolutionScalerAddOne(71), Tools.resolutionScalerAddOne(71));
                            
                            if(mousepressed === false & click)
                            {
                                MapEditor.spawn = [Math.round(((animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71),
                                                   Math.round(((animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)];
                                // console.log(MapEditor.spawn);
                                GV.level[GV.levelid][3][editedGV.levelid][0][3] = Math.round(((animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71);
                                GV.level[GV.levelid][3][editedGV.levelid][0][4] = Math.round(((animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY-35)/71);
                                // MapData_pack[3][0][0][3] = Math.round(((animaticmousevalue[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71);
                                // MapData_pack[3][0][0][4] = Math.round(((animaticmousevalue[1]*(675/canvas.height))+MapEditor.offsetY-35)/71);
                                spawnmodifier = false;
                                // GV.start = true;
                            }
                        }

                    }
                    if(keys_input[0] === 1 & MapEditor.offsetY > -604)
                    {
                        MapEditor.offsetY -= MapData_move_speed;
                        if(MapEditor.offsetY < -604)
                        {
                            MapEditor.offsetY = -604;
                        }
                    }
                    if(keys_input[2] === 1 & MapEditor.offsetY < ((MapEditor.MapDatalimit[1])*71))
                    {
                        MapEditor.offsetY += MapData_move_speed;
                        if(MapEditor.offsetY > ((MapEditor.MapDatalimit[1])*71))
                        {
                            MapEditor.offsetY = ((MapEditor.MapDatalimit[1])*71);
                        }
                    }
                    if(keys_input[3] === 1 & MapEditor.offsetX < ((MapEditor.MapDatalimit[0])*71))
                    {
                        MapEditor.offsetX += MapData_move_speed;
                        if(MapEditor.offsetX > ((MapEditor.MapDatalimit[0])*71))
                        {
                            MapEditor.offsetX = ((MapEditor.MapDatalimit[0])*71);
                        }
                    }
                    if(keys_input[1] === 1)
                    {
                        MapEditor.offsetX -= MapData_move_speed;
                        if(MapEditor.offsetX < -1129)
                        {
                            MapEditor.offsetX = -1129;
                        }
                    }
                }
                

                if(Pause.pause === false)
                {
                    ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText("Press P to show the GV.menu", Tools.resolutionScaler(875), Tools.resolutionScaler(640)); //mouse pos
                    ctx.fillText("Press H to get the control ", Tools.resolutionScaler(875), Tools.resolutionScaler(665)); //mouse pos
                }
                if(keys_input[6] === 1 & Pause.pkey === false | Pause.pause) //Pause.pause
                {
                    GV.keypressed = Pause.Toggle("Pause", GV.keypressed, keys_input, Fps.dt)

                    ctx.fillStyle = "rgb(255,255,255)";

                    if(Button1.text_type1("Resume", 0, 145, 195, 40, -180+(Pause.pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
                    {
                        Pause.endpause = true;
                    }

                    if(Button2.text_type1("Setting", 0, 222, 175, 40, -180+(Pause.pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | Transition.transition_state === "finish" & Transition.selectedaction === "menu8") //setting
                    {
                        stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 8)
                        GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                        if(stock[4])
                        {
                            Pause.endpause = false;
                            Pause.pause = true;
                            Pause.pauseframe = 10;
                        }
                    }

                    if(Button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 295, 380, 40, -180+(Pause.pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                    {
                        GV.firstgameframe = true;
                        Fullscreen.Toggle(canvas);
                    }

                    if(Button4.text_type1("Modify MapData properties", 0, 370, 470, 40, -180+(Pause.pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "bop") //back to GV.menu
                    {
                    }
                    if(Button5.text_type1("Change MapData", 0, 445, 285, 40, -180+(Pause.pauseframe*20), 475, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "bop") //back to GV.menu
                    {
                    }
                    if(Button6.text_type1("Quit", 0, 520, 125, 40, -180+(Pause.pauseframe*20), 550, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu5") //back to GV.menu
                    {
                        stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 5)
                        GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                        if(stock[4])
                        {
                            Pause.endpause = false;
                            Pause.pause = false;
                            Pause.pauseframe = 0;
                        }
                    }
                }
                
                break
        }
        if(keys_input[7] === 1 | command === "true") //To enter some usefull commands ingame
        {
            push++
            if(push > 60 | GV.devmode)
            {
                if(keys_input[7] === 1)
                {
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
                    ctx.fillText("Release C", Tools.resolutionScaler(385), Tools.resolutionScaler(350));
                    command = "true";
                }    
                else
                {
                    command = "";
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
        }
        else
        {
            push = 0;
        }
        if(click)
        {
            mousepressed = true;
            Fullscreen.doubleclickfullscreenmousepressed = true;
        }
        else
        {
            mousepressed = false;
            Fullscreen.doubleclickfullscreenmousepressed = false;
        }
        Button1.mousepressed = Button2.mousepressed = 
        Button3.mousepressed = Button4.mousepressed = 
        Button5.mousepressed = Button6.mousepressed = 
        Button7.mousepressed = Button8.mousepressed = 
        Button9.mousepressed = Button10.mousepressed = 
        Button11.mousepressed = mousepressed;
        for(let i = 0; i < keys_input.length; ++i)
        {    
            if(keys_input[i] === 0)
            {
                GV.keypressed = false;
                Pause.pkey = false;
            }
            else
            {
                GV.keypressed = true;
                if(keys_input[6] === 1)
                {
                    Pause.pkey = true;
                }
                break;
            }
        }
        Transition.displayer()
        ctx.font = Tools.resolutionScaler(20)+'px arial';
        ctx.lineWidth = Tools.resolutionScaler(1);
        if(GV.devmode)
        {
            ctx.fillStyle = "rgb(255,255,255)";

            Tools.logText("x : "+mouseX, 1125, 25); //mouse pos
            Tools.logText("y : "+mouseY, 1125, 50)

            Tools.logText(key_press, 1100, 75); //key pressed
            Tools.logText("|", 1141, 75);
            Tools.logText(keynb, 1152, 75);

            Tools.logText("Click : "+click, 1091, 100); //click

            Tools.logText("Fullscreen : "+Fullscreen.canvasfullscreen, 1043, 125); //fullscreen

            Tools.logText("Inputs : "+keys_input, 945, 150); //input

            if(GV.menu === 2 | GV.menu === 9 | 1)
            {
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
                
                
                Tools.logText(Transition.transition_state+"   "+Transition.Transition.selectedaction+"      "+Fps.fps/Fps.pfpslog , 1000, 500); //-------------------------------------------------------test var------------------------------------------------
            }
            if(GV.menu === 7)
            {
                
                Tools.logText("OX : "+Math.round(MapEditor.offsetX), 985, 275); //offset
                Tools.logText("|", 1080, 275);
                Tools.logText("OY : "+MapEditor.offsetY, 1092, 275);

                Tools.logText(Transition.currentfadestate+"    " , 1000, 500); //-------------------------------------------------------test var-----------------------------------------------
            }
        }
        if(Fps.showfps)
        {    
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
        previousmouseX = animaticmousevalue[0];
        previousmouseY = animaticmousevalue[1];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
        ctx.fillText("pre 0.6", Tools.resolutionScaler(565), Tools.resolutionScaler(660));
    }
    MainLoop.endLogTime()
}

main();