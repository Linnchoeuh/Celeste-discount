import {ctx, GV, Button1, Button2, Button3, Transition} from "../../../main.js";
class Main_Menu
{
    displayMenu()
    {
        if(GV.last_menu != 1)
        {
            GV.last_menu = 1;
        }
        ctx.fillStyle = "rgb(255,255,255)";
        if(Button1.text_type1("--Play--", 410, 375, 385, 60, 520, 420, 48, 54, 58, 60) | Transition.transition_state === "finish" & Transition.selectedaction === "menu2") //play
        {
            GV.menu = Transition.Switcher(GV.menu, 2)[0];
        }
        if(Button2.text_type1("--Setting--", 410, 475, 385, 60, 487, 520, 48, 54, 58, 60, -0.7) | Transition.transition_state === "finish" & Transition.selectedaction === "menu3") //setting
        {
            GV.menu = Transition.Switcher(GV.menu, 3)[0];
        }
        if(Button3.text_type1("--Map editor--", 410, 575, 385, 60, 445, 620, 48, 54, 58, 60, -1.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu5") //setting
        {
            GV.menu = Transition.Switcher(GV.menu, 5)[0];
        }
    }
}

export{Main_Menu};