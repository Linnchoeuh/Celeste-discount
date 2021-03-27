// import {upscale, gupscale} from "../tools.js";
class Canvas_resolution_asset
{
    constructor()
    {
        this.canvasfullscreen = false;
        this.doubleclicktiming = 0;
        this.firstclick = false;
        this.doubleclickfullscreenmousepressed = false;
        this.fullscreenupscale = true;
        this.fullscreendownscalefactor = 5;
        this.ablefullscreen = "Enable";
        this.fullscreendownscale = false;
    }

    Enabler_disabler(elem)
    {
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            }
            this.canvasfullscreen = true;
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            this.canvasfullscreen = false;
        }
    }

    Mouse_adapter(mouseX, mouseY, canvas, screen)
    {
        if(this.canvasfullscreen)
        {
            return [mouseX*(canvas.width / screen.width), mouseY*(canvas.height / screen.height)];
        }
        return [mouseX, mouseY];
    }

    Double_Click_Enabler_disabler(click, firstgameframe, enabler = true)
    {
        if(enabler)
        {
            if(this.doubleclicktiming+150 < Date.now())
            {
                this.firstclick = false;
            }
            if(click || this.firstclick)
            {
                if(this.firstclick === false)
                {
                    this.doubleclicktiming = Date.now();
                    this.firstclick = this.doubleclickfullscreenmousepressed = true;
                }
                else if(click && this.doubleclickfullscreenmousepressed === false)
                {
                    this.Enabler_disabler(canvas);
                    this.firstclick = false;
                    return true;
                }
            }
        }
        return firstgameframe;
    }

    Screen_Scaler(canvas, screen, firstgameframe, keys_input)
    {
        if(firstgameframe)
        {
            if(this.canvasfullscreen)
            {
                if(this.fullscreenupscale)
                {    
                    canvas.width = screen.width;
                    canvas.height = screen.height;
                }
                else
                {
                    canvas.width = 240*this.fullscreendownscalefactor;
                    canvas.height = 135*this.fullscreendownscalefactor;
                }
                this.ablefullscreen = "Disable";
            }
            else
            {
                this.ablefullscreen = "Enable";
            }
            firstgameframe = false;
        }
        if(this.canvasfullscreen & keys_input[9] == 1)
        {
            this.canvasfullscreen = false;
        }
        if(this.canvasfullscreen === false & canvas.width !== 1200 & canvas.height !== 625)
        {
            canvas.width = 1200;
            canvas.height = 675;
            this.ablefullscreen = "Enable";
        }
        return firstgameframe;
    }
}

export{Canvas_resolution_asset}