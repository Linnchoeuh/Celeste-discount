import {Tools} from "../main.js";
import {Timer_Log} from "./tools.js";

function texture_loader(path)
{
    var texture = new Image();
    texture.src = path;
    return texture;
}

class PlayerData
{
    constructor()
    {
        this.PhysicsLoop = new Timer_Log();
        this.DisplayLoop = new Timer_Log();
        this.physics_loop_log = 0;
        this.display_loop_log = 0;
        
        this.playerX = 0;
        this.playerY = 0;
        this.previousplayerX = 0;
        this.previousplayerY = 0;
        this.jump = false;
        this.jumpavaiblelity = true;
        this.releasejump = false;
        this.jumpcount = 0;
        this.left = true;
        this.right = true;
        this.walljump = 0;
        this.walljumpcheck = false;
        
        
        this.lastdirection = 1;
        this.cachedata;
        this.lastactwalljump = false;
        
        this.dashcount = 0; //(Ne pas toucher)
        this.dashcooldown = 0; //(Ne pas toucher)
        this.dashbuttonrelease = true; //Oblige le joueur a relacher la touche du dash entre chaque dash
        this.dashspeed = 36; //Permet d'ajuster la vitesse du dash par frame (valeures admises [0;+inf[)
        this.dashduration = 10; //Permet d'ajuster durée en nombre de frame du dash (valeures admises [0;+inf[)
        this.dashcooldownmax = 30; //Permet d'empècher de dash a l'infini (valeures admises [0;+inf[)
        this.dashend = 10; //choisir la vitesse du joeur a la fin du dash (valeures admises [0;70])
        

        // this.speed; //Permet juste de stocker un calcul pour la vitesse (Ne pas toucher)
        

        this.jumpforce = 35; //Puissance du saut (valeures admises ]0;+inf[)
        this.jumptolerance = -10; //Permet de sauter un peu après ne plus avoir touché le block (valeures admises ]-inf;0])
        this.jumpattenuation = 1.5; // Vitesse a laquelle le joueur ralenti dans ca monté lorsque la touche saut est relaché avant son apogé 
                                    // (valeures admises [1;+inf[) plus la valeure est vers l'inf plus le ralentissement sera prononcé
        
        this.maxcurrentvelocity; //La fameuse (Ne pas toucher)
        this.currentacceleration;
        this.groundacceleration = 1.5;
        this.aerialacceleration = 0.5;
        this.maxgroundvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est au sol (valeures admises [0;70]) 0 équivaut a pas déplacment au sol
        this.maxaerialvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est en chute libre (valeures admises [0;70]) 0 équivaut a pas déplacment en l'air
        this.aerialmoving = 0.5; //Pour pouvoir se diriger dans les airs, si la valeure est trop élevé on peut faire des walljump sur un seul mur mdr 
                                //(valeures admises [0;+inf[) 0 équivaut a pas déplacment en l'air
        
        this.wallleavemax = 5; //Nombre de frame requise pour quitter un mur lorsque qu'on est en position pour faire un walljump (valeures admises ]0;+inf[)
        this.wallleave = this.wallleavemax+1; //(Ne pas toucher)
        this.walljumpx = 15; //(valeures admises [0;70]) 0 équivaut a pas déplacment horizontal
        this.walljumpy = 35; //(valeures admises [0;70]) 0 équivaut a pas déplacment vertical
        this.walljumpslide = 4; //Vitesse de chute lorsque que le personnage est en position pour walljump (valeures admises [0;70]) 0 équivaut a pas de chute

        this.groundfriction = 0.8; //Ralentissement de la vitesse joueur lorsqu'il est au sol (valeures admises ]0;+inf[)
        this.airfriction = 0.2; //Ralentissement de la vitesse joueur lorsqu'il est en l'air (valeures admises ]0;+inf[)
        
        
        this.gravity = 3; //Permet d'ajuster la vitesse de chute du joueur (valeures admises ]0;70])
        this.maxgravityspeed = 20; //Permet de donner une vitesse de chute max (ne jamais dépasser 70px/frame) (valeures admises ]0;70])



        //Variables d'animations du joueur
        this.initial_pose = texture_loader("graphics/player/initial_pose/initial_pose.png");
        
        this.animationmoving = false;
        this.moving = texture_loader("graphics/player/moving/moving.png");
        this.movingrightframetiminglist = [0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5];
        this.movingrightframe = 0;
        this.movingleftframetiminglist = [6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 10, 11, 11];
        this.movingleftframe = 0;
        this.movingframetiminglistlen = this.movingrightframetiminglist.length;
        this.wall_slide = texture_loader("graphics/player/wall_slide/wall_slide.png");
        
        this.verticaldirection = -1;
        this.falling = texture_loader("graphics/player/falling/falling.png");
        this.fallingrightframetiminglist = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
        this.fallingleftframetiminglist = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
        this.fallingframe = 0;
        this.fallingframetiminglistlen = this.fallingrightframetiminglist.length;

        this.ground_slideposition = 0;
        this.ground_slide = texture_loader("graphics/player/ground_slide/ground_slide.png");

        this.jumpframe = 0;
        this.jump_animation_postion = 0;
        this.jumprightframetiminglist = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
        this.jumpleftframetiminglist = [4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
        this.jump_animation = texture_loader("graphics/player/jump/jump.png");
        this.jumpframetiminglistlen = this.jumprightframetiminglist.length;

        this.dashaanimation = texture_loader("graphics/player/dash/dash.png");

        // collisions[0] = en dessous
        // collisions[1] = au dessus
        // collisions[2] = a ca gauche
        // collisions[3] = a ca droite
        // collisions[4] = pré en dessous
        // collisions[5] = pré au dessus
        // collisions[6] = pré a ca gauche
        // collisions[7] = pré a ca droite

        // input[0] = z
        // input[1] = q
        // input[2] = s
        // input[3] = d
        // input[4] = space
        // input[5] = maj
        // input[6] = p  (reservé)
        // input[7] = c  (reservé)
        // input[8] = enter
        // input [9] = escape (reservé)


    }

    spawn(coords)
    {
        this.playerX = coords[0];
        this.playerY = coords[1]-1;
    }

    velocity(input, vx, vy, godmode, collisions, offsetX_on, offsetY_on, distanceground, pause)
    {
        this.PhysicsLoop.startTime()
        vy = -vy;
        if(pause === false)
        {     
            this.ground_slideposition = 0;
            this.jump_animation_postion = 0;
            if(godmode === false)
            {
                if(this.wallleave >= this.wallleavemax) //moving
                {   
                    if(input[1] != input[3])
                    {
                        this.animationmoving = true;
                        switch(collisions[0])
                        {
                            case 0:
                                this.maxcurrentvelocity = this.maxaerialvelocity;
                                this.currentacceleration = this.aerialacceleration;
                                break
                            case 1:
                                this.maxcurrentvelocity = this.maxgroundvelocity;
                                this.currentacceleration = this.groundacceleration;
                                break
                        }
                    }
                    else
                    {
                        this.maxcurrentvelocity = 0;
                        this.animationmoving = false;
                    }
                    
                    if(this.dashcount === 0) //no move
                    {
                        
                        if(vx > 0 || collisions[3] === 1) //Ralenti si le perso allait a droite
                        {
                            switch(collisions[0])
                            {
                                case 1:
                                    vx -= this.groundfriction;
                                    
                                    if(input[1] === 1 & collisions[3] === 0)
                                    {
                                        this.ground_slideposition = -1;
                                    }
                                    break;
                                case 0:
                                    vx -= this.airfriction;
                                    if(input[1] === 1)
                                    {
                                        vx -= this.aerialmoving;
                                    }
                                    break;
                            }
                            if(vx < 0 || collisions[3] === 1)
                            {
                                vx = 0;
                            }
                        }
                        else if(vx < 0 || collisions[2] === 1) //Ralenti si le perso allait a gauche
                        {
                            switch(collisions[0])
                            {
                                case 1:
                                    vx += this.groundfriction;
                                    if(input[3] === 1 & collisions[2] === 0)
                                    {
                                        this.ground_slideposition = 1;
                                    }
                                    break;
                                case 0:
                                    vx += this.airfriction;
                                    if(input[3] === 1)
                                    {
                                        vx += this.aerialmoving;
                                    }
                                    break;
                            }
                            if(vx > 0 || collisions[2] === 1)
                            {
                                vx = 0;
                            }
                        }
                    }

                    if(input[3] === 1 && input[1] === 0 && collisions[0] === 1 || vx > 0 && collisions[0] === 0) //moving right
                    {
                        this.lastdirection = 1;
                    }
                    else if(input[1] === 1 && input[3] === 0 && collisions[0] === 1 || vx < 0 && collisions[0] === 0)
                    {
                        this.lastdirection = -1;
                    }
                    if     (input[3] === 1 & input[1] === 0 & vx >= 0 & collisions[3] === 0 & vx < this.maxcurrentvelocity) //moving right
                    {
                        this.speed = vx += this.currentacceleration;
                        if(vx > this.maxcurrentvelocity)
                        {
                            this.speed = vx = this.maxcurrentvelocity;
                        }

                    }
                    else if(input[1] === 1 & input[3] === 0 & vx <= 0 & collisions[2] === 0 & vx > -this.maxcurrentvelocity) //moving left
                    {
                        this.speed = vx -= this.currentacceleration;
                        if(vx < -this.maxcurrentvelocity)
                        {
                            this.speed = vx = -this.maxcurrentvelocity;
                        }
                    }
                    

                }
                
                if(input[4] === 1 & collisions[1] === 0 & this.walljump === 0 & this.releasejump === true & this.jump === true | vy >= this.jumptolerance & this.releasejump === true & input[4] === 1 & this.walljump === 0 & this.jumpavaiblelity === true) //jump
                {
                    vy = this.jumpforce;
                    this.releasejump = false;
                    this.jump_animation_postion = 1;
                    this.jumpavaiblelity = false
                    this.walljumpcheck = false;
                }
                else if(vy > 0)
                {
                    this.jump_animation_postion = 2;
                }

                if(input[4] === 0 & this.walljumpcheck === false) //block the walljump if the spacebar was not released when the player touch the wall
                {
                    this.walljumpcheck = true;
                }
                if(collisions[0] === 0 & vy <= 0 | this.lastactwalljump === true) //walljump
                {
                    if(collisions[2] === 1 & distanceground > 71 | collisions[2] === 1 & distanceground === false) //left
                    {
                        this.walljump = -1;
                    }
                    else if(collisions[3] === 1 & distanceground > 71 | collisions[3] === 1 & distanceground === false) //right
                    {
                        this.walljump = 1;
                    }
                    else //nothing
                    {
                        this.walljump = 0;
                        this.wallleave = this.wallleavemax;
                    }
                    if(this.walljump != 0)
                    {
                        if(this.walljump === 1 | this.walljump === -1)
                        {
                            vy = -this.walljumpslide;
                            this.jump = false;
                        }
                        if(input[1] === 1 | input[3] === 1)
                        {
                            this.wallleave += 1;
                            if(input[3] === 1)
                            {
                                this.lastdirection = 1;
                            }
                            else if(input[1] === 1)
                            {
                                this.lastdirection = -1;
                            }
                        }
                        else
                        {
                            this.wallleave = 0;
                        }
                        
                        if(this.walljumpcheck === true & collisions[0] === 0 & collisions[1] === 0 & input[4] === 1)
                        {
                            vx = -this.walljump*this.walljumpx;
                            vy = this.walljumpy;
                            this.lastdirection = -this.walljump*1;
                            
                            this.jump = false;
                            this.walljump = 0;
                            this.walljumpcheck = false;
                            this.wallleave = this.wallleavemax;
                            this.dashcooldown = this.dashcooldownmax;
                            this.lastactwalljump = true;
                        }
                    }
                    else if(this.walljump != 1 & this.walljump != -1)
                    {
                        this.wallleave = this.wallleavemax;
                        this.jump = false;
                    }
                }
                
                if(this.dashbuttonrelease === false & input[5] === 0) // dash
                {
                    this.dashbuttonrelease = true;
                }
                if(this.dashcooldown === 0 & this.lastactwalljump === false)
                {    
                    if(input[5] === 1 & this.dashbuttonrelease === true | this.dashcount != 0)
                    {
                        if(this.dashcount === 0)
                        {
                            this.dashbuttonrelease = false;
                        }
                        this.dashcount += 1
                        if(this.dashcount >= this.dashduration | collisions[2] === 1 & vx < 0 | collisions[3] === 1 & vx > 0)
                        {
                            vx = this.dashend*this.lastdirection;
                            vy = 0;
                            this.dashcooldown = this.dashcooldownmax;
                            this.dashcount = 0;
                        }
                        else
                        {
                            vx = this.dashspeed*this.lastdirection;
                            vy = 0;
                        }    
                    }
                }
                if(this.dashcooldown > 0)
                {
                    this.dashcooldown -= 1;
                }

                if(collisions[0] === 0 & this.walljump === 0 & this.dashcount === 0) //gravity
                {
                    if(collisions[1] === 1)
                    {
                        vy = 0;
                        this.jump = false;
                    }
                    if(input[4] === 0 & vy > 0 & this.lastactwalljump === false)
                    {
                        vy /= this.jumpattenuation;
                        this.jump = false;
                    }
                    if(-this.maxgravityspeed < vy)
                    {
                        vy -= 2;
                    }
                }

                if(collisions[0] === 1 & this.jump === false)
                {
                    vy = 0;
                    this.wallleave = this.wallleavemax;
                    this.jump = true;
                    this.lastactwalljump = false;
                    this.jumpavaiblelity = true;
                    
                }
                if(input[4] === 0)
                {
                    this.releasejump = true;
                }
                
            }
            else //movement in godmode
            {    
                if(input[8] === 1)
                {
                    if(input[0] === 1 & collisions[1] === 0 & input[2] === 0) //up
                    {
                        vy = 1;
                    }
                    else if(input[2] === 1 & collisions[0] === 0) //down
                    {
                        vy = -1;
                    }
                    else //neutral y
                    {
                        vy = 0;
                    }
                    if(input[3] === 1 & collisions[3] === 0) //right
                    {
                        vx = 1;
                    }
                    else if(input[1] === 1 & collisions[2] === 0 & input[3] === 0) //left
                    {
                        vx = -1;
                    }
                    else //neutral x
                    {
                        vx = 0;
                    }
                }
                else if(input[5] === 1)
                {
                    if(input[0] === 1 & collisions[1] === 0 & input[2] === 0) //up
                    {
                        vy = 25;
                    }
                    else if(input[2] === 1 & collisions[0] === 0) //down
                    {
                        vy = -25;
                    }
                    else //neutral y
                    {
                        vy = 0;
                    }
                    if(input[3] === 1 & collisions[3] === 0) //right
                    {
                        vx = 25;
                    }
                    else if(input[1] === 1 & collisions[2] === 0 & input[3] === 0) //left
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
                    if(input[0] === 1 & collisions[1] === 0 & input[2] === 0) //up
                    {
                        vy = 10;
                    }
                    else if(input[2] === 1 & collisions[0] === 0) //down
                    {
                        vy = -10;
                    }
                    else //neutral y
                    {
                        vy = 0;
                    }
                    if(input[3] === 1 & collisions[3] === 0) //right
                    {
                        vx = 10;
                    }
                    else if(input[1] === 1 & collisions[2] === 0 & input[3] === 0) //left
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
                this.playerY -= vy;
            }
        }
        this.physics_loop_log = this.PhysicsLoop.endLogTime();
        return [vx,-vy];
    }
    
    display(collisions, pause, dt, camsmootherX, camsmootherY, px, py)
    {
        this.DisplayLoop.startTime();
        switch(this.walljump)
        {
            case 1:
                this.ctx.drawImage(this.wall_slide, 0, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                break;
            case -1:
                this.ctx.drawImage(this.wall_slide, 24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                break;
            case 0:
                switch(this.lastdirection)
                {
                    case 1:
                        if(this.dashcount === 0)
                        { 
                            if(collisions[0] === 1)
                            {    
                                if(this.animationmoving === true & collisions[3] === 0 & this.ground_slideposition === 0)
                                {       
                                    this.movingleftframe = 0;
                                    this.ctx.drawImage(this.moving, this.movingrightframetiminglist[Math.floor(this.movingrightframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.movingrightframe += 1/dt;
                                    }
                                    if(this.movingrightframe >= this.movingframetiminglistlen)
                                    {
                                        this.movingrightframe = 0;
                                    }
                                }
                                else if(this.ground_slideposition === 1)
                                {
                                    this.ctx.drawImage(this.ground_slide, 24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                                else
                                {
                                    this.movingrightframe = 0;
                                    this.ctx.drawImage(this.initial_pose, 24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                            }
                            else
                            {
                                if(this.verticaldirection === -1 & this.jump_animation_postion === 0)
                                {
                                    this.ctx.drawImage(this.falling, this.fallingrightframetiminglist[Math.floor(this.fallingframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.fallingframe += 1/dt;
                                    }
                                    if(this.fallingframe >= this.fallingframetiminglistlen)
                                    {
                                        this.fallingframe = 0;
                                    }
                                }
                                else if(this.jump_animation_postion === 1)
                                {
                                    this.jumpframe = 0;
                                    this.ctx.drawImage(this.jump_animation, 0, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                                else if(this.jump_animation_postion === 2)
                                {
                                    this.ctx.drawImage(this.jump_animation, this.jumprightframetiminglist[Math.floor(this.jumpframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.jumpframe += 1/dt;
                                    }
                                    if(this.jumpframe >= this.jumpframetiminglistlen)
                                    {
                                        this.jumpframe = 0;
                                    }
                                }
                            }
                        }
                        else
                        {
                            this.ctx.drawImage(this.dashaanimation, 0, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                        }
                        break
                    case -1:
                        if(this.dashcount === 0)
                        {    
                            if(collisions[0] === 1)
                            {
                                if(this.animationmoving === true & collisions[2] === 0 & this.ground_slideposition === 0)
                                {
                                    this.movingrightframe = 0;
                                    this.ctx.drawImage(this.moving, this.movingleftframetiminglist[Math.floor(this.movingleftframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.movingleftframe += 1/dt;
                                    }
                                    if(this.movingleftframe >= this.movingframetiminglistlen)
                                    {
                                        this.movingleftframe = 0;
                                    }
                                }
                                else if(this.ground_slideposition === -1)
                                {
                                    this.ctx.drawImage(this.ground_slide, 0, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                                else
                                {
                                    this.movingleftframe = 0;
                                    this.ctx.drawImage(this.initial_pose, 0, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                            }
                            else
                            {
                                if(this.verticaldirection === -1 & this.jump_animation_postion === 0)
                                {
                                    this.ctx.drawImage(this.falling, this.fallingleftframetiminglist[Math.floor(this.fallingframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.fallingframe += 1/dt;
                                    }
                                    if(this.fallingframe >= this.fallingframetiminglistlen)
                                    {
                                        this.fallingframe = 0;
                                    }
                                }
                                else if(this.jump_animation_postion === 1)
                                {
                                    this.jumpframe = 0;
                                    this.ctx.drawImage(this.jump_animation, 72, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                }
                                else if(this.jump_animation_postion === 2)
                                {
                                    this.ctx.drawImage(this.jump_animation, this.jumpleftframetiminglist[Math.floor(this.jumpframe)]*24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                                    if(pause === false)
                                    {
                                        this.jumpframe += 1/dt;
                                    }
                                    if(this.jumpframe >= this.jumpframetiminglistlen)
                                    {
                                        this.jumpframe = 0;
                                    }
                                }
                            }
                        }
                        else
                        {
                            this.ctx.drawImage(this.dashaanimation, 24, 0, 24, 24, Tools.resolutionScaler(px+camsmootherX), Tools.resolutionScaler(py+camsmootherY), Tools.resolutionScaler(71), Tools.resolutionScaler(71));
                        }
                        break
                }
                break
        }
        this.display_loop_log = this.DisplayLoop.endLogTime();
    }

    reset()
    {
        this.playerX = 0;
        this.playerY = 0;
        this.previousplayerX = 0;
        this.previousplayerY = 0;
        this.jump = false;
        this.jumpavaiblelity = true
        this.releasejump = false;
        this.jumpcount = 0;
        this.left = true;
        this.right = true;
        this.walljump = 0;
        this.walljumpcheck = false;
        
        
        this.lastdirection = 1;
        this.cachedata = [];
        this.lastactwalljump = false;
    }
}

export{PlayerData};