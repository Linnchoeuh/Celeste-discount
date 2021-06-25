import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Transition} from "../../../main.js";

class Map_Editor_Set_New_Map_Properties
{
    constructor(){
        this.previous_mapdata_properties_value = "";
        this.mapdata_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]]
        this.no_preview   = Tools.textureLoader("graphics/ui/no_preview.png");

    }

    displayMenu(){
        if(GV.last_menu != 6){
            this.mapdata_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]]
            GV.last_menu = 6
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
        ctx.fillText("MapData properties", Tools.resolutionScaler(250), Tools.resolutionScaler(75));
        if(Button1.texture_type1(GV.return_arrow, 0, 0, 120, 80, 20, 10, [48,48], 55, 65, 70, 0, 0, "Cancel", 50, 70, 20) 
        || Transition.transition_state === "finish" & Transition.selectedaction === "menu5"){
            GV.menu = Transition.Switcher(GV.menu, 5)[0];
        }
        ctx.drawImage(this.no_preview, Tools.resolutionScaler(262), Tools.resolutionScaler(255), Tools.resolutionScaler(75), Tools.resolutionScaler(75));
        ctx.strokeStyle = GV.ColorPalette_.white;
        ctx.strokeRect(Tools.resolutionScaler(12),Tools.resolutionScaler(130),Tools.resolutionScaler(576),Tools.resolutionScaler(324));
        if(Button2.text_type2("Name : "+this.mapdata_pack[3][0][0][0], 600, 130, 600, 60, 620, 180, 40))
        {
            this.previous_mapdata_properties_value = this.mapdata_pack[3][0][0][0];
            this.mapdata_pack[3][0][0][0] = prompt("Name level:");
            if(this.mapdata_pack[3][0][0][0] === null)
            {
                this.mapdata_pack[3][0][0][0] = this.previous_mapdata_properties_value;
            }
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        if(Button3.text_type2("MapData width : "+this.mapdata_pack[3][0][0][1], 600, 230, 600, 60, 620, 280, 40))
        {
            this.previous_mapdata_properties_value = this.mapdata_pack[3][0][0][1];
            this.mapdata_pack[3][0][0][1] = prompt("Set width:");
            if(this.mapdata_pack[3][0][0][1] === null)
            {
                this.mapdata_pack[3][0][0][1] = this.previous_mapdata_properties_value;
            }
            this.mapdata_pack[3][0][0][1] = Number(this.mapdata_pack[3][0][0][1])
            if(isNaN(this.mapdata_pack[3][0][0][1]))
            {
                alert("Invalid value.")
                this.mapdata_pack[3][0][0][1] = this.previous_mapdata_properties_value;
            }
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        if(Button4.text_type2("MapData height : "+this.mapdata_pack[3][0][0][2], 600, 330, 600, 60, 620, 380, 40))
        {
            this.previous_mapdata_properties_value = this.mapdata_pack[3][0][0][2];
            this.mapdata_pack[3][0][0][2] = prompt("Set height:");
            if(this.mapdata_pack[3][0][0][2] === null)
            {
                this.mapdata_pack[3][0][0][2] = this.previous_mapdata_properties_value;
            }
            this.mapdata_pack[3][0][0][2] = Number(this.mapdata_pack[3][0][0][2])
            if(isNaN(this.mapdata_pack[3][0][0][2]))
            {
                alert("Invalid value.")
                this.mapdata_pack[3][0][0][2] = this.previous_mapdata_properties_value;
            }
        }
        ctx.fillStyle = GV.ColorPalette_.white;
        if(Button5.text_type2("Create", 0, 470, 1200, 205, 250, 650, 225, GV.ColorPalette_.white, 5) | Transition.transition_state === "finish" & Transition.selectedaction === "menu7")
        {
            GV.menu = Transition.Switcher(GV.menu, 7)[0];
        }
    }
}

export{Map_Editor_Set_New_Map_Properties};