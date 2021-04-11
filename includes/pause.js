import {Tools} from "/main.js";
class Pause
{
    constructor(ctx)
    {
        this.ctx = ctx
        this.grd = ctx.createLinearGradient(-150, 0, Tools.resolutionScaler(3000), 0);
        this.grd.addColorStop(0.1, "transparent");
        this.grd.addColorStop(0, "black");

        this.pauseframe = 0;
        this.pause = false;
        this.pkey = false;
        this.endpause = false;
    }

    Toggle(text, keypressed, keys_input, dt)
    {
        if(keys_input[6] === 1 & this.pkey === false & this.pause === false)
        {
            this.pause = true;
            keypressed = true;
            this.pkey = true
            this.endpause = false; 
        }
        if(this.pause)
        {
            if(this.pauseframe < 10 & this.endpause === false)
            {
                this.pauseframe += 1/dt;
            }
            if(this.pauseframe > 10)
            {
                this.pauseframe = 10
            }
            this.ctx.fillStyle = "rgba(0,0,0,"+0.05*this.pauseframe+")";
            this.ctx.fillRect(0,0,canvas.width,canvas.height);
            this.ctx.fillStyle = this.grd;
            this.ctx.fillRect(Tools.resolutionScaler(-200+(this.pauseframe*20)), 0, Tools.resolutionScaler(100+(this.pauseframe*20)), Tools.resolutionScaler(675));
            this.ctx.fillStyle = "rgba(255,255,255,"+0.1*this.pauseframe+")";
            if(this.endpause === false)
            {
                this.ctx.font = "Bold "+Tools.resolutionScaler(125)+'px arial';
                this.ctx.fillText(text, Tools.resolutionScaler(425), Tools.resolutionScaler(100));
            }
            if(keys_input[6] === 1 & this.pkey === false || this.endpause)
            {
                
                this.endpause = true;
                this.grd.addColorStop(0.1, "transparent");
                this.grd.addColorStop(0, "black");
                this.ctx.fillStyle = this.grd;
                this.pauseframe -= 1/dt;
                this.ctx.fillRect(Tools.resolutionScaler(-200-(this.pauseframe*20)), 0, Tools.resolutionScaler(100-(this.pauseframe*20)), Tools.resolutionScaler(675));
                if(this.pauseframe < 1)
                {
                    this.endpause = false;
                    this.pause = false;
                    this.pauseframe = 0;
                }
            }
        }
        return keypressed; 
    }
}

export{Pause}