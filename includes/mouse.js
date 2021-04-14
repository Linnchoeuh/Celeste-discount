import {ctx, GV, Tools} from "../main.js";

var mouse_x = 0;
var mouse_y = 0;
var mouse_click = false;
var mouse_click_left = false
var mouse_click_middle = false
var mouse_out = false;

canvas.addEventListener('mousemove', function(event)
{
    mouse_x = event.clientX - canvas.offsetLeft;
    mouse_y = event.clientY - canvas.offsetTop;
});
canvas.addEventListener('mousedown', function(event)
{
    mouse_click = true;
    switch(event.button)
    {
        case 0:
            mouse_click_left = true;
        case 1:
            mouse_click_middle = true;
    }
});
canvas.addEventListener('mouseup', function(event)
{
    mouse_click = false;
    switch(event.button)
    {
        case 0:
            mouse_click_left = false;
        case 1:
            mouse_click_middle = false;
    }
});

class Mouse_Data
{
    constructor()
    {
        this.canvasfullscreen = false;
        this.double_click_fullscreen_mouse_pressed = false;
        
        this.x = 0;
        this.y = 0;
        this.click = false;
        this.pressed = false;
        this.click_left = false;
        this.click_middle = false;

        this.animatic_mouse_value = [0,0];
    }

    varUpdater()
    {        
        this.x = mouse_x;
        this.y = mouse_y;
        this.click = mouse_click;
        this.click_left = mouse_click_left;
        this.click_middle = mouse_click_middle;
    }

    mousePressed()
    {
        if(this.click)
        {
            this.pressed = true;
            this.double_click_fullscreen_mouse_pressed = true;
        }
        else
        {
            this.pressed = false;
            this.double_click_fullscreen_mouse_pressed = false;
        }
    }

    invisibleMouseCollider(posX, posY, width, height)
    {
        if(GV.devmode)
        {
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.strokeRect(Tools.resolutionScaler(posX),Tools.resolutionScaler(posY),Tools.resolutionScaler(width),Tools.resolutionScaler(height));
        }
        if(this.canvasfullscreen)
        {
            posX = posX*(screen.height/675);
            posY = posY*(screen.height/675);
            width = width*(screen.height/675);
            height = height*(screen.height/675);
        }
        if(this.x >= posX & this.y >= posY & this.x <= posX+width & this.y <= posY+height)
        {
            return true;
        }
        return false;
    }

    resolutionAdapter()
    {
        if(this.canvasfullscreen)
        {
            this.animatic_mouse_value = [this.x*(canvas.width / screen.width), this.y*(canvas.height / screen.height)];
        }
        else
        {
            this.animatic_mouse_value = [this.x, this.y];
        }
    }
}

export{Mouse_Data};