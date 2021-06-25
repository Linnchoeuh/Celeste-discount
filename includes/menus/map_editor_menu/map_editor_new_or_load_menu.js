import {ctx, GV, Tools, Button1, Button2, Button3, Mouse, Transition} from "../../../main.js";

class Map_Editor_Create_Or_Load_Menu
{
    constructor(){

    }

    openFileOption(){
        document.getElementById("file1").click();
    }

    displayMenu(){
        if(GV.last_menu != 5){
            GV.last_menu = 5;
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
        ctx.fillText("MapData editor", Tools.resolutionScaler(345), Tools.resolutionScaler(75));

        if(Button1.texture_type1(GV.return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Back", 50, 70, 25) | Transition.transition_state === "finish" & Transition.selectedaction === "menu1"){
            ctx.fillStyle = GV.ColorPalette_.white;
            GV.menu = Transition.Switcher(GV.menu, 1)[0];
        }

        if(Button2.text_type1("New", 0, 225, 320, 100, 20, 300, 80, 85, 90, 95, 3.6, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu6"){ //create a new file
            GV.menu = Transition.Switcher(GV.menu, 6)[0];
        }

        if(Button3.text_type1("Load", 0, 400, 320, 100, 20, 475, 80, 85, 90, 95, 3.6, 0.4)){ //load a file
            this.openFileOption();
            // console.log(document.getElementById('fileItem').files[0])
            Mouse.click_left = false;
        }
    }
}

export{Map_Editor_Create_Or_Load_Menu};