// import { offsetX_on } from "./level_reader.js";
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
        this.playerX = 0;
        this.playerY = 0;
        this.moveright = 0;
        this.moveleft = 0;
        this.jump = false;
        this.releasejump = false
        this.jumpcount = 0;
        this.jumplock = false;
        this.orientation = "right";
        this.playerX = 0;
        this.playerY = 0;
        this.left = true;
        this.right = true;
        this.walljump = 0
        this.walljumpcheck = false
        this.wallleave = 30
        this.dash = false
        this.dashcooldown = 0
        this.dashbuttonrelease = true
        this.lastdirection = 1
    }

    spawn(coords)
    {
        this.playerX = coords[0];
        this.playerY = coords[1]-1;
    }

    velocity(input, vx, vy, godmode, collisions, offsetX_on, offsetY_on, distanceground)
    {
        vy *= -1  
        if(godmode == false)
        {
            if(input[3] == 1 & vx >= 0 & collisions[3] == 0 & this.walljump != 2 & this.walljump != -2 & this.wallleave >= 10) //moving right
            {
                this.lastdirection = 1
                console.log("oui")
                switch(Math.round(vx))
                {
                    case 0:
                        vx = 1;
                        break
                    case 1:
                        vx = 2;
                        break
                    case 2:
                        vx = 3;
                        break
                    case 3:
                        vx = 4;
                        break
                    case 4:
                        vx = 6;
                        break
                    case 5:
                        vx = 6;
                        break
                    case 6:
                        vx = 8;
                        break
                    case 7:
                        vx = 8;
                        break
                    case 8:
                        vx = 10;
                        break
                    case 9:
                        vx = 10;
                        break
                    case 10:
                        vx = 12;
                        break
                    case 11:
                        vx = 12;
                        break
                    case 12:
                        vx = 12;
                        break
                }
            }
            else if(input[1] == 1 & vx <= 0 & input[3] == 0 & collisions[2] == 0 & this.walljump != 2 & this.walljump != -2 & this.wallleave >= 10) //moving left
            {
                this.lastdirection = 0
                switch(Math.round(vx))
                {
                    case 0:
                        vx = -1;
                        break
                    case -1:
                        vx = -2;
                        break
                    case -2:
                        vx = -3;
                        break
                    case -3:
                        vx = -4;
                        break
                    case -4:
                        vx = -6;
                        break
                    case -5:
                        vx = -6;
                        break
                    case -6:
                        vx = -8;
                        break
                    case -7:
                        vx = -8;
                        break
                    case -8:
                        vx = -10;
                        break
                    case -9:
                        vx = -10;
                        break
                    case -10:
                        vx = -12;
                        break
                    case -11:
                        vx = -12;
                        break
                    case -12:
                        vx = -12;
                        break
                }
            }
            else if(this.walljump != 2 & this.walljump != -2 & this.dash == false) //no move
            {
                if(vx > 0  | collisions[3] == 1)
                {
                    switch(collisions[0])
                    {
                        case 1:
                            vx -= 8;
                            break
                        case 0:
                            vx -= 0.3;
                            break
                    }
                    if(collisions[0] == 0 & input[1] == 1 & input[3] == 0)
                    {
                        vx -= 2;
                    }
                    if(vx < 0)
                    {
                        vx = 0;
                    }
                }
                if(vx < 0 | collisions[2] == 1)
                {
                    switch(collisions[0])
                    {
                        case 1:
                            vx += 4;
                            break
                        case 0:
                            vx += 0.3;
                            break
                    }
                    if(collisions[0] == 0 & input[3] == 1)
                    {
                        vx += 2;
                    }
                    if(vx > 0)
                    {
                        vx = 0;
                    }
                }
            }
            if(input[4] == 1 & collisions[1] == 0 & this.jumpcount <= 14 & vy >= 0) //jump
            {
                this.jump = true
                switch(vy)
                {
                    case 0:
                        if(this.releasejump == true)
                        {
                            vy = 55;
                        }
                        break
                    case 55:
                        vy = 20;
                        break
                    case 20:
                        if(this.jumpcount >= 14)
                        {
                            this.jump = false
                            vy = 0;
                            this.releasejump = false
                        }
                        this.jumpcount += 1
                        break
                }

            }
            else if(input[4] == 0 & this.jump == true & this.jumpcount <= 14 | collisions[1] == 1 & this.jump == true & this.jumpcount <= 14)
            {
                this.jump = false;
                vy = 0;
                this.jumpcount = 15;
                this.releasejump = false
            }
            if(collisions[0] == 0 & vy <= 0 | this.walljump == 2 | this.walljump == -2) //walljump
            {
                if(this.walljump == 0 & collisions[2] == 1 | this.walljump == 0 & collisions[3] == 1)
                {
                    vx = 0;
                    this.wallleave = 0;
                    this.dash = false;
                }
                if(collisions[2] == 1 & this.walljump != 2 & this.walljump != -2 & distanceground > 71) //left
                {
                    this.walljump = -1;
                }
                else if(collisions[3] == 1 & this.walljump != 2 & this.walljump != -2 & distanceground > 71) //right
                {
                    this.walljump = 1;
                }
                else if(this.walljump != 2 & this.walljump != -2) //nothing
                {
                    this.walljump = 0;
                    this.walljumpcheck = false;
                    this.wallleave = 10;
                    if(vy == -5)
                    {
                        vy = 0;
                    }
                }
                if(this.walljump != 0)
                {
                    if(this.walljump == 1 | this.walljump == -1)
                    {
                        vy = -5;
                    }
                    if(input[1] == 1 | input[3] == 1)
                    {
                        this.wallleave += 1;
                    }
                    else
                    {
                        this.wallleave = 0;
                    }
                    if(input[4] == 0 & this.walljumpcheck == false) //block de walljump if the spacebar was not released when the player touch the wall
                    {
                        this.walljumpcheck = true;
                    }
                    if(this.walljumpcheck == true)
                    {
                        if(collisions[1] == 0)
                        {    
                            if(input[4] == 1 | this.walljump == 2 | this.walljump == -2)
                            {
                                if(this.walljump == 1)
                                {
                                    this.walljump = 2;
                                    vx = 0;
                                    vy = 0;
                                    this.jumpcount = 14;
                                }
                                else if(this.walljump == -1)
                                {
                                    this.walljump = -2;
                                    vx = 0;
                                    vy = 0;
                                    this.jumpcount = 14;
                                }
                                if(vx == 0 & vy == 0 | collisions[2] == 0 & this.walljump == 2 | collisions[3] == 0 & this.walljump == -2)
                                {
                                    vx = Math.sqrt(vx**2)
                                    switch(vy)
                                    {
                                        case 0:
                                            vx = 10;
                                            vy = 50;
                                            break
                                        case 50:
                                            vy = 49;
                                            break
                                        case 49:
                                            vy = 45;
                                            break
                                        case 45:
                                            vy = 35;
                                            break
                                        case 35:
                                            vy = 20;
                                            break
                                        case 20:
                                            vy = 15;
                                            break
                                        case 15:
                                            vy = 10;
                                            break
                                        case 10:
                                            vy = 0;
                                            if(this.walljump == 2)
                                            {
                                                vx *= -1
                                            }
                                            this.walljump = 0;
                                            this.walljumpcheck = false;
                                            this.wallleave = 10;
                                            break
                                    }
                                    if(this.walljump == 2)
                                    {
                                        vx = -1*vx
                                    }
                                }
                                else
                                {
                                    vx = 0;
                                    vy = 0;
                                    this.walljump = 0;
                                    this.walljumpcheck = false;
                                    this.wallleave = 10;
                                }
                            }
                        }
                        else
                        {
                            vy = 0;
                            this.walljump = 0;
                            this.walljumpcheck = false;
                            this.wallleave = 10;
                        }
                    }
                }
            }
            if(this.dashbuttonrelease == false & input[5] == 0)
            {
                this.dashbuttonrelease = true
            }
            if(input[5] == 1 & collisions[3] == 0 & collisions[2] == 0 & this.dashcooldown <= 0 & this.dashbuttonrelease == true | this.dash == true & this.dashcooldown <= 0 & this.dashbuttonrelease == true)
            {
                if(this.dash == false)
                {
                    this.dash = true
                    vx = 151;
                }
                vx = Math.sqrt(vx**2)
                switch(vx)
                {
                    case 151:
                        vx = 150;
                        break
                    case 150:
                        vx = 149;
                        break
                    case 149:
                        vx = 0;
                        this.dash = false;
                        this.dashcooldown = 30;
                        this.dashbuttonrelease = false
                        break
                }
                if(this.lastdirection == 0)
                {
                    vx *= -1
                }
            }
            else if(this.dash == true)
            {
                vx = 0
                this.dash = false
                this.dashbuttonrelease = false
            }
            else if(this.dashcooldown > 0)
            {
                this.dashcooldown -= 1
            }
            if(collisions[0] == 0 & this.jump == false & this.walljump == 0 & this.dash == false) //gravity
            {
                switch(vy)
                {
                    case 0:
                        vy = -2;
                        break
                    case -2:
                        vy = -8;
                        break
                    case -8:
                        vy = -16;
                        break
                    case -16:
                        vy = -20;
                        break
                    case -20:
                        vy = -20;
                        break
                }
            }
            else if(collisions[0] == 1 & this.jump == false)
            {
                vy = 0;
                this.jumpcount = 0;
                this.wallleave = 10;
                if(input[4] == 0)
                {
                    this.releasejump = true
                }
            }
            
        }
        else //movement in godmode
        {    
            if(input[8] == 1)
            {
                if(input[0] == 1 & collisions[1] == 0 & input[2] == 0) //up
                {
                    vy = 1;
                }
                else if(input[2] == 1 & collisions[0] == 0) //down
                {
                    vy = -1;
                }
                else //neutral y
                {
                    vy = 0;
                }
                if(input[3] == 1 & collisions[3] == 0) //right
                {
                    vx = 1;
                }
                else if(input[1] == 1 & collisions[2] == 0 & input[3] == 0) //left
                {
                    vx = -1;
                }
                else //neutral x
                {
                    vx = 0;
                }
            }
            else if(input[5] == 1)
            {
                if(input[0] == 1 & collisions[1] == 0 & input[2] == 0) //up
                {
                    vy = 25;
                }
                else if(input[2] == 1 & collisions[0] == 0) //down
                {
                    vy = -25;
                }
                else //neutral y
                {
                    vy = 0;
                }
                if(input[3] == 1 & collisions[3] == 0) //right
                {
                    vx = 25;
                }
                else if(input[1] == 1 & collisions[2] == 0 & input[3] == 0) //left
                {
                    vx = -25;
                }
                else //neutral x
                {
                    vx = 0;
                }
            }
            else
            {    
                if(input[0] == 1 & collisions[1] == 0 & input[2] == 0) //up
                {
                    vy = 10;
                }
                else if(input[2] == 1 & collisions[0] == 0) //down
                {
                    vy = -10;
                }
                else //neutral y
                {
                    vy = 0;
                }
                if(input[3] == 1 & collisions[3] == 0) //right
                {
                    vx = 10;
                }
                else if(input[1] == 1 & collisions[2] == 0 & input[3] == 0) //left
                {
                    vx = -10;
                }
                else //neutral x
                {
                    vx = 0;
                }
            }
        }
        
        if(offsetX_on != 0)
        {
            this.playerX += vx;
        }
        if(offsetY_on != 0)
        {
            this.playerY -= vy;;
        }
        return [vx,-vy]
    }
    
    player_animatic(input, collisions, offsetx, offsety, offsetX_on, offsetY_on)
    {
        
        ctx.drawImage(initial_pose_tab[0], upscale(this.playerX), upscale(this.playerY), upscale(71), upscale(71));
    }
}

// console.log(initial_pose_tab)
// console.log(moving_tab)
export{PlayerData, player_var_getter}