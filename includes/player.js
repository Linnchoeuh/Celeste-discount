import { offsetX_on } from "./level_reader.js";
import {upscale} from "./ui.js";

var initial_pose_tab = []
var moving_tab = []
var ctx;
var pause;
var space_pressed = false;
var jumpframecount = 0;

function player_var_getter(vartarg, varcont)
{
    switch(vartarg)
    {
        case "ctx":
            ctx = varcont;
            break
        case "pause":
            pause = varcont;
            break
    }
}

function texture_loader(path)
{
    var texture = new Image();
    texture.src = path
    return texture
}
for(let i = 1; i < 5; ++i)
{
    initial_pose_tab.push(texture_loader("graphics/player/initial_pose/initial_pose_right"+i+".png")) 
}
for(let i = 1; i < 10; ++i)
{
    initial_pose_tab.push(texture_loader("graphics/player/initial_pose/initial_pose_blinking"+i+".png")) 
}
for(let i = 1; i < 5; ++i)
{
    initial_pose_tab.push(texture_loader("graphics/player/initial_pose/initial_pose_left"+i+".png")) 
}
for(let i = 1; i < 10; ++i)
{
    initial_pose_tab.push(texture_loader("graphics/player/initial_pose/initial_pose_blinking_left"+i+".png")) 
}

for(let i = 1; i < 7; ++i)
{
    moving_tab.push(texture_loader("graphics/player/moving/moving_right"+i+".png")) 
}
for(let i = 1; i < 7; ++i)
{
    moving_tab.push(texture_loader("graphics/player/moving/moving_left"+i+".png")) 
}

class PlayerData
{
    constructor()
    {
        this.moveright = 0;
        this.moveleft = 0;
        this.jump = 0;
        this.jumplock = false;
        this.orientation = "right";
        this.playerX = 0;
        this.playerY = 0;
        this.speedX = 0;
    }

    spawn(x,y)
    {
        this.playerX = x*71;
        this.playerY = y*71;
    }

    velocity(input, vx, vy, godmode, collisions, offsetX_on, offsetY_on, bestup, bestdown, bestleft, bestright)
    {
        vx = Math.sqrt(vx**2)
        vy *= -1
        if(godmode == true)
        {    
            if(input[0] == 1)
            {
                vy = 10
            }
            else if(input[2] == 1)
            {
                vy = -10
            }
            else
            {
                vy = 0
            }
        }
        if(this.playerX < -12)
        {
            this.playerX = -12
        }
        if(this.playerX > 1145)
        {
            this.playerX = 1145
        }
        if(input[3] == 1 & this.playerX < 1145 | input[1] == 1 & this.playerX > -12)
        {
            switch(vx)
            {
                case 0:
                    vx = 2
                    break
                case 2:
                    vx = 4
                    break
                case 4:
                    vx = 8
                    break
                case 8:
                    vx = 12
                    break
            }
            if(input[1] == 1 & input[3] != 1)
            {
                vx *= -1
            }
        }
        else
        {
            vx = 0
        }
        if(godmode == false)
        {
            if(input[4] == 1 & vy != 20 & vy >= 0 & collisions[0] == 1 & space_pressed == false | vy == 50)
            {
                space_pressed = true;
                switch(vy)
                {
                    case 0:
                        vy = 50;
                        break
                    case 50:
                        vy = 20;
                        break
                }
            }
            else if(jumpframecount < 13 & input[4] == 1)
            {
                jumpframecount += 1;
            }
            else if(collisions[0] == 1)
            {
                space_pressed = false;
                jumpframecount = 0;
                vy = 0;
            }
            else if(input[4] == 0 & space_pressed == true & collisions[0] == 0 | vy == 25 & jumpframecount == 10 & collisions[0] == 0 | vy < 0 & collisions[0] == 0 | collisions[0] == 0)
            {
                switch(vy)
                {
                    case -2:
                        vy = -4;
                        break
                    case -4:
                        vy = -8;
                        break
                    case -8:
                        vy = -16;
                        break
                    case -16:
                        vy = -20
                        break
                    case -20:
                        break
                    default:
                        vy = -2;
                        break
                }
            }
        }
        this.speedX = vx
        this.speedY = vy
        return [vx,-vy]
    }
    
    player_animatic(input, offsetx, offsety, offsetX_on, offsetY_on)
    {
        if(offsetX_on == 0)
        {
            this.playerX = 576
        }
        else
        {
            this.playerX += this.speedX
        }
        if(offsetY_on == 0)
        {
            this.playerY = 324
        }
        else
        {
            this.playerY -= this.speedY
        }
        ctx.drawImage(initial_pose_tab[0], upscale(this.playerX), upscale(this.playerY), upscale(71), upscale(71));
    }
}

console.log(initial_pose_tab)
console.log(moving_tab)
export{PlayerData, player_var_getter}