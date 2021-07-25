import {ctx, GV, Tools, Button1, Button2, Button3, Transition} from "../../../main.js";
class Main_Menu
{
    displayMenu()
    {
        if(GV.last_menu != 1)
        {
            GV.last_menu = 1;
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        if(Button1.text_type1("--Play--", Tools.placeFromHorizontalCenter(190), Tools.placeFromBottom(300), 385, 60, Tools.placeFromHorizontalCenter(80), Tools.placeFromBottom(255), 48, 54, 58, 60) | Transition.transition_state === "finish" & Transition.selectedaction === "menu2") //play
        {
            GV.menu = Transition.Switcher(GV.menu, 2)[0];
        }
        if(Button2.text_type1("--Setting--", Tools.placeFromHorizontalCenter(190), Tools.placeFromBottom(200), 385, 60, Tools.placeFromHorizontalCenter(113), Tools.placeFromBottom(155), 48, 54, 58, 60, -0.7) | Transition.transition_state === "finish" & Transition.selectedaction === "menu3") //setting
        {
            GV.menu = Transition.Switcher(GV.menu, 3)[0];
        }
        if(Button3.text_type1("--Map editor--", Tools.placeFromHorizontalCenter(190), Tools.placeFromBottom(100), 385, 60, Tools.placeFromHorizontalCenter(152), Tools.placeFromBottom(55), 48, 54, 58, 60, -1.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu5") //setting
        {
            GV.menu = Transition.Switcher(GV.menu, 5)[0];
        }
    }
}

export{Main_Menu};