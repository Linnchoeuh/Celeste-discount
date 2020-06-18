var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 1200,
height = 675;

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
});
document.addEventListener("keyup", function(event)
{
    key_press = "N/A";
    keynb = "N/A";
});
document.addEventListener("fullscreenchange", function ()
{
    canvasfullscreen = (document.fullscreen)? true : false;
}, false);


import {upscale, ui_var_getter, twPleinEcran, invisible_mouse_collider} from "./includes/ui.js";
import {animatic_var_getter, animatic_text} from "./includes/animatic.js";
import {read} from "./includes/level_reader.js";

var command = false; //command
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

var pause = false; //pause
var pauseframe = 0;
var endpause = false;
var pkey = false;

var rse = 0; //setting

var initial_pose = new Image(); //graphics
initial_pose.src = "graphics/player/initial_pose48px.png";
var return_arrow = new Image();
return_arrow.src = "graphics/ui/return_arrow.png";
var bg = new Image();
bg.src = "graphics/map_content/background.png";

function main()
{
    requestAnimationFrame(main);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(canvasfullscreen == true)
    {
        canvas.width = 1920;
        canvas.height = 1080;
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
    animatic_var_getter("canvasfullscreen", canvasfullscreen);
    animatic_var_getter("mouseX", mouseX);
    animatic_var_getter("mouseY", mouseY);
    animatic_var_getter("devmode", devmode);
    animatic_var_getter("ctx", ctx);
    animatic_var_getter("click", click);
    animatic_var_getter("mousepressed", mousepressed);
    
    // if(menu == 0 | loading_animation == 0)

    if(menu == 1) //Main menu
    {
        ctx.fillStyle = "rgb(255,255,255)";
        if(animatic_text("--Play--", 0, 470, 405, 265, 60, 520, 450, 48, 54, 58, 60) == true) //play
        {
            menu = 2
        }
        if(animatic_text("--Setting--", 1, 470, 505, 265, 60, 495, 550, 48, 54, 58, 60, -0.7) == true) //setting
        {
            menu = 3
        }
    }
    if(menu == 2) //Game
    {
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
        ctx.drawImage(initial_pose, 100, 100, upscale(48), upscale(48));
        
        if(keynb == 80 & pkey == false | pause == true) //pause
        {
            if(pause == false & command == 0 & pkey == false)
            {
                pause = true;
                keypressed = true;
                endpause = false;
                resu = 0;
                set = 0;
                ful = 0;
                btm = 0;
            }
            var grd = ctx.createLinearGradient(0, 0, upscale(3000), 0);
            grd.addColorStop(0.1, "transparent");
            grd.addColorStop(0, "black");
            ctx.fillStyle = grd;
            if(pauseframe < 10 & endpause == false)
            {
                pauseframe++;
            }
            ctx.fillRect(upscale(-200+(pauseframe*20)), 0, upscale(100+(pauseframe*20)), upscale(675));
            if(endpause == false)    
            {
                ctx.font = upscale(125)+'px arial';
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillText('Pause', upscale(425), upscale(100));
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.strokeText('Pause', upscale(425), upscale(100));
            }
            ctx.fillStyle = "rgb(255,255,255)";
            
            if(animatic_text("Resume", 3, 0, 70, 190, 40, -180+(pauseframe*20), 100, 30, 33, 36, 40, 3.6) == true) //resume
            {
                endpause = true;
            }
            
            if(animatic_text("Setting", 4, 0, 170, 165, 40, -180+(pauseframe*20), 200, 30, 33, 36, 40, 3.7) == true) //setting
            {
                menu = 4;
                endpause = false;
                pause = true;
                pauseframe = 10;
            }
            
            if(animatic_text(ablefullscrenn+" fullscreen", 5, 0, 270, 355,40, -180+(pauseframe*20), 300, 30, 33, 36, 40, 4.5) == true) //fullscreen
            {
                twPleinEcran(canvas)
            }

            if(animatic_text("Back to menu", 6, 0, 370, 285,40, -180+(pauseframe*20), 400, 30, 33, 36, 40, 3.8) == true) //back to menu
            {
                menu = 1;
                endpause = false;
                pause = false;
                pauseframe = 0;
            }
            
            if(keynb == 80 & keypressed == false | endpause == true)
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
    }
    if(menu == 3 | menu == 4)
    {
        if(invisible_mouse_collider(0,0,120,80) == true) //set fullscren
        {
            switch(rse)
            {
                case 0:
                    ctx.drawImage(return_arrow, upscale(20), upscale(10), upscale(55), upscale(55));
                    rse++;
                    break
                case 1:
                    ctx.drawImage(return_arrow, upscale(20), upscale(10), upscale(65), upscale(65));
                    rse++;
                    break
                case 2:
                    ctx.drawImage(return_arrow, upscale(10), upscale(5), upscale(70), upscale(70));
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.font = '25px arial';
                    ctx.fillText('Back', upscale(50), upscale(70));
                    break
            }
            if(click == true & mousepressed == false | keynb == 80 & keypressed == false)
            {
                if(menu == 3)
                {
                    menu = 1
                }
                else
                {
                    menu = 2
                }
            }
        }
        else
        {
            switch(rse)
            {
                case 2:
                    ctx.drawImage(return_arrow, upscale(20), upscale(10), upscale(65), upscale(65));
                    rse--;
                    break
                case 1:
                    ctx.drawImage(return_arrow, upscale(20), upscale(10), upscale(55), upscale(55));
                    rse--;
                    break
                case 0:
                    ctx.drawImage(return_arrow, upscale(20), upscale(10), upscale(48), upscale(48));
                    break
            }
        }

    }
    if(key_press == "C") //To enter some usefull command ingame
    {
        push += 1
        if(push == 60 || devmode == true)
        {
            let command = prompt("Enter a command:");
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
    if(keynb == "N/A")
    {
        keypressed = false
        pkey = false
    }
    else
    {
        keypressed = true
        if(keynb == 80)
        {
            pkey = true
        }
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

// if(command == true)
//     {
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
//         ctx.strokeStyle = "#dddddd";
//         ctx.fillRect(0, 0, 1upscale(200), 675, 0);
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
//         ctx.fillRect(100, 600, 1000, 50, 0);
//         ctx.strokeRect(100, 600, 1000, 50);
        
//         if(keynb == 80 & keypressed == false)
//             {
//                 command = 0
//                 pkey = true
//             }
//     }