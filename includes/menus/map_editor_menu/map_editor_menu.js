import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Button5, Button6, Button7, Button8, Transition, Fps, Fullscreen} from "../../../main.js";

class Map_Editor_Menu{
    constructor(){
    }

    displayMenu(){
        if(GV.last_menu != 7){
            MapData_pack = ["CelesteDiscountMapDataApprovedCerticate", 1, "", [[["",50,50,0,0],[],[],[],[]]]];
            GV.editedlevelid = 0;
            MapData_pack = GV.level[GV.levelid];
            GV.start = true;
            Pause.pause = false;
            edition_mode = 0;
            GV.last_menu = 7;
        }
        if(GV.start){
            // MapEditor.load(MapData_pack);
            MapEditor.load(GV.level[GV.levelid], GV.editedlevelid);
            GV.start = false;
        }
        MapEditor.display(spawnmodifier);
        
        ctx.font = "Bold "+Tools.resolutionScaler(20)+'px arial';
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText("["+Math.round(((Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71)+";"+Math.round(((Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)+"]", Mouse.x+Tools.resolutionScaler(10), Mouse.y-Tools.resolutionScaler(10));
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = Tools.resolutionScaler(1);
        ctx.strokeText("["+Math.round(((Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71)+";"+Math.round(((Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)+"]", Mouse.x+Tools.resolutionScaler(10), Mouse.y-Tools.resolutionScaler(10));
        
        if(Pause.pause === false)
        {
            if(Button1.texture_type2(1160, 10, MapEditor.add_block_icon, "Add"))
            {
                edition_mode = 0;
                sub_edition_mode = 0;
                mousepressed = false;
            }
            if(Button2.texture_type2(1160, 50, MapEditor.modification_icon, "Modifications"))
            {
                edition_mode = 1;
                sub_edition_mode = 0;
                mousepressed = false;
            }
            if(Button3.texture_type2(1160, 90, MapEditor.remove_block_icon, "Delete"))
            {
                edition_mode = 2;
                sub_edition_mode = 0;
                mousepressed = false;
            }
            ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            switch(edition_mode)
            {
                case 0:
                    ctx.fillText("Add", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                    ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                    
                    switch(sub_edition_mode)
                    {
                        case 0:
                            ctx.fillText("block", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 1:
                            ctx.fillText("water", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 2:
                            ctx.fillText("ennemies", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 3:
                            ctx.fillText("interactive blocks", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 4:
                            ctx.fillText("decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                    }
                    ctx.fillStyle = "rgb(255,255,150)";
                    ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(13), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                    if(Button4.texture_type2(1160, 170, MapEditor.add_block_icon, "Add blocks"))
                    {
                        sub_edition_mode = 0;
                    }
                    if(Button5.texture_type2(1160, 210, MapEditor.add_water_icon, "Add water"))
                    {
                        sub_edition_mode = 1;
                    }
                    if(Button6.texture_type2(1160, 250, MapEditor.add_ennemy_icon, "Add ennemies"))
                    {
                        sub_edition_mode = 2;
                    }
                    if(Button7.texture_type2(1160, 290, MapEditor.add_interactive_block_icon, "Add interactive blocks"))
                    {
                        sub_edition_mode = 3;
                    }
                    if(Button8.texture_type2(1160, 330, MapEditor.add_decoration_icon, "Add decorations"))
                    {
                        sub_edition_mode = 4;
                    }
                    break
                case 1:
                    ctx.fillText("Modifications", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                    ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                    switch(sub_edition_mode)
                    {
                        case 0:
                            ctx.fillText("Move objects", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 1:
                            ctx.fillText("Move decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 2:
                            ctx.fillText("Modify properties", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                    }
                    ctx.fillStyle = "rgb(255,255,150)";
                    ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(53), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                    if(Button4.texture_type2(1160, 170, MapEditor.move_block_icon, "Move objects"))
                    {
                        sub_edition_mode = 0;
                    }
                    if(Button5.texture_type2(1160, 210, MapEditor.move_decoration_icon, "Move decorations"))
                    {
                        sub_edition_mode = 1;
                    }
                    if(Button6.texture_type2(1160, 250, MapEditor.modification_icon, "Modify properties"))
                    {
                        sub_edition_mode = 2;
                    }
                    break
                
                case 2:
                    ctx.fillText("Delete", Tools.resolutionScaler(10), Tools.resolutionScaler(30)); //Text in the top left
                    ctx.font = "Bold "+Tools.resolutionScaler(15)+'px arial';
                    switch(sub_edition_mode)
                    {
                        case 0:
                            ctx.fillText("blocks", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                        case 1:
                            ctx.fillText("decorations", Tools.resolutionScaler(10), Tools.resolutionScaler(50)); //Subtext in the top left
                            break;
                    }
                    ctx.fillStyle = "rgb(255,255,150)";
                    ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(93), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
                    if(Button4.texture_type2(1160, 170, MapEditor.remove_block_icon, "Remove blocks"))
                    {
                        sub_edition_mode = 0;
                    }
                    if(Button5.texture_type2(1160, 210, MapEditor.remove_decoration_icon, "Remove decorations"))
                    {
                        sub_edition_mode = 1;
                    }
                    break
            }
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(Tools.resolutionScaler(1194), Tools.resolutionScaler(173+sub_edition_mode*40), Tools.resolutionScaler(2), Tools.resolutionScaler(24));
            
            if(Button3.texture_type2(90, 635, MapEditor.play_icon, "Test the MapData", true) | Transition.transition_state === "finish" & Transition.selectedaction === "menu9")
            {
                switch(Transition.transition_state)
                {
                    case "false":
                        Transition.transition_state = "true";
                        Transition.selectedaction = "menu9";
                        break;
                    case "finish":
                        GV.menu = 9;
                        Transition.transition_state = "false";
                        Transition.selectedaction = "N/A";
                        break;
                }
                mousepressed = true;
            }
            if(Button2.texture_type2(50, 635, MapEditor.end_block_icon, "Add end GV.level zone", true))
            {
                mousepressed = true;
            }
            if(Button1.texture_type2(10, 635, MapEditor.spawn_icon, "Set spawn point", true))
            {
                spawnmodifier = true
                mousepressed = true;
            }

            if(GV.keys_input[5] === 0 & Mouse.animatic_mouse_value[0]-previousmouseX === 0 & Mouse.animatic_mouse_value[1]-previousmouseY === 0 & Mouse.click_left & spawnmodifier === false)
            {
                MapDatamousetranslationX = (Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX;
                MapDatamousetranslationY = (Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY;
                mousepressed = true;
            }
            
            if(GV.keys_input[5] === 1)
            {
                MapData_move_speed = 0;
                if(Mouse.click_left)
                {
                    if(mousepressed === false)
                    {
                        MapDatamousetranslationX = (Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX;
                        MapDatamousetranslationY = (Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY;
                        mousepressed = true;
                    }
                    if(MapEditor.offsetX >= MapEditor.maplimit[0]*71 & Mouse.animatic_mouse_value[0]-previousmouseX <= 0)
                    {
                        MapEditor.offsetX = MapEditor.maplimit[0]*71;
                        MapDatamousetranslationX = (Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX;
                    }
                    else if(MapEditor.offsetX <= -1129 & Mouse.animatic_mouse_value[0]-previousmouseX >= 0)
                    {
                        MapEditor.offsetX = -1129;
                        MapDatamousetranslationX = (Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX;
                    }
                    else
                    {
                        MapEditor.offsetX = Math.round(MapDatamousetranslationX-(Mouse.animatic_mouse_value[0]*(1200/canvas.width)));
                    }

                    if(MapEditor.offsetY >= MapEditor.maplimit[1]*71 & Mouse.animatic_mouse_value[1]-previousmouseY <= 0)
                    {
                        MapEditor.offsetY = MapEditor.maplimit[1]*71;
                        MapDatamousetranslationY = (Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY;
                    }
                    else if(MapEditor.offsetY <= -604 & Mouse.animatic_mouse_value[1]-previousmouseY >= 0)
                    {
                        MapEditor.offsetY = -604;
                        MapDatamousetranslationY = (Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY;
                    }
                    else
                    {
                        MapEditor.offsetY = Math.round(MapDatamousetranslationY-(Mouse.animatic_mouse_value[1]*(675/(canvas.height))));
                    }

                }
                ctx.fillStyle = "rgba(50,50,50,0.6)";
                ctx.fillRect(Math.round((Mouse.animatic_mouse_value[0]-Tools.resolutionScaler(35-MapEditor.offsetX%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetX%71), 
                             Math.round((Mouse.animatic_mouse_value[1]-Tools.resolutionScaler(35-MapEditor.offsetY%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetY%71), 
                             Tools.resolutionScalerAddOne(71), Tools.resolutionScalerAddOne(71));

            }
            else
            {
                MapData_move_speed = Math.round(20/Fps.dt);
                if(spawnmodifier)
                {
                    ctx.fillStyle = "rgba(255,25,0,0.2)";
                    ctx.fillRect(Math.round((Mouse.animatic_mouse_value[0]-Tools.resolutionScaler(35-MapEditor.offsetX%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetX%71), 
                                 Math.round((Mouse.animatic_mouse_value[1]-Tools.resolutionScaler(35-MapEditor.offsetY%71))/Tools.resolutionScaler(71))*Tools.resolutionScaler(71)-Tools.resolutionScaler(MapEditor.offsetY%71), 
                                 Tools.resolutionScalerAddOne(71), Tools.resolutionScalerAddOne(71));
                    
                    if(mousepressed === false & Mouse.click_left)
                    {
                        MapEditor.spawn = [Math.round(((Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71),
                                           Math.round(((Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY-35)/71)];
                        // console.log(MapEditor.spawn);
                        GV.level[GV.levelid][3][GV.editedlevelid][0][3] = Math.round(((Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71);
                        GV.level[GV.levelid][3][GV.editedlevelid][0][4] = Math.round(((Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY-35)/71);
                        // MapData_pack[3][0][0][3] = Math.round(((Mouse.animatic_mouse_value[0]*(1200/canvas.width))+MapEditor.offsetX-35)/71);
                        // MapData_pack[3][0][0][4] = Math.round(((Mouse.animatic_mouse_value[1]*(675/canvas.height))+MapEditor.offsetY-35)/71);
                        spawnmodifier = false;
                        // GV.start = true;
                    }
                }

            }
            if(GV.keys_input[0] === 1 & MapEditor.offsetY > -604)
            {
                MapEditor.offsetY -= MapData_move_speed;
                if(MapEditor.offsetY < -604)
                {
                    MapEditor.offsetY = -604;
                }
            }
            if(GV.keys_input[2] === 1 & MapEditor.offsetY < ((MapEditor.maplimit[1])*71))
            {
                MapEditor.offsetY += MapData_move_speed;
                if(MapEditor.offsetY > ((MapEditor.maplimit[1])*71))
                {
                    MapEditor.offsetY = ((MapEditor.maplimit[1])*71);
                }
            }
            if(GV.keys_input[3] === 1 & MapEditor.offsetX < ((MapEditor.maplimit[0])*71))
            {
                MapEditor.offsetX += MapData_move_speed;
                if(MapEditor.offsetX > ((MapEditor.maplimit[0])*71))
                {
                    MapEditor.offsetX = ((MapEditor.maplimit[0])*71);
                }
            }
            if(GV.keys_input[1] === 1)
            {
                MapEditor.offsetX -= MapData_move_speed;
                if(MapEditor.offsetX < -1129)
                {
                    MapEditor.offsetX = -1129;
                }
            }
        }
        

        if(Pause.pause === false)
        {
            ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fillText("Press P to show the GV.menu", Tools.resolutionScaler(875), Tools.resolutionScaler(640)); //mouse pos
            ctx.fillText("Press H to get the control ", Tools.resolutionScaler(875), Tools.resolutionScaler(665)); //mouse pos
        }
        if(GV.keys_input[6] === 1 & Pause.pkey === false | Pause.pause) //Pause.pause
        {
            GV.keypressed = Pause.Toggle("Pause", GV.keypressed, GV.keys_input, Fps.dt)

            ctx.fillStyle = "rgb(255,255,255)";

            if(Button1.text_type1("Resume", 0, 145, 195, 40, -180+(Pause.pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
            {
                Pause.endpause = true;
            }

            if(Button2.text_type1("Setting", 0, 222, 175, 40, -180+(Pause.pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | Transition.transition_state === "finish" & Transition.selectedaction === "menu8") //setting
            {
                stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 8)
                GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                if(stock[4])
                {
                    Pause.endpause = false;
                    Pause.pause = true;
                    Pause.pauseframe = 10;
                }
            }

            if(Button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 295, 380, 40, -180+(Pause.pauseframe*20), 325, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
            {
                GV.firstgameframe = true;
                Fullscreen.toggle(canvas);
            }

            if(Button4.text_type1("Modify MapData properties", 0, 370, 470, 40, -180+(Pause.pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "bop") //back to GV.menu
            {
            }
            if(Button5.text_type1("Change MapData", 0, 445, 285, 40, -180+(Pause.pauseframe*20), 475, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "bop") //back to GV.menu
            {
            }
            if(Button6.text_type1("Quit", 0, 520, 125, 40, -180+(Pause.pauseframe*20), 550, 30, 33, 36, 40, 3.8, 0.4) | Transition.transition_state === "finish" & Transition.selectedaction === "menu5") //back to GV.menu
            {
                stock = Transition.Switcher(Transition.transition_state, GV.menu, Transition.selectedaction, 5)
                GV.menu = stock[0]; Transition.transition_state = stock[1]; Transition.selectedaction = stock[2];
                if(stock[4])
                {
                    Pause.endpause = false;
                    Pause.pause = false;
                    Pause.pauseframe = 0;
                }
            }
        }
    }
}

export{Map_Editor_Menu};