import { upscale } from "./ui.js";

function texture_loader(path: string) {
  var texture = new Image();
  texture.src = path;
  return texture;
}

class PlayerData {
  playerX: number;
  playerY: number;
  moveright: number;
  moveleft: number;
  jump: boolean;
  releasejump: boolean;
  jumpcount: number;
  left: boolean;
  right: boolean;
  walljump: -1 | 0 | 1;
  walljumpcheck: boolean;
  lastdirection: number;
  cachedata: any;
  lastactwalljump: boolean;
  dashcount: number;
  dashcooldown: number;
  dashbuttonrelease: boolean;
  dashspeed: number;
  dashduration: number;
  dashcooldownmax: number;
  dashend: number;
  speed: number;
  maxcurrentvelocity: number;
  jumpforce: number;
  maxgroundvelocity: number;
  maxaerialvelocity: number;
  aerialmoving: number;
  wallleavemax: number;
  wallleave: number;
  walljumpx: number;
  walljumpy: number;
  walljumpslide: number;
  groundfriction: number;
  airfriction: number;
  gravity: number;
  maxgravityspeed: number;
  initial_pose: HTMLImageElement;
  animationmoving: boolean;
  moving: HTMLImageElement;
  movingrightframetiminglist: number[];
  movingrightframe: number;
  movingleftframetiminglist: number[];
  movingleftframe: number;
  movingframetiminglistlen: number;
  wall_slide: HTMLImageElement;
  verticaldirection: number;
  falling: HTMLImageElement;
  fallingrightframetiminglist: number[];
  fallingleftframetiminglist: number[];
  fallingframe: number;
  fallingframetiminglistlen: number;
  ground_slideposition: number;
  ground_slide: HTMLImageElement;
  jumpframe: number;
  jump_animation_postion: number;
  jumprightframetiminglist: number[];
  jumpleftframetiminglist: number[];
  jump_animation: HTMLImageElement;
  jumpframetiminglistlen: number;
  dashaanimation: HTMLImageElement;
  ctx: CanvasRenderingContext2D | undefined;

  constructor() {
    this.playerX = 0;
    this.playerY = 0;
    this.moveright = 0;
    this.moveleft = 0;
    this.jump = false;
    this.releasejump = false;
    this.jumpcount = 0;
    this.left = true;
    this.right = true;
    this.walljump = 0;
    this.walljumpcheck = false;

    this.lastdirection = 1;
    this.cachedata;
    this.lastactwalljump = false;

    this.dashcount = 0;
    this.dashcooldown = 0;
    this.dashbuttonrelease = true; //Oblige le joueur a relacher la touche du dash entre chaque dash
    this.dashspeed = 71; //Permet d'ajuster la vitesse du dash par frame
    this.dashduration = 5; //Permet d'ajuster durée en nombre de frame du dash
    this.dashcooldownmax = 30; //Permet d'empècher de dash a l'infini
    this.dashend = 0; //choisir la vitesse du joeur a la fin du dash

    this.speed = 0; //Permet juste de stocker un calcul pour la vitesse (Ne pas toucher)
    this.maxcurrentvelocity = 9; //La fameuse
    this.jumpforce = 35; //Puissance du saut
    this.maxgroundvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est au sol
    this.maxaerialvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est en chute libre
    this.aerialmoving = 0.5; //Pour pouvoir se diriger dans les airs, si la valeure est trop élevé on peut faire des walljump sur un seul mur mdr

    this.wallleavemax = 5; //Nombre de frame requise pour quitter un mur lorsque qu'on est en position pour faire un walljump
    this.wallleave = this.wallleavemax + 1;
    this.walljumpx = 15;
    this.walljumpy = 35;
    this.walljumpslide = 5;

    this.groundfriction = 2; //Ralentissement de la vitesse joueur lorsqu'il est au sol
    this.airfriction = 0.2; //Ralentissement de la vitesse joueur lorsqu'il est en l'air

    this.gravity = 2; //Permet d'ajuster la vitesse de chute du joueur
    this.maxgravityspeed = 20; //Permet de donner une vitesse de chute max (ne jamais dépasser 70px/frame)

    //Variables d'animations du joueur
    this.initial_pose = texture_loader(
      "graphics/player/initial_pose/initial_pose.png"
    );

    this.animationmoving = false;
    this.moving = texture_loader("graphics/player/moving/moving.png");
    this.movingrightframetiminglist = [
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
    ];
    this.movingrightframe = 0;
    this.movingleftframetiminglist = [
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      9,
      10,
      10,
      10,
      10,
      11,
      11,
    ];
    this.movingleftframe = 0;
    this.movingframetiminglistlen = this.movingrightframetiminglist.length;
    this.wall_slide = texture_loader(
      "graphics/player/wall_slide/wall_slide.png"
    );

    this.verticaldirection = -1;
    this.falling = texture_loader("graphics/player/falling/falling.png");
    this.fallingrightframetiminglist = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
    this.fallingleftframetiminglist = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
    this.fallingframe = 0;
    this.fallingframetiminglistlen = this.fallingrightframetiminglist.length;

    this.ground_slideposition = 0;
    this.ground_slide = texture_loader(
      "graphics/player/ground_slide/ground_slide.png"
    );

    this.jumpframe = 0;
    this.jump_animation_postion = 0;
    this.jumprightframetiminglist = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
    this.jumpleftframetiminglist = [4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
    this.jump_animation = texture_loader("graphics/player/jump/jump.png");
    this.jumpframetiminglistlen = this.jumprightframetiminglist.length;

    this.dashaanimation = texture_loader("graphics/player/dash/dash.png");
  }

  var_update(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  spawn(coords: number[]) {
    this.playerX = coords[0];
    this.playerY = coords[1] - 1;
  }

  velocity(
    input: (0 | 1)[],
    vx: number,
    vy: number,
    godmode: boolean,
    collisions: number[],
    offsetX_on: number,
    offsetY_on: number,
    distanceground: number | boolean,
    pause: boolean
  ) {
    vy = -vy;
    if (pause == false) {
      this.ground_slideposition = 0;
      this.jump_animation_postion = 0;
      if (godmode == false) {
        if (this.wallleave >= this.wallleavemax) {
          //moving
          if (input[1] !== input[3]) {
            this.animationmoving = true;
            switch (collisions[0]) {
              case 0:
                this.maxcurrentvelocity = this.maxaerialvelocity;
                break;
              case 1:
                this.maxcurrentvelocity = this.maxgroundvelocity;
                break;
            }
          } else {
            this.maxcurrentvelocity = 0;
            this.animationmoving = false;
          }

          this.speed = Math.round(
            1 +
              this.maxcurrentvelocity -
              this.maxcurrentvelocity / (Math.sqrt(vx ** 2) + 1)
          );
          if (input[3] == 1 && input[1] == 0 && vx >= 0 && collisions[3] == 0) {
            //moving right
            this.lastdirection = 1;
            if (vx <= this.maxcurrentvelocity) {
              vx = this.speed;
            } else {
              switch (collisions[0]) {
                case 1:
                  vx -= this.groundfriction;
                  break;
                case 0:
                  vx -= this.airfriction;
                  break;
              }
            }
          } else if (
            input[1] == 1 &&
            vx <= 0 &&
            input[3] == 0 &&
            collisions[2] == 0
          ) {
            //moving left
            this.lastdirection = -1;
            if (vx >= -this.maxcurrentvelocity) {
              vx = -this.speed;
            } else {
              switch (collisions[0]) {
                case 1:
                  vx += this.groundfriction;
                  break;
                case 0:
                  vx += this.airfriction;
                  break;
              }
            }
          } else if (this.dashcount == 0) {
            //no move
            if (vx > 0 || collisions[3] == 1) {
              //Ralenti si le perso allait a droite
              switch (collisions[0]) {
                case 1:
                  vx -= this.groundfriction;
                  if (input[1] == 1) {
                    this.ground_slideposition = -1;
                  }
                  break;
                case 0:
                  vx -= this.airfriction;
                  if (input[1] == 1) {
                    vx -= this.aerialmoving;
                  }
                  break;
              }
              if (vx < 0 || collisions[3] == 1) {
                vx = 0;
              }
            } else if (vx < 0 || collisions[2] == 1) {
              //Ralenti si le perso allait a gauche
              switch (collisions[0]) {
                case 1:
                  vx += this.groundfriction;
                  if (input[3] == 1) {
                    this.ground_slideposition = 1;
                  }
                  break;
                case 0:
                  vx += this.airfriction;
                  if (input[3] == 1) {
                    vx += this.aerialmoving;
                  }
                  break;
              }
              if (vx > 0 || collisions[2] == 1) {
                vx = 0;
              }
            }
          }
        }

        if (
          input[4] == 1 &&
          collisions[1] == 0 &&
          vy >= -20 &&
          this.walljump == 0 &&
          this.releasejump == true &&
          this.jump == true
        ) {
          //jump
          vy = this.jumpforce;
          this.releasejump = false;
          this.jump_animation_postion = 1;
        } else if (vy > 0) {
          this.jump_animation_postion = 2;
        }

        if ((collisions[0] == 0 && vy <= 0) || this.lastactwalljump == true) {
          //walljump
          if (collisions[2] == 1 && distanceground > 71) {
            //left
            this.walljump = -1;
          } else if (collisions[3] == 1 && distanceground > 71) {
            //right
            this.walljump = 1;
          } //nothing
          else {
            this.walljump = 0;
            this.walljumpcheck = false;
            this.wallleave = this.wallleavemax;
          }
          if (this.walljump !== 0) {
            if (this.walljump == 1 || this.walljump == -1) {
              vy = -this.walljumpslide;
              this.jump = false;
            }
            if (input[1] == 1 || input[3] == 1) {
              this.wallleave += 1;
              if (input[3] == 1) {
                this.lastdirection = 1;
              } else if (input[1] == 1) {
                this.lastdirection = -1;
              }
            } else {
              this.wallleave = 0;
            }
            if (input[4] == 0 && this.walljumpcheck == false) {
              //block the walljump if the spacebar was not released when the player touch the wall
              this.walljumpcheck = true;
            } else if (
              this.walljumpcheck == true &&
              collisions[0] == 0 &&
              collisions[1] == 0 &&
              input[4] == 1
            ) {
              vx = -this.walljump * this.walljumpx;
              vy = this.walljumpy;
              this.lastdirection = -this.walljump * 1;

              this.jump = false;
              this.walljump = 0;
              this.walljumpcheck = false;
              this.wallleave = this.wallleavemax;
              this.dashcooldown = this.dashcooldownmax;
              this.lastactwalljump = true;
            }
          } else if (this.walljump === 0) {
            this.walljumpcheck = false;
            this.wallleave = this.wallleavemax;
            this.jump = false;
          }
        }

        if (this.dashbuttonrelease === false && input[5] === 0) {
          // dash
          this.dashbuttonrelease = true;
        }
        if (this.dashcooldown == 0 && this.lastactwalljump === false) {
          if (
            (input[5] === 1 && this.dashbuttonrelease === true) ||
            this.dashcount !== 0
          ) {
            if (this.dashcount == 0) {
              this.dashbuttonrelease = false;
            }
            this.dashcount += 1;
            if (
              this.dashcount >= this.dashduration ||
              (collisions[2] === 1 && vx < 0) ||
              (collisions[3] === 1 && vx > 0)
            ) {
              vx = this.dashend * this.lastdirection;
              vy = 0;
              this.dashcooldown = this.dashcooldownmax;
              this.dashcount = 0;
            } else {
              vx = this.dashspeed * this.lastdirection;
              vy = 0;
            }
          }
        }
        if (this.dashcooldown > 0) {
          this.dashcooldown -= 1;
        }

        if (
          collisions[0] === 0 &&
          this.walljump === 0 &&
          this.dashcount === 0
        ) {
          //gravity
          if (collisions[1] === 1 || (input[4] === 0 && this.jump === true)) {
            vy = 0;
            this.jump = false;
          }
          if (-this.maxgravityspeed < vy) {
            vy -= 2;
          }
        }
        if (collisions[0] === 1 && this.jump === false) {
          vy = 0;
          this.wallleave = this.wallleavemax;
          this.jump = true;
          this.lastactwalljump = false;
        }
        if (input[4] === 0) {
          this.releasejump = true;
        }
      } //movement in godmode
      else {
        if (input[8] === 1) {
          if (input[0] === 1 && collisions[1] === 0 && input[2] === 0) {
            //up
            vy = 1;
          } else if (input[2] === 1 && collisions[0] === 0) {
            //down
            vy = -1;
          } //neutral y
          else {
            vy = 0;
          }
          if (input[3] === 1 && collisions[3] === 0) {
            //right
            vx = 1;
          } else if (input[1] === 1 && collisions[2] === 0 && input[3] === 0) {
            //left
            vx = -1;
          } //neutral x
          else {
            vx = 0;
          }
        } else if (input[5] === 1) {
          if (input[0] === 1 && collisions[1] === 0 && input[2] === 0) {
            //up
            vy = 25;
          } else if (input[2] === 1 && collisions[0] === 0) {
            //down
            vy = -25;
          } //neutral y
          else {
            vy = 0;
          }
          if (input[3] === 1 && collisions[3] === 0) {
            //right
            vx = 25;
          } else if (input[1] === 1 && collisions[2] === 0 && input[3] === 0) {
            //left
            vx = -25;
          } //neutral x
          else {
            vx = 0;
          }
        } else {
          if (input[0] === 1 && collisions[1] === 0 && input[2] === 0) {
            //up
            vy = 10;
          } else if (input[2] === 1 && collisions[0] === 0) {
            //down
            vy = -10;
          } //neutral y
          else {
            vy = 0;
          }
          if (input[3] === 1 && collisions[3] === 0) {
            //right
            vx = 10;
          } else if (input[1] === 1 && collisions[2] === 0 && input[3] == 0) {
            //left
            vx = -10;
          } //neutral x
          else {
            vx = 0;
          }
        }
      }

      if (offsetX_on !== 0) {
        this.playerX += vx;
      }
      if (offsetY_on !== 0) {
        this.playerY -= vy;
      }
    }
    return [vx, -vy];
  }

  player_animatic(
    input: number[],
    collisions: (0 | 1)[],
    offsetx: number,
    offsety: number,
    offsetX_on: number,
    offsetY_on: number,
    camsmoother: number[],
    pause: boolean
  ) {
    this.ctx = this.ctx!;
    if (this.walljump === 1) {
      this.ctx.drawImage(
        this.wall_slide,
        0,
        0,
        24,
        24,
        upscale(this.playerX + camsmoother[0]),
        upscale(this.playerY + camsmoother[1]),
        upscale(71),
        upscale(71)
      );
    } else if (this.walljump === -1) {
      this.ctx.drawImage(
        this.wall_slide,
        24,
        0,
        24,
        24,
        upscale(this.playerX + camsmoother[0]),
        upscale(this.playerY + camsmoother[1]),
        upscale(71),
        upscale(71)
      );
    } else {
      switch (this.lastdirection) {
        case 1:
          if (this.dashcount === 0) {
            if (collisions[0] === 1) {
              if (
                this.animationmoving === true &&
                collisions[3] === 0 &&
                this.ground_slideposition === 0
              ) {
                this.movingleftframe = 0;
                this.ctx.drawImage(
                  this.moving,
                  this.movingrightframetiminglist[this.movingrightframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.movingrightframe += 1;
                }
                if (this.movingrightframe >= this.movingframetiminglistlen) {
                  this.movingrightframe = 0;
                }
              } else if (this.ground_slideposition === -1) {
                this.ctx.drawImage(
                  this.ground_slide,
                  0,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              } else {
                this.movingrightframe = 0;
                this.ctx.drawImage(
                  this.initial_pose,
                  24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              }
            } else {
              if (
                this.verticaldirection === -1 &&
                this.jump_animation_postion === 0
              ) {
                this.ctx.drawImage(
                  this.falling,
                  this.fallingrightframetiminglist[this.fallingframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.fallingframe += 1;
                }
                if (this.fallingframe >= this.fallingframetiminglistlen) {
                  this.fallingframe = 0;
                }
              } else if (this.jump_animation_postion === 1) {
                this.jumpframe = 0;
                this.ctx.drawImage(
                  this.jump_animation,
                  0,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              } else if (this.jump_animation_postion === 2) {
                this.ctx.drawImage(
                  this.jump_animation,
                  this.jumprightframetiminglist[this.jumpframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.jumpframe += 1;
                }
                if (this.jumpframe >= this.jumpframetiminglistlen) {
                  this.jumpframe = 0;
                }
              }
            }
          } else {
            this.ctx.drawImage(
              this.dashaanimation,
              0,
              0,
              24,
              24,
              upscale(this.playerX + camsmoother[0]),
              upscale(this.playerY + camsmoother[1]),
              upscale(71),
              upscale(71)
            );
          }
          break;
        case -1:
          if (this.dashcount === 0) {
            if (collisions[0] === 1) {
              if (
                this.animationmoving === true &&
                collisions[2] === 0 &&
                this.ground_slideposition === 0
              ) {
                this.movingrightframe = 0;
                this.ctx.drawImage(
                  this.moving,
                  this.movingleftframetiminglist[this.movingleftframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.movingleftframe += 1;
                }
                if (this.movingleftframe >= this.movingframetiminglistlen) {
                  this.movingleftframe = 0;
                }
              } else if (this.ground_slideposition === 1) {
                this.ctx.drawImage(
                  this.ground_slide,
                  24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              } else {
                this.movingleftframe = 0;
                this.ctx.drawImage(
                  this.initial_pose,
                  0,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              }
            } else {
              if (
                this.verticaldirection === -1 &&
                this.jump_animation_postion === 0
              ) {
                this.ctx.drawImage(
                  this.falling,
                  this.fallingleftframetiminglist[this.fallingframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.fallingframe += 1;
                }
                if (this.fallingframe >= this.fallingframetiminglistlen) {
                  this.fallingframe = 0;
                }
              } else if (this.jump_animation_postion === 1) {
                this.jumpframe = 0;
                this.ctx.drawImage(
                  this.jump_animation,
                  72,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
              } else if (this.jump_animation_postion === 2) {
                this.ctx.drawImage(
                  this.jump_animation,
                  this.jumpleftframetiminglist[this.jumpframe] * 24,
                  0,
                  24,
                  24,
                  upscale(this.playerX + camsmoother[0]),
                  upscale(this.playerY + camsmoother[1]),
                  upscale(71),
                  upscale(71)
                );
                if (pause === false) {
                  this.jumpframe += 1;
                }
                if (this.jumpframe >= this.jumpframetiminglistlen) {
                  this.jumpframe = 0;
                }
              }
            }
          } else {
            this.ctx.drawImage(
              this.dashaanimation,
              24,
              0,
              24,
              24,
              upscale(this.playerX + camsmoother[0]),
              upscale(this.playerY + camsmoother[1]),
              upscale(71),
              upscale(71)
            );
          }
          break;
      }
    }
  }
}

export { PlayerData };
