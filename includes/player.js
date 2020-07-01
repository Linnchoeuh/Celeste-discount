import {upscale} from "./ui.js";

var initial_pose_tab = []
var moving_tab = []
var ctx;
var pause;

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
        this.speed = 6;
    }

    spawn(x,y)
    {
        this.playerX = x*48;
        this.playerY = y*48;
    }

    moving(input, collisions)
    {
        if(input[3] == 1 | pause == true & input[3] == 1)
        {
            this.orientation = "right";
            if(collisions[1] == 0)
            {
                ctx.drawImage(moving_tab[this.moveright], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
                if(pause == false)
                {    
                    this.playerX += this.speed;
                    this.moveright++;
                    if(this.moveright > 5)
                    {
                        this.moveright = 0;
                    }
                }
            }
            else
            {
                ctx.drawImage(initial_pose_tab[0], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
            }
        }
        else
        {
            this.moveright = 0;
        }
        if(input[1] == 1 & input[3] == 0 | pause == true & input[1] == 1 & input[3] == 0)
        {
            this.orientation = "left";
            if(collisions[2] == 0)    
            {
                ctx.drawImage(moving_tab[this.moveleft+6], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
                if(pause == false)
                {
                    this.playerX -= this.speed;
                    this.moveleft++;
                    if(this.moveleft > 5)
                    {
                        this.moveleft = 0;
                    }
                }
            }
            else
            {
                ctx.drawImage(initial_pose_tab[13], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
            }
        }
        else
        {
            this.moveleft = 0;
        }
        if(input[3] != 1 & input[1] != 1 & input[0] != 1 | pause == true & input[3] != 1 & input[1] != 1 & input[0] != 1)
        {
            if(this.orientation == "right")
            {    
                ctx.drawImage(initial_pose_tab[0], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
            }
            else
            {
                ctx.drawImage(initial_pose_tab[13], upscale(this.playerX), upscale(this.playerY), upscale(48), upscale(48));
            }
        }
    }

    gravity(jumpinput, collisions)
    {
        if(pause == false)    
        {
            if(jumpinput[4] == 1 & this.jumplock == false & collisions[3] == 0)
            {
                if(this.jump == 0)
                {
                    this.jump = 12
                }
                else if(this.jump != 0 & this.jump > 5)    
                {    
                    this.jump -= 0.3;
                }
                else if(this.jump <= 5)
                {
                    this.jump -= 1;
                }
                if(this.jump < 0)
                {
                    this.jumplock = true;
                }
            }
            else if(collisions[0] == 0 | this.jumplock == true & collisions[0] == 0 | collisions[3] == 1)
            {
                if(collisions[3] == 1)
                {
                    this.jump = -2
                }
                if(this.jump > -15)
                {
                    this.jump -= 1;
                }
            }
            else
            {
                this.jump = 0;
                this.playerY = 48 * (Math.round(this.playerY / 48))
                if(jumpinput[4] == 0)
                {    
                    this.jumplock = false;
                }
            }
            this.playerY -= this.jump;
        }
    }

}

console.log(initial_pose_tab)
console.log(moving_tab)
export{PlayerData, player_var_getter}