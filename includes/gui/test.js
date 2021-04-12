import {Tools, MapData} from "../../main.js";

class Une_Classe
{
    constructor(ctx)
    {
        this.ctx = ctx
        this.grd = ctx.createLinearGradient(-150, 0, Tools.resolutionScaler(3000), 0);
        this.grd.addColorStop(0.1, "transparent");
        this.grd.addColorStop(0, "black");

        this.pauseframe = 0;
        this.pause = false;
        this.pkey = false;
        this.endpause = false;
    }
}

export{Une_Classe};