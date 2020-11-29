import {upscale} from "./ui.js";

var initial_pose_tab = []
var moving_tab = []


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
        
        
        this.jumpconststart = 55;
        this.jumpconst = 20;
        this.jumpcountmax = 14;
        this.maxvelocity = 9
        this.wallleavemax = 10

    }

    var_update(ctx)
    {
       this.ctx = ctx
    }

    spawn(coords)
    {
        this.playerX = coords[0];
        this.playerY = coords[1]-1;
    }

    velocity(input, vx, vy, godmode, collisions, offsetX_on, offsetY_on, distanceground, pause)
    {
        vy *= -1  
        if(godmode == false)
        {
            if(this.walljump != 2 & this.walljump != -2 & this.wallleave >= this.wallleavemax)
            {   
                this.speed = Math.round(1+this.maxvelocity - (this.maxvelocity / (Math.sqrt(vx**2)+1)))
                if(input[3] == 1 & input[1] == 0 & vx >= 0 & collisions[3] == 0) //moving right
                {
                    this.lastdirection = 1
                    if(vx <= this.maxvelocity)
                    {   
                        vx = this.speed
                    }
                }
                else if(input[1] == 1 & vx <= 0 & input[3] == 0 & collisions[2] == 0) //moving left
                {
                    this.lastdirection = 0
                    if(vx >= -this.maxvelocity)
                    {   
                        vx = -this.speed
                    }
                }
                else if(this.dash == false) //no move
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
            }
            
            if(input[4] == 1 & collisions[1] == 0 & this.jumpcount <= this.jumpcountmax & vy >= 0) //jump
            {
                this.jump = true
                switch(vy)
                {
                    case 0:
                        if(this.releasejump == true)
                        {
                            vy = this.jumpconststart;
                        }
                        break
                    case this.jumpconststart:
                        vy = this.jumpconst;
                        break
                    case this.jumpconst:
                        if(this.jumpcount >= this.jumpcountmax)
                        {
                            this.jump = false
                            vy = 0;
                            this.releasejump = false
                        }
                        this.jumpcount += 1
                        break
                }

            }
            else if(input[4] == 0 & this.jump == true & this.jumpcount <= this.jumpcountmax | collisions[1] == 1 & this.jump == true & this.jumpcount <= this.jumpcountmax)
            {
                this.jump = false;
                vy = 0;
                this.jumpcount = 15;
                this.releasejump = false;
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
                    this.wallleave = this.wallleavemax;
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
                        if(input[3] == 1)
                        {
                            this.lastdirection = 1;
                        }
                        else if(input[1] == 1)
                        {
                            this.lastdirection = 0;
                        }
                    }
                    else
                    {
                        this.wallleave = 0;
                    }
                    if(input[4] == 0 & this.walljumpcheck == false) //block de walljump if the spacebar was not released when the player touch the wall
                    {
                        this.walljumpcheck = true;
                    }
                    else if(this.walljumpcheck == true)
                    {  
                        if(collisions[0] == 0 & collisions[1] == 0)
                        {    
                            if(input[4] == 1 | this.walljump == 2 | this.walljump == -2)
                            {
                                if(this.walljump == 1)
                                {
                                    this.walljump = 2;
                                    vx = 0;
                                    vy = 0;
                                    this.jumpcount = this.jumpcountmax;
                                }
                                else if(this.walljump == -1)
                                {
                                    this.walljump = -2;
                                    vx = 0;
                                    vy = 0;
                                    this.jumpcount = this.jumpcountmax;
                                }
                                if(vx == 0 & vy == 0 | collisions[2] == 0 & this.walljump == 2 | collisions[3] == 0 & this.walljump == -2)
                                {
                                    vx = Math.sqrt(vx**2)
                                    switch(vy)
                                    {
                                        case 0:
                                            vx = 15;
                                            vy = 50;
                                            break
                                        case 50:
                                            vy = 40;
                                            break
                                        case 40:
                                            vy = 30;
                                            break
                                        case 30:
                                            vy = 25;
                                            break
                                        case 25:
                                            vy = 20;
                                            break
                                        case 20:
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
                                            this.wallleave = this.wallleavemax;
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
                                    this.wallleave = this.wallleavemax;
                                }
                            }
                        }
                        else
                        {
                            vy = 0;
                            this.walljump = 0;
                            this.walljumpcheck = false;
                            this.wallleave = this.wallleavemax;
                        }
                    }
                }
                else if(this.walljump != 1 & this.walljump != -1)
                {
                    if(vy > 0)
                    {
                        vy = 0;
                    }
                    this.walljumpcheck = false;
                    this.wallleave = this.wallleavemax;
                    this.jump = false;
                }
            }
            if(this.dashbuttonrelease == false & input[5] == 0)
            {
                this.dashbuttonrelease = true
            }
            if(input[5] == 1 & collisions[3] == 0 & collisions[2] == 0 & this.dashcooldown <= 0 & this.dashbuttonrelease == true | this.dash == true & this.dashcooldown <= 0 & this.dashbuttonrelease == true) //dash
            {
                if(this.dash == false)
                {
                    this.dash = true
                    vx = 151;
                }
                switch(Math.sqrt(vx**2))
                {
                    case 151:
                        vx = 150;
                        break
                    case 150:
                        vx = 149;
                        break
                    case 149:
                        vx = 0;
                        vy = 0;
                        this.dash = false;
                        this.dashcooldown = 30;
                        this.dashbuttonrelease = false
                        break
                }
                vx = -vx*(1-(2*this.lastdirection))
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
                this.wallleave = this.wallleavemax;
                
            }
            if(input[4] == 0)
            {
                this.releasejump = true
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
    
    player_animatic(input, collisions, offsetx, offsety, offsetX_on, offsetY_on, camsmoother, pause)
    {
        this.ctx.drawImage(initial_pose_tab[0], upscale(this.playerX+camsmoother[0]), upscale(this.playerY+camsmoother[1]), upscale(71), upscale(71));
    }
}

export{PlayerData}