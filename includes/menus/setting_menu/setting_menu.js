import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Transition, Fps, Fullscreen, Keyboard, MapData} from "../../../main.js";

class Setting_Menu
{
    constructor()
    {
        this.plus         = Tools.textureLoader("graphics/ui/plus.png");
        this.minus        = Tools.textureLoader("graphics/ui/minus.png");
    }
    displayMenu(){
        if(GV.last_menu != 3)
        {
            GV.last_menu = 3;
        }
        if(Button1.texture_type1(GV.return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) || Transition.transition_state === "finish" & Transition.selectedaction === "menu3.2" || Keyboard.keys_input.back && Keyboard.keys_pressed.back === false)
        {
            switch(Transition.transition_state)
            {
                case "false":
                    Transition.transition_state = "true";
                    Transition.selectedaction = "menu3.2";
                    break;
                case "finish":
                    switch(GV.menu)
                    {
                        case 3:
                            GV.menu = 1;
                            break;
                        case 4:
                            GV.last_menu = GV.menu = 2;
                            break;
                        case 8:
                            GV.last_menu = GV.menu = 7;
                            break;
                    }
                    Transition.transition_state = "false";
                    Transition.selectedaction = "N/A";
                    break;
            }   
        }
        if(Fps.showfps)
        {
            ctx.fillStyle = GV.ColorPalette_.average_green;
        }
        else
        {
            ctx.fillStyle = GV.ColorPalette_.average_red;
        }
        if(Button2.text_type1("Show FPS", 0, 130, 320, 60, 20, 175, 40, 45, 50, 55, 3.6, 0.4)) //show Fps.fps button
        {
            if(Fps.showfps)
            {
                Fps.showfps = false;
            }
            else
            {
                Fps.showfps = true;
            }
        }
        if(Fullscreen.canvasfullscreen)
        {
            ctx.fillStyle = GV.ColorPalette_.average_green;
        }
        else
        {
            ctx.fillStyle = GV.ColorPalette_.average_red;
        }
        if(Button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 230, 535, 60, 20, 275, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen button
        {
            Fullscreen.first_game_frame = true;
            Fullscreen.toggle(canvas);
        }
        if(Fullscreen.fullscreenupscale)
        {
            ctx.font = "Bold "+Tools.resolutionScaler(40)+'px arial';
            ctx.fillStyle = GV.ColorPalette_.average_gray;
            ctx.fillText("Fullscreen downscale", Tools.resolutionScaler(120), Tools.resolutionScaler(435));
            ctx.fillStyle = GV.ColorPalette_.average_green;
            Fullscreen.fullscreendownscale = false;
            Fullscreen.fullscreendownscalefactor = 5;
        }
        else
        {
            if(Fullscreen.fullscreendownscale)
            {
                ctx.fillStyle = GV.ColorPalette_.white;
                ctx.font = "Bold "+Tools.resolutionScaler(40)+'px arial';
                ctx.fillText(Fullscreen.fullscreendownscalefactor*20+"%", Tools.resolutionScaler(900), Tools.resolutionScaler(435));
                if(Fullscreen.fullscreendownscalefactor > 1)
                {
                    if(Button4.texture_type1(this.minus, 800, 391, 60, 60, 805, 396, [48,48], 55, 65, 70, 0, -0.5))
                    {
                        Fullscreen.fullscreendownscalefactor--;
                        Fullscreen.screenScaler();
                    }
                    Fullscreen.firstclick = false;
                }
                if(Fullscreen.fullscreendownscalefactor < 5)
                {
                    if(Button5.texture_type1(this.plus, 1000, 391, 60, 60, 1005, 396, [48,48], 55, 65, 70, 0, -0.5))
                    {
                        if(Fullscreen.fullscreendownscalefactor >= 4)
                        {
                            Fullscreen.fullscreendownscale = false;
                        }
                        else
                        {
                            Fullscreen.fullscreendownscalefactor++;
                        }
                        Fullscreen.screenScaler();
                        Fullscreen.firstclick = false;
                    }
                }
                ctx.fillStyle = GV.ColorPalette_.average_green;
            }
            else
            {
                ctx.fillStyle = GV.ColorPalette_.average_red;
            }
            if(Button6.text_type1("Fullscreen downscale", 100, 391, 660, 60, 120, 435, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen
            {
                if(Fullscreen.fullscreendownscale)
                {
                    Fullscreen.fullscreendownscale = false;
                    Fullscreen.fullscreendownscalefactor = 5;
                }
                else
                {
                    Fullscreen.fullscreendownscale = true;
                    Fullscreen.fullscreendownscalefactor = 4;
                    document.getElementById("canvas").style.imageRendering = "crisp-edges";
                    document.getElementById("canvas").style.imageRendering = "pixelated";
                }
                Fullscreen.screenScaler();
            }
            ctx.fillStyle = GV.ColorPalette_.average_red;
        }
        if(Button7.text_type1("Fullscreen Upscale", 0, 330, 560, 60, 20, 375, 40, 45, 50, 55, 4.5, 0.4)) //fullscreen upscale button
        {
            if(Fullscreen.fullscreenupscale)
            {
                Fullscreen.fullscreenupscale = false;
            }
            else
            {
                Fullscreen.fullscreenupscale = true;
            }
            Fullscreen.screenScaler();
        }
        if(Fullscreen.fullscreendownscale === false)
        {
            document.getElementById("canvas").style.imageRendering = "auto";
        }
        if(Fps.cap30fps === 30)
        {
            ctx.fillStyle = GV.ColorPalette_.average_green;
        }
        else
        {
            ctx.fillStyle = GV.ColorPalette_.average_red;
        }
        if(Button8.text_type1("Cap the game at 30fps", 0, 490, 650, 60, 20, 535, 40, 45, 50, 55, 4.5, 0.4)) //lock the framerate at 30fps
        {
            if(Fps.cap30fps === 30)
            {
                Fps.cap30fps = -1;
            }
            else
            {
                Fps.cap30fps = 30;
            }
            Fps.gfpsintervaltiming = 0;
        }
        if(Button9.text_type1("Res modify", 790, 490, 650, 60, 800, 535, 40, 45, 50, 55, 4.5, 0.4)) //lock the framerate at 30fps
        {
            if(MapData.pre_block_scale === 24)
            {
                MapData.pre_block_scale = 12;
            }
            else
            {
                MapData.pre_block_scale = 24;
            }
            MapData.requiredDisplayVariableUpdater()
        }
    }
}
export{Setting_Menu};