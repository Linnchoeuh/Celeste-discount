import {ctx, GV, Tools, Mouse} from "../../main.js";


class Animatic_
{
    constructor()
    {
        this.animation_state = 0;

        this.defauloffset_text_type1 = [1.5, 0];
        this.defauloffset_texture_type1 = [0.5, -0.5];
    }

    text_type1(text, posX, posY, width, height, textX, textY, textscale1, textscale2, textscale3, textscale4, offsetX = 0, offsetY = 0)
    {
        if(Mouse.invisibleMouseCollider(posX, posY, width, height)) //play
        {
            switch(this.animation_state)
            {
                case 0:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale2)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX-((textscale2-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), Tools.resolutionScaler(textY+((textscale2-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state++;
                    break;
                case 1:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale3)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX-((textscale3-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), Tools.resolutionScaler(textY+((textscale3-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state++;
                    break;
                case 2:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale4)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX-((textscale4-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), Tools.resolutionScaler(textY+((textscale4-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    break;
            }
            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale3)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX-((textscale3-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), Tools.resolutionScaler(textY+((textscale3-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state--;
                    break;
                case 1:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale2)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX-((textscale2-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), Tools.resolutionScaler(textY+((textscale2-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state--;
                    break;
                case 0:
                    ctx.font = "Bold "+Tools.resolutionScaler(textscale1)+'px arial';
                    ctx.fillText(text, Tools.resolutionScaler(textX), Tools.resolutionScaler(textY));
                    break;
            }
        }
        return false;
    }

    text_type2(text, posX, posY, width, height, textX, textY, textscale, color = "rgb(255,255,255)", line_width = 2)
    {
        ctx.font = "Bold "+Tools.resolutionScaler(textscale)+'px arial';
        ctx.fillText(text, Tools.resolutionScaler(textX), Tools.resolutionScaler(textY));
        if(Mouse.invisibleMouseCollider(posX, posY, width, height) == true) //set fullscren
        {
            switch(this.animation_state)
            {
                case 0:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX+(width/2)-(width/4)), 0, Tools.resolutionScaler(posX+(width/2)+(width/4)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX+(width/2)-(width/4)), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width/2), Tools.resolutionScaler(line_width));
                    this.animation_state++;
                    break;
                case 1:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX+(width/2)-(width*0.375)), 0, Tools.resolutionScaler(posX+(width/2)+(width*0.375)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX+(width/2)-(width*0.375)), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width), Tools.resolutionScaler(line_width));
                    this.animation_state++;
                    break;
                case 2:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX), 0, Tools.resolutionScaler(posX+width), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width), Tools.resolutionScaler(line_width));
                    break;
            }
            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX+(width/2)-(width*0.375)), 0, Tools.resolutionScaler(posX+(width/2)+(width*0.375)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX+(width/2)-(width*0.375)), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width), Tools.resolutionScaler(line_width));
                    this.animation_state--;
                    break;
                case 1:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX+(width/2)-(width/4)), 0, Tools.resolutionScaler(posX+(width/2)+(width/4)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX+(width/2)-(width/4)), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width/2), Tools.resolutionScaler(line_width));
                    this.animation_state--;
                    break;
                case 0:
                    var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX+(width/2)-(width/8)), 0, Tools.resolutionScaler(posX+(width/2)+(width/8)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    ctx.fillStyle = grd;
                    ctx.fillRect(Tools.resolutionScaler(posX+(width/2)-(width/8)), Tools.resolutionScaler(posY+height-line_width), Tools.resolutionScaler(width/4), Tools.resolutionScaler(line_width));
                    break;
            }
        }
        return false;
    }

    texture_type1(texture, posX, posY, width, height, textureX, textureY, texturescale1, texturescale2, texturescale3, texturescale4, offsetX = 0, offsetY = 0, text_show = "", textX = 0, textY = 0, textscale = 10, text_color = "rgb(255,255,255)")
    {
        if(Mouse.invisibleMouseCollider(posX, posY, width, height) == true) //set fullscren
        {
            switch(this.animation_state)
            {
                case 0:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX-((texturescale2-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), 
                    Tools.resolutionScaler(textureY+((texturescale2-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), Tools.resolutionScaler(texturescale2*(texturescale1[0]/texturescale1[1])), Tools.resolutionScaler(texturescale2));
                    this.animation_state++;
                    break;
                case 1:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX-((texturescale3-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), 
                    Tools.resolutionScaler(textureY+((texturescale3-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), Tools.resolutionScaler(texturescale3*(texturescale1[0]/texturescale1[1])), Tools.resolutionScaler(texturescale3));
                    this.animation_state++;
                    break;
                case 2:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX-(((texturescale4*(texturescale1[0]/texturescale1[1]))-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), 
                    Tools.resolutionScaler(textureY+((texturescale4-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), Tools.resolutionScaler(texturescale4*(texturescale1[0]/texturescale1[1])), Tools.resolutionScaler(texturescale4));
                    if(text_show != "")
                    {
                        ctx.fillStyle = text_color;
                        ctx.font = "Bold "+Tools.resolutionScaler(textscale)+'px arial';
                        ctx.fillText(text_show, Tools.resolutionScaler(textX), Tools.resolutionScaler(textY));
                    }
                    break;
            }
            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX-((texturescale3-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), 
                    Tools.resolutionScaler(textureY+((texturescale3-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), Tools.resolutionScaler(texturescale3*(texturescale1[0]/texturescale1[1])), Tools.resolutionScaler(texturescale3));
                    this.animation_state--;
                    break;
                case 1:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX-((texturescale2-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), 
                    Tools.resolutionScaler(textureY+((texturescale2-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), Tools.resolutionScaler(texturescale2*(texturescale1[0]/texturescale1[1])), Tools.resolutionScaler(texturescale2));
                    this.animation_state--;
                    break;
                case 0:
                    ctx.drawImage(texture, Tools.resolutionScaler(textureX), Tools.resolutionScaler(textureY), Tools.resolutionScaler(texturescale1[0]), Tools.resolutionScaler(texturescale1[1]));
                    break;
            }
        }
        return false;
    }

    texture_type2(posX, posY, texture, text, reverse = false, texture_offsetX = 5, texture_offsetY = 5, texture_scaleX = 20, texture_scaleY = 20) //Map editor button
    {
        if(Mouse.invisibleMouseCollider(posX, posY, 30, 30) == true)
        {
            ctx.fillStyle = "rgba(100,100,100,0.4)";
            ctx.strokeStyle = "rgb(255,255,255)";
        }
        else
        {
            ctx.fillStyle = "rgba(0,0,0,0.4)";
            ctx.strokeStyle = "rgb(255,255,255)";
        }
            
        ctx.beginPath();
        ctx.moveTo(Tools.resolutionScaler(posX), Tools.resolutionScaler(posY+5));
        ctx.lineTo(Tools.resolutionScaler(posX+5),Tools.resolutionScaler(posY));
        ctx.lineTo(Tools.resolutionScaler(posX+25), Tools.resolutionScaler(posY));
        ctx.lineTo(Tools.resolutionScaler(posX+30), Tools.resolutionScaler(posY+5));
        ctx.lineTo(Tools.resolutionScaler(posX+30), Tools.resolutionScaler(posY+25));
        ctx.lineTo(Tools.resolutionScaler(posX+25), Tools.resolutionScaler(posY+30));
        ctx.lineTo(Tools.resolutionScaler(posX+5), Tools.resolutionScaler(posY+30));
        ctx.lineTo(Tools.resolutionScaler(posX), Tools.resolutionScaler(posY+25));
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth=Tools.resolutionScaler(2);
        ctx.stroke();
        ctx.lineWidth=1;
        ctx.drawImage(texture, Tools.resolutionScaler(posX+texture_offsetX), Tools.resolutionScaler(posY+texture_offsetY), Tools.resolutionScaler(texture_scaleX), Tools.resolutionScaler(texture_scaleY));
        
        if(Mouse.invisibleMouseCollider(posX, posY, 30, 30))
        {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.beginPath();
            if(reverse)
            {
                ctx.moveTo(GV.mouseX+Tools.resolutionScaler(10), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(15),GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+20), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+20), GV.mouseY+Tools.resolutionScaler(2));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(15), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(10), GV.mouseY+Tools.resolutionScaler(2));
            }
            else
            {
                ctx.moveTo(GV.mouseX-Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+10),GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-10), GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-5), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-5), GV.mouseY+Tools.resolutionScaler(2));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-10), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+10), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(2));
            }
            
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth=Tools.resolutionScaler(2);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = Tools.resolutionScaler(15)+'px Lucida Console';
            if(reverse)
            {
                ctx.fillText(text, GV.mouseX+Tools.resolutionScaler(15), GV.mouseY);
            }
            else
            {
                ctx.fillText(text, GV.mouseX-Tools.resolutionScaler(text.length*9+10), GV.mouseY);
            }
            
            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        return false;
    }
}

export{Animatic_};