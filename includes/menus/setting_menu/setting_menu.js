import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Button9, Button10, Button11, Transition, Fps, Fullscreen, Keyboard, MapData, canvas} from "../../../main.js";
import {General_Settings} from "./pages/general.js";
import {Display_Settings} from "./pages/display.js";
import {Audio_Settings}   from "./pages/audio.js";
import {Debug_Settings}   from "./pages/debug.js";



class Setting_Menu
{
    constructor()
    {
        this.General = new General_Settings();
        this.Display = new Display_Settings();
        this.Audio   = new Audio_Settings();
        this.Debug   = new Debug_Settings();


        


        this.horizontal_swipe = 0;
        this.vertical_swipe = 0;
        this.setting_category = 0;
        this.setting_category_list = ["General", "Display", "Audio", "Debug"]
        this.horizontal_arrow_place = 
        {
            "x" : 0,
            "y" : 0
        }
        this.title_category_offset = 0;
    }

    menuTitleDisplayer()
    {
        
        for(let i = 0; i < this.setting_category_list.length; i++)
        {
            ctx.font = "Bold "+Tools.resolutionScaler(15)+'px Lucida Console';
            if(i < this.setting_category)
            {
                this.title_category_offset = this.setting_category_list[i].length/2*13.5;
                for(let k = this.setting_category; k > i; k--)
                {
                    this.title_category_offset += 20+this.setting_category_list[k].length*8;
                }
                Tools.logText(this.setting_category_list[i], Tools.placeFromHorizontalCenter(this.title_category_offset), 97, false, GV.ColorPalette_.gray);
            }
            else if(i > this.setting_category)
            {
                this.title_category_offset = -this.setting_category_list[this.setting_category].length/2*13.5-20;
                for(let k = this.setting_category+1; k < i; k++)
                {
                    this.title_category_offset -= 20+this.setting_category_list[k].length*8;
                }
                Tools.logText(this.setting_category_list[i], Tools.placeFromHorizontalCenter(this.title_category_offset), 97, false, GV.ColorPalette_.gray);
            }
            else
            {
                ctx.font = "Bold "+Tools.resolutionScaler(25)+'px Lucida Console';
                Tools.logText(this.setting_category_list[this.setting_category], Tools.placeFromHorizontalCenter(this.setting_category_list[this.setting_category].length/2*13.5), 100, false);
            }
        }
        
    }

    displayMenu(){
        if(GV.last_menu != 3)
        {
            GV.last_menu = 3;
            this.setting_category = 0;
        }

        if(this.setting_category > this.setting_category_list.length-1)
        {
            this.setting_category = this.setting_category_list.length-1;
        }

        ctx.font = "Bold "+Tools.resolutionScaler(65)+"px arial";
        Tools.logText("Settings", Tools.placeFromHorizontalCenter(126), 60, false)

        this.menuTitleDisplayer()

        ctx.strokeStyle = ctx.fillStyle = GV.ColorPalette_.white;
        ctx.lineWidth = Tools.resolutionScaler(2);
        ctx.beginPath();
        ctx.moveTo(0,    Tools.resolutionScaler(110));
        ctx.lineTo(canvas.width,  Tools.resolutionScaler(110));
        ctx.stroke();

        
        if(this.setting_category < this.setting_category_list.length-1)
        {
            if(Button2.specialButton1(Tools.placeFromRight(110), 192, 50, 400, 50, 10, 0))
            {
                this.setting_category++;
            }
        }
        if(this.setting_category > 0)
        {
            if(Button3.specialButton1(-40, 192, 50, 400, 50, 10, 2))
            {
                this.setting_category--;
            }
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

        switch(this.setting_category)
        {
            case 0:
                this.General.display();
                break;
            case 1:
                this.Display.display();
                break;
            case 2:
                this.Audio.display();
                break;
            case 3:
                this.Debug.display();
                break;
        };
        
        
        
    }
}
export{Setting_Menu};