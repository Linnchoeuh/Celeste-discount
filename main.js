var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 1200,
height = 675;

var keys_input = [0,0,0,0,0,0,0,0,0]

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
    }
});
document.addEventListener("fullscreenchange", function ()
{
    canvasfullscreen = (document.fullscreen)? true : false;
}, false);

var return_arrow = new Image();
return_arrow.src = "graphics/ui/return_arrow.png";
var bg = new Image();
bg.src = "graphics/map_content/background.png";

import {upscale, ui_var_getter, twPleinEcran} from "./includes/ui.js";
import {animatic_var_getter, animatic_text, animatic_texture, transition_plus, transition_minus} from "./includes/animatic.js";
import {MapData, level_reader_var_getter} from "./includes/level_reader.js";
import {PlayerData, player_var_getter} from "./includes/player.js";
import * as levels from "./includes/levels.js"
// import {cam_var_getter} from "./includes/camera.js";

level_reader_var_getter("ctx", ctx);
player_var_getter("ctx", ctx);

var command = "false"; //command
var push = 0;
var devmode = true;
var godmode = false;

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;
var menu = 2;
var mouseX = 0;
var mouseY = 0;
var keypressed = false;
var mousepressed = false;
var canvasfullscreen = false;
var ablefullscrenn = "enable";
var fullscreenupscale = true;
var transition = "false";
var selectedaction = "N/A"

var level = ["testlevel", levels.leveltest1, levels.leveltest2]; //game
var levelid = 1;
let map = new MapData(level[levelid])
var start = true
let player = new PlayerData()
var vect = [0,0];
var stock = [[1,1,1,1,1,1,1,1], 0, 0];

var pause = false; //pause
var pauseframe = 0;
var endpause = false;
var pkey = false;

//setting

function main()
{
    requestAnimationFrame(main);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(canvasfullscreen == true)
    {
        if(fullscreenupscale == true)
        {    
            canvas.width = screen.width;
            canvas.height = screen.height;
        }
        else
        {
            canvas.width = 1200;
            canvas.height = 675;
        }
        ablefullscrenn = "Disable"
    }
    else
    {
        canvas.width = 1200;
        canvas.height = 675;
        ablefullscrenn = "Enable"
    }
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ui_var_getter("canvasfullscreen", canvasfullscreen);
    ui_var_getter("mouseX", mouseX);
    ui_var_getter("mouseY", mouseY);
    ui_var_getter("devmode", devmode);
    ui_var_getter("ctx", ctx);
    ui_var_getter("fullscreenupscale", fullscreenupscale);
    animatic_var_getter("canvasfullscreen", canvasfullscreen);
    animatic_var_getter("mouseX", mouseX);
    animatic_var_getter("mouseY", mouseY);
    animatic_var_getter("devmode", devmode);
    animatic_var_getter("ctx", ctx);
    animatic_var_getter("click", click);
    animatic_var_getter("mousepressed", mousepressed);
    player_var_getter("pause", pause);
    level_reader_var_getter("devmode", devmode);
    
    switch(menu) 
    {
        case 1: //Main menu
            ctx.fillStyle = "rgb(255,255,255)";
            if(animatic_text("--Play--", 0, 460, 405, 285, 60, 520, 450, 48, 54, 58, 60) == true | transition == "finish" & selectedaction == "menu2") //play
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
            if(animatic_text("--Setting--", 1, 460, 505, 285, 60, 487, 550, 48, 54, 58, 60, -0.7) == true | transition == "finish" & selectedaction == "menu3.1") //setting
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
            transition_minus(transition)
            break
        case 2: //Game 
            if(start == true)
            {
                player.spawn(map.start(level[levelid]))
                start = false
            }
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
            vect = player.velocity(keys_input, vect[0], vect[1], godmode, map.collisions, map.offsetX_on, map.offsetY_on, map.bestdown[4])
            stock = map.displayer(player.playerX, player.playerY, vect[0], vect[1], keys_input) 
            player.playerX = stock[1]
            player.playerY = stock[2]
            player.player_animatic(keys_input, map.collisions, map.offsetX, map.offsetY, map.offsetX_on, map.offsetY_on)
            if(keys_input[6] == 1 & pkey == false | pause == true) //pause
            {
                if(pause == false & pkey == false)
                {
                    pause = true;
                    keypressed = true;
                    pkey = true
                    endpause = false; 
                }
                player_var_getter("pause", pause);
                var grd = ctx.createLinearGradient(-150, 0, upscale(3000), 0);
                grd.addColorStop(0.1, "transparent");
                grd.addColorStop(0, "black");
                if(pauseframe < 10 & endpause == false)
                {
                    pauseframe++;
                }
                ctx.fillStyle = "rgba(0,0,0,"+0.05*pauseframe+")";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.fillStyle = grd;
                ctx.fillRect(upscale(-200+(pauseframe*20)), 0, upscale(100+(pauseframe*20)), upscale(675));
                if(endpause == false)    
                {
                    ctx.font = "Bold "+upscale(125)+'px arial';
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillText('Pause', upscale(425), upscale(100));
                }
                ctx.fillStyle = "rgb(255,255,255)";

                if(animatic_text("Resume", 3, 0, 145, 195, 40, -180+(pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4) == true) //resume
                {
                    endpause = true;
                }

                if(animatic_text("Setting", 4, 0, 222, 175, 40, -180+(pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) == true | transition == "finish" & selectedaction == "menu4") //setting
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

                if(animatic_text(ablefullscrenn+" fullscreen", 5, 0, 295, 380, 40, -180+(pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4) == true) //fullscreen
                {
                    twPleinEcran(canvas)
                }

                if(animatic_text("Back to menu", 6, 0, 370, 305, 40, -180+(pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) == true | transition == "finish" & selectedaction == "menu1") //back to menu
                {
                    switch(transition)
                    {
                        case "false":
                            transition = "true";
                            selectedaction = "menu1"
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

                if(keys_input[6] == 1 & pkey == false | endpause == true)
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
                    player_var_getter("pause", pause);
                }
            }
            transition_minus(transition)
            break
        case 3 : case 4: //Setting
            if(animatic_texture(return_arrow, 7, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) == true | keys_input[5] == 1 & keypressed == false | transition == "finish" & selectedaction == "menu3.2")
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
                        }
                        transition = "false";
                        selectedaction = "N/A"
                        break
                }   
            }
            transition_minus(transition)
            break
    }
    if(keys_input[7] == 1 | command == "true") //To enter some usefull commands ingame
    {
        push += 1
        if(push > 60 | devmode == true)
        {
            if(keys_input[7] == 1)
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
                    case "devmode true": case "devmode enable":
                        devmode = true;
                        break
                    case "devmode false": case "devmode disable":
                        devmode = false;
                        break
                    case "godmode true": case "godmode enable":
                        godmode = true;
                        break
                    case "godmode false": case "godmode disable" :
                        godmode = false;
                        break
                    case "reset":
                        level_reader_var_getter("ctx", ctx);
                        player_var_getter("ctx", ctx);

                        command = "false"; //command
                        push = 0;

                        key_press = "N/A"; //ui and interactivity
                        keynb = "N/A";
                        click = false;
                        menu = 1;
                        mouseX = 0;
                        mouseY = 0;
                        keypressed = false;
                        mousepressed = false;
                        canvasfullscreen = false;
                        ablefullscrenn = "enable";
                        fullscreenupscale = true;
                        transition = "false";
                        selectedaction = "N/A"

                        level = ["testlevel", levels.level1]; //game
                        levelid = 1;
                        map = new MapData(level[levelid])
                        start = true
                        player = new PlayerData()
                        collisions = [0,0,0,0]
                        frame = 0;

                        pause = false; //pause
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
        push = 0
    }
    if(click == true)
    {
        mousepressed = true
    }
    else
    {
        mousepressed = false
    }
    for(let i = 0; i < keys_input.length; ++i)
        if(keys_input[i] == 0)
        {
            keypressed = false
            pkey = false
        }
        else
        {
            keypressed = true
            if(keys_input[6] == 1)
            {
                pkey = true
            }
            break
        }
    if(transition == "true")
    {
        transition = transition_plus();
    }
    
    
    
    
    if(devmode == true)
    {
        ctx.font = upscale(20)+'px arial';
        ctx.fillStyle = "rgb(255,255,255)";
        
        ctx.fillText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
        ctx.fillText("y : "+mouseY, upscale(1125), upscale(50));

        ctx.fillText(key_press, upscale(1100), upscale(75)); //key pressed
        ctx.fillText("|", upscale(1141), upscale(75));
        ctx.fillText(keynb, upscale(1152), upscale(75));

        ctx.fillText("Click : "+click, upscale(1091), upscale(100)); //click

        ctx.fillText("Fullscreen : "+canvasfullscreen, upscale(1043), upscale(125)); //fullsecreen

        ctx.fillText("Inputs : "+keys_input, upscale(978), upscale(150)); //input

        ctx.fillText("Collisions : "+stock[0], upscale(830), upscale(175)); //collisions

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

        ctx.fillText(player.lastdirection+" "+player.dash+" "+player.dashcooldown, upscale(1015), upscale(500)); //-------------------------------------------------------test var------------------------------------------------
        
        
        ctx.strokeStyle = "rgb(0,0,0)";

        ctx.strokeText("x : "+mouseX, upscale(1125), upscale(25)); //mouse pos
        ctx.strokeText("y : "+mouseY, upscale(1125), upscale(50));

        ctx.strokeText(key_press, upscale(1100), upscale(75)); //key pressed
        ctx.strokeText("|", upscale(1141), upscale(75));
        ctx.strokeText(keynb, upscale(1152), upscale(75));

        ctx.strokeText("Click : "+click, upscale(1091), upscale(100)); //click

        ctx.strokeText("Fullscreen : "+canvasfullscreen, upscale(1043), upscale(125)); //fullsecreen

        ctx.strokeText("Inputs : "+keys_input, upscale(978), upscale(150)); //input

        ctx.strokeText("Collisions : "+stock[0], upscale(830), upscale(175)); //collisions

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
}


main()