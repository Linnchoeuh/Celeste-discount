//TO DO:
//Map editor
//New map assets
//Rework collisions

//Particles

//DID:
//Cap 30fps
//Double click for fullscreen
//reworked button system + add a new animated button type
//map displaying optimisation
//adapting ui animation for variable framerate
//Physic clock more stable
//Interpolation improved

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", {alpha : false});
canvas.width = 1200;
canvas.height = 675;

var keys_input = [0,0,0,0,0,0,0,0,0,0]

ctx.canvas.addEventListener('mousemove', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var status = document.getElementById("status");
});
ctx.canvas.addEventListener('mousedown', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var clicking = document.getElementById("clicking");
    click = true
});
ctx.canvas.addEventListener('mouseup', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var clicking = document.getElementById("clicking");
    click = false
});
document.addEventListener("keydown", function(event)
{
    key_press = String.fromCharCode(event.keyCode);
    keynb = event.keyCode
    switch(keynb)
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

var return_arrow = new Image();
return_arrow.src = "graphics/ui/return_arrow.png";
var bg = new Image();
bg.src = "graphics/map_content/background.png";
var plus = new Image();
plus.src = "graphics/ui/plus.png";
var minus = new Image();
minus.src = "graphics/ui/minus.png";
var no_preview = new Image();
no_preview.src = "graphics/ui/no_preview.png";

import {upscale, gupscale, ui_var_updater, ui_var_updater2, ui_var_updater3} from "./includes/tools.js";
import {Pause} from "./includes/gui/pause.js";
import {Transition} from "./includes/gui/Transition.js";
import {Canvas_resolution_asset} from "./includes/gui/fullscreen_asset.js"
import {FPS} from "./includes/display/fps_cap.js"
import {Animatic} from "./includes/animatic.js";
import {MapData} from "./includes/level_reader.js";
import {PlayerData} from "./includes/player.js";
import * as levels from "./includes/levels.js";
import {MapEditor} from "./includes/map_editor.js";


var command = "false"; //command
var push = 0;
var devmode = true;
var godmode = false;
var camsmootherenable = true;

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;
var menu = 1;
var lastmenu = -1;
var mouseX = 0;
var mouseY = 0;
var mapmousetranslationX = mouseX;
var mapmousetranslationY = mouseY;
var previousmouseX = mouseX;
var previousmouseY = mouseY;
var keypressed = false;
var mousepressed = false;
var transition = "false";
var selectedaction = "N/A";
var Fullscreen = new Canvas_resolution_asset();
var Fps = new FPS();

//game
var level = ["testlevel", levels.leveltest1, levels.leveltest2, levels.leveltest3]; 
var levelid = 1;
let map = new MapData(level[levelid]);
var start = true;
let player = new PlayerData();
let mapeditor = new MapEditor(ctx);
var vect = [0, 0];
var stock = [0, 0];

//Game running
var PAUSE = new Pause(ctx)
var playerinterpoX = 0;
var camerainterpoX = 0;
var playerinterpoY = 0;
var camerainterpoY = 0;
var smoothinterpoX = 0;
var smoothinterpoY = 0;

//mapeditor
var map_move_speed = 20;
var edition_mode = 0;
var sub_edition_mode = 0;
var spawnmodifier = false;
var spawnmodifpossible = true;
var editedlevelid = 0;

//Optimisation
var firstgameframe = false;

// Buttons
var TransitionObject = new Transition(ctx);
var animaticmousevalue = [0, 0];
var button1 = new Animatic(ctx);
var button2 = new Animatic(ctx);
var button3 = new Animatic(ctx);
var button4 = new Animatic(ctx);
var button5 = new Animatic(ctx);
var button6 = new Animatic(ctx);
var button7 = new Animatic(ctx);
var button8 = new Animatic(ctx);
var button9 = new Animatic(ctx);
var button10 = new Animatic(ctx);
var button11 = new Animatic(ctx);

// Map editor
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

var map_element = {
    "Name" : "",
    "Map_limit" : {
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

var map_pack = {
    "Map_certificate" : "CelesteDiscountMapApprovedCerticate",
    "Map_count" : 1,
    "Name" : "",
    "Maps" : [map_element]
};
// console.log(map_pack.Maps[0].Blocks[0].Collisions.Top)
var map_pack = ["CelesteDiscountMapApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[],[]]]]; //[MapCertifcate, number of map, name of the map pack,
                                                                                                 //    [maps
                                                                                                 //        [Nom, maplimitx, maplimity, playerspawnx, playerspawny],
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
var previousmappropertiesvalue = "";

//setting

map.ctx = ctx
map.devmode = devmode
player.ctx = ctx;
ui_var_updater(ctx);
ui_var_updater2(devmode);


function openFileOption()
{
    document.getElementById("file1").click();
}

function lerp(n, time)
{
    return n*time;
}

function main()
{
    requestAnimationFrame(main);
    ui_var_updater3(Fullscreen.canvasfullscreen, Fullscreen.fullscreenupscale, mouseX, mouseY);
    button1.click = button2.click = 
    button3.click = button4.click = 
    button5.click = button6.click = 
    button7.click = button8.click = 
    button9.click = button10.click = 
    button11.click = click;
    
    
    
    button1.mouseX = button2.mouseX = 
    button3.mouseX = button4.mouseX = 
    button5.mouseX = button6.mouseX = 
    button7.mouseX = button8.mouseX = 
    button9.mouseX = button10.mouseX = 
    button11.mouseX = animaticmousevalue[0];

    button1.mouseY = button2.mouseY = 
    button3.mouseY = button4.mouseY = 
    button5.mouseY = button6.mouseY = 
    button7.mouseY = button8.mouseY = 
    button9.mouseY = button10.mouseY = 
    button11.mouseY = animaticmousevalue[1];
    
    firstgameframe = Fullscreen.Double_Click_Enabler_disabler(click, firstgameframe);
    animaticmousevalue = Fullscreen.Mouse_adapter(mouseX, mouseY, canvas, screen);
    firstgameframe = Fullscreen.Screen_Scaler(canvas, screen, firstgameframe, keys_input);

    
    if(Fps.Graphic_Cap(/*Fps.cap30fps*/75))
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Fps.Log()
        TransitionObject.dt = Fps.dt
        
        switch(menu) 
        {
            case 1: //Main menu
                if(lastmenu != 1)
                {
                    lastmenu = 1
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(button1.text_type1("--Play--", 410, 375, 385, 60, 520, 420, 48, 54, 58, 60) | transition === "finish" & selectedaction === "menu2") //play
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 2)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }
                if(button2.text_type1("--Setting--", 410, 475, 385, 60, 487, 520, 48, 54, 58, 60, -0.7) | transition === "finish" & selectedaction === "menu3") //setting
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 3)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }
                if(button3.text_type1("--Map editor--", 410, 575, 385, 60, 445, 620, 48, 54, 58, 60, -1.4) | transition === "finish" & selectedaction === "menu5") //setting
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 5)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }
                break
            case 2: case 9: //Game 
                if(lastmenu != 2)
                {
                    // previousgfpsframetiming = gfpsframetiming = Date.now();
                    Fps.gfpsintervaltiming = 0;
                    start = true;
                    vect = [0, 0];
                    lastmenu = 2;
                }
                ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;

                if(start)
                {
                    player.reset();
                    map.reset();
                    vect = [0, 0];
                    player.spawn(map.start(level[levelid], editedlevelid));
                    start = false;
                }
                ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));

                
                

                if(Fps.Physics_Refresh_Cap(60)) //gestion de la physique
                {
                    for(var i = 0; i <= Fps.executionloop; i++)
                    {
                        player.previousplayerX = player.playerX;
                        player.previousplayerY = player.playerY;
                        map.previousoffsetX = map.offsetX;
                        map.previousoffsetY = map.offsetY;

                        vect = player.velocity(keys_input, vect[0], vect[1], godmode, map.collisions, map.offsetX_on, map.offsetY_on, map.bestdown[4], PAUSE.pause);
                        stock = map.collider(player.playerX, player.playerY, vect[0], vect[1], PAUSE.pause);
                        map.fcamsmoother(camsmootherenable, PAUSE.pause);
                        

                        player.playerX = stock[0];
                        player.playerY = stock[1];
                        playerinterpoX = lerp(player.playerX-player.previousplayerX, Fps.pfpslog/Fps.fps);
                        playerinterpoY = lerp(player.playerY-player.previousplayerY, Fps.pfpslog/Fps.fps);

                        camerainterpoX = lerp(map.offsetX-map.previousoffsetX, Fps.pfpslog/Fps.fps);
                        camerainterpoY = lerp(map.offsetY-map.previousoffsetY, Fps.pfpslog/Fps.fps);

                        smoothinterpoX = lerp(map.camsmoother[0]-map.previouscamsmoother[0], Fps.pfpslog/Fps.fps);
                        smoothinterpoY = lerp(map.camsmoother[1]-map.previouscamsmoother[1], Fps.pfpslog/Fps.fps);
                        Fps.executionloop--;
                        Fps.Physic_log();
                    }
                }
                
                

                map.display(   player.previousplayerX+playerinterpoX*Fps.nbofframewithoutphysics,     player.previousplayerY+playerinterpoY*Fps.nbofframewithoutphysics, PAUSE.pause,
                               map.previousoffsetX+camerainterpoX*Fps.nbofframewithoutphysics,        map.previousoffsetY+camerainterpoY*Fps.nbofframewithoutphysics, 
                               map.previouscamsmoother[0]+smoothinterpoX*Fps.nbofframewithoutphysics, map.previouscamsmoother[1]+smoothinterpoY*Fps.nbofframewithoutphysics);
                
                player.display(map.collisions, PAUSE.pause, Fps.dt,
                               map.previouscamsmoother[0]+smoothinterpoX*Fps.nbofframewithoutphysics, map.previouscamsmoother[1]+smoothinterpoY*Fps.nbofframewithoutphysics,
                               player.previousplayerX+playerinterpoX*Fps.nbofframewithoutphysics,     player.previousplayerY+playerinterpoY*Fps.nbofframewithoutphysics);
                
                Fps.nbofframewithoutphysics++;
                
                keypressed = PAUSE.Enabler_disabler("Pause", keypressed, keys_input, Fps.dt)
                if(PAUSE.pause) //pause
                {
                    ctx.fillStyle = "rgb(255,255,255)";
                    if(button1.text_type1("Resume", 0, 145, 195, 40, -180+(PAUSE.pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
                    {
                        PAUSE.endpause = true;
                    }
                    if(menu === 2)
                    {
                        if(button2.text_type1("Setting", 0, 222, 175, 40, -180+(PAUSE.pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | transition === "finish" & selectedaction === "menu4") //setting
                        {
                            stock = TransitionObject.Switcher(transition, menu, selectedaction, 4)
                            menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                            if(stock[4])
                            {
                                PAUSE.endpause = false;
                                PAUSE.pause = true;
                                PAUSE.pauseframe = 10;
                            }
                        }

                        if(button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 295, 380, 40, -180+(PAUSE.pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                        {
                            firstgameframe = true;
                            Fullscreen.Enabler_disabler(canvas);
                        }

                        if(button4.text_type1("Back to menu", 0, 370, 305, 40, -180+(PAUSE.pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "menu1") //back to menu
                        {
                            stock = TransitionObject.Switcher(transition, menu, selectedaction, 1)
                            menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                            if(stock[4])
                            {
                                PAUSE.pause = PAUSE.endpause = false;
                                PAUSE.pauseframe = 0;
                                ctx.webkitImageSmoothingEnabled = true;
                                ctx.msImageSmoothingEnabled = true;
                                ctx.imageSmoothingEnabled = true;
                            }
                        }
                    }
                    else
                    {   
                        if(button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 222, 380, 40, -180+(PAUSE.pauseframe*20), 250, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                        {
                            firstgameframe = true;
                            Fullscreen.Enabler_disabler(canvas)
                        }

                        if(button4.text_type1("Back to edition", 0, 295, 330, 40, -180+(PAUSE.pauseframe*20), 325, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "menu7") //back to menu
                        {
                            stock = TransitionObject.Switcher(transition, menu, selectedaction, 7, true)
                            menu = stock[0]; transition = stock[1]; selectedaction = stock[2]; lastmenu = stock[3];
                            if(stock[4])
                            {
                                PAUSE.pause = PAUSE.endpause = false;
                            }
                        }
                    }

                    
                }
                else
                {
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText("Press P to pause the game", upscale(875), upscale(665)); //mouse pos
                }
                break
            case 3 : case 4: case 8://Setting
                if(lastmenu != 3)
                {
                    lastmenu = 3;
                }
                if(button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | transition === "finish" & selectedaction === "menu3.2")
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu3.2";
                            break;
                        case "finish":
                            switch(menu)
                            {
                                case 3:
                                    menu = 1;
                                    break;
                                case 4:
                                    lastmenu = menu = 2;
                                    break;
                                case 8:
                                    lastmenu = menu = 7;
                                    break;
                            }
                            transition = "false";
                            selectedaction = "N/A";
                            break;
                    }   
                }
                if(Fps.showfps)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button2.text_type1("Show FPS", 0, 130, 320, 60, 20, 175, 40, 45, 50, 55, 3.6, 0.4)) //show Fps.fps button
                {
                    if(Fps.showfps)
                    {
                        Fps.showfps = false;
                    }
                    else
                    {
                        Fps.showfps = true;
                    }
                }

                if(Fullscreen.canvasfullscreen)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 230, 535, 60, 20, 275, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen button
                {
                    firstgameframe = true;
                    Fullscreen.Enabler_disabler(canvas);
                }

                if(Fullscreen.fullscreenupscale)
                {
                    ctx.font = "Bold "+upscale(40)+'px arial';
                    ctx.fillStyle = "rgb(100,100,100)";
                    ctx.fillText("Fullscreen downscale", upscale(120), upscale(435));
                    ctx.fillStyle = "rgb(100,200,50)";
                    Fullscreen.fullscreendownscale = false;
                    Fullscreen.fullscreendownscalefactor = 5;
                }
                else
                {
                    if(Fullscreen.fullscreendownscale)
                    {
                        ctx.fillStyle = "rgb(255,255,255)";
                        ctx.font = "Bold "+upscale(40)+'px arial';
                        ctx.fillText(Fullscreen.fullscreendownscalefactor*20+"%", upscale(900), upscale(435));
                        if(Fullscreen.fullscreendownscalefactor > 1)
                        {
                            if(button4.texture_type1(minus, 800, 391, 60, 60, 805, 396, [48,48], 55, 65, 70) | keys_input[5] === 1 & keypressed === false | transition === "finish" & selectedaction === "menu3.2")
                            {
                                Fullscreen.fullscreendownscalefactor--;
                                firstgameframe = true;
                            }
                        }
                        if(Fullscreen.fullscreendownscalefactor < 5)
                        {
                            if(button5.texture_type1(plus, 1000, 391, 60, 60, 1005, 396, [48,48], 55, 65, 70) | keys_input[5] === 1 & keypressed === false | transition === "finish" & selectedaction === "menu3.2")
                            {
                                if(Fullscreen.fullscreendownscalefactor == 4)
                                {
                                    Fullscreen.fullscreendownscale = false;
                                }
                                else
                                {
                                    Fullscreen.fullscreendownscalefactor++;
                                }
                                firstgameframe = true;
                            }
                        }
                        ctx.fillStyle = "rgb(100,200,50)";
                    }
                    else
                    {
                        ctx.fillStyle = "rgb(255,50,75)";
                    }
                    if(button6.text_type1("Fullscreen downscale", 100, 391, 660, 60, 120, 435, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen
                    {
                        if(Fullscreen.fullscreendownscale)
                        {
                            Fullscreen.fullscreendownscale = false;
                            Fullscreen.fullscreendownscalefactor = 5;
                        }
                        else
                        {
                            Fullscreen.fullscreendownscale = true;
                            Fullscreen.fullscreendownscalefactor = 4;
                        }
                        firstgameframe = true;
                    }
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button7.text_type1("Fullscreen upscale", 0, 330, 560, 60, 20, 375, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen upscale button
                {
                    if(Fullscreen.fullscreenupscale)
                    {
                        Fullscreen.fullscreenupscale = false;
                    }
                    else
                    {
                        Fullscreen.fullscreenupscale = true;
                    }
                    firstgameframe = true;
                }


                if(Fps.cap30fps === 30)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button8.text_type1("Cap the game at 30fps", 0, 490, 650, 60, 20, 535, 40, 45, 50, 55, 4.5, 0.4)) //lock the framerate at 30fps
                {
                    if(Fps.cap30fps === 30)
                    {
                        Fps.cap30fps = -1;
                    }
                    else
                    {
                        Fps.cap30fps = 30;
                        // previousgfpsframetiming = gfpsframetiming = Date.now();
                    }
                    Fps.gfpsintervaltiming = 0;
                }
                break;
            case 5:
                if(lastmenu != 5)
                {
                    lastmenu = 5;
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "Bold "+upscale(100)+'px arial';
                ctx.fillText("Map editor", upscale(345), upscale(75));

                if(button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | transition === "finish" & selectedaction === "menu1")
                {
                    ctx.fillStyle = "rgb(255,255,255)";
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 1)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }

                if(button2.text_type1("New", 0, 225, 320, 100, 20, 300, 80, 85, 90, 95, 3.6, 0.4) | transition === "finish" & selectedaction === "menu6") //create a new file
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 6)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }

                if(button3.text_type1("Load", 0, 400, 320, 100, 20, 475, 80, 85, 90, 95, 3.6, 0.4)) //load a file
                {
                    openFileOption();
                    // console.log(document.getElementById('fileItem').files[0])
                    button1.click = button2.click = 
                    button3.click = button4.click = 
                    button5.click = button6.click = 
                    button7.click = button8.click = 
                    button9.click = button10.click = 
                    button11.click = click = false;
                }
                break
            case 6: //Map creator init menu
                if(lastmenu != 6)
                {
                    map_pack = ["CelesteDiscountMapApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]]
                    lastmenu = 6
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "Bold "+upscale(100)+'px arial';
                ctx.fillText("Map properties", upscale(250), upscale(75));
                if(button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Cancel", 50, 70, 20) | transition === "finish" & selectedaction === "menu5")
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 5)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }
                ctx.drawImage(no_preview, upscale(262), upscale(255), upscale(75), upscale(75));
                ctx.strokeStyle = "rgb(255,255,255)";
                ctx.strokeRect(upscale(12),upscale(130),upscale(576),upscale(324));
                if(button2.text_type2("Name : "+map_pack[3][0][0][0], 600, 130, 600, 60, 620, 180, 40))
                {
                    previousmappropertiesvalue = map_pack[3][0][0][0];
                    map_pack[3][0][0][0] = prompt("Name level:");
                    if(map_pack[3][0][0][0] === null)
                    {
                        map_pack[3][0][0][0] = previousmappropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(button3.text_type2("Map width : "+map_pack[3][0][0][1], 600, 230, 600, 60, 620, 280, 40))
                {
                    previousmappropertiesvalue = map_pack[3][0][0][1];
                    map_pack[3][0][0][1] = prompt("Set width:");
                    if(map_pack[3][0][0][1] === null)
                    {
                        map_pack[3][0][0][1] = previousmappropertiesvalue;
                    }
                    map_pack[3][0][0][1] = Number(map_pack[3][0][0][1])
                    if(isNaN(map_pack[3][0][0][1]))
                    {
                        alert("Invalid value.")
                        map_pack[3][0][0][1] = previousmappropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(button4.text_type2("Map height : "+map_pack[3][0][0][2], 600, 330, 600, 60, 620, 380, 40))
                {
                    previousmappropertiesvalue = map_pack[3][0][0][2];
                    map_pack[3][0][0][2] = prompt("Set height:");
                    if(map_pack[3][0][0][2] === null)
                    {
                        map_pack[3][0][0][2] = previousmappropertiesvalue;
                    }
                    map_pack[3][0][0][2] = Number(map_pack[3][0][0][2])
                    if(isNaN(map_pack[3][0][0][2]))
                    {
                        alert("Invalid value.")
                        map_pack[3][0][0][2] = previousmappropertiesvalue;
                    }
                }
                ctx.fillStyle = "rgb(255,255,255)";
                if(button5.text_type2("Create", 0, 470, 1200, 205, 250, 650, 225, "rgb(255,255,255)", 5) | transition === "finish" & selectedaction === "menu7")
                {
                    stock = TransitionObject.Switcher(transition, menu, selectedaction, 7)
                    menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                }
                break
            case 7:
                if(lastmenu != 7)
                {
                    map_pack = ["CelesteDiscountMapApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]];
                    editedlevelid = 0;
                    map_pack = level[levelid];
                    start = true;
                    PAUSE.pause = false;
                    edition_mode = 0;
                    lastmenu = 7;
                }
                
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
                if(start)
                {
                    // mapeditor.load(map_pack);
                    mapeditor.load(level[levelid], editedlevelid);
                    start = false;
                }
                mapeditor.display(spawnmodifier);
                
                ctx.font = "Bold "+upscale(20)+'px arial';
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillText("["+Math.round(((animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX-35)/71)+";"+Math.round(((animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY-35)/71)+"]", mouseX+upscale(10), mouseY-upscale(10));
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth = upscale(1);
                ctx.strokeText("["+Math.round(((animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX-35)/71)+";"+Math.round(((animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY-35)/71)+"]", mouseX+upscale(10), mouseY-upscale(10));
                
                if(PAUSE.pause === false)
                {
                    if(button1.texture_type2(1160, 10, mapeditor.add_block_icon, "Add"))
                    {
                        edition_mode = 0;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    if(button2.texture_type2(1160, 50, mapeditor.modification_icon, "Modifications"))
                    {
                        edition_mode = 1;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    if(button3.texture_type2(1160, 90, mapeditor.remove_block_icon, "Delete"))
                    {
                        edition_mode = 2;
                        sub_edition_mode = 0;
                        mousepressed = false;
                    }
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    switch(edition_mode)
                    {
                        case 0:
                            ctx.fillText("Add", upscale(10), upscale(30)); //Text in the top left
                            ctx.font = "Bold "+upscale(15)+'px arial';
                            
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("block", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("water", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 2:
                                    ctx.fillText("ennemies", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 3:
                                    ctx.fillText("interactive blocks", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 4:
                                    ctx.fillText("decorations", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(upscale(1194), upscale(13), upscale(2), upscale(24));
                            if(button4.texture_type2(1160, 170, mapeditor.add_block_icon, "Add blocks"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.add_water_icon, "Add water"))
                            {
                                sub_edition_mode = 1;
                            }
                            if(button6.texture_type2(1160, 250, mapeditor.add_ennemy_icon, "Add ennemies"))
                            {
                                sub_edition_mode = 2;
                            }
                            if(button7.texture_type2(1160, 290, mapeditor.add_interactive_block_icon, "Add interactive blocks"))
                            {
                                sub_edition_mode = 3;
                            }
                            if(button8.texture_type2(1160, 330, mapeditor.add_decoration_icon, "Add decorations"))
                            {
                                sub_edition_mode = 4;
                            }
                            break
                        case 1:
                            ctx.fillText("Modifications", upscale(10), upscale(30)); //Text in the top left
                            ctx.font = "Bold "+upscale(15)+'px arial';
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("Move objects", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("Move decorations", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 2:
                                    ctx.fillText("Modify properties", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(upscale(1194), upscale(53), upscale(2), upscale(24));
                            if(button4.texture_type2(1160, 170, mapeditor.move_block_icon, "Move objects"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.move_decoration_icon, "Move decorations"))
                            {
                                sub_edition_mode = 1;
                            }
                            if(button6.texture_type2(1160, 250, mapeditor.modification_icon, "Modify properties"))
                            {
                                sub_edition_mode = 2;
                            }
                            break
                        
                        case 2:
                            ctx.fillText("Delete", upscale(10), upscale(30)); //Text in the top left
                            ctx.font = "Bold "+upscale(15)+'px arial';
                            switch(sub_edition_mode)
                            {
                                case 0:
                                    ctx.fillText("blocks", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                                case 1:
                                    ctx.fillText("decorations", upscale(10), upscale(50)); //Subtext in the top left
                                    break;
                            }
                            ctx.fillStyle = "rgb(255,255,150)";
                            ctx.fillRect(upscale(1194), upscale(93), upscale(2), upscale(24));
                            if(button4.texture_type2(1160, 170, mapeditor.remove_block_icon, "Remove blocks"))
                            {
                                sub_edition_mode = 0;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.remove_decoration_icon, "Remove decorations"))
                            {
                                sub_edition_mode = 1;
                            }
                            break
                    }
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(upscale(1194), upscale(173+sub_edition_mode*40), upscale(2), upscale(24));
                    
                    if(button3.texture_type2(90, 635, mapeditor.play_icon, "Test the map", true) | transition === "finish" & selectedaction === "menu9")
                    {
                        switch(transition)
                        {
                            case "false":
                                transition = "true";
                                selectedaction = "menu9";
                                break;
                            case "finish":
                                menu = 9;
                                transition = "false";
                                selectedaction = "N/A";
                                break;
                        }
                        mousepressed = true;
                    }
                    if(button2.texture_type2(50, 635, mapeditor.end_block_icon, "Add end level zone", true))
                    {
                        mousepressed = true;
                    }
                    if(button1.texture_type2(10, 635, mapeditor.spawn_icon, "Set spawn point", true))
                    {
                        spawnmodifier = true
                        mousepressed = true;
                    }

                    if(keys_input[5] === 0 & animaticmousevalue[0]-previousmouseX === 0 & animaticmousevalue[1]-previousmouseY === 0 & click & spawnmodifier === false)
                    {
                        mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                        mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                        mousepressed = true;
                    }
                    
                    if(keys_input[5] === 1)
                    {
                        map_move_speed = 0;
                        if(click)
                        {
                            if(mousepressed === false)
                            {
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                                mousepressed = true;
                            }
                            if(mapeditor.offsetX >= mapeditor.maplimit[0]*71 & animaticmousevalue[0]-previousmouseX <= 0)
                            {
                                mapeditor.offsetX = mapeditor.maplimit[0]*71;
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                            }
                            else if(mapeditor.offsetX <= -1129 & animaticmousevalue[0]-previousmouseX >= 0)
                            {
                                mapeditor.offsetX = -1129;
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                            }
                            else
                            {
                                mapeditor.offsetX = Math.round(mapmousetranslationX-(animaticmousevalue[0]*(1200/canvas.width)));
                            }

                            if(mapeditor.offsetY >= mapeditor.maplimit[1]*71 & animaticmousevalue[1]-previousmouseY <= 0)
                            {
                                mapeditor.offsetY = mapeditor.maplimit[1]*71;
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                            }
                            else if(mapeditor.offsetY <= -604 & animaticmousevalue[1]-previousmouseY >= 0)
                            {
                                mapeditor.offsetY = -604;
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                            }
                            else
                            {
                                mapeditor.offsetY = Math.round(mapmousetranslationY-(animaticmousevalue[1]*(675/(canvas.height))));
                            }

                        }
                        ctx.fillStyle = "rgba(50,50,50,0.6)";
                        ctx.fillRect(Math.round((animaticmousevalue[0]-upscale(35-mapeditor.offsetX%71))/upscale(71))*upscale(71)-upscale(mapeditor.offsetX%71), 
                                     Math.round((animaticmousevalue[1]-upscale(35-mapeditor.offsetY%71))/upscale(71))*upscale(71)-upscale(mapeditor.offsetY%71), 
                                     gupscale(71), gupscale(71));

                    }
                    else
                    {
                        map_move_speed = Math.round(20/Fps.dt);
                        if(spawnmodifier)
                        {
                            ctx.fillStyle = "rgba(255,25,0,0.2)";
                            ctx.fillRect(Math.round((animaticmousevalue[0]-upscale(35-mapeditor.offsetX%71))/upscale(71))*upscale(71)-upscale(mapeditor.offsetX%71), 
                                         Math.round((animaticmousevalue[1]-upscale(35-mapeditor.offsetY%71))/upscale(71))*upscale(71)-upscale(mapeditor.offsetY%71), 
                                         gupscale(71), gupscale(71));
                            
                            if(mousepressed === false & click)
                            {
                                mapeditor.spawn = [Math.round(((animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX-35)/71),
                                                   Math.round(((animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY-35)/71)];
                                // console.log(mapeditor.spawn);
                                level[levelid][3][editedlevelid][0][3] = Math.round(((animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX-35)/71);
                                level[levelid][3][editedlevelid][0][4] = Math.round(((animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY-35)/71);
                                // map_pack[3][0][0][3] = Math.round(((animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX-35)/71);
                                // map_pack[3][0][0][4] = Math.round(((animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY-35)/71);
                                spawnmodifier = false;
                                // start = true;
                            }
                        }

                    }
                    if(keys_input[0] === 1 & mapeditor.offsetY > -604)
                    {
                        mapeditor.offsetY -= map_move_speed;
                        if(mapeditor.offsetY < -604)
                        {
                            mapeditor.offsetY = -604;
                        }
                    }
                    if(keys_input[2] === 1 & mapeditor.offsetY < ((mapeditor.maplimit[1])*71))
                    {
                        mapeditor.offsetY += map_move_speed;
                        if(mapeditor.offsetY > ((mapeditor.maplimit[1])*71))
                        {
                            mapeditor.offsetY = ((mapeditor.maplimit[1])*71);
                        }
                    }
                    if(keys_input[3] === 1 & mapeditor.offsetX < ((mapeditor.maplimit[0])*71))
                    {
                        mapeditor.offsetX += map_move_speed;
                        if(mapeditor.offsetX > ((mapeditor.maplimit[0])*71))
                        {
                            mapeditor.offsetX = ((mapeditor.maplimit[0])*71);
                        }
                    }
                    if(keys_input[1] === 1)
                    {
                        mapeditor.offsetX -= map_move_speed;
                        if(mapeditor.offsetX < -1129)
                        {
                            mapeditor.offsetX = -1129;
                        }
                    }
                }
                

                if(PAUSE.pause === false)
                {
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText("Press P to show the menu", upscale(875), upscale(640)); //mouse pos
                    ctx.fillText("Press H to get the control ", upscale(875), upscale(665)); //mouse pos
                }
                if(keys_input[6] === 1 & PAUSE.pkey === false | PAUSE.pause) //PAUSE.pause
                {
                    keypressed = PAUSE.Enabler_disabler("Pause", keypressed, keys_input, Fps.dt)

                    ctx.fillStyle = "rgb(255,255,255)";

                    if(button1.text_type1("Resume", 0, 145, 195, 40, -180+(PAUSE.pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
                    {
                        PAUSE.endpause = true;
                    }

                    if(button2.text_type1("Setting", 0, 222, 175, 40, -180+(PAUSE.pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | transition === "finish" & selectedaction === "menu8") //setting
                    {
                        stock = TransitionObject.Switcher(transition, menu, selectedaction, 8)
                        menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                        if(stock[4])
                        {
                            PAUSE.endpause = false;
                            PAUSE.pause = true;
                            PAUSE.pauseframe = 10;
                        }
                    }

                    if(button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 295, 380, 40, -180+(PAUSE.pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                    {
                        firstgameframe = true;
                        Fullscreen.Enabler_disabler(canvas);
                    }

                    if(button4.text_type1("Modify map properties", 0, 370, 470, 40, -180+(PAUSE.pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "bop") //back to menu
                    {
                    }
                    if(button5.text_type1("Change map", 0, 445, 285, 40, -180+(PAUSE.pauseframe*20), 475, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "bop") //back to menu
                    {
                    }
                    if(button6.text_type1("Quit", 0, 520, 125, 40, -180+(PAUSE.pauseframe*20), 550, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "menu5") //back to menu
                    {
                        stock = TransitionObject.Switcher(transition, menu, selectedaction, 5)
                        menu = stock[0]; transition = stock[1]; selectedaction = stock[2];
                        if(stock[4])
                        {
                            ctx.webkitImageSmoothingEnabled = true;
                            ctx.msImageSmoothingEnabled = true;
                            ctx.imageSmoothingEnabled = true;
                            PAUSE.endpause = false;
                            PAUSE.pause = false;
                            PAUSE.pauseframe = 0;
                        }
                    }
                }
                
                break
        }
        if(keys_input[7] === 1 | command === "true") //To enter some usefull commands ingame
        {
            push++
            if(push > 60 | devmode)
            {
                if(keys_input[7] === 1)
                {
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.font = "Bold "+upscale(100)+'px arial';
                    ctx.fillText("Release C", upscale(385), upscale(350));
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
                            map.devmode = devmode = true;
                            ui_var_updater2(devmode);
                            break
                        case "devmode false": case "devmode disable":
                            map.devmode = devmode = false;
                            ui_var_updater2(devmode)
                            break
                        case "godmode true": case "godmode enable":
                            godmode = true;
                            break
                        case "godmode false": case "godmode disable" :
                            godmode = false;
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
        button1.mousepressed = button2.mousepressed = 
        button3.mousepressed = button4.mousepressed = 
        button5.mousepressed = button6.mousepressed = 
        button7.mousepressed = button8.mousepressed = 
        button9.mousepressed = button10.mousepressed = 
        button11.mousepressed = mousepressed;
        for(let i = 0; i < keys_input.length; ++i)
        {    
            if(keys_input[i] === 0)
            {
                keypressed = false;
                PAUSE.pkey = false;
            }
            else
            {
                keypressed = true;
                if(keys_input[6] === 1)
                {
                    PAUSE.pkey = true;
                }
                break;
            }
        }
        TransitionObject.minus(transition);
        if(transition === "true")
        {
            transition = TransitionObject.plus();
        }
        ctx.font = upscale(20)+'px arial';
        ctx.lineWidth = upscale(1);
        if(devmode)
        {
            ctx.fillStyle = "rgb(255,255,255)";

            ctx.fillText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
            ctx.fillText("y : "+mouseY, upscale(1125), upscale(50));

            ctx.fillText(key_press, upscale(1100), upscale(75)); //key pressed
            ctx.fillText("|", upscale(1141), upscale(75));
            ctx.fillText(keynb, upscale(1152), upscale(75));

            ctx.fillText("Click : "+click, upscale(1091), upscale(100)); //click

            ctx.fillText("Fullscreen : "+Fullscreen.canvasfullscreen, upscale(1043), upscale(125)); //fullscreen

            ctx.fillText("Inputs : "+keys_input, upscale(945), upscale(150)); //input


            ctx.strokeStyle = "rgb(0,0,0)";

            ctx.strokeText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
            ctx.strokeText("y : "+mouseY, upscale(1125), upscale(50));

            ctx.strokeText(key_press, upscale(1100), upscale(75)); //key pressed
            ctx.strokeText("|", upscale(1141), upscale(75));
            ctx.strokeText(keynb, upscale(1152), upscale(75));

            ctx.strokeText("Click : "+click, upscale(1091), upscale(100)); //click

            ctx.strokeText("Fullscreen : "+Fullscreen.canvasfullscreen, upscale(1043), upscale(125)); //fullscreen

            ctx.strokeText("Inputs : "+keys_input, upscale(945), upscale(150)); //input

            if(menu === 2 | menu === 9 | 1)
            {
                ctx.fillStyle = "rgb(255,255,255)";

                ctx.fillText("Collisions : "+map.collisions, upscale(963), upscale(175)); //collisions

                ctx.fillText("PX : "+Math.round(player.playerX), upscale(985), upscale(200)); //px
                ctx.fillText("|", upscale(1080), upscale(200));
                ctx.fillText("OffOnX : "+map.offsetX_on, upscale(1092), upscale(200));

                ctx.fillText("PY : "+Math.round(player.playerY), upscale(985), upscale(225)); //py
                ctx.fillText("|", upscale(1080), upscale(225));
                ctx.fillText("OffOnY : "+map.offsetY_on, upscale(1092), upscale(225));

                ctx.fillText("VX : "+Math.round(vect[0]), upscale(985), upscale(250)); //vect
                ctx.fillText("|", upscale(1080), upscale(250));
                ctx.fillText("VY : "+vect[1], upscale(1092), upscale(250));

                ctx.fillText("OX : "+Math.round(map.offsetX), upscale(985), upscale(275)); //offset
                ctx.fillText("|", upscale(1080), upscale(275));
                ctx.fillText("OY : "+map.offsetY, upscale(1092), upscale(275));

                ctx.fillText("BU : ["+map.bestup[0]+"]px ; ["+map.bestup[1]+"]py", upscale(970), upscale(300));
                ctx.fillText("["+map.bestup[2]+"]ox ; ["+map.bestup[3]+"]oy", upscale(1015), upscale(325));

                ctx.fillText("BD : ["+map.bestdown[0]+"]px ; ["+map.bestdown[1]+"]py", upscale(970), upscale(350));
                ctx.fillText("["+map.bestdown[2]+"]ox ; ["+map.bestdown[3]+"]oy", upscale(1015), upscale(375));

                ctx.fillText("BL : ["+map.bestleft[0]+"]px ; ["+map.bestleft[1]+"]py", upscale(970), upscale(400));
                ctx.fillText("["+map.bestleft[2]+"]ox ; ["+map.bestleft[3]+"]oy", upscale(1015), upscale(425));

                ctx.fillText("BR : ["+map.bestright[0]+"]px ; ["+map.bestright[1]+"]py", upscale(970), upscale(450));
                ctx.fillText("["+map.bestright[2]+"]ox ; ["+map.bestright[3]+"]oy", upscale(1015), upscale(475));


                ctx.fillText(Fps.nbofframewithoutphysics+"   "+camerainterpoX*(Fps.fps/Fps.pfpslog)+"      "+Fps.fps/Fps.pfpslog , upscale(1000), upscale(500)); //-------------------------------------------------------test var------------------------------------------------

                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.strokeText("Collisions : "+map.collisions, upscale(963), upscale(175)); //collisions

                ctx.strokeText("PX : "+Math.round(player.playerX), upscale(985), upscale(200)); //px
                ctx.strokeText("|", upscale(1080), upscale(200));
                ctx.strokeText("OffOnX : "+map.offsetX_on, upscale(1092), upscale(200));

                ctx.strokeText("PY : "+Math.round(player.playerY), upscale(985), upscale(225)); //py
                ctx.strokeText("|", upscale(1080), upscale(225));
                ctx.strokeText("OffOnY : "+map.offsetY_on, upscale(1092), upscale(225));

                ctx.strokeText("VX : "+Math.round(vect[0]), upscale(985), upscale(250)); //vect
                ctx.strokeText("|", upscale(1080), upscale(250));
                ctx.strokeText("VY : "+vect[1], upscale(1092), upscale(250));

                ctx.strokeText("OX : "+Math.round(map.offsetX), upscale(985), upscale(275)); //offset
                ctx.strokeText("|", upscale(1080), upscale(275));
                ctx.strokeText("OY : "+map.offsetY, upscale(1092), upscale(275));

                ctx.strokeText("BU : ["+map.bestup[0]+"]px ; ["+map.bestup[1]+"]py", upscale(970), upscale(300));
                ctx.strokeText("["+map.bestup[2]+"]ox ; ["+map.bestup[3]+"]oy", upscale(1015), upscale(325));

                ctx.strokeText("BD : ["+map.bestdown[0]+"]px ; ["+map.bestdown[1]+"]py", upscale(970), upscale(350));
                ctx.strokeText("["+map.bestdown[2]+"]ox ; ["+map.bestdown[3]+"]oy", upscale(1015), upscale(375));

                ctx.strokeText("BL : ["+map.bestleft[0]+"]px ; ["+map.bestleft[1]+"]py", upscale(970), upscale(400));
                ctx.strokeText("["+map.bestleft[2]+"]ox ; ["+map.bestleft[3]+"]oy", upscale(1015), upscale(425));

                ctx.strokeText("BR : ["+map.bestright[0]+"]px ; ["+map.bestright[1]+"]py", upscale(970), upscale(450));
                ctx.strokeText("["+map.bestright[2]+"]ox ; ["+map.bestright[3]+"]oy", upscale(1015), upscale(475));
            }
            if(menu === 7)
            {
                ctx.fillStyle = "rgb(255,255,255)";
                
                ctx.fillText("OX : "+Math.round(mapeditor.offsetX), upscale(985), upscale(275)); //offset
                ctx.fillText("|", upscale(1080), upscale(275));
                ctx.fillText("OY : "+mapeditor.offsetY, upscale(1092), upscale(275));


                ctx.fillText(TransitionObject.currentfadestate+"    " , upscale(1000), upscale(500)); //-------------------------------------------------------test var------------------------------------------------


                ctx.strokeStyle = "rgb(0,0,0)";
                
                ctx.strokeText("OX : "+Math.round(mapeditor.offsetX), upscale(985), upscale(275)); //offset
                ctx.strokeText("|", upscale(1080), upscale(275));
                ctx.strokeText("OY : "+mapeditor.offsetY, upscale(1092), upscale(275));
            }

        }
        if(Fps.showfps)
        {    
            ctx.fillStyle = "rgb(0,255,0)";
            ctx.fillText(Math.round(Fps.fps)+" GFPS "+Number.parseFloat(Fps.dt).toPrecision(3)+" DT", upscale(20), upscale(25)); //GFPS = Frame d'affichage
            ctx.fillText(Fps.pfpslog+" PFPS ", upscale(20), upscale(50)); // PFPS = frame de physique
            ctx.strokeStyle = "rgb(0,100,0)";
            ctx.strokeText(Math.round(Fps.fps)+" GFPS "+Number.parseFloat(Fps.dt).toPrecision(3)+" DT", upscale(20), upscale(25));
            ctx.strokeText(Fps.pfpslog+" PFPS ", upscale(20), upscale(50));
        }
        previousmouseX = animaticmousevalue[0];
        previousmouseY = animaticmousevalue[1];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "Bold "+upscale(25)+'px arial';
        ctx.fillText("pre 0.6", upscale(565), upscale(660));
    }
}

main();
