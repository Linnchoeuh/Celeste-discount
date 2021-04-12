class Transition_
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.dt = 1;
        this.currentfadestate = 0;
    }

    plus()
    {
        if(0.05*this.currentfadestate < 1)    
        {    
            this.ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate)+")";
            this.ctx.fillRect(0,0,canvas.width,canvas.height);
            this.currentfadestate += 1/this.dt;
            return "true";
        }
        else
        {
            this.ctx.fillStyle = "rgb(0,0,0)";
            this.ctx.fillRect(0,0,canvas.width,canvas.height);
            return "finish";
        }
    }
    
    minus(transition)
    {
        if(transition != "true")
        {    
            if(0.05*this.currentfadestate > 0 & 0.05*this.currentfadestate < 1)    
            {    
                this.ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate/this.dt)+")";
                this.ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate -= 1/this.dt;
            }
            else if(0.05*this.currentfadestate >= 1)
            {
                this.ctx.fillStyle = "rgb(0,0,0)";
                this.ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate -= 1/this.dt;
            }
        }
    }

    Switcher(transition, menu, selectedaction, menu_change, lastmenu_sync = false/*pour ne pas activer le reset des valeur lors de l'arrivé dans l'autre menu*/) //Permet le bon timing de transition entre un menu et un autre
    {
        switch(transition)
        {
            case "false":
                transition = "true";
                selectedaction = "menu"+menu_change+"";
                break;
            case "finish":
                menu = menu_change;
                transition = "false";
                selectedaction = "N/A";
                if(lastmenu_sync)
                {
                    lastmenu_sync = menu_change
                }
                return [menu, transition, selectedaction, lastmenu_sync, true] //La valeure true permet d'effectuer des changement spécifique au moment ou la transition est sur un fond noir
        }
        return [menu, transition, selectedaction, lastmenu_sync, false]
    }
}

export{Transition_}