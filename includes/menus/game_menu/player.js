import { ctx, Tools, GV, Keyboard, Fps, GameMenu, Pause } from "../../../main.js";
import { Timer_Log } from "../../tools.js";
import { AnimationReader } from "./player_asset/animation_reader.js"

function texture_loader(path) {
    var texture = new Image();
    texture.src = path;
    return texture;
}

class Player_Data {
    constructor() {
        this.PhysicsLoop = new Timer_Log();
        this.DisplayLoop = new Timer_Log();
        this.physics_loop_log = 0;
        this.display_loop_log = 0;

        this.Position_ = {
            x: 0,
            y: 0,

            Previous_: {
                x: 0,
                y: 0
            },

            InterpolationValue_: {
                x: 0,
                y: 0
            },

            InterpoledValue_: {
                x: 0,
                y: 0
            }
        };

        this.Vector_ = {
            x: 0,
            y: 0
        };
        this.positionning_x = 0;
        this.positionning_y = 0;
        this.Vector_.x = 0;
        this.Vector_.y = 0;

        this.jump = false;
        this.jumpavaiblelity = true;
        this.releasejump = false;
        this.jumpcount = 0;
        this.walljump = 0;
        this.walljumpcheck = false;

        this.HitBox_ = {
            scaler: 0,
            resizer: 0,

            width: 10,
            horizontal_offset: 7,
            height: 22,
            vertical_offset: 2,

            top_side: 0,
            down_side: 0,
            left_side: 0,
            right_side: 0,

            horizontal_center: 0,
            vertical_center: 0,

            scaled_horizontal_offset: 0,
            scaled_vertical_offset: 0,

            scaled_top_side: 0,
            scaled_down_side: 0,
            scaled_left_side: 0,
            scaled_right_side: 0,

            scaled_width: 0,
            scaled_height: 0,
            scaled_horizontal_center: 0,
            scaled_vertical_center: 0,

            resized_width: 0,
            resized_height: 0,
            resized_horizontal_offset: 0,
            resized_vertical_offset: 0,

            resized_top_side: 0,
            resized_down_side: 0,
            resized_left_side: 0,
            resized_right_side: 0,

            resized_horizontal_center: 0,
            resized_vertical_center: 0
        };
        this.pre_player_scaling = 70;


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




        this.jumpforce = 30; //Puissance du saut (valeures admises ]0;+inf[)
        this.jumptolerance = 10; //Permet de sauter un peu après ne plus avoir touché le block (valeures admises ]-inf;0])
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
        this.wall_contact = 5; //(Ne pas toucher)
        this.walljumpx = 15; //(valeures admises [0;70]) 0 équivaut a pas déplacment horizontal
        this.walljumpy = 25; //(valeures admises [0;70]) 0 équivaut a pas déplacment vertical
        this.walljumpslide = 2; //Vitesse de chute lorsque que le personnage est en position pour walljump (valeures admises [0;70]) 0 équivaut a pas de chute

        this.groundfriction = 1; //Ralentissement de la vitesse joueur lorsqu'il est au sol (valeures admises ]0;+inf[)
        this.airfriction = 0.2; //Ralentissement de la vitesse joueur lorsqu'il est en l'air (valeures admises ]0;+inf[)


        this.gravity = 1.5; //Permet d'ajuster la vitesse de chute du joueur (valeures admises ]0;70])
        this.maxgravityspeed = 20; //Permet de donner une vitesse de chute max (ne jamais dépasser 70px/frame) (valeures admises ]0;70])



        //Variables d'animations du joueur
        this.is_wall_sliding = false;
        this.is_ground = false;
        this.is_slide = false;
        this.is_falling = false;
        this.is_start_jump = false;
        this.is_jump = false;
        this.is_moving = false;
        this.is_dash = false;


        this.InitialPose =  new AnimationReader("graphics/player/initial_pose/initial_pose.png", 
                                                 48, 24, 24);

        this.MovingRight =  new AnimationReader("graphics/player/moving/moving.png", 
                                                 288, 24, 24, 
                                                 [0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5]);
        this.MovingLeft =   new AnimationReader("graphics/player/moving/moving.png", 
                                                 288, 24, 24, 
                                                 [6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 10, 11, 11]);

        this.WallSlide =    new AnimationReader("graphics/player/wall_slide/wall_slide.png", 
                                                 48, 24, 24);

        this.FallingRight = new AnimationReader("graphics/player/falling/falling.png", 
                                                 96, 24, 24, 
                                                 [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]);

        this.FallingLeft =  new AnimationReader("graphics/player/falling/falling.png", 
                                                 96, 24, 24, 
                                                 [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]);

        this.GroundSlide =  new AnimationReader("graphics/player/ground_slide/ground_slide.png", 
                                                 48, 24, 24);

        this.JumpRight =    new AnimationReader("graphics/player/jump/jump.png", 
                                                 48, 24, 24, 
                                                 [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]);

        this.JumpLeft  =    new AnimationReader("graphics/player/jump/jump.png", 
                                                 48, 24, 24, 
                                                 [4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5]);

        this.Dash =         new AnimationReader("graphics/player/dash/dash.png", 
                                                 48, 24, 24);

        this.godmode_speed_vector = 10;
    }

    // spawn(coords){
    //     this.Position_.x = coords[0];
    //     this.Position_.y = coords[1]-1;
    // }

    modifyHitBox(ratio, x_hitbox = 24, x_offset = 0, y_hitbox = 23, y_offset = 0, resized = 70) {
        this.HitBox_.scaler = ratio;
        this.HitBox_.resizer = resized;

        this.HitBox_.top_side = y_offset;
        this.HitBox_.left_side = x_offset;
        this.HitBox_.down_side = y_hitbox + y_offset;
        this.HitBox_.right_side = x_hitbox + x_offset;

        this.HitBox_.width = x_hitbox;
        this.HitBox_.height = y_hitbox;
        this.HitBox_.horizontal_center = this.HitBox_.width / 2;
        this.HitBox_.vertical_center = this.HitBox_.height / 2;

        this.HitBox_.scaled_width = this.HitBox_.width * this.HitBox_.scaler
        this.HitBox_.scaled_height = this.HitBox_.height * this.HitBox_.scaler
        this.HitBox_.scaled_horizontal_offset = x_offset * this.HitBox_.scaler;
        this.HitBox_.scaled_vertical_offset = y_offset * this.HitBox_.scaler;

        this.HitBox_.scaled_top_side = this.HitBox_.top_side * this.HitBox_.scaler;
        this.HitBox_.scaled_down_side = this.HitBox_.down_side * this.HitBox_.scaler;
        this.HitBox_.scaled_left_side = this.HitBox_.left_side * this.HitBox_.scaler;
        this.HitBox_.scaled_right_side = this.HitBox_.right_side * this.HitBox_.scaler;

        this.HitBox_.scaled_horizontal_center = this.HitBox_.horizontal_center * this.HitBox_.scaler;
        this.HitBox_.scaled_vertical_center = this.HitBox_.vertical_center * this.HitBox_.scaler;

        this.HitBox_.resized_width = this.HitBox_.scaled_width / this.HitBox_.resizer
        this.HitBox_.resized_height = this.HitBox_.scaled_height / this.HitBox_.resizer
        this.HitBox_.resized_horizontal_offset = this.HitBox_.scaled_horizontal_offset / this.HitBox_.resizer;
        this.HitBox_.resized_vertical_offset = this.HitBox_.scaled_vertical_offset / this.HitBox_.resizer;

        this.HitBox_.resized_top_side = this.HitBox_.scaled_top_side / this.HitBox_.resizer;
        this.HitBox_.resized_down_side = this.HitBox_.scaled_down_side / this.HitBox_.resizer;
        this.HitBox_.resized_left_side = this.HitBox_.scaled_left_side / this.HitBox_.resizer;
        this.HitBox_.resized_right_side = this.HitBox_.scaled_right_side / this.HitBox_.resizer;

        this.HitBox_.resized_horizontal_center = this.HitBox_.scaled_horizontal_center / this.HitBox_.resizer;
        this.HitBox_.resized_vertical_center = this.HitBox_.scaled_vertical_center / this.HitBox_.resizer;
    };

    playerPositionner(pos, offset) {
        return pos - offset
    };

    velocity(collisions, distanceground) {
        this.PhysicsLoop.startTime()
        if (Pause.pause === false) {
            
            if (GV.godmode === false) {
                this.is_wall_sliding = false;
                this.is_slide = false;
                this.is_dash = false;
                
                if (Keyboard.keys_input.d && Keyboard.keys_input.q === false && collisions.Bottom || this.Vector_.x > 0 && collisions.Bottom === false) //moving right
                {
                    this.lastdirection = 1;
                } else if (Keyboard.keys_input.q && Keyboard.keys_input.d === false && collisions.Bottom || this.Vector_.x < 0 && collisions.Bottom === false) {
                    this.lastdirection = -1;
                }

                if (Keyboard.keys_input.q !== Keyboard.keys_input.d) {
                    switch (collisions.Bottom) {
                        case false:
                            this.maxcurrentvelocity = this.maxaerialvelocity;
                            this.currentacceleration = this.aerialacceleration;
                            break;
                        case true:
                            this.maxcurrentvelocity = this.maxgroundvelocity;
                            this.currentacceleration = this.groundacceleration;
                            break;
                    }
                } else {
                    this.maxcurrentvelocity = 0;
                }

                if (this.dashcount === 0) //no move
                {
                    if (this.Vector_.x > 0 || collisions.Right) //Ralenti si le perso allait a droite
                    {
                        switch (collisions.Bottom) {
                            case true:
                                this.Vector_.x -= this.groundfriction;

                                if (Keyboard.keys_input.q && collisions.Right === false) {
                                    this.is_slide = true;
                                }
                                break;
                            case false:
                                this.Vector_.x -= this.airfriction;
                                if (Keyboard.keys_input.q) {
                                    this.Vector_.x -= this.aerialmoving;
                                }
                                break;
                        }
                        if (this.Vector_.x < 0 || collisions.Right) {
                            this.Vector_.x = 0;
                        }
                    } else if (this.Vector_.x < 0 || collisions.Left) //Ralenti si le perso allait a gauche
                    {
                        switch (collisions.Bottom) {
                            case true:
                                this.Vector_.x += this.groundfriction;
                                if (Keyboard.keys_input.d && collisions.Left === false) {
                                    this.is_slide = true;
                                }
                                break;
                            case false:
                                this.Vector_.x += this.airfriction;
                                if (Keyboard.keys_input.d) {
                                    this.Vector_.x += this.aerialmoving;
                                }
                                break;
                        }
                        if (this.Vector_.x > 0 || collisions.Left) {
                            this.Vector_.x = 0;
                        }
                    }
                };
                
                if (Keyboard.keys_input.d && Keyboard.keys_input.q === false && this.Vector_.x >= 0 && this.Vector_.x < this.maxcurrentvelocity) //moving right
                {
                    this.speed = this.Vector_.x += this.currentacceleration;
                    if (this.Vector_.x > this.maxcurrentvelocity) {
                        this.speed = this.Vector_.x = this.maxcurrentvelocity;
                    };
                    this.is_moving = true;
                } else if (Keyboard.keys_input.q && Keyboard.keys_input.d === false && this.Vector_.x <= 0 && this.Vector_.x > -this.maxcurrentvelocity) //moving left
                {
                    this.speed = this.Vector_.x -= this.currentacceleration;
                    if (this.Vector_.x < -this.maxcurrentvelocity) {
                        this.speed = this.Vector_.x = -this.maxcurrentvelocity;
                    };
                    this.is_moving = true;
                };

                if (Keyboard.keys_input.space && collisions.Top === false && this.walljump === 0 && this.releasejump && this.jump ||
                    this.Vector_.y <= this.jumptolerance && this.releasejump && Keyboard.keys_input.space && this.walljump === 0 && this.jumpavaiblelity) //jump
                {
                    this.Vector_.y = -this.jumpforce;
                    this.releasejump = false;
                    this.is_start_jump = true;
                    this.jumpavaiblelity = false;
                    this.walljumpcheck = false;
                } else if (this.Vector_.y < 0) {
                    this.jump_animation_postion = 2;
                }


                if (Keyboard.keys_input.space === false && this.walljumpcheck === false) //block the walljump if the spacebar was not released when the player touch the wall
                {
                    this.walljumpcheck = true;
                }
                if (collisions.Bottom === false && this.Vector_.y >= 0 || this.lastactwalljump === true) //walljump------------------------------------------------------------
                {
                    if (this.walljump === -1 && distanceground === false) //left
                    {
                        this.lastdirection = -1
                        this.dashcooldown = this.dashcooldownmax;
                    } else if (this.walljump === 1 && distanceground === false) //right
                    {
                        this.lastdirection = 1
                        this.dashcooldown = this.dashcooldownmax;
                    } else //nothing
                    {
                        this.dashcooldown = 0;
                    }
                    if (this.walljump !== 0) {
                        if (this.walljump === 1 || this.walljump === -1) {
                            this.Vector_.y = this.walljumpslide;
                            this.jump = false;
                            this.is_wall_sliding = true;
                        }

                        if (this.walljumpcheck === true && collisions.Bottom === false && collisions.Top === false && Keyboard.keys_input.space) {
                            this.Vector_.x = -this.walljump * this.walljumpx;
                            this.Vector_.y = -this.walljumpy;
                            this.lastdirection = -this.walljump * 1;

                            this.jump = false;
                            this.walljump = 0;
                            this.walljumpcheck = false;
                            this.dashcooldown = this.dashcooldownmax;
                            this.lastactwalljump = true;
                            this.is_wall_sliding = false;
                        }
                    } else if (this.walljump === 0) {
                        this.jump = false;
                    }
                }

                if (this.dashbuttonrelease === false && Keyboard.keys_input.shift === false) // dash
                {
                    this.dashbuttonrelease = true;
                }
                if (this.dashcooldown === 0 && this.lastactwalljump === false) {
                    if (Keyboard.keys_input.shift && this.dashbuttonrelease === true && this.walljump === 0 || this.dashcount !== 0) {
                        if (this.dashcount === 0) {
                            this.dashbuttonrelease = false;
                        }
                        this.dashcount += 1
                        if (this.dashcount >= this.dashduration || collisions.Left && this.Vector_.x < 0 || collisions.Right && this.Vector_.x > 0) {
                            this.Vector_.x = this.dashend * this.lastdirection;
                            this.Vector_.y = 0;
                            this.dashcooldown = this.dashcooldownmax;
                            this.dashcount = 0;
                            
                        } else {
                            this.Vector_.x = this.dashspeed * this.lastdirection;
                            this.Vector_.y = 0;
                            this.is_dash = true;
                        }
                    }
                }
                if (this.dashcooldown > 0 && this.lastactwalljump === false) {
                    this.dashcooldown -= 1;
                }

                if (this.walljump === 0 && this.dashcount === 0) //gravity
                {
                    if (collisions.Top) {
                        this.Vector_.y = 0;
                        this.jump = false;
                    }
                    if (Keyboard.keys_input.space === false && this.Vector_.y < 0 && this.lastactwalljump === false) {
                        this.Vector_.y /= this.jumpattenuation;
                        this.jump = false;
                    }
                    if (this.maxgravityspeed > this.Vector_.y) {
                        this.Vector_.y += this.gravity;
                    }
                }

                if (collisions.Bottom && this.jump === false) {
                    this.wallleave = this.wallleavemax;
                    this.jump = true;
                    this.lastactwalljump = false;
                    this.jumpavaiblelity = true;

                }
                if (Keyboard.keys_input.space === false) {
                    this.releasejump = true;
                }

                if(Keyboard.keys_input.q !== Keyboard.keys_input.d && (Keyboard.keys_input.q || Keyboard.keys_input.d)){
                    this.is_moving = true;
                }
                else
                {
                    this.is_moving = false;
                }

                if(this.Vector_.y > 0)
                {
                    this.is_falling = true;
                    this.is_jump = false;
                }
                else if(this.Vector_.y >= 0 && this.is_ground === false)
                {
                    this.is_falling = false;
                    this.is_jump = true;
                }
                else
                {
                    this.is_falling = false;
                    this.is_jump = false;
                }

                if(collisions.Bottom)
                {
                    this.is_ground = true;
                }
                else
                {
                    this.is_ground = false;
                }

            } else //movement in godmode
            {

                if (Keyboard.keys_input.return) {
                    this.godmode_speed_vector = 1;
                } else if (Keyboard.keys_input.shift) {
                    this.godmode_speed_vector = 500;
                } else {
                    this.godmode_speed_vector = 10;
                }
                if (Keyboard.keys_input.z && Keyboard.keys_input.s === false) //up
                {
                    this.Vector_.y = -this.godmode_speed_vector;
                } else if (Keyboard.keys_input.s && Keyboard.keys_input.z === false) //down
                {
                    this.Vector_.y = this.godmode_speed_vector;
                } else //neutral y
                {
                    this.Vector_.y = 0;
                }
                if (Keyboard.keys_input.d && Keyboard.keys_input.q === false) //right
                {
                    this.Vector_.x = this.godmode_speed_vector;
                } else if (Keyboard.keys_input.q && Keyboard.keys_input.d === false) //left
                {
                    this.Vector_.x = -this.godmode_speed_vector;
                } else //neutral x
                {
                    this.Vector_.x = 0;
                }
            }

            this.Position_.x += this.Vector_.x;
            this.Position_.y += this.Vector_.y;
        }
        this.physics_loop_log = this.PhysicsLoop.endLogTime(300 * (GameMenu.physics_speed / 60));
    }

    display(offset_x, offset_y, difference_x, difference_y) {
        this.DisplayLoop.startTime();
        this.Position_.InterpoledValue_.x = this.Position_.Previous_.x + this.Position_.InterpolationValue_.x * Fps.nbofframewithoutphysics;
        this.Position_.InterpoledValue_.y = this.Position_.Previous_.y + this.Position_.InterpolationValue_.y * Fps.nbofframewithoutphysics;
        if (GV.camsmootherenable) {
            this.positionning_x = Tools.resolutionScaler(this.playerPositionner(this.Position_.InterpoledValue_.x, offset_x));
            this.positionning_y = Tools.resolutionScaler(this.playerPositionner(this.Position_.InterpoledValue_.y, offset_y));
        } else {
            this.positionning_x = Tools.resolutionScaler(this.playerPositionner(this.Position_.InterpoledValue_.x - difference_x, offset_x));
            this.positionning_y = Tools.resolutionScaler(this.playerPositionner(this.Position_.InterpoledValue_.y - difference_y, offset_y));
        };
        
        switch(this.lastdirection)
        {
            case -1:
                if(this.is_wall_sliding === false && this.is_dash === false)
                {
                    if(this.is_ground)
                    {
                        if(this.is_slide)
                        {
                            this.GroundSlide.displayFrame();
                        }
                        else if(this.is_moving)
                        {
                            this.MovingLeft.animationPlay();
                        }
                        else
                        {
                            this.InitialPose.displayFrame();
                        }
                    }
                    else
                    {
                        if(this.is_falling)
                        {
                            this.FallingLeft.animationPlay();
                        }
                        else
                        {
                            this.JumpLeft.animationPlay();
                        }
                    }
                }else if(this.is_dash)
                {
                    this.Dash.displayFrame(1);
                }
                break;
            case 1:
                if(this.is_wall_sliding === false && this.is_dash === false)
                {
                    if(this.is_ground)
                    {
                        if(this.is_slide)
                        {
                            this.GroundSlide.displayFrame(1);
                        }
                        else if(this.is_moving)
                        {
                            this.MovingRight.animationPlay();
                        }
                        else
                        {
                            this.InitialPose.displayFrame(1);
                        }
                    }
                    else
                    {
                        if(this.is_falling)
                        {
                            this.FallingRight.animationPlay();
                        }
                        else
                        {
                            this.JumpRight.animationPlay();
                        }
                    }
                }else if(this.is_dash)
                {
                    this.Dash.displayFrame();
                }
                break;
        }
        if(this.is_wall_sliding && this.walljump === -1)
        {
            this.WallSlide.displayFrame(1)
        }
        else if(this.is_wall_sliding && this.walljump === 1)
        {
            this.WallSlide.displayFrame()
        }
        
        this.display_loop_log = this.DisplayLoop.endLogTime();
    }

    reset() {

    }
}

export { Player_Data };