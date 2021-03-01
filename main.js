//TO DO:
//Map editor
//New map assets
//Rework collisions
//adapting ui animation for variable framerate
//Particles

//DID:
//Cap 30fps
//Double click for fullscreen
//reworked button system + add a new animated button type
//map displaying optimisation

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
    canvasfullscreen = (document.fullscreen)? true : false;
}, false);
document.addEventListener("webkitfullscreenchange", function () {
    canvasfullscreen = (document.webkitIsFullScreen) ? true : false;
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

import {upscale, twPleinEcran, ui_var_updater, ui_var_updater2, ui_var_updater3} from "./includes/ui.js";
import {Animatic, Transition} from "./includes/animatic.js";
import {MapData} from "./includes/level_reader.js";
import {PlayerData} from "./includes/player.js";
import * as levels from "./includes/levels.js";
import {MapEditor} from "./includes/map_editor.js"


var command = "false"; //command
var push = 0;
var devmode = false;
var godmode = false;
var frametime = 0;
var camsmootherenable = true;

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;
var menu = 7;
var lastmenu = -1;
var mouseX = 0;
var mouseY = 0;
var mapmousetranslationX = mouseX;
var mapmousetranslationY = mouseY;
var previousmouseX = mouseX;
var previousmouseY = mouseY;
var keypressed = false;
var mousepressed = false;
var doubleclickfullscreenmousepressed = false;
var canvasfullscreen = false;
var ablefullscrenn = "Enable";
var fullscreenupscale = true;
var fullscreendownscale = false
var fullscreendownscalefactor = 4;
var transition = "false";
var selectedaction = "N/A";
var showfps = false;
var cap30fps = false;
var gfpsintervaltiming = 0;
var previousgfpsframetiming = 0;
var gfpsframetiming = 0;
var firstclick = false;
var doubleclicktiming = 0;

//game
var level = ["testlevel", levels.leveltest1, levels.leveltest2, levels.leveltest3]; 
var levelid = 3;
let map = new MapData(level[levelid])
var start = true
let player = new PlayerData()
let mapeditor = new MapEditor(ctx)
var vect = [0, 0];
var stock = [0, 0];

//Game running
var date = Date.now();
var frametime = date;
var fps = 1;
var frameaverageaccumulation = 0
var dt = 0;
var executionloop = 0;
var dateseconds = date;
var pfps = 0;
var pfpslog = 0;
var physicframeavaiblity = 0;
var playerinterpoX = 0;
var camerainterpoX = 0;
var playerinterpoY = 0;
var camerainterpoY = 0;
var smoothinterpoX = 0;
var smoothinterpoY = 0;
var nbofframewithoutphysics = 1;

//mapeditor
var map_move_speed = 20;
var edition_mode = 0;

//Optimisation
var firstgameframe = false;

//pause
var pause = false; 
var pauseframe = 0;
var endpause = false;
var pkey = false;

// Buttons
var TransitionObject = new Transition(ctx);
var animaticmousevalue = [0, 0]
var button1 = new Animatic(ctx);
var button2 = new Animatic(ctx);
var button3 = new Animatic(ctx);
var button4 = new Animatic(ctx);
var button5 = new Animatic(ctx);
var button6 = new Animatic(ctx);
var button7 = new Animatic(ctx);
var button8 = new Animatic(ctx);
var button9 = new Animatic(ctx);

// Map editor
var map_pack = ["CelesteDiscountMapApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[],[]]]] //[MapCertifcate, number of map, name of the map pack,
                                                                                                 //    [maps
                                                                                                 //        [
                                                                                                 //            [Nom, maplimitx, maplimity, playerspawnx, playerspawny],
                                                                                                 //            [Blocks[snap_x, snap_y, [category,sub category], collisions]]
                                                                                                 //                category:
                                                                                                 //                    -testblock
                                                                                                 //                    -block
                                                                                                 //                    -damage block
                                                                                                 //            [Water[snap_x, snap_y]]
                                                                                                 //            [Interactive object[snap_x, snap_y, content]]
                                                                                                 //            [Enemies[snap_x, snap_y, type]] (0.7)
                                                                                                 //            [Decorations[x,y]]
                                                                                                 //        ]
                                                                                                 //    ]
                                                                                                 //]
var previousmappropertiesvalue = ""

//setting

map.var_update(ctx);
map.var_update2(devmode);
player.ctx = ctx;
ui_var_updater(ctx);
ui_var_updater2(devmode);


function openFileOption()
{
    document.getElementById("file1").click();
}

function lerp(n, time)
{
    return n*time
}

function main()
{
    requestAnimationFrame(main);
    ui_var_updater3(canvasfullscreen, fullscreenupscale, mouseX, mouseY)
    button1.click = button2.click = 
    button3.click = button4.click = 
    button5.click = button6.click = 
    button7.click = button8.click = 
    button9.click = click
    
    if(canvasfullscreen)
    {
        animaticmousevalue = [mouseX*(canvas.width / screen.width), mouseY*(canvas.height / screen.height)]
    }
    else
    {
        animaticmousevalue = [mouseX, mouseY]
    }
    
    button1.mouseX = button2.mouseX = 
    button3.mouseX = button4.mouseX = 
    button5.mouseX = button6.mouseX = 
    button7.mouseX = button8.mouseX = 
    button9.mouseX = animaticmousevalue[0]

    button1.mouseY = button2.mouseY = 
    button3.mouseY = button4.mouseY = 
    button5.mouseY = button6.mouseY = 
    button7.mouseY = button8.mouseY = 
    button9.mouseY = animaticmousevalue[1]
    
    if(cap30fps & menu === 2)
    {
        gfpsframetiming = Date.now()
        gfpsintervaltiming += gfpsframetiming - previousgfpsframetiming
        previousgfpsframetiming = gfpsframetiming
    }
    else
    {
        gfpsintervaltiming = 0;
    }
    if(doubleclicktiming+150 < Date.now())
    {
        firstclick = false
    }
    if(click | firstclick)
    {
        if(firstclick === false)
        {
            doubleclicktiming = Date.now()
            firstclick = true
            doubleclickfullscreenmousepressed = true
        }
        else if(click & doubleclickfullscreenmousepressed === false)
        {
            firstgameframe = true;
            twPleinEcran(canvas)
            if(canvasfullscreen)
            {
                canvasfullscreen = false
            }
            else
            {
                canvasfullscreen = true
            }
            firstclick = false
        }

    }
    
    if(gfpsintervaltiming > 100)
    {
        gfpsintervaltiming = 0;
    }
    if(cap30fps === false | gfpsintervaltiming >= 33 | menu !== 2)
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        frameaverageaccumulation++
        if(frameaverageaccumulation >= 5)
        {
            date = Date.now();
            fps = 5000/(date-frametime);
            frametime = date;
            frameaverageaccumulation = 0;
        }
        TransitionObject.dt = dt = fps/60;
        if(firstgameframe)
        {
            if(canvasfullscreen)
            {
                if(fullscreenupscale)
                {    
                    canvas.width = screen.width;
                    canvas.height = screen.height;
                }
                else
                {
                    if(fullscreendownscale === false)
                    {
                        canvas.width = 1200;
                        canvas.height = 675;
                    }
                    else
                    {
                        canvas.width = 240*fullscreendownscalefactor;
                        canvas.height = 135*fullscreendownscalefactor;
                    }
                }
                ablefullscrenn = "Disable"
            }
            else
            {
                ablefullscrenn = "Enable"
            }
            firstgameframe = false;
        }
        if(canvasfullscreen & keys_input[9] == 1)
        {
            canvasfullscreen = false
        }
        if(canvasfullscreen === false & canvas.width !== 1200 & canvas.height !== 625)
        {
            canvas.width = 1200;
            canvas.height = 675;
            ablefullscrenn = "Enable"
        }
        
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
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu2";
                            break
                        case "finish":
                            menu = 2;
                            transition = "false";
                            selectedaction = "N/A";
                            break
                    }
                }
                if(button2.text_type1("--Setting--", 410, 475, 385, 60, 487, 520, 48, 54, 58, 60, -0.7) | transition === "finish" & selectedaction === "menu3.1") //setting
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu3.1";
                            break
                        case "finish":
                            menu = 3;
                            transition = "false";
                            selectedaction = "N/A";
                            break
                    }
                }
                if(button3.text_type1("--Map editor--", 410, 575, 385, 60, 445, 620, 48, 54, 58, 60, -1.4) | transition === "finish" & selectedaction === "menu5") //setting
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu5";
                            break
                        case "finish":
                            menu = 5;
                            transition = "false";
                            selectedaction = "N/A";
                            break
                    }
                }
                // TransitionObject.minus(transition)
                break
            case 2: //Game 
                if(lastmenu != 2)
                {
                    previousgfpsframetiming = gfpsframetiming = Date.now()
                    gfpsintervaltiming = 0;
                    start = true;
                    lastmenu = 2
                }
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                if(start)
                {
                    player.spawn(map.start(level[levelid]))
                    start = false
                }
                ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));

                
                if(dt < 1)
                {
                    executionloop += (1-dt)/(fps/60);
                    physicframeavaiblity = 16.6
                }
                physicframeavaiblity += 1000/fps

                if(16.6 <= physicframeavaiblity) //gestion de la physique
                {
                    for(var i = 0; i <= Math.trunc(executionloop); i++)
                    {
                        player.previousplayerX = player.playerX
                        player.previousplayerY = player.playerY
                        map.previousoffsetX = map.offsetX
                        map.previousoffsetY = map.offsetY

                        vect = player.velocity(keys_input, vect[0], vect[1], godmode, map.collisions, map.offsetX_on, map.offsetY_on, map.bestdown[4], pause);
                        stock = map.collider(player.playerX, player.playerY, vect[0], vect[1], pause);
                        map.fcamsmoother(camsmootherenable, pause)
                        pfps++;

                        player.playerX = stock[0];
                        player.playerY = stock[1];
                        playerinterpoX = lerp(player.playerX-player.previousplayerX, pfps/fps)
                        playerinterpoY = lerp(player.playerY-player.previousplayerY, pfps/fps)

                        camerainterpoX = lerp(map.offsetX-map.previousoffsetX, pfps/fps)
                        camerainterpoY = lerp(map.offsetY-map.previousoffsetY, pfps/fps)

                        smoothinterpoX = lerp(map.camsmoother[0]-map.previouscamsmoother[0], pfps/fps)
                        smoothinterpoY = lerp(map.camsmoother[1]-map.previouscamsmoother[1], pfps/fps)
                        nbofframewithoutphysics = 0
                    }
                    physicframeavaiblity -= 16.6
                }
                if(dateseconds+1000 <= Date.now())
                {
                    dateseconds = Date.now();
                    pfpslog = pfps;
                    pfps = 0;
                }
                if(executionloop > 1)
                {
                    executionloop = executionloop-Math.trunc(executionloop);
                }

                map.display(player.playerX, player.playerY, pause, map.previousoffsetX+camerainterpoX*nbofframewithoutphysics, map.previousoffsetY+camerainterpoY*nbofframewithoutphysics, 
                    map.previouscamsmoother[0]+smoothinterpoX*nbofframewithoutphysics, map.previouscamsmoother[1]+smoothinterpoY*nbofframewithoutphysics);
                
                player.display(map.collisions, map.camsmoother, pause, 
                    player.previousplayerX+playerinterpoX*nbofframewithoutphysics, player.previousplayerY+playerinterpoY*nbofframewithoutphysics, dt);
                
                nbofframewithoutphysics++
                
                if(pause === false)
                {
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText("Press P to pause the game", upscale(875), upscale(665)); //mouse pos
                }
                if(keys_input[6] === 1 & pkey === false | pause) //pause
                {
                    if(pause === false & pkey === false)
                    {
                        pause = true;
                        keypressed = true;
                        pkey = true
                        endpause = false; 
                    }
                    var grd = ctx.createLinearGradient(-150, 0, upscale(3000), 0);
                    grd.addColorStop(0.1, "transparent");
                    grd.addColorStop(0, "black");
                    if(pauseframe < 10 & endpause === false)
                    {
                        pauseframe++;
                    }
                    ctx.fillStyle = "rgba(0,0,0,"+0.05*pauseframe+")";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = grd;
                    ctx.fillRect(upscale(-200+(pauseframe*20)), 0, upscale(100+(pauseframe*20)), upscale(675));
                    if(endpause === false)    
                    {
                        ctx.font = "Bold "+upscale(125)+'px arial';
                        ctx.fillStyle = "rgb(255,255,255)";
                        ctx.fillText('Pause', upscale(425), upscale(100));
                    }
                    ctx.fillStyle = "rgb(255,255,255)";

                    if(button1.text_type1("Resume", 0, 145, 195, 40, -180+(pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
                    {
                        endpause = true;
                    }

                    if(button2.text_type1("Setting", 0, 222, 175, 40, -180+(pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | transition === "finish" & selectedaction === "menu4") //setting
                    {
                        switch(transition)
                        {                        
                            case "false":
                                transition = "true";
                                selectedaction = "menu4"
                                break
                            case "finish":
                                menu = 4;
                                endpause = false;
                                pause = true;
                                pauseframe = 10;
                                transition = "false";
                                selectedaction = "N/A"    
                                break
                        }
                    }

                    if(button3.text_type1(ablefullscrenn+" fullscreen", 0, 295, 380, 40, -180+(pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                    {
                        firstgameframe = true;
                        twPleinEcran(canvas)
                        if(canvasfullscreen)
                        {
                            canvasfullscreen = false
                        }
                        else
                        {
                            canvasfullscreen = true
                        }
                    }

                    if(button4.text_type1("Back to menu", 0, 370, 305, 40, -180+(pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "menu1") //back to menu
                    {
                        switch(transition)
                        {
                            case "false":
                                transition = "true";
                                selectedaction = "menu1"
                                ctx.webkitImageSmoothingEnabled = true;
                                ctx.msImageSmoothingEnabled = true;
                                ctx.imageSmoothingEnabled = true;
                                break
                            case "finish":
                                menu = 1;
                                endpause = false;
                                pause = false;
                                pauseframe = 0;
                                transition = "false";
                                selectedaction = "N/A"
                                break
                        }
                    }

                    if(keys_input[6] === 1 & pkey === false | endpause)
                    {
                        endpause = true
                        grd.addColorStop(0.1, "transparent");
                        grd.addColorStop(0, "black");
                        ctx.fillStyle = grd;
                        pauseframe--
                        ctx.fillRect(upscale(-200-(pauseframe*20)), 0, upscale(100-(pauseframe*20)), upscale(675));

                        if(pauseframe < 1)
                        {
                            endpause = false;
                            pause = false;
                            pauseframe = 0;
                        }
                    }
                }
                // TransitionObject.minus(transition)
                break
            case 3 : case 4: case 8://Setting
                if(lastmenu != 3)
                {
                    lastmenu = 3
                }
                if(button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | transition === "finish" & selectedaction === "menu3.2")
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu3.2"
                            break
                        case "finish":
                            switch(menu)
                            {
                                case 3:
                                    menu = 1
                                    break
                                case 4:
                                    menu = 2
                                    break
                                case 8:
                                    lastmenu = menu = 7
                                    
                                    break
                            }
                            transition = "false";
                            selectedaction = "N/A"
                            break
                    }   
                }
                if(showfps)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button2.text_type1("Show FPS", 0, 130, 320, 60, 20, 175, 40, 45, 50, 55, 3.6, 0.4)) //show fps button
                {
                    if(showfps)
                    {
                        showfps = false
                    }
                    else
                    {
                        showfps = true
                    }
                }

                if(canvasfullscreen)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button3.text_type1(ablefullscrenn+" fullscreen", 0, 230, 535, 60, 20, 275, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen button
                {
                    firstgameframe = true;
                    twPleinEcran(canvas)
                    if(canvasfullscreen)
                    {
                        canvasfullscreen = false
                    }
                    else
                    {
                        canvasfullscreen = true
                    }
                }

                if(fullscreenupscale)
                {
                    ctx.font = "Bold "+upscale(40)+'px arial';
                    ctx.fillStyle = "rgb(100,100,100)";
                    ctx.fillText("Fullscreen downscale", upscale(120), upscale(435));
                    ctx.fillStyle = "rgb(100,200,50)";
                    fullscreendownscale = false;
                    fullscreendownscalefactor = 4;
                }
                else
                {
                    if(fullscreendownscale)
                    {
                        ctx.fillStyle = "rgb(255,255,255)";
                        ctx.font = "Bold "+upscale(40)+'px arial';
                        ctx.fillText(fullscreendownscalefactor*20+"%", upscale(900), upscale(435));
                        if(fullscreendownscalefactor > 1)
                        {
                            if(button4.texture_type1(minus, 800, 391, 60, 60, 805, 396, [48,48], 55, 65, 70) | keys_input[5] === 1 & keypressed === false | transition === "finish" & selectedaction === "menu3.2")
                            {
                                fullscreendownscalefactor--
                                firstgameframe = true;
                            }
                        }
                        if(fullscreendownscalefactor < 5)
                        {
                            if(button5.texture_type1(plus, 1000, 391, 60, 60, 1005, 396, [48,48], 55, 65, 70) | keys_input[5] === 1 & keypressed === false | transition === "finish" & selectedaction === "menu3.2")
                            {
                                if(fullscreendownscalefactor == 4)
                                {
                                    fullscreendownscale = false;
                                }
                                else
                                {
                                    fullscreendownscalefactor++
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
                        if(fullscreendownscale)
                        {
                            fullscreendownscale = false
                        }
                        else
                        {
                            fullscreendownscale = true
                        }
                        firstgameframe = true;
                    }
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button7.text_type1("Fullscreen upscale", 0, 330, 560, 60, 20, 375, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen upscale button
                {
                    if(fullscreenupscale)
                    {
                        fullscreenupscale = false
                    }
                    else
                    {
                        fullscreenupscale = true
                    }
                    firstgameframe = true;
                }


                if(cap30fps)
                {
                    ctx.fillStyle = "rgb(100,200,50)";
                }
                else
                {
                    ctx.fillStyle = "rgb(255,50,75)";
                }
                if(button8.text_type1("Cap the game at 30fps", 0, 490, 650, 60, 20, 535, 40, 45, 50, 55, 4.5, 0.4)) //lock the framerate at 30fps
                {
                    if(cap30fps)
                    {
                        cap30fps = false
                    }
                    else
                    {
                        cap30fps = true
                        previousgfpsframetiming = gfpsframetiming = Date.now()
                    }
                    gfpsintervaltiming = 0;
                }



                // TransitionObject.minus(transition)
                break
            case 5:
                if(lastmenu != 5)
                {
                    lastmenu = 5
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "Bold "+upscale(100)+'px arial';
                ctx.fillText("Map editor", upscale(345), upscale(75));
                if(button1.texture_type1(return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | transition === "finish" & selectedaction === "menu1")
                {
                    ctx.fillStyle = "rgb(255,255,255)";
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu1"
                            break
                        case "finish":
                            menu = 1;
                            transition = "false";
                            selectedaction = "N/A"
                            break
                    }   
                }

                if(button2.text_type1("New", 0, 225, 320, 100, 20, 300, 80, 85, 90, 95, 3.6, 0.4) | transition === "finish" & selectedaction === "menu6") //create a new file
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu6";
                            break
                        case "finish":
                            menu = 6;
                            transition = "false";
                            selectedaction = "N/A";
                            break
                    }
                }

                if(button3.text_type1("Load", 0, 400, 320, 100, 20, 475, 80, 85, 90, 95, 3.6, 0.4)) //load a file
                {
                    openFileOption()
                    // console.log(document.getElementById('fileItem').files[0])
                    button1.click = button2.click = 
                    button3.click = button4.click = 
                    button5.click = button6.click = 
                    button7.click = button8.click = 
                    button9.click = click = false
                }


                // TransitionObject.minus(transition)
                break
            case 6:
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
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu5"
                            break
                        case "finish":
                            menu = 5;
                            transition = "false";
                            selectedaction = "N/A"
                            break
                    }
                    
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
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu7"
                            break
                        case "finish":
                            menu = 7;
                            transition = "false";
                            selectedaction = "N/A"
                            break
                    }
                }
                break
            case 7:
                if(lastmenu != 7)
                {
                    map_pack = ["CelesteDiscountMapApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]]
                    start = true
                    pause = false
                    edition_mode = 0;
                    lastmenu = 7
                    
                }
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
                if(start)
                {
                    // mapeditor.load(map_pack)
                    mapeditor.load(level[levelid])
                    start = false
                }
                mapeditor.display()

                if(pause === false)
                {
                    if(button1.texture_type2(1160, 10, mapeditor.add_block_icon, "Add"))
                    {
                        edition_mode = 0;
                        mousepressed = false;
                    }
                    if(button2.texture_type2(1160, 50, mapeditor.modification_icon, "Modifications"))
                    {
                        edition_mode = 1;
                        mousepressed = false;
                    }
                    if(button3.texture_type2(1160, 90, mapeditor.remove_block_icon, "Delete"))
                    {
                        edition_mode = 2;
                        mousepressed = false;
                    }
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    switch(edition_mode)
                    {
                        case 0:
                            ctx.fillText("Add", upscale(10), upscale(30)); //Text in the top left
                            if(button4.texture_type2(1160, 170, mapeditor.add_block_icon, "Add blocks"))
                            {
                                edition_mode = 0;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.add_water_icon, "Add water"))
                            {
                                edition_mode = 0;
                            }
                            if(button6.texture_type2(1160, 250, mapeditor.add_ennemy_icon, "Add ennemies"))
                            {
                                edition_mode = 0;
                            }
                            if(button7.texture_type2(1160, 290, mapeditor.add_interactive_block_icon, "Add interactive blocks"))
                            {
                                edition_mode = 0;
                            }
                            if(button8.texture_type2(1160, 330, mapeditor.add_decoration_icon, "Add decorations"))
                            {
                                edition_mode = 0;
                            }
                            break
                        
                        case 1:
                            ctx.fillText("Modifications", upscale(10), upscale(30)); //Text in the top left
                            if(button4.texture_type2(1160, 170, mapeditor.move_block_icon, "Move objects"))
                            {
                                edition_mode = 1;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.move_decoration_icon, "Move decorations"))
                            {
                                edition_mode = 1;
                            }
                            if(button6.texture_type2(1160, 250, mapeditor.modification_icon, "Modify properties"))
                            {
                                edition_mode = 1;
                            }
                            break
                        
                        case 2:
                            ctx.fillText("Delete", upscale(10), upscale(30)); //Text in the top left
                            if(button4.texture_type2(1160, 170, mapeditor.remove_block_icon, "Remove blocks"))
                            {
                                edition_mode = 2;
                            }
                            if(button5.texture_type2(1160, 210, mapeditor.remove_decoration_icon, "Remove decorations"))
                            {
                                edition_mode = 2;
                            }
                            break

                    }
                    
                    if(keys_input[5] === 1)
                    {
                        map_move_speed = 0;
                        if(click === true)
                        {
                            if(mousepressed === false)
                            {
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                                mousepressed = true;
                            }
                            if(mapeditor.offsetX >= mapeditor.maplimit[0]*71 & animaticmousevalue[0]-previousmouseX <= 0)
                            {
                                mapeditor.offsetX = mapeditor.maplimit[0]*71
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                            }
                            else if(mapeditor.offsetX <= -1129 & animaticmousevalue[0]-previousmouseX >= 0)
                            {
                                mapeditor.offsetX = -1129
                                mapmousetranslationX = (animaticmousevalue[0]*(1200/canvas.width))+mapeditor.offsetX;
                            }
                            else
                            {
                                mapeditor.offsetX = Math.round(mapmousetranslationX-(animaticmousevalue[0]*(1200/canvas.width)))
                            }

                            if(mapeditor.offsetY >= mapeditor.maplimit[1]*71 & animaticmousevalue[1]-previousmouseY <= 0)
                            {
                                mapeditor.offsetY = mapeditor.maplimit[1]*71
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                            }
                            else if(mapeditor.offsetY <= -604 & animaticmousevalue[1]-previousmouseY >= 0)
                            {
                                mapeditor.offsetY = -604
                                mapmousetranslationY = (animaticmousevalue[1]*(675/canvas.height))+mapeditor.offsetY;
                            }
                            else
                            {
                                mapeditor.offsetY = Math.round(mapmousetranslationY-(animaticmousevalue[1]*(675/(canvas.height))))
                            }

                        }

                    }
                    else
                    {
                        map_move_speed = Math.round(20/dt);
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
                

                if(pause === false)
                {
                    ctx.font = "Bold "+upscale(25)+'px arial';
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText("Press P to show the menu", upscale(875), upscale(640)); //mouse pos
                    ctx.fillText("Press H to get the control ", upscale(875), upscale(665)); //mouse pos
                }
                if(keys_input[6] === 1 & pkey === false | pause) //pause
                {
                    if(pause === false & pkey === false)
                    {
                        pause = true;
                        keypressed = true;
                        pkey = true
                        endpause = false; 
                    }
                    var grd = ctx.createLinearGradient(-150, 0, upscale(3000), 0);
                    grd.addColorStop(0.1, "transparent");
                    grd.addColorStop(0, "black");
                    if(pauseframe < 10 & endpause === false)
                    {
                        pauseframe++;
                    }
                    ctx.fillStyle = "rgba(0,0,0,"+0.05*pauseframe+")";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = grd;
                    ctx.fillRect(upscale(-200+(pauseframe*20)), 0, upscale(100+(pauseframe*20)), upscale(675));
                    if(endpause === false)    
                    {
                        ctx.font = "Bold "+upscale(125)+'px arial';
                        ctx.fillStyle = "rgb(255,255,255)";
                        ctx.fillText('Pause', upscale(425), upscale(100));
                    }
                    ctx.fillStyle = "rgb(255,255,255)";

                    if(button1.text_type1("Resume", 0, 145, 195, 40, -180+(pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
                    {
                        endpause = true;
                    }

                    if(button2.text_type1("Setting", 0, 222, 175, 40, -180+(pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | transition === "finish" & selectedaction === "menu8") //setting
                    {
                        switch(transition)
                        {                        
                            case "false":
                                transition = "true";
                                selectedaction = "menu8"
                                break
                            case "finish":
                                menu = 8;
                                endpause = false;
                                pause = true;
                                pauseframe = 10;
                                transition = "false";
                                selectedaction = "N/A"    
                                break
                        }
                    }

                    if(button3.text_type1(ablefullscrenn+" fullscreen", 0, 295, 380, 40, -180+(pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                    {
                        firstgameframe = true;
                        twPleinEcran(canvas)
                        if(canvasfullscreen)
                        {
                            canvasfullscreen = false
                        }
                        else
                        {
                            canvasfullscreen = true
                        }
                    }

                    if(button4.text_type1("Back to menu", 0, 370, 305, 40, -180+(pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | transition === "finish" & selectedaction === "menu1") //back to menu
                    {
                        switch(transition)
                        {
                            case "false":
                                transition = "true";
                                selectedaction = "menu1"
                                ctx.webkitImageSmoothingEnabled = true;
                                ctx.msImageSmoothingEnabled = true;
                                ctx.imageSmoothingEnabled = true;
                                break
                            case "finish":
                                menu = 1;
                                endpause = false;
                                pause = false;
                                pauseframe = 0;
                                transition = "false";
                                selectedaction = "N/A"
                                break
                        }
                    }

                    if(keys_input[6] === 1 & pkey === false | endpause)
                    {
                        endpause = true
                        grd.addColorStop(0.1, "transparent");
                        grd.addColorStop(0, "black");
                        ctx.fillStyle = grd;
                        pauseframe--
                        ctx.fillRect(upscale(-200-(pauseframe*20)), 0, upscale(100-(pauseframe*20)), upscale(675));

                        if(pauseframe < 1)
                        {
                            endpause = false;
                            pause = false;
                            pauseframe = 0;
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
                    command = "true"
                }    
                else
                {
                    command = ""
                    command = prompt("Enter a command:");
                    switch(command)
                    {
                        case null:
                            break
                        case "devmode true": case "devmode enable":
                            devmode = true;
                            map.var_update2(devmode)
                            ui_var_updater2(devmode)
                            break
                        case "devmode false": case "devmode disable":
                            devmode = false;
                            map.var_update2(devmode)
                            ui_var_updater2(devmode)
                            break
                        case "godmode true": case "godmode enable":
                            godmode = true;
                            break
                        case "godmode false": case "godmode disable" :
                            godmode = false;
                            break
                        case "reset":
                            command = "false"; //command
                            push = 0;
                            // devmode = true;
                            godmode = false;
                            frametime = 0;
                            camsmootherenable = true;

                            key_press = "N/A"; //ui and interactivity
                            keynb = "N/A";
                            click = false;
                            menu = 1;
                            mouseX = 0;
                            mouseY = 0;
                            keypressed = false;
                            mousepressed = false;
                            canvasfullscreen = false;
                            ablefullscrenn = "Enable";
                            fullscreenupscale = true;
                            transition = "false";
                            selectedaction = "N/A";
                            showfps = false;

                            //game
                            level = ["testlevel", levels.leveltest1, levels.leveltest2]; 
                            levelid = 1;
                            map = new MapData(level[levelid])
                            start = true
                            player = new PlayerData()
                            vect = [0, 0];
                            stock = [0, 0];

                            //Game running
                            date = Date.now();
                            frametime = date;
                            fps = 1;
                            frameaverageaccumulation = 0
                            dt = 0;
                            executionloop = 0;
                            dateseconds = date;
                            pfps = 0;
                            pfpslog = 0;
                            physicframeavaiblity = 0;
                            playerinterpoX = 0;
                            camerainterpoX = 0;
                            playerinterpoY = 0;
                            camerainterpoY = 0;
                            smoothinterpoX = 0;
                            smoothinterpoY = 0;
                            nbofframewithoutphysics = 1;

                            //Optimisation
                            firstgameframe = false

                            //pause
                            pause = false; 
                            pauseframe = 0;
                            endpause = false;
                            pkey = false;
                            break
                        default:
                            alert("invalid command")
                            break
                    }
                    push = 0
                    key_press = "N/A"
                    keynb = "N/A"
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
            doubleclickfullscreenmousepressed = true;
        }
        else
        {
            mousepressed = false;
            doubleclickfullscreenmousepressed = false;
        }
        button1.mousepressed = button2.mousepressed = 
        button3.mousepressed = button4.mousepressed = 
        button5.mousepressed = button6.mousepressed = 
        button7.mousepressed = button8.mousepressed = 
        button9.mousepressed = mousepressed;
        for(let i = 0; i < keys_input.length; ++i)
        {    
            if(keys_input[i] === 0)
            {
                keypressed = false;
                pkey = false;
            }
            else
            {
                keypressed = true;
                if(keys_input[6] === 1)
                {
                    pkey = true;
                }
                break
            }
        }
        TransitionObject.minus(transition);
        if(transition === "true")
        {
            transition = TransitionObject.plus();
        }
        ctx.font = upscale(20)+'px arial';

        if(devmode)
        {
            ctx.fillStyle = "rgb(255,255,255)";

            ctx.fillText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
            ctx.fillText("y : "+mouseY, upscale(1125), upscale(50));

            ctx.fillText(key_press, upscale(1100), upscale(75)); //key pressed
            ctx.fillText("|", upscale(1141), upscale(75));
            ctx.fillText(keynb, upscale(1152), upscale(75));

            ctx.fillText("Click : "+click, upscale(1091), upscale(100)); //click

            ctx.fillText("Fullscreen : "+canvasfullscreen, upscale(1043), upscale(125)); //fullscreen

            ctx.fillText("Inputs : "+keys_input, upscale(945), upscale(150)); //input


            ctx.strokeStyle = "rgb(0,0,0)";

            ctx.strokeText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
            ctx.strokeText("y : "+mouseY, upscale(1125), upscale(50));

            ctx.strokeText(key_press, upscale(1100), upscale(75)); //key pressed
            ctx.strokeText("|", upscale(1141), upscale(75));
            ctx.strokeText(keynb, upscale(1152), upscale(75));

            ctx.strokeText("Click : "+click, upscale(1091), upscale(100)); //click

            ctx.strokeText("Fullscreen : "+canvasfullscreen, upscale(1043), upscale(125)); //fullscreen

            ctx.strokeText("Inputs : "+keys_input, upscale(945), upscale(150)); //input

            if(menu === 2)
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


                ctx.fillText(edition_mode, upscale(1000), upscale(500)); //-------------------------------------------------------test var------------------------------------------------


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


                ctx.fillText(player.ground_slideposition+"  "+gfpsintervaltiming+"    " , upscale(1000), upscale(500)); //-------------------------------------------------------test var------------------------------------------------


                ctx.strokeStyle = "rgb(0,0,0)";
                
                ctx.strokeText("OX : "+Math.round(mapeditor.offsetX), upscale(985), upscale(275)); //offset
                ctx.strokeText("|", upscale(1080), upscale(275));
                ctx.strokeText("OY : "+mapeditor.offsetY, upscale(1092), upscale(275));
            }

        }
        if(showfps)
        {    
            ctx.fillStyle = "rgb(0,255,0)";
            ctx.fillText(Math.round(fps)+" GFPS "+Number.parseFloat(dt).toPrecision(3)+" DT", upscale(20), upscale(25)); //GFPS = Frame d'affichage
            ctx.fillText(pfpslog+" PFPS ", upscale(20), upscale(50)); // PFPS = frame de physique
            ctx.strokeStyle = "rgb(0,100,0)";
            ctx.strokeText(Math.round(fps)+" GFPS "+Number.parseFloat(dt).toPrecision(3)+" DT", upscale(20), upscale(25));
            ctx.strokeText(pfpslog+" PFPS ", upscale(20), upscale(50));
        }
        previousmouseX = animaticmousevalue[0];
        previousmouseY = animaticmousevalue[1];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "Bold "+upscale(25)+'px arial';
        ctx.fillText("pre 0.6", upscale(20), upscale(650));
        gfpsintervaltiming -= 33;
    }
    
    
    
}


setInterval(main(), 1000)