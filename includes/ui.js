var devmode = false;
var ctx;
var canvasfullscreen = false;
var mouseX = 0;
var mouseY = 0;
var fullscreenupscale;

function ui_var_getter(vartarg, varcont)
{
    switch(vartarg)
    {
        case "devmode":
            devmode = varcont
            break
        case "ctx":
            ctx = varcont
            break
        case "canvasfullscreen":
            canvasfullscreen = varcont
            break
        case "fullscreenupscale":
            fullscreenupscale = varcont
            break
        case "mouseX":
            mouseX = varcont
            break
        case "mouseY":
            mouseY = varcont
            break
    }
    
}

function upscale(initialscale)
{
    if(canvasfullscreen == true & fullscreenupscale == true)
    {
        return initialscale*(screen.height/675)
    }
    return initialscale
}

function gupscale(initialscale)
{
    if(canvasfullscreen == true & fullscreenupscale == true)
    {
        return initialscale*(screen.height/675)+1
    }
    return initialscale
}

function invisible_mouse_collider(posX, posY, width, height)
{
    if(canvasfullscreen == true)
    {
        posX = posX*(screen.height/675);
        posY = posY*(screen.height/675);
        width = width*(screen.height/675);
        height = height*(screen.height/675);
    }
    if(devmode == true)
    {
        ctx.strokeStyle = "rgb(255,255,255)";
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

function twPleinEcran(elem)
{
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

export{upscale, ui_var_getter, twPleinEcran, invisible_mouse_collider, gupscale};