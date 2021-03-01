var devmode = false;
var ctx;
var canvasfullscreen = false;
var mouseX = 0;
var mouseY = 0;
var fullscreenupscale;

function ui_var_updater(actx)
{
    ctx = actx;
}

function ui_var_updater2(adevmode)
{
    devmode = adevmode;
}

function ui_var_updater3(acanvasfullscreen, afullscreenupscale, amouseX, amouseY)
{
    canvasfullscreen = acanvasfullscreen;
    fullscreenupscale = afullscreenupscale;
    mouseX = amouseX;
    mouseY = amouseY;

}

function upscale(initialscale)
{
    if(canvasfullscreen == true)
    {
        return initialscale*(canvas.height/675)
    }
    return initialscale
}

function gupscale(initialscale)
{
    if(canvasfullscreen == true)
    {
        return Math.round(initialscale*(canvas.height/675)+1)
    }
    return Math.round(initialscale)
}

function invisible_mouse_collider(posX, posY, width, height)
{
    if(devmode == true)
    {
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.strokeRect(upscale(posX),upscale(posY),upscale(width),upscale(height));
    }
    if(canvasfullscreen == true)
    {
        posX = posX*(screen.height/675);
        posY = posY*(screen.height/675);
        width = width*(screen.height/675);
        height = height*(screen.height/675);
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

export{upscale, twPleinEcran, invisible_mouse_collider, gupscale, ui_var_updater, ui_var_updater2, ui_var_updater3};