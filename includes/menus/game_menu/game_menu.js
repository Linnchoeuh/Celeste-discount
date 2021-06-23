import {ctx, GV, Tools, Button1, Button2, Button3, Button4, Transition, Fps, Player, MapData, Pause, Fullscreen, Keyboard} from "../../../main.js";

class Game_Menu
{
    constructor()
    {
        this.stock = [0, 0];

        this.playerinterpoX = 0;
        this.camerainterpoX = 0;
        this.playerinterpoY = 0;
        this.camerainterpoY = 0;
        this.smoothinterpoX = 0;
        this.smoothinterpoY = 0;
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
            for(var i = 0; i <= Fps.executionloop; i++)
            {
                Player.previousplayerX = Player.playerX;
                Player.previousplayerY = Player.playerY;
                
                MapData.fcamsmoother(Pause.pause);
                Player.velocity(MapData.collisions, MapData.offset_x_on, MapData.offset_y_on, MapData.bestdown[4], Pause.pause);
                MapData.collider(Pause.pause);
                
                
                this.playerinterpoX      = Tools.lerp(Player.playerX       -Player.previousplayerX,         Fps.pfpslog/Fps.fps);
                this.playerinterpoY      = Tools.lerp(Player.playerY       -Player.previousplayerY,         Fps.pfpslog/Fps.fps);
                MapData.offset_interpo_x = Tools.lerp(MapData.offset_x     -MapData.previous_offset_x,      Fps.pfpslog/Fps.fps);
                MapData.offset_interpo_y = Tools.lerp(MapData.offset_y     -MapData.previous_offset_y,      Fps.pfpslog/Fps.fps);
                MapData.smooth_interpo_x = Tools.lerp(MapData.camsmoother_x-MapData.previous_camsmoother_x, Fps.pfpslog/Fps.fps);
                MapData.smooth_interpo_y = Tools.lerp(MapData.camsmoother_y-MapData.previous_camsmoother_y, Fps.pfpslog/Fps.fps);
                Fps.executionloop--;
                MapData.previous_offset_x = MapData.offset_x;
                MapData.previous_offset_y = MapData.offset_y;
                Fps.Physic_log();
            }
        }
        
        
        MapData.display();
        // Player.display();
        
        // Player.display(MapData.collisions, Pause.pause, Fps.dt, //a opti
        //                0,0,
        //                MapData.offset_x, MapData.offset_y
        //                /*MapData.previouscamsmoother[0]+this.smoothinterpoX*Fps.nbofframewithoutphysics, MapData.previouscamsmoother[1]+this.smoothinterpoY*Fps.nbofframewithoutphysics,
        //                Player.previousplayerX+this.playerinterpoX*Fps.nbofframewithoutphysics,         Player.previousplayerY+this.playerinterpoY*Fps.nbofframewithoutphysics,
        //                MapData.previous_offset_x+this.camerainterpoX*Fps.nbofframewithoutphysics,        MapData.previous_offset_y+this.camerainterpoY*Fps.nbofframewithoutphysics*/);
        
        Fps.nbofframewithoutphysics++;
        
        Pause.toggle("Pause")
        if(Pause.pause) //pause
        {
            ctx.fillStyle = "rgb(255,255,255)";
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
            ctx.fillText("Press P to pause the game", Tools.resolutionScaler(875), Tools.resolutionScaler(665)); //mouse pos
        }
    }
}

export{Game_Menu}