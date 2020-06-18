var devmode = false;
var ctx;
var canvasfullscreen = false;
var mouseX = 0;
var mouseY = 0;

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
    if(canvasfullscreen == true)
    {
        return initialscale*1.6 
    }
    return initialscale
}

function invisible_mouse_collider(posX, posY, width, height)
{
    posX = upscale(posX);
    posY = upscale(posY);
    width = upscale(width);
    height = upscale(height);
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

function twPleinEcran(_element)
{
    var monElement = _element||document.documentElement;
    if (document.mozFullScreenEnabled) 
    {
        if (!document.mozFullScreenElement) 
        {
            monElement.mozRequestFullScreen();
        } 
        else 
        {
            document.mozCancelFullScreen();
        }
        
    }
    if (document.fullscreenElement)
    {
        if (!document.fullscreenElement)
        {
            monElement.requestFullscreen();
        } 
        else
        {
            document.exitFullscreen();
        }
    }
    if (document.webkitFullscreenEnabled)
    {
        if (!document.webkitFullscreenElement)
        {
            monElement.webkitRequestFullscreen();
        }
        else
        {
            document.webkitExitFullscreen();
        }
    }
    if (document.msFullscreenEnabled)
    {
        if (!document.msFullscreenElement)
        {
            monElement.msRequestFullscreen();
        }
        else
        {
            document.msExitFullscreen();
        }
    }
}

export{upscale, ui_var_getter, twPleinEcran, invisible_mouse_collider};