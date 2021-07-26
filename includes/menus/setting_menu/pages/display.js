import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Button10, Button11, Transition, Fps, Fullscreen, Keyboard, MapData} from "../../../../main.js";

class Display_Settings
{
    constructor()
    {
        this.plus  = Tools.textureLoader("graphics/ui/plus.png");
        this.minus = Tools.textureLoader("graphics/ui/minus.png");
        this.page  = 0;
    };

    display()
    {
        if(GV.previous_setting_category !== 1)
        {
            this.page  = 0;
            GV.previous_setting_category = 1;
        }
        switch(this.page)
        {
            case 0:
                ctx.fillStyle = "#ffffff";
                if(Button3.text_type3("Change screen ratio", 111, 150, 420, 60, 125, 195, 40)) //lock the framerate at 30fps
                {

                };
            
                if(Fps.cap30fps === 30)
                {
                    ctx.fillStyle = GV.ColorPalette_.average_green;
                }
                else
                {
                    ctx.fillStyle = GV.ColorPalette_.average_red;
                };
                //100, 391, 660, 60, 120, 435, 40
                if(Button4.text_type3("Cap the game at 30fps", 111, 250, 450, 60, 125, 295, 40)) //lock the framerate at 30fps
                {
                    if(Fps.cap30fps === 30)
                    {
                        Fps.cap30fps = -1;
                    }
                    else
                    {
                        Fps.cap30fps = 30;
                    };
                    Fps.gfpsintervaltiming = 0;
                };
            
                if(1)
                {
                    ctx.fillStyle = GV.ColorPalette_.average_green;
                }
                else
                {
                    ctx.fillStyle = GV.ColorPalette_.average_red;
                };
                if(Button5.text_type3("Anti-aliasing", 111, 350, 270, 60, 125, 395, 40)) //lock the framerate at 30fps
                {

                };
            
                if(MapData.pre_block_scale === 12)
                {
                    ctx.fillStyle = GV.ColorPalette_.average_green;
                }
                else
                {
                    ctx.fillStyle = GV.ColorPalette_.average_red;
                };
                if(Button6.text_type3("Res modify", 111, 450, 240, 60, 125, 495, 40)) //lock the framerate at 30fps
                {
                    if(MapData.pre_block_scale === 24)
                    {
                        MapData.pre_block_scale = 12;
                    }
                    else
                    {
                        MapData.pre_block_scale = 24;
                    };
                    MapData.requiredDisplayVariableUpdater()
                };
                if(Button7.specialButton1(Tools.placeFromHorizontalCenter(100), Tools.placeFromBottom(80), 35, 200, 35, 10, 1))
                {
                    this.page++;
                };
                break;






            case 1: //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                
                if(Button4.specialButton1(Tools.placeFromHorizontalCenter(100), 95, 25, 200, 35, 10, 3))
                {
                    this.page--;
                };

                if(Fullscreen.fullscreenupscale)
                {
                    ctx.fillStyle = GV.ColorPalette_.average_green;
                }
                else
                {
                    ctx.fillStyle = GV.ColorPalette_.average_red;
                }
                if(Button3.text_type3("Fullscreen Upscale", 111, 192, 400, 60, 125, 234, 40)) //fullscreen upscale button
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

                if(Fullscreen.fullscreenupscale)
                {
                    ctx.font = "Bold "+Tools.resolutionScaler(40)+'px arial';
                    ctx.fillStyle = GV.ColorPalette_.average_gray;
                    ctx.fillText("Fullscreen downscale", Tools.resolutionScaler(225), Tools.resolutionScaler(294));
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
                        ctx.fillText(Fullscreen.fullscreendownscalefactor*20+"%", Tools.resolutionScaler(780), Tools.resolutionScaler(294));
                        if(Fullscreen.fullscreendownscalefactor > 1)
                        {
                            if(Button9.texture_type1(this.minus, 690, 252, 60, 60, 695, 257, [48,48], 55, 65, 70, 0, -0.5))
                            {
                                Fullscreen.fullscreendownscalefactor--;
                                Fullscreen.screenScaler();
                            }
                        }
                        if(Fullscreen.fullscreendownscalefactor < 5)
                        {
                            if(Button10.texture_type1(this.plus, 890, 252, 60, 60, 895, 257, [48,48], 55, 65, 70, 0, -0.5))
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
                            }
                        }
                        ctx.fillStyle = GV.ColorPalette_.average_green;
                    }
                    else
                    {
                        ctx.fillStyle = GV.ColorPalette_.average_red;
                    }
                    if(Button8.text_type3("Fullscreen downscale", 211, 252, 440, 60, 225, 294, 40)) //fullscreen
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

                if(Fullscreen.fullscreendownscale === false)
                {
                    document.getElementById("canvas").style.imageRendering = "auto";
                }

                break;
        };
        




        
        
        
        
    };
};

export{Display_Settings};