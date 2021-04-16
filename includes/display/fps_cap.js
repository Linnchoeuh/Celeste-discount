import{ctx, Tools, Player, MapData, MainLoop} from "../../main.js"
class Fps_
{
    constructor()
    {
        this.fps = 1;
        this.frameaverageaccumulation = 0;
        this.frametime = 0
        this.dt = 0;
        this.date = Date.now();
        this.date_now = Date.now();
        this.previousdate = this.date;

        this.showfps = true;
        this.cap30fps = -1;
        this.gfpsintervaltiming = 0;
        this.previousgfpsframetiming = 0;
        this.gfpsframetiming = 0;

        this.executionloop = 0;
        this.dateseconds = this.date;
        this.pfps = 0;
        this.pfpslog = 60;
        this.physicframeavaiblity = 0;
        this.pfpsframetiming = this.previouspfpsframetiming = Date.now();
        this.pfpsintervaltiming = 0;
        this.nbofframewithoutphysics = 0;
    }

    display(){
        if(this.showfps){    
            ctx.font = Tools.resolutionScaler(20)+'px arial';
            Tools.logText(this.fps+" GFPS "+Number.parseFloat(this.dt).toPrecision(3)+" DT", 20, 25, "rgb(0,255,0)", "rgb(0,100,0)"); //GFPS = Frame d'affichage
            Tools.logText(this.pfpslog+" PFPS ", 20, 50, "rgb(0,255,0)", "rgb(0,100,0)"); // PFPS = frame de physique
            Tools.logText("Main : "+Number.parseFloat(MainLoop.log).toPrecision(3)+" ms", 20, 75, "rgb(0,255,0)", "rgb(0,100,0)"); //Temps de latence entre le début et la fin de la frame
            Tools.logText("-Player velocity : "+Number.parseFloat(Player.physics_loop_log).toPrecision(3)+" ms", 40, 100, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Collisions : "+Number.parseFloat(MapData.collisions_loop_log).toPrecision(3)+" ms", 40, 125, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Camsmoother : "+Number.parseFloat(MapData.cam_smoother_loop_log).toPrecision(3)+" ms", 40, 150, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Map display : "+Number.parseFloat(MapData.graphics_loop_log).toPrecision(3)+" ms", 40, 175, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Player display : "+Number.parseFloat(Player.display_loop_log).toPrecision(3)+" ms", 40, 200, "rgb(0,255,0)", "rgb(0,100,0)");
        }
    }

    // varUpdater(){
    //     this.date_now = Date.now()
    // }

    // Log(){
    //     this.frameaverageaccumulation++;
    //     if(this.date+1000 <= this.date_now){
    //         this.date = this.date_now;
    //         this.fps = this.frameaverageaccumulation;
    //         this.dt = this.fps/60;
    //         this.frameaverageaccumulation = 0;
    //     }
    // }

    // Physic_log(){
    //     this.pfps++;
    //     if(this.dateseconds+1000 <= this.date_now){
    //         this.dateseconds = this.date_now;
    //         this.pfpslog = this.pfps;
    //         this.pfps = 0;
    //     }
    // }

    Log(){
        this.frameaverageaccumulation++;
        if(this.date+1000 <= Date.now()){
            this.date = Date.now();
            this.fps = this.frameaverageaccumulation;
            this.dt = this.fps/60;
            this.frameaverageaccumulation = 0;
        }
    }

    Physic_log(){
        this.pfps++;
        if(this.dateseconds+1000 <= Date.now()){
            this.dateseconds = Date.now();
            this.pfpslog = this.pfps;
            this.pfps = 0;
        }
    }

    Graphic_Cap(framerate = -1)
    {
        if(this.gfpsintervaltiming > Math.round(1000/framerate)+100)
        {
            this.gfpsintervaltiming = 0;
        }
        if(framerate === -1)
        {
            return true;
        }
        else
        {
            this.gfpsframetiming = Date.now();
            this.gfpsintervaltiming += this.gfpsframetiming-this.previousgfpsframetiming;
            this.previousgfpsframetiming = this.gfpsframetiming;
            if(this.gfpsintervaltiming > Math.round(1000/framerate))
            {
                this.gfpsintervaltiming -= Math.round(1000/framerate);
                return true;
            }
            return false;
        }
    }

    Physics_Refresh_Cap(frequency = -1)
    {
        if(frequency === -1)
        {
            return true;
        }
        // this.executionloop = 0;
        this.previouspfpsframetiming = this.pfpsframetiming;
        this.pfpsframetiming = Date.now();
        this.pfpsintervaltiming += this.pfpsframetiming - this.previouspfpsframetiming;
        if(1000/frequency <= this.pfpsintervaltiming)
        {
            this.nbofframewithoutphysics = 0
            this.executionloop = this.pfpsintervaltiming/(1000/frequency)
            this.pfpsintervaltiming -= Math.floor(this.executionloop)*(1000/frequency)
            return true;
        }
        return false;
    }
}

export{Fps_}