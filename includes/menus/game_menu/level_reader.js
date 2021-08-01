import {ctx, GV, Tools, Player, canvas, Fps, GameMenu, Pause, Fullscreen} from "../../../main.js";
import {Timer_Log} from "../../tools.js";
import {CollisionsSquare} from "./level_reader_asset/collision_square.js"

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";


class Map_Data
{   
    constructor()
    {
        //Collisions

        this.Collisions_ = {
            Top    : true,
            Bottom : true, 
            Left   : true, 
            Right  : true,
        };
        this.PreviousCollisions_ = {
            Top    : true, 
            Bottom : true, 
            Left   : true, 
            Right  : true
        };

        this.aPreviousCollisions_ = {
            Top    : true, 
            Bottom : true, 
            Left   : true, 
            Right  : true
        };

        this.CS = new CollisionsSquare()
        this.top_collisions_map = [];
        this.bottom_collisions_map = [];
        this.left_collisions_map = [];
        this.right_collisions_map = [];
        this.current_collision_map = [];
        this.distanceground = false;
        this.T_ = {
            x : 0,
            y : 0
            // Near_ : {
            //     x : 0,
            //     y : 0
            // },

            // Far_ : {
            //     x : 0,
            //     y : 0
            // }
        };
        this.VectorCoefficient_ = {
            x : 1,
            y : 1
        };
        this.CursorInterval_ = {
            Start : 0,
            End   : 0
        };
        this.PlayerResizedCoords_ = {
            x : 0,
            y : 0,

            CenteredHitbox_ : {
                x : 0,
                y : 0
            }
        };
        this.PlayerResizedVector_ = {
            x : 0,
            y : 0
        };
        this.proportional_coords = 0;
        this.hitbox_collision_sizer_pre_calculed_part = 0;
        this.hitbox_test_checker = 0;
        this.RepositionnedCoords_ = {
            HorizontalCheck_ : {
                x : 0,
                y : 0
            },

            VerticalCheck_ : {
                x : 0,
                y : 0
            }
        };
        


        //Load

        this.map_limit = {x : 0, y : 0};
        this.spawn = {x : 0, y : 0};
        this.block_map = [0];
        this.block_map_snap_position = [0];
        this.block_index = [0];
        this.index_value = 0;
        this.block_map_type_texture = [0];
        this.all_block_map_count = 0;
        this.operation_count = 0;

        this.cache_data = 0;


        //Display

        this.Offset_ = {
            x : 0,
            y : 0,

            Previous_ : {
                x : 0,
                y : 0
            },

            InterpolationValue_ : {
                x : 0,
                y : 0
            },

            InterpoledValue_ : {
                x : 0,
                y : 0
            }
        };


        //Camera smoother

        this.CameraSmoother_ = {
            x : 0,
            y : 0,

            Previous_ : {
                x : 0,
                y : 0
            },

            InterpolationValue_ : {
                x : 0,
                y : 0
            },

            InterpoledValue_ : {
                x : 0,
                y : 0
            }
        };

        this.interpoled_difference_smoother_offset_x = 0;
        this.interpoled_difference_smoother_offset_y = 0;    
        this.previousoffset = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];    

        //Optimisation
        this.pre_block_scale = 24;
        this.original_block_scale = 70;
        this.original_block_scale_graphical_scaled = this.original_block_scale;
        this.pre_block_scaling = this.original_block_scale;
        this.pre_block_scaling_unround = this.original_block_scale;
        this.pre_snap_offset_smooth_X = 0;
        this.pre_snap_offset_smooth_Y = 0;
        this.pre_snap_offset_smooth_X_floor = 0;
        this.pre_vertical_position_line_block_displayed = 0;
        this.selected_horizontal_block_index_array = [];
        this.selected_horizontal_block_map_type_texture_array = [];


        //Graphic

        this.bg = Tools.textureLoader("graphics/map_content/background.png");
        this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png");
        this.testblock = Tools.textureLoader("graphics/map_content/test_block.png");


        //Logs

        this.CollisionsLoop = new Timer_Log();
        this.GraphicsLoop = new Timer_Log();
        this.CamSmootherLoop = new Timer_Log();
        this.LoadTimingLog = new Timer_Log();
        this.collisions_loop_log = 0;
        this.graphics_loop_log = 0;
        this.cam_smoother_loop_log = 0;

        
        //Test variable
        this.anti_lock = 0;
        this.block_in_test_collision_area_count = 0;
    }



    start(file, editedlevelid)
    {
        this.LoadTimingLog.startTime();


        this.Collisions_ = {"Top" : true, "Bottom" : true, "Left" : true, "Right" : true}
        this.top_collisions_map = [];
        this.bottom_collisions_map = [];
        this.left_collisions_map = [];
        this.right_collisions_map = [];
        this.map_limit = file.MapDatas[editedlevelid].Map_limit;
        this.spawn = file.MapDatas[editedlevelid].Player_spawn;
        Player.Position_.x = this.spawn.x*this.original_block_scale;
        Player.Position_.y = this.spawn.y*this.original_block_scale;
        this.all_block_map_count = file.MapDatas[editedlevelid].Blocks.length;
        if(GV.devmode)
        {
            console.log("Map information : \n -Player spawned at coords : \n      x : "+this.spawn.x+" | y : "+this.spawn.y
                                         +"\n -Map size : \n      x : "+this.map_limit.x+" | y : "+this.map_limit.y
                                         +"\n -Total number of block : "+this.all_block_map_count
                                         +"\n -Total number of water block : "+0
                                         +"\n -Total number of enemies : "+0
                                         +"\n -Total number of decorative element : "+0)
        };

        Player.modifyHitBox(this.original_block_scale/this.pre_block_scale, 
            Player.HitBox_.width, Player.HitBox_.horizontal_offset, 
            Player.HitBox_.height, Player.HitBox_.vertical_offset,
            this.original_block_scale)

        

        // Préparation des collisions de la map
        for(let i = 0; i < this.map_limit.y+1; i++){
            this.top_collisions_map.push([]);
            this.bottom_collisions_map.push([]);
            this.left_collisions_map.push([]);
            this.right_collisions_map.push([]);
            for(let k = 0; k < this.map_limit.x+1; k++){
                this.top_collisions_map[i].push(false);
                this.bottom_collisions_map[i].push(false);
                this.left_collisions_map[i].push(false);
                this.right_collisions_map[i].push(false);
            }
        }

        for(let i = 0; i < this.all_block_map_count; i++){
            this.top_collisions_map   [file.MapDatas[editedlevelid].Blocks[i].y][file.MapDatas[editedlevelid].Blocks[i].x] = file.MapDatas[editedlevelid].Blocks[i].Collisions.Top;
            this.bottom_collisions_map[file.MapDatas[editedlevelid].Blocks[i].y][file.MapDatas[editedlevelid].Blocks[i].x] = file.MapDatas[editedlevelid].Blocks[i].Collisions.Bottom;
            this.left_collisions_map  [file.MapDatas[editedlevelid].Blocks[i].y][file.MapDatas[editedlevelid].Blocks[i].x] = file.MapDatas[editedlevelid].Blocks[i].Collisions.Left;
            this.right_collisions_map [file.MapDatas[editedlevelid].Blocks[i].y][file.MapDatas[editedlevelid].Blocks[i].x] = file.MapDatas[editedlevelid].Blocks[i].Collisions.Right;
        }
    
        // console.log(this.bottom_collisions_map)
        

        
        // console.log(Player.Position_.x,py);

        // Préparation de l'affichage de la map
        this.block_map = [];
        this.block_map_type_texture = [];
        this.block_index = [];
        this.block_map_snap_position = [];
        for(let i = 0; i < this.map_limit.y+1; i++){
            this.block_map_type_texture.push({});
            this.block_map.push([]);
            this.block_index.push([]);
            this.block_map_snap_position.push([]);
        }
        
        for(let i = 0; i < this.all_block_map_count; i++){
            this.block_map[file.MapDatas[editedlevelid].Blocks[i].y].push(file.MapDatas[editedlevelid].Blocks[i].x*this.pre_block_scaling);
            this.block_map_snap_position[file.MapDatas[editedlevelid].Blocks[i].y].push(file.MapDatas[editedlevelid].Blocks[i].x);
            this.block_map_type_texture[file.MapDatas[editedlevelid].Blocks[i].y][file.MapDatas[editedlevelid].Blocks[i].x] = Object.values(file.MapDatas[editedlevelid].Blocks[i].Type);
            this.block_map[file.MapDatas[editedlevelid].Blocks[i].y].sort(function(a, b) {return a - b;});
            this.block_map_snap_position[file.MapDatas[editedlevelid].Blocks[i].y].sort(function(a, b) {return a - b;});
        }
        
        for(let i = 0; i < this.map_limit.y+1; i++){
            this.index_value = 0;
            for(let k = 0; k < this.map_limit.x+1; k++){
                this.block_index[i].push(this.index_value)
                if(k >= this.block_map[i][this.index_value]/this.pre_block_scaling && this.index_value < this.block_map[i].length-1){
                    this.index_value++;
                };
            };
        };
        for(let i = 0; i < this.block_map_type_texture.length; i++){
            this.cache_data = [];
            for(let k = 0; k < this.block_map_snap_position[i].length; k++){
                this.cache_data.push(this.block_map_type_texture[i][this.block_map_snap_position[i][k]]);
            };
            this.block_map_type_texture[i] = this.cache_data;
        };
        
        // console.log(this.block_map)
        // console.log(this.block_map_snap_position)
        // console.log(this.block_index)
        // console.log(this.block_map_type_texture)
        this.requiredDisplayVariableUpdater();

        this.previousoffset = [[this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y],
                               [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y],
                               [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y],
                               [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y], [this.Offset_.x, this.Offset_.y]];

        if(GV.devmode){console.log("Map loaded in "+this.LoadTimingLog.endLogTime(0)+" ms");};
    }

    hitboxCollisionSizer(side, k)
    {
        if(side === "horizontal")
        {
            if(this.VectorCoefficient_.y === 1)
            {
                this.current_collision_map = this.right_collisions_map;
            }else{
                this.current_collision_map = this.left_collisions_map;
            }
            if(this.PreviousCollisions_.Top === false && this.VectorCoefficient_.y === -1 || this.PreviousCollisions_.Bottom === false && this.VectorCoefficient_.y === 1)
            {
                this.T_.x = 1-(this.PlayerResizedCoords_.CenteredHitbox_.x+this.PlayerResizedVector_.x+(Player.HitBox_.resized_horizontal_center*this.VectorCoefficient_.x)-k+Tools.antiPositiveValue(this.VectorCoefficient_.x))/this.PlayerResizedVector_.x
                if(this.T_.x < 0)
                {
                    this.T_.x = 0;
                }else if(this.T_.x > 1){
                    this.T_.x = 1;
                };
            }else{this.T_.x = 0;};

            this.hitbox_collision_sizer_pre_calculed_part = this.PlayerResizedCoords_.CenteredHitbox_.y-Player.HitBox_.resized_vertical_center+this.PlayerResizedVector_.y*this.T_.x;
            this.hitbox_test_checker = Math.floor(this.hitbox_collision_sizer_pre_calculed_part+Player.HitBox_.resized_height);
            if(this.hitbox_test_checker > this.map_limit.y)
            {
                this.hitbox_test_checker = this.map_limit.y;
            };
            
            for(let i = -1; i <= Player.HitBox_.resized_height-1 ;i++)
            {
                if(Math.ceil(this.hitbox_collision_sizer_pre_calculed_part+i) < this.map_limit.y
                && Math.ceil(this.hitbox_collision_sizer_pre_calculed_part+Player.HitBox_.resized_top_side+i) >= 0){
                    if(this.current_collision_map[         Math.floor(this.hitbox_collision_sizer_pre_calculed_part   )][k]
                    || this.current_collision_map[Math.abs(Math.ceil (this.hitbox_collision_sizer_pre_calculed_part+i))][k]
                    || this.current_collision_map[this.hitbox_test_checker][k])
                    {
                        return true;
                    };
                }
                
            };
            return false;
        };
        if(this.VectorCoefficient_.y === 1)
        {
            this.current_collision_map = this.bottom_collisions_map;
        }else{
            this.current_collision_map = this.top_collisions_map;
        }

        if(this.PreviousCollisions_.Left === false && this.VectorCoefficient_.x === -1 || this.PreviousCollisions_.Right === false && this.VectorCoefficient_.x === 1)
        {
            this.T_.y = 1-(this.PlayerResizedCoords_.CenteredHitbox_.y+this.PlayerResizedVector_.y+(Player.HitBox_.resized_vertical_center*this.VectorCoefficient_.y)-k+Tools.antiPositiveValue(this.VectorCoefficient_.y))/this.PlayerResizedVector_.y
            if(this.T_.y < 0)
            {
                this.T_.y = 0;
            }else if(this.T_.y > 1){
                this.T_.y = 1;
            };
        }else{this.T_.y = 0;};

        this.hitbox_collision_sizer_pre_calculed_part = this.PlayerResizedCoords_.CenteredHitbox_.x-Player.HitBox_.resized_horizontal_center+this.PlayerResizedVector_.x*this.T_.y;

        this.hitbox_test_checker = Math.floor(this.hitbox_collision_sizer_pre_calculed_part+Player.HitBox_.resized_width);
        if(this.hitbox_test_checker > this.map_limit.x)
        {
            this.hitbox_test_checker = this.map_limit.x;
        };
        for(let i = -1; i <= Player.HitBox_.resized_width-1 ;i++)
        {
            if(Math.ceil(this.hitbox_collision_sizer_pre_calculed_part+i) < this.map_limit.x+Player.HitBox_.right_side
            && Math.ceil(this.PlayerResizedCoords_.CenteredHitbox_.x+i) >= 0){
                if(this.current_collision_map[Tools.antiOverValue(k, this.map_limit.y)][Math.floor(this.hitbox_collision_sizer_pre_calculed_part)]
                || this.current_collision_map[Tools.antiOverValue(k, this.map_limit.y)][Math.ceil (this.hitbox_collision_sizer_pre_calculed_part+i)]
                || this.current_collision_map[Tools.antiOverValue(k, this.map_limit.y)][this.hitbox_test_checker])
                {
                    return true;
                };
            }
        };
        return false;
    };

    antiCornerThrough(k)
    {
        if((this.right_collisions_map[Tools.antiNegativeValue(Math.floor(this.PlayerResizedVector_.y+this.PlayerResizedCoords_.y+Player.HitBox_.resized_down_side))][Math.floor(this.PlayerResizedVector_.x+this.PlayerResizedCoords_.x+Player.HitBox_.resized_right_side)] 
        || this.left_collisions_map  [Tools.antiNegativeValue(Math.floor(this.PlayerResizedVector_.y+this.PlayerResizedCoords_.y+Player.HitBox_.resized_down_side))][Math.floor(this.PlayerResizedVector_.x+this.PlayerResizedCoords_.x+Player.HitBox_.resized_left_side)])
        && this.PlayerResizedCoords_.CenteredHitbox_.y                            <= k-Player.HitBox_.resized_vertical_center
        && this.PlayerResizedCoords_.CenteredHitbox_.y+this.PlayerResizedVector_.y > k-Player.HitBox_.resized_vertical_center
        && Player.Vector_.x !== 0)
        {
            return true;
        }
        return false;
    }

    collider()
    {
        this.CollisionsLoop.startTime();
        if(Pause.pause === false)    
        {    
            this.PreviousCollisions_ = this.aPreviousCollisions_;
            this.aPreviousCollisions_ = this.Collisions_;
            this.Collisions_         = {"Top" : false, "Bottom" : false, "Left" : false, "Right" : false};
            this.distanceground = false;

            
            this.CS.framesArea(Player, this.map_limit, this.original_block_scale);


            // Collision resolver

            this.PlayerResizedVector_.x = Player.Vector_.x  /this.original_block_scale;
            this.PlayerResizedVector_.y = Player.Vector_.y  /this.original_block_scale;
            this.PlayerResizedCoords_.x = Player.Position_.x/this.original_block_scale-this.PlayerResizedVector_.x;
            this.PlayerResizedCoords_.y = Player.Position_.y/this.original_block_scale-this.PlayerResizedVector_.y;
            this.PlayerResizedCoords_.CenteredHitbox_.x = this.PlayerResizedCoords_.x+Player.HitBox_.resized_horizontal_offset+Player.HitBox_.resized_horizontal_center;
            this.PlayerResizedCoords_.CenteredHitbox_.y = this.PlayerResizedCoords_.y+Player.HitBox_.resized_vertical_offset  +Player.HitBox_.resized_vertical_center;

            this.VectorCoefficient_.x =
            this.VectorCoefficient_.y = 0;
            this.T_.x = 
            this.T_.y = 1
            this.RepositionnedCoords_.VerticalCheck_.y =
            this.RepositionnedCoords_.HorizontalCheck_.x = -1;

            if(Player.Vector_.x !== 0)
            {
                this.VectorCoefficient_.x = Math.sign(Player.Vector_.x);
                
                
                if(this.VectorCoefficient_.x === 1) //right
                {
                    for(let k = this.CS.CollisionSquareArea_.StartCoords_.x+1 ; k < this.CS.CollisionSquareArea_.EndCoords_.x+1 ; k++)
                    {
                        if(this.hitboxCollisionSizer("horizontal", k)
                        && this.PlayerResizedCoords_.CenteredHitbox_.x                            <= k-Player.HitBox_.resized_horizontal_center
                        && this.PlayerResizedCoords_.CenteredHitbox_.x+this.PlayerResizedVector_.x > k-Player.HitBox_.resized_horizontal_center)
                        {
                            Player.Position_.x = (k-Player.HitBox_.resized_right_side)*this.original_block_scale-0.01;
                            this.Collisions_.Right = true;
                            Player.Vector_.x = 0;
                            break;
                        };
                        
                    };
                }
                else //left
                {
                    for(let k = this.CS.CollisionSquareArea_.EndCoords_.x-1 ; k > this.CS.CollisionSquareArea_.StartCoords_.x-1 ; k--)
                    {
                        if(this.hitboxCollisionSizer("horizontal", k)
                        && this.PlayerResizedCoords_.CenteredHitbox_.x                            >= k+Player.HitBox_.resized_horizontal_center+1
                        && this.PlayerResizedCoords_.CenteredHitbox_.x+this.PlayerResizedVector_.x < k+Player.HitBox_.resized_horizontal_center+1)
                        {
                            Player.Position_.x = (k-Player.HitBox_.resized_left_side+1)*this.original_block_scale+0.01;
                            this.Collisions_.Left = true;
                            Player.Vector_.x = 0;
                            break;
                        };
                    };
                };
            };
            
            
            if(Player.Vector_.y !== 0)
            {
                this.VectorCoefficient_.y = Math.sign(Player.Vector_.y);
                
                if(this.VectorCoefficient_.y === 1) //bottom
                {
                    for(let k = this.CS.CollisionSquareArea_.StartCoords_.y+1 ; k < this.CS.CollisionSquareArea_.EndCoords_.y+1 ; k++)
                    {     
                        // console.log(Math.floor(this.PlayerResizedVector_.y+this.PlayerResizedCoords_.y+Player.HitBox_.resized_down_side), k)
                        if(this.hitboxCollisionSizer("vertical", k)
                        && this.PlayerResizedCoords_.CenteredHitbox_.y                            <= k-Player.HitBox_.resized_vertical_center
                        && this.PlayerResizedCoords_.CenteredHitbox_.y+this.PlayerResizedVector_.y > k-Player.HitBox_.resized_vertical_center
                        || this.antiCornerThrough(k))
                        {
                            Player.Position_.y = (k-Player.HitBox_.resized_down_side)*this.original_block_scale-0.01;
                            Player.Vector_.y = 0;
                            this.Collisions_.Bottom = true;
                            break;
                        };
                    };
                }
                else //top
                {
                    for(let k = this.CS.CollisionSquareArea_.EndCoords_.y-1 ; k > this.CS.CollisionSquareArea_.StartCoords_.y-1 ; k--)
                    {
                        if(this.hitboxCollisionSizer("vertical", k)
                        && this.PlayerResizedCoords_.CenteredHitbox_.y                            >= k+Player.HitBox_.resized_vertical_center+1
                        && this.PlayerResizedCoords_.CenteredHitbox_.y+this.PlayerResizedVector_.y < k+Player.HitBox_.resized_vertical_center+1
                        || this.antiCornerThrough(k))
                        {
                            Player.Position_.y = (k-Player.HitBox_.resized_top_side+1)*this.original_block_scale+0.01;
                            Player.Vector_.y = 0;
                            this.Collisions_.Top = true;
                            break;
                        };
                    };
                }
            };

            this.distanceground = false;
            for(let k = this.CS.CollisionSquareArea_.StartCoords_.y+1 ; k < this.CS.CollisionSquareArea_.EndCoords_.y+2 ; k++)
            {
                if(this.hitboxCollisionSizer("vertical", k))
                {
                    this.distanceground = true;
                };
            };

            // Block the player when it goes further the map lim
            if(Player.Position_.x+Player.HitBox_.scaled_left_side <= 0)
            {
                Player.Position_.x               = -Player.HitBox_.scaled_left_side;
                Player.Vector_.x        = 0;
                this.Collisions_.Left   = true;
            }
            else if(Player.Position_.x+Player.HitBox_.scaled_right_side >= (this.map_limit.x+1)*this.original_block_scale)
            {
                Player.Position_.x               = (this.map_limit.x+1)*this.original_block_scale-Player.HitBox_.scaled_right_side;
                Player.Vector_.x        = 0;
                this.Collisions_.Right  = true;
            }
            if(Player.Position_.y+Player.HitBox_.scaled_down_side >= (this.map_limit.y+1)*this.original_block_scale)
            {
                Player.Position_.y               = (this.map_limit.y+1)*this.original_block_scale-Player.HitBox_.scaled_down_side;
                Player.Vector_.y        = 0;
                this.Collisions_.Bottom = true;
            }
            else if(Player.Position_.y+Player.HitBox_.scaled_top_side <= 0)
            {
                Player.Position_.y               = -Player.HitBox_.scaled_top_side;
                Player.Vector_.y        = 0;
                this.Collisions_.Top    = true;
            }
            
            Player.walljump = 0;
            if(this.Collisions_.Bottom === false && Player.Vector_.y >= 0 && this.distanceground === false)
            {
                if(this.right_collisions_map[Math.floor(this.PlayerResizedCoords_.y+Player.HitBox_.resized_down_side)][Math.ceil((Player.Position_.x+Player.HitBox_.scaled_right_side)/this.original_block_scale)]
                && Math.ceil((Player.Position_.x+Player.HitBox_.scaled_right_side)/this.original_block_scale)*this.original_block_scale >= Player.Position_.x+Player.HitBox_.scaled_right_side
                && Math.ceil((Player.Position_.x+Player.HitBox_.scaled_right_side)/this.original_block_scale)*this.original_block_scale-Player.wall_contact <=  Player.Position_.x+Player.HitBox_.scaled_right_side)
                {
                    Player.walljump = 1; //Right
                }
                else if(this.left_collisions_map[Math.floor(this.PlayerResizedCoords_.y+Player.HitBox_.resized_down_side)][Math.floor((Player.Position_.x+Player.HitBox_.scaled_left_side)/this.original_block_scale-1)]
                &&    Math.floor((Player.Position_.x+Player.HitBox_.scaled_left_side)/this.original_block_scale)*this.original_block_scale <= Player.Position_.x+Player.HitBox_.scaled_left_side
                &&      Math.floor((Player.Position_.x+Player.HitBox_.scaled_left_side)/this.original_block_scale)*this.original_block_scale+Player.wall_contact >=  Player.Position_.x+Player.HitBox_.scaled_left_side)
                {
                    Player.walljump = -1; //Left
                };
            };

            

            



        }
        this.collisions_loop_log = this.CollisionsLoop.endLogTime(300*(GameMenu.physics_speed/60));
    }

    display()
    {
        this.GraphicsLoop.startTime()


        this.Offset_.x                 = Player.Position_.x-(GV.canvas_width-Player.HitBox_.scaled_width)/2+Player.HitBox_.scaled_left_side;
        if(this.Offset_.x < 0){this.Offset_.x = 0;}
        else if(this.Offset_.x         > this.map_limit.x*this.original_block_scale-GV.canvas_width+this.original_block_scale)
        {this.Offset_.x                = this.map_limit.x*this.original_block_scale-GV.canvas_width+this.original_block_scale;};

        this.CameraSmoother_.InterpoledValue_.x =
        this.Offset_.InterpoledValue_.x       = this.Offset_.Previous_.x     +this.Offset_.InterpolationValue_.x*Fps.nbofframewithoutphysics;
        if(GV.camsmootherenable)
        {this.CameraSmoother_.InterpoledValue_.x = this.CameraSmoother_.Previous_.x+this.CameraSmoother_.InterpolationValue_.x*Fps.nbofframewithoutphysics;}
        
        this.interpoled_difference_smoother_offset_x = this.Offset_.InterpoledValue_.x-this.CameraSmoother_.InterpoledValue_.x;

        

        this.Offset_.y                 = Player.Position_.y-(GV.canvas_height-Player.HitBox_.height)/2;
        if(this.Offset_.y < 0){this.Offset_.y = 0;}
        else if(this.Offset_.y         > this.map_limit.y*this.original_block_scale-GV.canvas_height+this.original_block_scale)
        {this.Offset_.y                = this.map_limit.y*this.original_block_scale-GV.canvas_height+this.original_block_scale;};
        
        this.CameraSmoother_.InterpoledValue_.y =
        this.Offset_.InterpoledValue_.y       = this.Offset_.Previous_.y     +this.Offset_.InterpolationValue_.y*Fps.nbofframewithoutphysics;
        if(GV.camsmootherenable)
        {this.CameraSmoother_.InterpoledValue_.y = this.CameraSmoother_.Previous_.y+this.CameraSmoother_.InterpolationValue_.y*Fps.nbofframewithoutphysics;}
        
        this.interpoled_difference_smoother_offset_y = this.Offset_.InterpoledValue_.y-this.CameraSmoother_.InterpoledValue_.y;


        
        this.offsetsmoothX                     = Math.round(Tools.resolutionScaler(this.CameraSmoother_.InterpoledValue_.x));
        this.offsetsmoothY                     = Math.round(Tools.resolutionScaler(this.CameraSmoother_.InterpoledValue_.y));
        this.pre_snap_offset_smooth_X          = this.offsetsmoothX/this.pre_block_scaling_unround;
        this.pre_snap_offset_smooth_Y          = this.offsetsmoothY/this.pre_block_scaling_unround;
        this.pre_snap_offset_smooth_X_floor    = Math.floor(this.offsetsmoothX/this.pre_block_scaling_unround);
        
        if(GV.devmode){
            ctx.lineWidth = Tools.resolutionScaler(0.5*(this.original_block_scale/71)); //a corriger
            ctx.font      = Tools.resolutionScaler(15 *(this.original_block_scale/71))+'px arial'; //a corriger
        }
        this.operation_count = 0;
        if(this.CameraSmoother_.InterpoledValue_.y < 0){this.CameraSmoother_.InterpoledValue_.y = 0;};
        if(this.pre_snap_offset_smooth_X_floor < 0){this.pre_snap_offset_smooth_X_floor = 0;};
        // ctx.drawImage(this.bg, -this.Offset_.x/4.05, -this.Offset_.y/(canvas.height*1.2-canvas.height), canvas.width*1.2, canvas.height*1.2);
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
        for(let i = Math.floor(this.CameraSmoother_.InterpoledValue_.y/this.original_block_scale); i < this.pre_snap_offset_smooth_Y+GV.canvas_height/this.original_block_scale; i++) //Affichage des textures
        {
            if(i > this.map_limit.y){break;};
            this.pre_vertical_position_line_block_displayed = Math.round(i*this.pre_block_scaling_unround-this.offsetsmoothY);
            this.index_value                                = this.block_index[i][this.pre_snap_offset_smooth_X_floor];

            this.selected_horizontal_block_index_array = this.block_map_snap_position[i];
            
            this.selected_horizontal_block_map_type_texture_array = this.block_map_type_texture[i];

            for (let k = this.index_value; k-1 <= this.index_value+canvas.width/this.pre_block_scaling_unround; k++) //remodifier par canvas.width
            {
                if(this.selected_horizontal_block_index_array[k] >   this.pre_snap_offset_smooth_X+canvas.width/this.pre_block_scaling_unround //remodifier par canvas.width
                || this.selected_horizontal_block_index_array[k] === this.selected_horizontal_block_index_array[-1])
                {
                    if(GV.devmode){
                        ctx.fillStyle = "rgba(0,0,255,0.25)";
                        ctx.fillRect(this.block_map[i][k-1]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                                     this.pre_block_scaling,                    this.pre_block_scaling);
                    };
                    break;
                };
                switch(this.selected_horizontal_block_map_type_texture_array[k][0]) // selection des textures
                {
                    case 0:
                        ctx.drawImage(this.testblock, 
                                      this.block_map[i][k]-this.offsetsmoothX,                         this.pre_vertical_position_line_block_displayed, 
                                      this.pre_block_scaling,                                          this.pre_block_scaling); //testblock
                        break
                    case 1:
                        ctx.drawImage(this.grass_blocks, 
                                    ((this.selected_horizontal_block_map_type_texture_array[k][1]+4)%4)*this.pre_block_scale, 
                           Math.floor(this.selected_horizontal_block_map_type_texture_array[k][1]/4)   *this.pre_block_scale,

                                      this.pre_block_scale,                                             this.pre_block_scale,
                                      this.block_map[i][k]-this.offsetsmoothX,                          this.pre_vertical_position_line_block_displayed, 
                                      this.pre_block_scaling+1,                                         this.pre_block_scaling+1);
                        break;
                }
                if(GV.devmode) //Affichage position de chaque block
                {
                    this.operation_count++;
                    ctx.lineWidth = 1;
                    Tools.logText("["+this.block_map_snap_position[i][k]+" : "+i+"]", 
                                  this.block_map_snap_position[i][k]*this.original_block_scale-this.CameraSmoother_.InterpoledValue_.x+5, 
                                  i*this.original_block_scale-this.CameraSmoother_.InterpoledValue_.y+20);
                    Tools.logText("["+this.operation_count+"]", 
                                  this.block_map_snap_position[i][k]*this.original_block_scale-(this.CameraSmoother_.InterpoledValue_.x)+5, 
                                  i*this.original_block_scale-this.CameraSmoother_.InterpoledValue_.y+60);
                };
            };
            if(GV.devmode){
                ctx.fillStyle = "rgba(255,255,0,0.2)";
                ctx.fillRect(this.block_map[i][this.index_value]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                             this.pre_block_scaling,                                 this.pre_block_scaling);
            };
        };

        if(GV.devmode) //Affichage debug des collisions
        {
            ctx.font      = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(1);
            Tools.logText("-Count : "+this.operation_count, 40, 225, GV.ColorPalette_.green, GV.ColorPalette_.dark_green);
            // Tools.logText("-Collide Count : "+this.block_in_test_collision_area_count, 40, 250, GV.ColorPalette_.green, GV.ColorPalette_.dark_green);
            
        };
        this.graphics_loop_log = this.GraphicsLoop.endLogTime(300*(GameMenu.physics_speed/60));
    };

    levelReaderLogs()
    {
        if(GV.devmode)
        {
            ctx.font      = Tools.resolutionScaler(15)+'px arial';
            Tools.logText("["+Math.round((Player.Position_.x)/this.original_block_scale)+" : "+Math.round((Player.Position_.y)/this.original_block_scale)+"]", 
            (Player.positionning_x/Tools.ratio)+50,                                              (Player.positionning_y/Tools.ratio)+20);

            // ctx.lineWidth   = Tools.resolutionScaler(2);
            // ctx.strokeStyle = GV.ColorPalette_.black;
            // ctx.strokeRect(Player.positionning_x,  Player.positionning_y, 
            //                this.pre_block_scaling, this.pre_block_scaling);
            ctx.strokeStyle = GV.ColorPalette_.gray;
            ctx.strokeRect(Tools.resolutionScaler(Player.HitBox_.scaled_left_side)+Player.positionning_x, Tools.resolutionScaler(Player.HitBox_.scaled_top_side)+Player.positionning_y, 
                           Tools.resolutionScaler(Player.HitBox_.scaled_width),                      Tools.resolutionScaler(Player.HitBox_.scaled_height));

            ctx.lineWidth   = Tools.resolutionScaler(4);
            ctx.strokeStyle = GV.ColorPalette_.yellow;

            ctx.strokeRect(Tools.resolutionScaler(Player.playerPositionner(this.CS.CollisionSquareArea_.StartCoords_.x*this.original_block_scale, this.CameraSmoother_.InterpoledValue_.x)),
                           Tools.resolutionScaler(Player.playerPositionner(this.CS.CollisionSquareArea_.StartCoords_.y*this.original_block_scale, this.CameraSmoother_.InterpoledValue_.y)),
                           Tools.resolutionScaler(((this.CS.CollisionSquareArea_.EndCoords_.x-this.CS.CollisionSquareArea_.StartCoords_.x)*this.original_block_scale+this.original_block_scale)), 
                           Tools.resolutionScaler(((this.CS.CollisionSquareArea_.EndCoords_.y-this.CS.CollisionSquareArea_.StartCoords_.y)*this.original_block_scale+this.original_block_scale)));



            ctx.lineWidth = Tools.resolutionScaler(3);
            ctx.strokeStyle = GV.ColorPalette_.red;
            ctx.beginPath();
            ctx.moveTo(Tools.resolutionScaler(Player.HitBox_.scaled_horizontal_center+Player.HitBox_.scaled_horizontal_offset)                 +Player.positionning_x, 
                       Tools.resolutionScaler(Player.HitBox_.scaled_vertical_center  +Player.HitBox_.scaled_vertical_offset)                   +Player.positionning_y);

            ctx.lineTo(Tools.resolutionScaler(Player.HitBox_.scaled_horizontal_center+Player.HitBox_.scaled_horizontal_offset+Player.Vector_.x)+Player.positionning_x, 
                       Tools.resolutionScaler(Player.HitBox_.scaled_vertical_center  +Player.HitBox_.scaled_vertical_offset  +Player.Vector_.y)+Player.positionning_y);
            ctx.stroke();

            ctx.lineWidth = Tools.resolutionScaler(2);

            ctx.strokeStyle = GV.ColorPalette_.blue;
            ctx.strokeRect(Tools.resolutionScaler(Player.HitBox_.scaled_left_side+Player.Vector_.x)+Player.positionning_x, Tools.resolutionScaler(Player.HitBox_.scaled_top_side+Player.Vector_.y)+Player.positionning_y, 
                           Tools.resolutionScaler(Player.HitBox_.scaled_width),                      Tools.resolutionScaler(Player.HitBox_.scaled_height));

            ctx.strokeStyle = GV.ColorPalette_.gray;
            ctx.strokeRect(Tools.resolutionScaler(Player.HitBox_.scaled_left_side)+Player.positionning_x, Tools.resolutionScaler(Player.HitBox_.scaled_top_side)+Player.positionning_y, 
                           Tools.resolutionScaler(Player.HitBox_.scaled_width),                      Tools.resolutionScaler(Player.HitBox_.scaled_height));
        };
    };

    requiredDisplayVariableUpdater()
    {
        this.pre_block_scaling_unround = Tools.resolutionScalerUnround(this.original_block_scale);
        this.pre_block_scaling         = Tools.resolutionScaler       (this.original_block_scale);
        this.block_map                 = [];
        Player.modifyHitBox(this.original_block_scale/24, 
                            Player.HitBox_.width, Player.HitBox_.horizontal_offset, 
                            Player.HitBox_.height,   Player.HitBox_.vertical_offset,
                            this.original_block_scale);
        if(this.pre_block_scale === 24)
        {
            this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png");
        }else{
            this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass_12px.png");
        };

        for(let i = 0; i < this.map_limit.y+1; i++)
        {
            this.block_map.push([]);
        };
        for(let i = 0; i < this.map_limit.y+1; i++)
        {
            for(let k = 0; k < this.block_map_snap_position[i].length; k++)
            {
                this.block_map[i].push(Math.round(this.block_map_snap_position[i][k]*this.pre_block_scaling_unround));
            };
        };
    };

    fcamsmoother()
    {
        this.CamSmootherLoop.startTime();
        if(Pause.pause === false)    
        {
            this.CameraSmoother_.Previous_.x = this.CameraSmoother_.x;
            this.CameraSmoother_.Previous_.y = this.CameraSmoother_.y;
            if(GV.camsmootherenable) //smooth the camera
            {
                this.previousoffset.unshift([Math.round(this.Offset_.x), Math.round(this.Offset_.y)]);
                this.previousoffset.lenght  = 16;
                this.CameraSmoother_.x         = Math.round((this.previousoffset[0][0] + this.previousoffset[1][0] + this.previousoffset[2][0] + this.previousoffset[3][0] +
                                                         this.previousoffset[4][0] + this.previousoffset[5][0] + this.previousoffset[6][0] + this.previousoffset[7][0] )/8);

                this.CameraSmoother_.y         = Math.round((this.previousoffset[0][1] + this.previousoffset[1][1] + this.previousoffset[2][1] + this.previousoffset[3][1] +
                                                         this.previousoffset[4][1] + this.previousoffset[5][1] + this.previousoffset[6][1] + this.previousoffset[7][1] +
                                                         this.previousoffset[8][1] + this.previousoffset[9][1] + this.previousoffset[10][1]+ this.previousoffset[11][1]+
                                                         this.previousoffset[12][1]+ this.previousoffset[13][1]+ this.previousoffset[14][1]+ this.previousoffset[15][1])/16);
            };
        };
        if(GV.camsmootherenable || Fullscreen.fullscreen_change) //smooth the camera
        {
            this.CameraSmoother_.x         = Math.round((this.previousoffset[0][0] + this.previousoffset[1][0] + this.previousoffset[2][0] + this.previousoffset[3][0] +
                                                     this.previousoffset[4][0] + this.previousoffset[5][0] + this.previousoffset[6][0] + this.previousoffset[7][0] )/8);
                                                     
            this.CameraSmoother_.y         = Math.round((this.previousoffset[0][1] + this.previousoffset[1][1] + this.previousoffset[2][1] + this.previousoffset[3][1] +
                                                     this.previousoffset[4][1] + this.previousoffset[5][1] + this.previousoffset[6][1] + this.previousoffset[7][1] +
                                                     this.previousoffset[8][1] + this.previousoffset[9][1] + this.previousoffset[10][1]+ this.previousoffset[11][1]+
                                                     this.previousoffset[12][1]+ this.previousoffset[13][1]+ this.previousoffset[14][1]+ this.previousoffset[15][1])/16);
        };
        this.cam_smoother_loop_log         = this.CamSmootherLoop.endLogTime(300*(GameMenu.physics_speed/60));
    };

    reset()
    {
        
    };
};

export{Map_Data};