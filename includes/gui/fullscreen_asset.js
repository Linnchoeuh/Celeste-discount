import {GV, Tools, MapData, Mouse, Keyboard, Fps} from "../../main.js";

var canvas_fullscreen = false;

document.addEventListener("fullscreenchange", function ()
{
    canvas_fullscreen = (document.fullscreen)? true : false;
}, false);
document.addEventListener("webkitfullscreenchange", function () {
    canvas_fullscreen = (document.webkitIsFullScreen) ? true : false;
}, false);


class Canvas_Resolution_Asset
{
    constructor()
    {
        this.canvas_fullscreen = false;
        this.last_canvas_fullscreen = false;
        this.doubleclicktiming = 0;
        this.firstclick = false;
        this.fullscreenupscale = true;
        this.fullscreendownscalefactor = 5;
        this.ablefullscreen = "Enable";
        this.fullscreendownscale = false;
        this.double_click_toggle = true;

        this.screen_ratio = 0;
        this.fullscreen_change = false;
    }

    varUpdater()
    {
        this.canvas_fullscreen = canvas_fullscreen;
    }

    fullscreenChecker(){
        this.fullscreen_change = false;
        if(this.canvas_fullscreen !== this.last_canvas_fullscreen){
            this.screenScaler();
            this.last_canvas_fullscreen = this.canvas_fullscreen;
            this.fullscreen_change = true;
        }
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
        }
    }

    doubleClickToggle()
    {
        if(this.double_click_toggle)
        {
            if(this.doubleclicktiming+150 < Date.now())
            {
                this.firstclick = false;
            }
            if(Mouse.click_left || this.firstclick)
            {
                if(this.firstclick === false)
                {
                    this.doubleclicktiming = Date.now();
                    this.firstclick = Mouse.double_click_fullscreen_mouse_pressed = true;
                }
                else if(Mouse.click_left && Mouse.double_click_fullscreen_mouse_pressed === false)
                {
                    this.toggle(canvas);
                    Mouse.pressed = true;
                    this.firstclick = false;
                    return true;
                }
            }
        }
    }

    screenScaler(){
        if(this.canvas_fullscreen){
                if(this.fullscreenupscale){    
                    canvas.width  = screen.width;
                    canvas.height = screen.height;
                    GV.canvas_width = screen.width/(screen.height/GV.initial_canvas_height);
                    GV.canvas_height = screen.height/(screen.height/GV.initial_canvas_height);
                }else{
                    
                    canvas.width  = GV.scaled_screen_width /5*this.fullscreendownscalefactor;
                    canvas.height = GV.scaled_screen_height/5*this.fullscreendownscalefactor;
                }
                this.ablefullscreen = "Disable";
        }else{
            canvas.width  = GV.canvas_width  = GV.initial_canvas_width;
            canvas.height = GV.canvas_height = GV.initial_canvas_height;
            this.ablefullscreen = "Enable";
        }
        Mouse.canvas_fullscreen = 
        Tools.canvas_fullscreen = 
        this.canvas_fullscreen;
        
        Tools.requiredDisplayVariableUpdater()
        MapData.requiredDisplayVariableUpdater()
        Mouse.resolutionAdapter();
    }  
}

export{Canvas_Resolution_Asset}