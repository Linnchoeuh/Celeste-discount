var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 1200,
height = 675;

var keys_input = [0,0,0,0,0,0,0]

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
        case 8:
            keys_input.splice(5, 1, 1); //back
            break
        case 80:
            keys_input.splice(6, 1, 1); //p
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
        case 8:
            keys_input.splice(5, 1, 0);
            break
        case 80:
            keys_input.splice(6, 1, 0);
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

level_reader_var_getter("ctx", ctx);
player_var_getter("ctx", ctx);

var command = "false"; //command
var push = 0;
var devmode = true;

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;
var menu = 1;
var mouseX = 0;
var mouseY = 0;
var keypressed = false;
var mousepressed = false;
var canvasfullscreen = false;
var ablefullscrenn = "enable";
var fullscreenupscale = true;
var transition = "false";
var selectedaction = "N/A"

var level = ["testlevel", levels.level1]; //game
var levelid = 1;
let map = new MapData(level[levelid])
var start = true
let player = new PlayerData()
var camposX = 0;
var camposY = 0;
var frame = 0;

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

    
    
    // if(menu == 0 | loading_animation == 0)
    if(menu == 1) //Main menu
    {
        ctx.fillStyle = "rgb(255,255,255)";
        if(animatic_text("--Play--", 0, 460, 405, 285, 60, 520, 450, 48, 54, 58, 60) == true | transition == "finish" & selectedaction == "menu2") //play
        {
            if(transition == "false")
            {
                transition = "true";
                selectedaction = "menu2"
            }
            if(transition == "finish")
            {
                menu = 2;
                transition = "false";
                selectedaction = "N/A"
            }
        }
        if(animatic_text("--Setting--", 1, 460, 505, 285, 60, 487, 550, 48, 54, 58, 60, -0.7) == true | transition == "finish" & selectedaction == "menu3.1") //setting
        {
            if(transition == "false")
            {
                transition = "true";
                selectedaction = "menu3.1"
            }
            if(transition == "finish")
            {
                menu = 3;
                transition = "false";
                selectedaction = "N/A"
            }
        }
        transition_minus(transition)
    }
    if(menu == 2) //Game
    { 
        if(start == true)
        {
            player.spawn(map.spawn[0], map.spawn[1])
            start = false
        }
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
        map.displayer()
        player.moving(keys_input)
        
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
                if(transition == "false")
                {
                    transition = "true";
                    selectedaction = "menu4"
                }
                if(transition == "finish")
                {
                    menu = 4;
                    endpause = false;
                    pause = true;
                    pauseframe = 10;
                    transition = "false";
                    selectedaction = "N/A"
                }
            }
            
            if(animatic_text(ablefullscrenn+" fullscreen", 5, 0, 295, 380, 40, -180+(pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4) == true) //fullscreen
            {
                twPleinEcran(canvas)
            }

            if(animatic_text("Back to menu", 6, 0, 370, 305, 40, -180+(pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) == true | transition == "finish" & selectedaction == "menu1") //back to menu
            {
                if(transition == "false")
                {
                    transition = "true";
                    selectedaction = "menu1"
                }
                if(transition == "finish")
                {
                    menu = 1;
                    endpause = false;
                    pause = false;
                    pauseframe = 0;
                    transition = "false";
                    selectedaction = "N/A"
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
    }
    if(menu == 3 | menu == 4)
    {
        if(animatic_texture(return_arrow, 7, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) == true | keys_input[5] == 1 & keypressed == false | transition == "finish" & selectedaction == "menu3.2")
        {
            if(transition == "false")
            {
                transition = "true";
                selectedaction = "menu3.2"
            }
            if(transition == "finish")
            {
                if(menu == 3)
                {
                    menu = 1
                }
                else
                {
                    menu = 2
                }
                transition = "false";
                selectedaction = "N/A"
            }       
        }
        transition_minus(transition)

    }
    if(key_press == "C" | command == "true") //To enter some usefull command ingame
    {
        push += 1
        if(push > 60 | devmode == true)
        {
            if(key_press == "C")
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
                    case "devmode true":
                        devmode = true
                        break
                    case "devmode enable":
                        devmode = true
                        break
                    case "devmode false":
                        devmode = false
                        break
                    case "devmode disable":
                        devmode = false
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
        ctx.fillText("x : "+mouseX, upscale(1125), upscale(25));
        ctx.fillText("y : "+mouseY, upscale(1125), upscale(50));
        ctx.fillText(key_press, upscale(1100), upscale(75));
        ctx.fillText("|", upscale(1141), upscale(75));
        ctx.fillText(keynb, upscale(1152), upscale(75));
        ctx.fillText("click : "+click, upscale(1096), upscale(100));
        ctx.fillText("fullscreen : "+canvasfullscreen, upscale(1050), upscale(125));
        ctx.fillText(keys_input, upscale(1050), upscale(150));
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.strokeText("x : "+mouseX, upscale(1125), upscale(25));
        ctx.strokeText("y : "+mouseY, upscale(1125), upscale(50));
        ctx.strokeText(key_press, upscale(1100), upscale(75));
        ctx.strokeText("|", upscale(1141), upscale(75));
        ctx.strokeText(keynb, upscale(1152), upscale(75));
        ctx.strokeText("click : "+click, upscale(1096), upscale(100));
        ctx.strokeText("fullscreen : "+canvasfullscreen, upscale(1050), upscale(125));
    }
}


main()
