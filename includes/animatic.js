var devmode = false;
var ctx;
var canvasfullscreen = false;
var mouseX = 0;
var mouseY = 0;
var set = 0;
var click = false;
var mousepressed = false;
var index_list = [0,0,0,0,0,0,0]


import {upscale, invisible_mouse_collider} from "./ui.js";

function animatic_var_getter(vartarg, varcont)
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
        case "click":
            click = varcont
            break
        case "mousepressed":
            mousepressed = varcont
            break
    }
    
}


function animatic_text(text, index, posX, posY, width, height, textX, textY, textscale1, textscale2, textscale3, textscale4, offsetX = 0, offsetY = 0)
{
    if(invisible_mouse_collider(posX, posY, width, height) == true) //play
    {
        switch(index_list[index])
        {
            case 0:
                ctx.font = upscale(textscale2)+'px arial';
                ctx.fillText(text, upscale(textX-((textscale2-textscale1)*(1.5-offsetX))), upscale(textY+((textscale2-textscale1)/(4+offsetY))));
                index_list.splice(index, 1, 1);
                break
            case 1:
                ctx.font = upscale(textscale3)+'px arial';
                ctx.fillText(text, upscale(textX-((textscale3-textscale1)*(1.5-offsetX))), upscale(textY+((textscale3-textscale1)/(4+offsetY))));
                index_list.splice(index, 1, 2);
                break
            case 2:
                ctx.font = upscale(textscale4)+'px arial';
                ctx.fillText(text, upscale(textX-((textscale4-textscale1)*(1.5-offsetX))), upscale(textY+((textscale4-textscale1)/(4+offsetY))));
                break
        }
        if(click == true & mousepressed == false)
        {
            return true
        }
    }
    else
    {
        var content = index_list[index]-1
        switch(index_list[index])
        {
            case 2:
                ctx.font = upscale(textscale3)+'px arial';
                ctx.fillText(text, upscale(textX-((textscale3-textscale1)*(1.5-offsetX))), upscale(textY+((textscale3-textscale1)/(4+offsetY))));
                index_list.splice(index, 1, 1);
                break
            case 1:
                ctx.font = upscale(textscale2)+'px arial';
                ctx.fillText(text, upscale(textX-((textscale2-textscale1)*(1.5-offsetX))), upscale(textY+((textscale2-textscale1)/(4+offsetY))));
                index_list.splice(index, 1, 0);
                break
            case 0:
                ctx.font = upscale(textscale1)+'px arial';
                ctx.fillText(text, upscale(textX), upscale(textY));
                break
        }
    }
    return false
}

function animatic_texture()
{

}

export{animatic_var_getter, animatic_text, animatic_texture, }