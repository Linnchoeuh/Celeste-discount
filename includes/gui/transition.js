import {ctx, Fps} from "../../main.js";
class Transition_
{
    constructor()
    {
        this.currentfadestate = 0;
        this.transition_state = "false"
        this.selectedaction = "N/A"
    }

    displayer()
    {
        if(this.transition_state != "true")
        {    
            if(0.05*this.currentfadestate > 0 & 0.05*this.currentfadestate < 1)    
            {    
                ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate/Fps.dt)+")";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate -= 1/Fps.dt;
            }
            else if(0.05*this.currentfadestate >= 1)
            {
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate -= 1/Fps.dt;
            }
        }
        else
        {
            if(0.05*this.currentfadestate < 1)    
            {    
                ctx.fillStyle = "rgba(0,0,0,"+(0.05*this.currentfadestate)+")";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                this.currentfadestate += 1/Fps.dt;
                this.transition_state = "true";
            }
            else
            {
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                this.transition_state = "finish";
            }
        }
    }

    Switcher(menu, menu_change, lastmenu_sync = false/*pour ne pas activer le reset des valeur lors de l'arrivé dans l'autre menu*/) //Permet le bon timing de transition entre un menu et un autre
    {
        switch(this.transition_state)
        {
            case "false":
                this.transition_state = "true";
                this.selectedaction = "menu"+menu_change+"";
                break;
            case "finish":
                menu = menu_change;
                this.transition_state = "false";
                this.selectedaction = "N/A";
                if(lastmenu_sync)
                {
                    lastmenu_sync = menu_change;
                }
                return [menu, lastmenu_sync, true]; //La valeure true permet d'effectuer des changement spécifique au moment ou la transition est sur un fond noir
        }
        return [menu, lastmenu_sync, false];
    }
}

export{Transition_}