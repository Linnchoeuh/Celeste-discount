import {upscale, invisible_mouse_collider} from "./ui.js";

class Animatic
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.animation_state = 0;

        this.click = false;
        this.mousepressed = false;

        this.defauloffset_text_type1 = [1.5, 0]
        this.defauloffset_texture_type1 = [0.5, -0.5]

        this.mouseX = 0
        this.mouseY = 0
    }

    text_type1(text, posX, posY, width, height, textX, textY, textscale1, textscale2, textscale3, textscale4, offsetX = 0, offsetY = 0)
    {
        if(invisible_mouse_collider(posX, posY, width, height)) //play
        {
            switch(this.animation_state)
            {
                case 0:
                    this.ctx.font = "Bold "+upscale(textscale2)+'px arial';
                    this.ctx.fillText(text, upscale(textX-((textscale2-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), upscale(textY+((textscale2-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state++;
                    break
                case 1:
                    this.ctx.font = "Bold "+upscale(textscale3)+'px arial';
                    this.ctx.fillText(text, upscale(textX-((textscale3-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), upscale(textY+((textscale3-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state++;
                    break
                case 2:
                    this.ctx.font = "Bold "+upscale(textscale4)+'px arial';
                    this.ctx.fillText(text, upscale(textX-((textscale4-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), upscale(textY+((textscale4-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    break
            }
            // console.log(this.click, this.mousepressed)
            if(this.click & this.mousepressed === false)
            {
                this.animation_state = 0;
                console.log(true)
                return true
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    this.ctx.font = "Bold "+upscale(textscale3)+'px arial';
                    this.ctx.fillText(text, upscale(textX-((textscale3-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), upscale(textY+((textscale3-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state--;
                    break
                case 1:
                    this.ctx.font = "Bold "+upscale(textscale2)+'px arial';
                    this.ctx.fillText(text, upscale(textX-((textscale2-textscale1)*(this.defauloffset_text_type1[0]-offsetX))), upscale(textY+((textscale2-textscale1)*(this.defauloffset_text_type1[1]+offsetY))));
                    this.animation_state--;
                    break
                case 0:
                    this.ctx.font = "Bold "+upscale(textscale1)+'px arial';
                    this.ctx.fillText(text, upscale(textX), upscale(textY));
                    break
            }
        }
        return false
    }

    text_type2(text, posX, posY, width, height, textX, textY, textscale, color = "rgb(255,255,255)", line_width = 2)
    {
        this.ctx.font = "Bold "+upscale(textscale)+'px arial';
        this.ctx.fillText(text, upscale(textX), upscale(textY));
        if(invisible_mouse_collider(posX, posY, width, height) == true) //set fullscren
        {
            switch(this.animation_state)
            {
                case 0:
                    var grd = this.ctx.createLinearGradient(upscale(posX+(width/2)-(width/4)), 0, upscale(posX+(width/2)+(width/4)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX+(width/2)-(width/4)), upscale(posY+height-line_width), upscale(width/2), upscale(line_width));
                    this.animation_state++;
                    break
                case 1:
                    var grd = this.ctx.createLinearGradient(upscale(posX+(width/2)-(width*0.375)), 0, upscale(posX+(width/2)+(width*0.375)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX+(width/2)-(width*0.375)), upscale(posY+height-line_width), upscale(width), upscale(line_width));
                    this.animation_state++;
                    break
                case 2:
                    var grd = this.ctx.createLinearGradient(upscale(posX), 0, upscale(posX+width), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX), upscale(posY+height-line_width), upscale(width), upscale(line_width));
                    break
            }
            if(this.click & this.mousepressed === false)
            {
                this.animation_state = 0;
                return true
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    var grd = this.ctx.createLinearGradient(upscale(posX+(width/2)-(width*0.375)), 0, upscale(posX+(width/2)+(width*0.375)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX+(width/2)-(width*0.375)), upscale(posY+height-line_width), upscale(width), upscale(line_width));
                    this.animation_state--;
                    break
                case 1:
                    var grd = this.ctx.createLinearGradient(upscale(posX+(width/2)-(width/4)), 0, upscale(posX+(width/2)+(width/4)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX+(width/2)-(width/4)), upscale(posY+height-line_width), upscale(width/2), upscale(line_width));
                    this.animation_state--;
                    break
                case 0:
                    var grd = this.ctx.createLinearGradient(upscale(posX+(width/2)-(width/8)), 0, upscale(posX+(width/2)+(width/8)), 0);
                    grd.addColorStop(0, "transparent");
                    grd.addColorStop(0.5, color);
                    grd.addColorStop(1, "transparent");
                    this.ctx.fillStyle = grd;
                    this.ctx.fillRect(upscale(posX+(width/2)-(width/8)), upscale(posY+height-line_width), upscale(width/4), upscale(line_width));
                    break
            }
        }
        return false
    }

    texture_type1(texture, posX, posY, width, height, textureX, textureY, texturescale1, texturescale2, texturescale3, texturescale4, offsetX = 0, offsetY = 0, text_show = "", textX = 0, textY = 0, textscale = 10, text_color = "rgb(255,255,255)")
    {
        if(invisible_mouse_collider(posX, posY, width, height) == true) //set fullscren
        {
            switch(this.animation_state)
            {
                case 0:
                    this.ctx.drawImage(texture, upscale(textureX-((texturescale2-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), upscale(textureY+((texturescale2-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), upscale(texturescale2*(texturescale1[0]/texturescale1[1])), upscale(texturescale2));
                    this.animation_state++;
                    break
                case 1:
                    this.ctx.drawImage(texture, upscale(textureX-((texturescale3-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), upscale(textureY+((texturescale3-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), upscale(texturescale3*(texturescale1[0]/texturescale1[1])), upscale(texturescale3));
                    this.animation_state++;
                    break
                case 2:
                    this.ctx.drawImage(texture, upscale(textureX-(((texturescale4*(texturescale1[0]/texturescale1[1]))-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), upscale(textureY+((texturescale4-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), upscale(texturescale4*(texturescale1[0]/texturescale1[1])), upscale(texturescale4));
                    if(text_show != "")
                    {
                        this.ctx.fillStyle = text_color;
                        this.ctx.font = "Bold "+upscale(textscale)+'px arial';
                        this.ctx.fillText(text_show, upscale(textX), upscale(textY));
                    }
                    break
            }
            if(this.click & this.mousepressed === false)
            {
                this.animation_state = 0;
                return true
            }
        }
        else
        {
            switch(this.animation_state)
            {
                case 2:
                    this.ctx.drawImage(texture, upscale(textureX-((texturescale3-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), upscale(textureY+((texturescale3-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), upscale(texturescale3*(texturescale1[0]/texturescale1[1])), upscale(texturescale3));
                    this.animation_state--;
                    break
                case 1:
                    this.ctx.drawImage(texture, upscale(textureX-((texturescale2-texturescale1[0])*(this.defauloffset_texture_type1[0]-offsetX))), upscale(textureY+((texturescale2-texturescale1[1])*(this.defauloffset_text_type1[1]+offsetY))), upscale(texturescale2*(texturescale1[0]/texturescale1[1])), upscale(texturescale2));
                    this.animation_state--;
                    break
                case 0:
                    this.ctx.drawImage(texture, upscale(textureX), upscale(textureY), upscale(texturescale1[0]), upscale(texturescale1[1]));
                    break
            }
        }
        return false
    }

    texture_type2(posX, posY, texture, text, texture_offsetX = 5, texture_offsetY = 5, texture_scaleX = 20, texture_scaleY = 20) //Map editor button
    {
        if(invisible_mouse_collider(posX, posY, 30, 30) == true)
        {
            this.ctx.fillStyle = "rgba(100,100,100,0.4)";
            this.ctx.strokeStyle = "rgb(255,255,255)";
        }
        else
        {
            this.ctx.fillStyle = "rgba(0,0,0,0.4)";
            this.ctx.strokeStyle = "rgb(255,255,255)";
        }
            
        this.ctx.beginPath();
        this.ctx.moveTo(upscale(posX), upscale(posY+5));
        this.ctx.lineTo(upscale(posX+5),upscale(posY));
        this.ctx.lineTo(upscale(posX+25), upscale(posY));
        this.ctx.lineTo(upscale(posX+30), upscale(posY+5));
        this.ctx.lineTo(upscale(posX+30), upscale(posY+25));
        this.ctx.lineTo(upscale(posX+25), upscale(posY+30));
        this.ctx.lineTo(upscale(posX+5), upscale(posY+30));
        this.ctx.lineTo(upscale(posX), upscale(posY+25));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.lineWidth=upscale(2);
        this.ctx.stroke();
        this.ctx.lineWidth=1;
        this.ctx.drawImage(texture, upscale(posX+texture_offsetX), upscale(posY+texture_offsetY), upscale(texture_scaleX), upscale(texture_scaleY))
        
        if(invisible_mouse_collider(posX, posY, 30, 30))
        {
            this.ctx.fillStyle = "rgb(0,0,0)";
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouseX-upscale(text.length*9+15), this.mouseY+upscale(-10));
            this.ctx.lineTo(this.mouseX-upscale(text.length*9+10),this.mouseY+upscale(-15));
            this.ctx.lineTo(this.mouseX+upscale(-10), this.mouseY+upscale(-15));
            this.ctx.lineTo(this.mouseX+upscale(-5), this.mouseY+upscale(-10));
            this.ctx.lineTo(this.mouseX+upscale(-5), this.mouseY+upscale(2));
            this.ctx.lineTo(this.mouseX+upscale(-10), this.mouseY+upscale(7));
            this.ctx.lineTo(this.mouseX-upscale(text.length*9+10), this.mouseY+upscale(7));
            this.ctx.lineTo(this.mouseX-upscale(text.length*9+15), this.mouseY+upscale(2));
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.lineWidth=upscale(2);
            this.ctx.stroke();
            this.ctx.lineWidth=1;
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.font = upscale(15)+'px Lucida Console';
            this.ctx.fillText(text, this.mouseX-upscale(text.length*9+10), this.mouseY);
            if(this.click & this.mousepressed === false)
            {
                this.animation_state = 0;
                return true
            }
        }
        return false
    }
}
class Transition
{
    constructor(ctx)
    {
        this.ctx = ctx
        this.dt = 1
        this.currentfadestate = 0
    }

    plus()
    {
        if(0.05*this.currentfadestate < 1)    
        {    
            this.ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate/this.dt)+")";
            this.ctx.fillRect(0,0,canvas.width,canvas.height);
            this.currentfadestate++;

            return "true"
        }
        else
        {
            this.ctx.fillStyle = "rgb(0,0,0)";
            this.ctx.fillRect(0,0,canvas.width,canvas.height);
            return "finish"
        }
    }
    
    minus(transition)
    {
        if(transition != "true")
        {    
            if(0.05*this.currentfadestate > 0 & 0.05*this.currentfadestate < 1)    
            {    
                this.ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate/this.dt)+")";
                this.ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate--;
            }
            else if(0.05*this.currentfadestate >= 1)
            {
                this.ctx.fillStyle = "rgb(0,0,0)";
                this.ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate--;
            }
        }
    }
}

export{Animatic, Transition}