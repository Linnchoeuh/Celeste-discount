import {ctx, GV, Tools, Keyboard, Fps} from "../../../main.js";

class Command_
{
    constructor(){
        this.push = 0;
        this.command = "false";
    };

    commandTrigger(){
        if(Keyboard.keys_input.c | this.command === "true"){ //To enter some usefull commands ingame
            this.push++;
            if(this.push > 60*Fps.dt | GV.devmode){
                if(Keyboard.keys_input.c){
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.font = "Bold "+Tools.resolutionScaler(100)+'px arial';
                    ctx.fillText("Release C", Tools.resolutionScaler(385), Tools.resolutionScaler(350));
                    this.command = "true";
                }else{
                    this.command = prompt("Enter a command:");
                    switch(this.command){
                        case null:
                            break;
                        case "devmode true": case "devmode enable":
                            GV.devmode = true;
                            break;
                        case "devmode false": case "devmode disable":
                            GV.devmode = false;
                            break;
                        case "godmode true": case "godmode enable":
                            GV.godmode = true;
                            break;
                        case "godmode false": case "godmode disable" :
                            GV.godmode = false;
                            break;
                        case "reset":
                            
                            break;
                        default:
                            alert("invalid command");
                            break;
                    }
                    this.push = 0;
                    Keyboard.key_input = "N/A";
                    Keyboard.key_id = "N/A";
                }
            }
        }else{
            this.push = 0;
        }
    };
}

export{Command_};