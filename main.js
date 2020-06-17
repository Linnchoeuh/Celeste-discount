const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 1200,
height = 675,
ratio = window.devicePixelRatio;

ctx.canvas.addEventListener('mousemove', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var status = document.getElementById("status");
    status.innerHTML = mouseX+" | "+mouseY;
});
ctx.canvas.addEventListener('mousedown', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var clicking = document.getElementById("clicking");
    click = true
    clicking.innerHTML = click
});
ctx.canvas.addEventListener('mouseup', function(event)
{
    mouseX = event.clientX - ctx.canvas.offsetLeft;
    mouseY = event.clientY - ctx.canvas.offsetTop;
    var clicking = document.getElementById("clicking");
    click = false
    clicking.innerHTML = click
});
document.addEventListener("keydown", function(event)
{
    key_press = String.fromCharCode(event.keyCode);
    keyinput.innerHTML = event.keyCode+" | "+key_press;
    keynb = event.keyCode
});
document.addEventListener("keyup", function(event)
{
    key_press = "none"
    keynb = "none"
    keyinput.innerHTML = keynb+" | "+key_press;
});


canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
ctx.scale(ratio,ratio);
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var command = false;
var push = 0;
var devmode = false;
var key_press = "none";
var keynb = "none";
var loading_animation = 0;
var click = false;
var menu = 1;
var mouseX = 0;
var mouseY = 0;
var keyboardmode = 0;
var keypressed = false;
var mousepressed = false;
var pause = false;
var pauseframe = 0;
var endpause = false;
var esckey = false;


var initial_pose = new Image();
initial_pose.src = "graphics/player/initial_pose48px.png";
var return_arrow = new Image();
return_arrow.src = "graphics/ui/return_arrow.png";
var bg = new Image();
bg.src = "graphics/map_content/background.png";




function invisible_mouse_collider(posX, posY, width, height)
{
    if(devmode == true)
    {
        ctx.strokeStyle = "#dddddd";
        ctx.strokeRect(posX,posY,width,height);
    }
    if(mouseX >= posX & mouseY >= posY & mouseX <= posX+width & mouseY <= posY+height)
    {
        return true
    }
    else
    {
        return false
    }
}
function keyboard_support(input)
{
    if(keyboardmode == 0)
    {
        
    }
    else if(keyboardmode == 1)
    {

    }
}

var n = 0;
function main()
{
    requestAnimationFrame(main);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    // if(menu == 0 | loading_animation == 0)

    if(menu == 1)
    {
        ctx.fillStyle = "rgb(255,255,255)";
        if(invisible_mouse_collider(500,405,200,60) == true)
        {
            ctx.font = '60px arial';
            ctx.fillText('--Play--', 500, 450);
            if(click == true & mousepressed == false)
            {
                menu = 2
            }
        }
        else
        {
            ctx.font = '48px arial';
            ctx.fillText('--Play--', 520, 450);
        }
        if(invisible_mouse_collider(470,505,265,60) == true)
        {
            ctx.font = '60px arial';
            ctx.fillText('--Setting--', 470, 550);
            if(click == true & mousepressed == false)
            {
                menu = 3
            }
        }
        else
        {
            ctx.font = '48px arial';
            ctx.fillText('--Setting--', 495, 550);
        }
    }
    if(menu == 2) //game
    {
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.drawImage(bg, 0, 0, 1200, 675);
        ctx.drawImage(initial_pose, 100, 100, 100, 100);
        
        if(keynb == 27 & esckey == false | pause == true) //pause
        {
            if(pause == false & command == 0 & esckey == false)
            {
                pause = true;
                keypressed = true;
                endpause = false
            }
            var grd = ctx.createLinearGradient(0, 0, 2000, 0);
            grd.addColorStop(0.1, "transparent");
            grd.addColorStop(0, "black");
            ctx.fillStyle = grd;
            if(pauseframe < 10 & endpause == false)
            {
                pauseframe++;
            }
            ctx.fillRect(-200+(pauseframe*20), 0, 100+(pauseframe*20), 675);
            
            ctx.font = '125px arial';
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillText('Pause', 425, 100);
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.strokeText('Pause', 425, 100);

            ctx.fillStyle = "rgb(255,255,255)";
            if(invisible_mouse_collider(0,420,270,40) == true)
            {
                ctx.font = '40px arial';
                ctx.fillText('Back to menu', -180+(pauseframe*20), 453);
                if(click == true & mousepressed == false)
                {
                    menu = 1
                    endpause = false;
                    pause = false;
                    pauseframe = 0;
                }
            }
            else
            {
                ctx.font = '30px arial';
                ctx.fillText('Back to menu', -190+(pauseframe*20), 450);
            }
            
            if(keynb == 27 & keypressed == false | endpause == true)
            {
                endpause = true
                grd.addColorStop(0.1, "transparent");
                grd.addColorStop(0, "black");
                ctx.fillStyle = grd;
                pauseframe-- 
                ctx.fillRect(-200+(pauseframe*20), 0, 100+(pauseframe*20), 675);
                
                if(pauseframe < 1)
                {
                    endpause = false;
                    pause = false;
                    pauseframe = 0;
                }
            }
        }
    }

    if(menu == 3)
    {
        if(invisible_mouse_collider(0,0,70,70) == true | keynb == 27 & keypressed == false)
        {
            ctx.drawImage(return_arrow, 10, 5, 70, 70);
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = '25px arial';
            ctx.fillText('Back', 50, 70);
            if(click == true & mousepressed == false | keynb == 27 & keypressed == false)
            {
                menu = 1
            }
        }
        else
        {
            ctx.drawImage(return_arrow, 20, 10, 48, 48);
        }
    }
    
    if(key_press == "C") //To enter some usefull command ingame
    {
        push += 1
        if(push == 60)
        {
            let command = prompt("Enter a command:");
            if(command == "devmode true" | command == "devmode enable")
            {
                devmode = true
            }
            else if(command == "devmode false" | command == "devmode disable")
            {
                devmode = false
            }
            else
            {
                console.log("invalid command")
            }
            push = 0
            key_press = "none"
            keynb = "none"
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
    if(keynb == "none")
    {
        keypressed = false
        esckey = false
    }
    else
    {
        keypressed = true
        if(keynb == 27)
        {
            esckey = true
        }
    }
    
}


main()

// if(command == true)
//     {
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
//         ctx.strokeStyle = "#dddddd";
//         ctx.fillRect(0, 0, 1200, 675, 0);
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
//         ctx.fillRect(100, 600, 1000, 50, 0);
//         ctx.strokeRect(100, 600, 1000, 50);
        
//         if(keynb == 27 & keypressed == false)
//             {
//                 command = 0
//                 esckey = true
//             }
//     }