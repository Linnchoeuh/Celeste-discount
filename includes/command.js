import {ctx, GV, Tools, Keyboard, Fps} from "../main.js";

class Command_
{
    constructor(){
        this.push = 0;
        this.command = "false";
        this.command_word_list = [];
        this.command_word = "";
        
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
                    if(this.command !== null || this.command !== "")
                    {
                        this.command_word_list = [];
                        this.command_word = "";
                        for(let i = 0; i < this.command.length; i++)
                        {
                            if(this.command[i] === " "){
                                this.command_word_list.push(this.command_word)
                                this.command_word = "";
                            }else{
                                this.command_word += this.command[i];
                            };
                        };
                        this.command_word_list.push(this.command_word);
                        this.command_word_list.push("");

                        switch(this.command_word_list[0]){
                            case "devmode":
                                switch(this.command_word_list[1]){
                                    case "":
                                        if(GV.devmode){
                                            GV.devmode = false;
                                            break;
                                        }
                                        GV.devmode = true;
                                        break;
                                    case "true":
                                        GV.devmode = true;
                                        break;
                                    case "false":
                                        GV.devmode = false;
                                        break;
                                    case "state":
                                        alert("devmode = "+GV.devmode);
                                        break;
                                    case "help":
                                        alert("Command possible state :\n    -true\n    -false\nThe command devmode let you see many game log \nand remove the 1 second timeout for activate this command entry.");
                                        break;
                                    default:
                                        alert("Syntax error, you must write : \n    -devmode\n    -devmode true\n    -devmode false\n    devmode state : (give you the state of the command)");
                                        break;
                                }
                                break;
                            case "godmode":
                                switch(this.command_word_list[1]){
                                    case "":
                                        if(GV.godmode){
                                            GV.godmode = false;
                                            break;
                                        }
                                        GV.godmode = true;
                                        break;
                                    case "true":
                                        GV.godmode = true;
                                        break;
                                    case "false":
                                        GV.godmode = false;
                                        break;
                                    case "state":
                                        alert("godmode = "+GV.godmode);
                                        break;
                                    case "help":
                                        alert("Command possible state :\n    -true\n    -false\nThe command godmode let you move freely in a game map.");
                                        break;
                                    default:
                                        alert("Syntax error, you must write : \n    -godmode\n    -godmode true\n    -godmode false\n    godmode state : (give you the state of the command)");
                                        break;
                                }    
                                break;
                            case "camera":
                                switch(this.command_word_list[1]){
                                    case "smoother":
                                        switch(this.command_word_list[2]){
                                            case "":
                                                if(GV.camsmootherenable){
                                                    GV.camsmootherenable = false;
                                                    break;
                                                }
                                                GV.camsmootherenable = true;
                                                break;
                                            case "true":
                                                GV.camsmootherenable = true;
                                                break;
                                            case "false":
                                                GV.camsmootherenable = false;
                                                break;
                                            case "state":
                                                alert("Camera smoother = "+GV.camsmootherenable);
                                                break;
                                            case "help":
                                                alert("Command possible state :\n    -true\n    -false\nThe command camera smoother, smoothing the player camera.");
                                                break;
                                            default:
                                                alert("Syntax error, you must write : \n    -camera smoother\n    -camera smoother true\n    -camera smoother false\n    -camera smoother state : (give you the state of the command)");
                                                break;
                                        }    
                                        break;
                                    case "lock":
                                        switch(this.command_word_list[2]){
                                            case "":
                                                if(GV.camsmootherenable){
                                                    GV.camsmootherenable = false;
                                                    break;
                                                }
                                                GV.camsmootherenable = true;
                                                break;
                                            case "true":
                                                GV.camsmootherenable = true;
                                                break;
                                            case "false":
                                                GV.camsmootherenable = false;
                                                break;
                                            case "state":
                                                alert("Camera lock = false");
                                                break;
                                            case "help":
                                                alert("Command possible state :\n    -true\n    -false\nThe command camera lock, lock the camera at the current player position.");
                                                break;
                                            default:
                                                alert("Syntax error, you must write : \n    -camera lock\n    -camera lock true\n    -camera lock false\n    -camera lock state : (give you the state of the command)");
                                                break;
                                        }    
                                        break;
                                    case "help":
                                        alert("Complete with smoother or lock, \nthen add help after smoother or lock.");
                                        break;
                                    default:
                                        alert("Syntax error, you must write : \n    -camera lock\n    -camera smoother");
                                        break;
                                }
                                break;
                            case "log_text":
                                switch(this.command_word_list[1]){
                                    case "":
                                        if(GV.stroking_text){
                                            GV.stroking_text = false;
                                            break;
                                        }
                                        GV.stroking_text = true;
                                        break;
                                    case "normal":
                                        GV.stroking_text = true;
                                        break;
                                    case "fast":
                                        GV.stroking_text = false;
                                        break;
                                    case "state":
                                        if(GV.stroking_text){
                                            alert("log text display mode = Normal");
                                            break;
                                        }
                                        alert("log text display mode = Fast");
                                        break;
                                        
                                    case "help":
                                        alert("Command possible state :\n    -normal\n    -fast\nThe command hide the stroke of text to improve performance.");
                                        break;
                                    default:
                                        alert("Syntax error, you must write : \n    -log_text\n    -log_text normal\n    -log_text fast\n    -log_text state : (give you the state of the command)");
                                        break;
                                }    
                                break;
                            case "reset":
                        
                                break;
                            case "rick":
                                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank');
                                break;
                            case "help":
                                alert("All avaible command : \n(To have more information about a command put the name of the command and help after)\n(Example : devmode help)\n    -devmode\n    -godmode\n    -reset\n");
                                break;
                            default:
                                alert("invalid command");
                                break;
                              
                        }
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