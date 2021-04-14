import {Tools, MapData, Mouse} from "../../main.js";

var canvasfullscreen = false;

document.addEventListener("fullscreenchange", function ()
{
    canvasfullscreen = (document.fullscreen)? true : false;
}, false);
document.addEventListener("webkitfullscreenchange", function () {
    canvasfullscreen = (document.webkitIsFullScreen) ? true : false;
}, false);


class Canvas_Resolution_Asset
{
    constructor()
    {
        this.canvasfullscreen = false;
        this.doubleclicktiming = 0;
        this.firstclick = false;
        Mouse.double_click_fullscreen_mouse_pressed = false;
        this.fullscreenupscale = true;
        this.fullscreendownscalefactor = 5;
        this.ablefullscreen = "Enable";
        this.fullscreendownscale = false;

        
    }

    varUpdater()
    {
        this.canvasfullscreen = canvasfullscreen;
    }

    toggle(elem)
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
            Mouse.canvasfullscreen = 
            Tools.canvasfullscreen = 
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
            Mouse.canvasfullscreen = 
            Tools.canvasfullscreen = 
            this.canvasfullscreen = false;
        }
    }

    

    doubleClickToggle(click, firstgameframe, enabler = true)
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
                    this.firstclick = Mouse.double_click_fullscreen_mouse_pressed = true;
                }
                else if(click && Mouse.double_click_fullscreen_mouse_pressed === false)
                {
                    this.toggle(canvas);
                    this.firstclick = false;
                    return true;
                }
            }
        }
        return firstgameframe;
    }

    screenScaler(canvas, screen, firstgameframe, keys_input)
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
            Tools.requiredDisplayVariableUpdater()
            MapData.requiredDisplayVariableUpdater()
        }
        if(this.canvasfullscreen & keys_input[9] == 1)
        {
            Mouse.canvasfullscreen = 
            Tools.canvasfullscreen = 
            this.canvasfullscreen = false;
        }
        if(this.canvasfullscreen === false & canvas.width !== 1200 & canvas.height !== 675)
        {
            canvas.width = 1200;
            canvas.height = 675;
            this.ablefullscreen = "Enable";
            Tools.requiredDisplayVariableUpdater()
            MapData.requiredDisplayVariableUpdater()
        }
        return firstgameframe;
    }
}

export{Canvas_Resolution_Asset}