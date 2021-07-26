import {ctx, GV, Tools, Mouse, Fps, Fullscreen} from "../../main.js";


class Animatic_
{
    constructor()
    {
        this.animation_state = 0;

        this.defauloffset_text_type1 = [1.5, 0];
        this.defauloffset_texture_type1 = [0.5, -0.5];

        this.gradient;

        this.cache_color = "#ffffff";
        this.cache_text_scale = 0;
        this.cache_value = 0;
        this.translation = 0;
        this.direction = 1;
        this.in_area = false;
    }

    text_type1(text, posX, posY, width, height, textX, textY, textscale1, textscale2, textscale3, textscale4, offsetX = 0, offsetY = 0)
    {
        if(this.animation_state > 2){this.animation_state = 2;};
        if(Mouse.invisibleMouseCollider(posX, posY, width, height)) //play
        {
            Fullscreen.firstclick = false;
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

    text_type2(text, posX, posY, width, height, textX, textY, textscale, color = GV.ColorPalette_.white, line_width = 2)
    {
        if(this.cache_text_scale !== textscale)
        {
            ctx.font = "Bold "+Tools.resolutionScaler(textscale)+'px arial';
        }
        ctx.fillText(text, Tools.resolutionScaler(textX), Tools.resolutionScaler(textY));
        
        this.gradient = ctx.createLinearGradient(Tools.resolutionScaler(posX+width/2-(width/16*this.animation_state)), 0, 
                                                 Tools.resolutionScaler(posX+width/2+(width/16*this.animation_state)), 0);
        
        this.gradient.addColorStop(0, "transparent");
        this.gradient.addColorStop(0.5, color);
        this.gradient.addColorStop(1, "transparent");
        ctx.fillStyle = this.gradient;
        ctx.fillRect(Tools.resolutionScaler(posX+width/2-(width/16*this.animation_state)), Tools.resolutionScaler(posY+height-line_width),  
                     Tools.resolutionScaler(           2*(width/16*this.animation_state)), Tools.resolutionScaler(line_width));

        if(Mouse.invisibleMouseCollider(posX, posY, width, height) == true) //set fullscren
        {
            Fullscreen.firstclick = false;
            this.animation_state += 1/1;

            if(this.animation_state > 8){this.animation_state = 8;};

            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        else
        {
            this.animation_state -= 1/1;

            if(this.animation_state < 1){this.animation_state = 1;};
        }
        return false;
    }

    text_type3(text, posX, posY, width, height, textX, textY, textscale, color = GV.ColorPalette_.white, line_width = 2)
    {
        if(this.cache_text_scale !== textscale)
        {
            ctx.font = "Bold "+Tools.resolutionScaler(textscale)+"px arial";
        }
        ctx.fillText(text, Tools.resolutionScaler(textX), Tools.resolutionScaler(textY));
        
        var grd = ctx.createLinearGradient(Tools.resolutionScaler(posX), 0, Tools.resolutionScaler(posX+width*((this.animation_state)/8)), 0);
        grd.addColorStop(0, color);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(Tools.resolutionScaler(posX), Tools.resolutionScaler(posY+height-line_width),  Tools.resolutionScaler(width*((this.animation_state)/8)), Tools.resolutionScaler(line_width));

        // console.log(this.animation_state)

        if(Mouse.invisibleMouseCollider(posX, posY, width, height) == true) //set fullscren
        {
            Fullscreen.firstclick = false;
            this.animation_state += 1/Fps.dt;

            if(this.animation_state > 8){this.animation_state = 8;};

            if(Mouse.click_left & Mouse.pressed === false)
            {
                this.animation_state = 0;
                return true;
            }
        }
        else
        {
            this.animation_state -= 1/Fps.dt;

            if(this.animation_state < 1){this.animation_state = 1;};
        }
        return false;
    }

    texture_type1(texture, posX, posY, width, height, textureX, textureY, texturescale1, texturescale2, texturescale3, texturescale4, offsetX = 0, offsetY = 0, text_show = "", textX = 0, textY = 0, textscale = 10, text_color = GV.ColorPalette_.white)
    {
        if(Mouse.invisibleMouseCollider(posX, posY, width, height) == true) //set fullscren
        {
            Fullscreen.firstclick = false;
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
        if(Mouse.invisibleMouseCollider(posX, posY, 30, 30)){
            ctx.fillStyle = "rgba(100,100,100,0.4)";
        }else{
            ctx.fillStyle = "rgba(0,0,0,0.4)";
        };
        ctx.strokeStyle = GV.ColorPalette_.white;
            
        ctx.beginPath();
        ctx.moveTo(Tools.resolutionScaler(posX),    Tools.resolutionScaler(posY+5));
        ctx.lineTo(Tools.resolutionScaler(posX+5),  Tools.resolutionScaler(posY));
        ctx.lineTo(Tools.resolutionScaler(posX+25), Tools.resolutionScaler(posY));
        ctx.lineTo(Tools.resolutionScaler(posX+30), Tools.resolutionScaler(posY+5));
        ctx.lineTo(Tools.resolutionScaler(posX+30), Tools.resolutionScaler(posY+25));
        ctx.lineTo(Tools.resolutionScaler(posX+25), Tools.resolutionScaler(posY+30));
        ctx.lineTo(Tools.resolutionScaler(posX+5),  Tools.resolutionScaler(posY+30));
        ctx.lineTo(Tools.resolutionScaler(posX),    Tools.resolutionScaler(posY+25));
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = Tools.resolutionScaler(2);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.drawImage(texture, Tools.resolutionScaler(posX+texture_offsetX), Tools.resolutionScaler(posY+texture_offsetY), Tools.resolutionScaler(texture_scaleX), Tools.resolutionScaler(texture_scaleY));
        
        if(Mouse.invisibleMouseCollider(posX, posY, 30, 30))
        {
            Fullscreen.firstclick = false;
            ctx.fillStyle = GV.ColorPalette_.white;
            ctx.beginPath();
            if(reverse)
            {
                ctx.moveTo(GV.mouseX+Tools.resolutionScaler(10),               GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(15),               GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+20), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+20), GV.mouseY+Tools.resolutionScaler(2));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(15),               GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(10),               GV.mouseY+Tools.resolutionScaler(2));
            }
            else
            {
                ctx.moveTo(GV.mouseX-Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+10), GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-10),              GV.mouseY+Tools.resolutionScaler(-15));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-5),               GV.mouseY+Tools.resolutionScaler(-10));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-5),               GV.mouseY+Tools.resolutionScaler(2));
                ctx.lineTo(GV.mouseX+Tools.resolutionScaler(-10),              GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+10), GV.mouseY+Tools.resolutionScaler(7));
                ctx.lineTo(GV.mouseX-Tools.resolutionScaler(text.length*9+15), GV.mouseY+Tools.resolutionScaler(2));
            }
            
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = Tools.resolutionScaler(2);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.fillStyle = GV.ColorPalette_.white;
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

    specialButton1(posX, posY, width = 100, height = 500, thickness = 50, movement = 50, orientation = 0, color = "#ffffff")
    {
        orientation = orientation%4
        ctx.fillStyle = color;
        switch(orientation)
        {
            case 0:
                this.in_area = Mouse.invisibleMouseCollider(posX, posY, width+thickness+movement, height);
                this.direction = 1;
                break;
            case 1:
                this.in_area = Mouse.invisibleMouseCollider(posX, posY, height, width+thickness+movement)
                this.direction = 1;
                break;
            case 2:
                this.in_area = Mouse.invisibleMouseCollider(posX-movement+width, posY, width+thickness+movement, height)
                posX += thickness + width + width;
                thickness = -thickness;
                width = -width;
                this.direction = -1;
                break;
            case 3:
                this.in_area = Mouse.invisibleMouseCollider(posX, posY-movement+width, height, width+thickness+movement)
                posY += thickness + width + width;
                thickness = -thickness;
                width = -width;
                this.direction = -1;
                break;
                
        }

        if(this.in_area){Fullscreen.firstclick = false;};

        if(this.in_area && Mouse.click_left && Mouse.pressed === false)
        {
            this.translation = 0;
            return true;
        };

        if(this.direction === 1)
        { 
            if(this.in_area && this.translation < movement)
            {
                this.translation += movement/5/Fps.dt;
            }
            else if(this.translation > 0 && this.in_area === false)
            {
                this.translation -= movement/5/Fps.dt;
            };
            if(this.translation > movement)
            {
                this.translation = movement;
            }
            else if(this.translation < 0)
            {
                this.translation = 0
            };
        }
        else
        {
            if(this.in_area && this.translation > movement*this.direction)
            {
                this.translation -= movement/5/Fps.dt;
            }
            else if(this.translation < 0 && this.in_area === false)
            {
                this.translation += movement/5/Fps.dt;
            };
            if(this.translation < movement*this.direction)
            {
                this.translation = movement*this.direction;
            }
            else if(this.translation > 0)
            {
                this.translation = 0
            };
        }

        ctx.beginPath();
        

        if(orientation === 0 || orientation === 2)
        {
            ctx.moveTo(Tools.resolutionScaler(this.translation+posX), Tools.resolutionScaler(posY));
            ctx.lineTo(Tools.resolutionScaler(this.translation+posX+thickness),       Tools.resolutionScaler(posY));
            ctx.lineTo(Tools.resolutionScaler(this.translation+posX+width+thickness), Tools.resolutionScaler(posY+height/2));
            ctx.lineTo(Tools.resolutionScaler(this.translation+posX+thickness),       Tools.resolutionScaler(posY+height));
            ctx.lineTo(Tools.resolutionScaler(this.translation+posX),                 Tools.resolutionScaler(posY+height));
            ctx.lineTo(Tools.resolutionScaler(this.translation+posX+width),           Tools.resolutionScaler(posY+height/2));
        }
        else if(orientation === 1 || orientation === 3)
        {
            ctx.moveTo(Tools.resolutionScaler(posX),                 Tools.resolutionScaler(this.translation+posY));
            ctx.lineTo(Tools.resolutionScaler(posX+height/2),        Tools.resolutionScaler(this.translation+posY+width));
            ctx.lineTo(Tools.resolutionScaler(posX+height),          Tools.resolutionScaler(this.translation+posY));
            ctx.lineTo(Tools.resolutionScaler(posX+height),          Tools.resolutionScaler(this.translation+posY+thickness));
            ctx.lineTo(Tools.resolutionScaler(posX+height/2),        Tools.resolutionScaler(this.translation+posY+width+thickness));
            ctx.lineTo(Tools.resolutionScaler(posX),                 Tools.resolutionScaler(this.translation+posY+thickness));
        }
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.stroke();
        return false;
    }
}

export{Animatic_};