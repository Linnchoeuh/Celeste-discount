import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Transition, Fps, Player, MapData, Pause, Fullscreen, Keyboard} from "../../../main.js";

class Game_Menu
{
    constructor()
    {
        this.stock = [0, 0];

        this.physics_speed  = 60;
    }
    displayMenu()
    {
        if(GV.last_menu != 2)
        {
            Fps.gfpsintervaltiming = 0;
            GV.start = true;
            GV.last_menu = 2;
            
        }
        
        if(GV.start)
        {
            Player.reset();
            MapData.reset();
            MapData.start(GV.level[GV.levelid], GV.editedlevelid);
            GV.start = false;
        }

        if(Fps.Physics_Refresh_Cap(this.physics_speed)) //gestion de la physique
        {
            for(var i = 0; i < Fps.executionloop; i++)
            {
                Player.Position_.Previous_.x = Player.Position_.x;
                Player.Position_.Previous_.y = Player.Position_.y;
                
                Player.velocity(MapData.Collisions_);
                MapData.collider();
                MapData.fcamsmoother();
                
                MapData.Offset_.Previous_.x = MapData.Offset_.x;
                MapData.Offset_.Previous_.y = MapData.Offset_.y;
                
                Fps.Physic_log();
            }
        }
        
        if(GV.interpolation_toggle === false){Fps.interpolation_value = 1;};

        Player.Position_.InterpolationValue_.x        = Tools.lerp(Player.Position_.x       -Player.Position_.Previous_.x,        Fps.interpolation_value);
        Player.Position_.InterpolationValue_.y        = Tools.lerp(Player.Position_.y       -Player.Position_.Previous_.y,        Fps.interpolation_value);
        MapData.Offset_.InterpolationValue_.x         = Tools.lerp(MapData.Offset_.x        -MapData.Offset_.Previous_.x,         Fps.interpolation_value);
        MapData.Offset_.InterpolationValue_.y         = Tools.lerp(MapData.Offset_.y        -MapData.Offset_.Previous_.y,         Fps.interpolation_value);
        MapData.CameraSmoother_.InterpolationValue_.x = Tools.lerp(MapData.CameraSmoother_.x-MapData.CameraSmoother_.Previous_.x, Fps.interpolation_value);
        MapData.CameraSmoother_.InterpolationValue_.y = Tools.lerp(MapData.CameraSmoother_.y-MapData.CameraSmoother_.Previous_.y, Fps.interpolation_value);       
        
        MapData.display();
        
        Player.display(MapData.CameraSmoother_.InterpoledValue_.x,      MapData.CameraSmoother_.InterpoledValue_.y,
                       MapData.interpoled_difference_smoother_offset_x, MapData.interpoled_difference_smoother_offset_y);
        
        if(GV.interpolation_toggle){Fps.nbofframewithoutphysics++;};

        MapData.levelReaderLogs();

        Pause.toggle("Pause")
        if(Pause.pause) //pause
        {
            ctx.fillStyle = GV.ColorPalette_.white
            if(Button1.text_type1("Resume", 0, 145, 195, 40, -180+(Pause.pauseframe*20), 175, 30, 33, 36, 40, 3.6, 0.4)) //resume
            {
                Pause.endpause = true;
            }
            if(GV.menu === 2)
            {
                if(Button2.text_type1("Setting", 0, 222, 175, 40, -180+(Pause.pauseframe*20), 250, 30, 33, 36, 40, 3.7, 0.3) | Transition.transition_state === "finish" & Transition.selectedaction === "menu4") //setting
                {
                    this.stock = Transition.Switcher(GV.menu, 4);
                    GV.menu = this.stock[0]
                    console.log(GV.menu)
                    if(this.stock[2])
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
                if(Button4.text_type1("Back to menu", 0, 370, 305, 40, -180+(Pause.pauseframe*20), 400, 30, 33, 36, 40, 3.8, 0.4) || Transition.transition_state === "finish" && Transition.selectedaction === "menu1" || Keyboard.keys_input.back && Keyboard.keys_pressed.back === false) //back to GV.menu
                {
                    this.stock = Transition.Switcher(GV.menu, 1);
                    GV.menu = this.stock[0]
                    if(this.stock[2])
                    {
                        Pause.pause = Pause.endpause = false;
                        Pause.pauseframe = 0;
                    }
                }
            }
            else
            {   
                if(Button3.text_type1(Fullscreen.ablefullscreen+" fullscreen", 0, 222, 380, 40, -180+(Pause.pauseframe*20), 250, 30, 33, 36, 40, 4.5, 0.4)) //fullscreen
                {
                    GV.firstgameframe = true;
                    Fullscreen.toggle(canvas)
                }
                if(Button4.text_type1("Back to edition", 0, 295, 330, 40, -180+(Pause.pauseframe*20), 325, 30, 33, 36, 40, 3.8, 0.4) || Transition.transition_state === "finish" && Transition.selectedaction === "menu7" || Keyboard.keys_input.back && Keyboard.keys_pressed.back === false) //back to GV.menu
                {
                    this.stock = Transition.Switcher(GV.menu, 7, true)
                    GV.menu = this.stock[0]; GV.last_menu = this.stock[1];
                    if(this.stock[2])
                    {
                        Pause.pause = Pause.endpause = false;
                    }
                }
            }
            
        }
        else
        {
            ctx.font = "Bold "+Tools.resolutionScaler(25)+'px arial';
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fillText("Press P to pause the game", Tools.resolutionScaler(Tools.placeFromRight(325)), Tools.resolutionScaler(Tools.placeFromBottom(10))); //mouse pos
        }
        if(Fps.interpolation_signal && GV.devmode && GV.interpolation_toggle){
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(Tools.resolutionScaler(5),Tools.resolutionScaler(650),Tools.resolutionScaler(20),Tools.resolutionScaler(20));
        }
    }
}

export{Game_Menu}