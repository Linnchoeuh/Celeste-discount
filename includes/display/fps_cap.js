class FPS
{
    constructor()
    {
        this.fps = 1;
        this.frameaverageaccumulation = 0;
        this.frametime = 0
        this.dt = 0;
        this.date = Date.now();
        this.previousdate = this.date;

        this.showfps = true;
        this.cap30fps = -1;
        this.gfpsintervaltiming = 0;
        this.previousgfpsframetiming = 0;
        this.gfpsframetiming = 0;

        this.executionloop = 0;
        this.dateseconds = this.date;
        this.pfps = 0;
        this.pfpslog = 0;
        this.physicframeavaiblity = 0;       
    }

    Log()
    {
        this.frameaverageaccumulation++;
        if(this.frameaverageaccumulation >= 5)
        {
            this.date = Date.now();
            this.fps = 5000/(this.date-this.frametime);
            this.frametime = this.date;
            this.frameaverageaccumulation = 0;
        }
        this.pfps++;
        if(this.dateseconds+1000 <= Date.now())
        {
            this.dateseconds = Date.now();
            this.pfpslog = this.pfps;
            this.pfps = 0;
        }
        this.dt = this.fps/60;
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
        if(this.gfpsintervaltiming > Math.round(1000/framerate)+100)
        {
            this.gfpsintervaltiming = 0;
        }
        if(frequency === -1)
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
}

export{FPS}