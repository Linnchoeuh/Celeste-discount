import {ctx} from "../main.js";

class Tool_Kit
{
    constructor()
    {
        this.canvasfullscreen = false;   

        this.ratio = 1
    }

    requiredDisplayVariableUpdater()
    {
        this.ratio = canvas.height/675;
    }

    resolutionScaler(initial_scale)
    {
        if(this.canvasfullscreen)
        {
            return Math.round(initial_scale*this.ratio);
        }
        return Math.round(initial_scale);
    }

    resolutionScalerUnround(initial_scale)
    {
        if(this.canvasfullscreen)
        {
            return initial_scale*this.ratio;
        }
        return initial_scale;
    }

    resolutionScalerAddOne(initial_scale)
    {
        if(this.canvasfullscreen)
        {
            return Math.round(initial_scale*this.ratio+1);
        }
        return Math.round(initial_scale);
    }

    logText(text, posX, posY, fill_color = "rgb(255,255,255)", stroke_color = "rgb(0,0,0)")
    {
        ctx.fillStyle   = fill_color;
        ctx.fillText(     text, 
                          this.resolutionScaler(posX), 
                          this.resolutionScaler(posY));
        ctx.strokeStyle = stroke_color;
        ctx.strokeText(   text, 
                          this.resolutionScaler(posX), 
                          this.resolutionScaler(posY));
    }

    textureLoader(path)
    {
        var texture = new Image();
        texture.src = path;
        return texture;
    }

    lerp(n, time)
    {
        return n*time;
    }
}
class Timer_Log
{
    constructor()
    {
        this.rendering_frame_time = 0;
        this.rendering_frame_time_count = 0;
        this.log = 0;
        this.rendering_frame_time_accumulation = 0;
    }

    startTime()
    {
        this.rendering_frame_time = Date.now();
    }

    endLogTime(count = 300)
    {
        this.rendering_frame_time_count++;
        this.rendering_frame_time_accumulation += Date.now() - this.rendering_frame_time
        
        if(this.rendering_frame_time_count > count)
        {
            this.log = this.rendering_frame_time_accumulation/this.rendering_frame_time_count;
            this.rendering_frame_time_count = this.rendering_frame_time_accumulation = 0;
        }
        return this.log
    }


}





export{Tool_Kit, Timer_Log};