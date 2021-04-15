import {ctx, Tools, Keyboard, Fps} from "../../main.js";

class Pause_
{
    constructor()
    {
        this.grd = ctx.createLinearGradient(-150, 0, Tools.resolutionScaler(3000), 0);
        this.grd.addColorStop(0.1, "transparent");
        this.grd.addColorStop(0, "black");

        this.pauseframe = 0;
        this.pause = false;
        this.pkey = false;
        this.endpause = false;
    }

    toggle(text)
    {
        console.log(Keyboard.keys_input.p, Keyboard.keys_pressed.p, this.pause)
        if(Keyboard.keys_input.p && Keyboard.keys_pressed.p === false && this.pause === false)
        {
            // console.log("oui")
            this.pause = true;
            Keyboard.any_key_pressed = true;
            Keyboard.keys_pressed.p = true
            this.endpause = false; 
        }
        if(this.pause)
        {
            
            if(this.pauseframe < 10 & this.endpause === false)
            {
                this.pauseframe += 1/Fps.dt;
            }
            if(this.pauseframe > 10)
            {
                this.pauseframe = 10
            }
            ctx.fillStyle = "rgba(0,0,0,"+0.05*this.pauseframe+")";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = this.grd;
            ctx.fillRect(Tools.resolutionScaler(-200+(this.pauseframe*20)), 0, Tools.resolutionScaler(100+(this.pauseframe*20)), Tools.resolutionScaler(675));
            ctx.fillStyle = "rgba(255,255,255,"+0.1*this.pauseframe+")";
            if(this.endpause === false)
            {
                ctx.font = "Bold "+Tools.resolutionScaler(125)+'px arial';
                ctx.fillText(text, Tools.resolutionScaler(425), Tools.resolutionScaler(100));
            }
            if(Keyboard.keys_input.p & Keyboard.keys_pressed.p === false || this.endpause)
            {

                this.endpause = true;
                this.grd.addColorStop(0.1, "transparent");
                this.grd.addColorStop(0, "black");
                ctx.fillStyle = this.grd;
                this.pauseframe -= 1/Fps.dt;
                ctx.fillRect(Tools.resolutionScaler(-200-(this.pauseframe*20)), 0, Tools.resolutionScaler(100-(this.pauseframe*20)), Tools.resolutionScaler(675));
                if(this.pauseframe < 1)
                {
                    this.endpause = false;
                    this.pause = false;
                    this.pauseframe = 0;
                }
            }
        }
    }
}

export{Pause_};