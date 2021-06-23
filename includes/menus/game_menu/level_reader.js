import {ctx, GV, Tools, Player, canvas, Fps} from "../../../main.js";
import {Timer_Log} from "../../tools.js";

var testblock = new Image();
testblock.src = "graphics/map_content/test_block.png";


var a = 0;






class Map_Data
{   
    constructor()
    {
        this.collisions = {"Top" : true, "Bottom" : true, "Left" : true, "Right" : true};
        this.reversed_k = 0;
        this.reversed_i = 0;
        this.map_limit = {"x" : 0, "y" : 0};
        this.spawn = {"x" : 0, "y" : 0};
        this.top_collisions_map = [];
        this.bottom_collisions_map = [];
        this.left_collisions_map = [];
        this.right_collisions_map = [];

        this.offset_x = 0;
        this.offset_y = 0;
        this.previous_offset_x = 0;
        this.previous_offset_y = 0;
        this.offset_interpo_x = 0;
        this.offset_interpo_y = 0;
        this.interpoled_offset_x = 0;
        this.interpoled_offset_y = 0;

        this.camsmoother_x = 0;
        this.camsmoother_y = 0;
        this.previous_camsmoother_x = 0;
        this.previous_camsmoother_y = 0;
        this.smooth_interpo_x = 0;
        this.smooth_interpo_y = 0;
        this.interpoled_camsmoother_x = 0;
        this.interpoled_camsmoother_y = 0;
        
        
        this.cache_data = 0;
        

        this.i_define = 0;

        this.block_map = [0]
        this.block_map_snap_position = [0]
        this.block_index = [0]
        this.index_value = 0;
        this.block_map_type_texture = [0]
        this.all_block_map_count = 0;
        this.operation_count = 0;

        //Camera smoother
        this.player_vect_x = 0;
        this.player_vect_y = 0;

        //Optimisation
        this.pre_block_scale = 24;
        this.original_block_scale = 70;
        this.original_block_scale_graphical_scaled = this.original_block_scale;
        this.pre_block_scaling = this.original_block_scale;
        this.pre_block_scaling_unround = this.original_block_scale;
        this.pre_snap_offset_smooth_X = 0;
        this.pre_snap_offset_smooth_Y = 0;
        this.pre_snap_offset_smooth_X_minus_05 = 0;
        // this.pre_snap_offset_smooth_Y_minus_05 = 0;
        this.pre_vertical_position_line_block_displayed = 0;


        this.stock = [];
        this.collisions_calculation_divider = 0;
        this.a = 0;
        this.bestup = [false,false,false,false]; //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
        this.bestdown = [false,false,false,false,false]; // ordre px,py;ox,oy
        this.bestleft = [false,false,false,false];
        this.bestright = [false,false,false,false];
        this.previousoffset = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
        this.camsmoother = [0, 0];
        this.previouscamsmoother = [0,0];
        this.level_data_textures = [];
        this.data_temp = [];
        this.bg = Tools.textureLoader("graphics/map_content/background.png");
        this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png");
        this.testblock = Tools.textureLoader("graphics/map_content/test_block.png");
        this.CollisionsLoop = new Timer_Log();
        this.GraphicsLoop = new Timer_Log();
        this.CamSmootherLoop = new Timer_Log();
        this.collisions_loop_log = 0;
        this.graphics_loop_log = 0;
        this.cam_smoother_loop_log = 0;

        this.pre_part_calculed_horizontal_start_square_collisions_test_area = 0;
        this.pre_part_calculed_horizontal_end_square_collisions_test_area   = 0;
        this.pre_part_calculed_vertical_start_square_collisions_test_area   = 0;
        this.pre_part_calculed_vertical_end_square_collisions_test_area     = 0;
        this.start_square_collisions_test_area = [0, 0];
        this.end_square_collisions_test_area   = [0, 0];
        this.block_in_test_collision_area_count = 0;
        this.nearest_vertical_collision   = 0;
        this.nearest_horizontal_collision = 0;
    }



    start(file, editedlevelid)
    {
        this.collisions = {"Top" : true, "Bottom" : true, "Left" : true, "Right" : true}
        this.top_collisions_map = [];
        this.bottom_collisions_map = [];
        this.left_collisions_map = [];
        this.right_collisions_map = [];
        this.map_limit = file.MapDatas[editedlevelid].Map_limit;
        this.spawn = file.MapDatas[editedlevelid].Player_spawn;
        Player.x = this.spawn.x*this.original_block_scale;
        Player.y = this.spawn.y*this.original_block_scale;
        this.all_block_map_count = file.MapDatas[editedlevelid].Blocks.length;
        Player.modifyHitBox(this.original_block_scale/this.pre_block_scale, Player.horizontal_hit_box, Player.horizontal_hit_box_offset, Player.vertical_hit_box, Player.vertical_hit_box_offset)
        // Player.positionning_x = Tools.resolutionScaler(Player.playerPositionner(Player.x, this.offset_x));
        // Player.positionning_y = Tools.resolutionScaler(Player.playerPositionner(Player.y, this.offset_y));
        // this.previousoffset = [[Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y],
        //                        [Player.positionning_x, Player.positionning_y], [Player.positionning_x, Player.positionning_y]];
        
        // console.log(file.MapDatas[editedlevelid])

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
    
        console.log(this.bottom_collisions_map);
        

        
        // console.log(Player.x,py);

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
                }
            }
        }
        for(let i = 0; i < this.block_map_type_texture.length; i++){
            this.cache_data = [];
            for(let k = 0; k < this.block_map_snap_position[i].length; k++){
                this.cache_data.push(this.block_map_type_texture[i][this.block_map_snap_position[i][k]]);
            }
            this.block_map_type_texture[i] = this.cache_data
        }
        
        // console.log(this.block_map)
        // console.log(this.block_map_snap_position)
        // console.log(this.block_index)
        // console.log(this.block_map_type_texture)
        this.requiredDisplayVariableUpdater();

        this.previousoffset = [[this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y],
                               [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y],
                               [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y],
                               [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y], [this.offset_x, this.offset_y]];
    }

    collider(pause)
    {
        this.CollisionsLoop.startTime();
        if(pause === false)    
        {    
            this.collisions         = {"Top" : false, "Bottom" : false, "Left" : false, "Right" : false};
            this.invalid_collisions = {"Top" : false, "Bottom" : false, "Left" : false, "Right" : false};

            
            
            // block the player moving when he reach a border of the canvas
            if(Player.x+Player.adapted_horizontal_hit_box_offset <= 0)
            {
                Player.x               = -Player.adapted_horizontal_hit_box_offset;
                Player.vector_X        = 0;
                this.collisions.Left   = true;
            }
            else if(Player.x+Player.adapted_horizontal_hit_box_offset+Player.adapted_horizontal_hit_box >= (this.map_limit.x+1)*this.original_block_scale)
            {
                Player.x               = (this.map_limit.x+1)*this.original_block_scale-Player.adapted_horizontal_hit_box_offset-Player.adapted_horizontal_hit_box;
                Player.vector_X        = 0;
                this.collisions.Right  = true;
            }
            if(Player.y+Player.adapted_vertical_hit_box_offset+Player.adapted_vertical_hit_box >= (this.map_limit.y+1)*this.original_block_scale)
            {
                Player.y               = (this.map_limit.y+1)*this.original_block_scale-Player.adapted_vertical_hit_box_offset-Player.adapted_vertical_hit_box;
                Player.vector_Y        = 0;
                this.collisions.Bottom = true;
            }
            else if(Player.y+Player.adapted_vertical_hit_box_offset <= 0)
            {
                Player.y               = -Player.adapted_vertical_hit_box_offset;
                Player.vector_Y        = 0;
                this.collisions.Top    = true;
            }

            this.pre_part_calculed_horizontal_start_square_collisions_test_area = Player.x+Player.adapted_horizontal_hit_box_offset;
            this.pre_part_calculed_horizontal_end_square_collisions_test_area   = Player.x+Player.adapted_horizontal_hit_box_offset+Player.adapted_horizontal_hit_box;
            this.pre_part_calculed_vertical_start_square_collisions_test_area   = Player.y+Player.adapted_vertical_hit_box_offset;
            this.pre_part_calculed_vertical_end_square_collisions_test_area     = Player.y+Player.adapted_vertical_hit_box_offset+Player.adapted_vertical_hit_box;
            
            if(Player.vector_X !== 0){
                this.pre_part_calculed_horizontal_start_square_collisions_test_area += Player.vector_X;
            };
            if(Player.vector_Y !== 0){
                this.pre_part_calculed_vertical_start_square_collisions_test_area   += Player.vector_Y;
            };
            
            this.start_square_collisions_test_area = [Math.trunc(this.pre_part_calculed_horizontal_start_square_collisions_test_area/this.original_block_scale), 
                                                      Math.trunc(this.pre_part_calculed_vertical_start_square_collisions_test_area  /this.original_block_scale)];
            this.end_square_collisions_test_area   = [Math.trunc(this.pre_part_calculed_horizontal_end_square_collisions_test_area  /this.original_block_scale), 
                                                      Math.trunc(this.pre_part_calculed_vertical_end_square_collisions_test_area    /this.original_block_scale)];



        }
        this.collisions_loop_log = this.CollisionsLoop.endLogTime();
        // return [Player.x, Player.y];
    }

    display()
    {
        this.GraphicsLoop.startTime()


        this.offset_x                 = Player.x-(GV.canvas_witdh-Player.adapted_horizontal_hit_box)/2+Player.adapted_horizontal_hit_box_offset;
        if(this.offset_x < 0){this.offset_x = 0;}
        else if(this.offset_x         > this.map_limit.x*this.original_block_scale-GV.canvas_witdh+this.original_block_scale)
        {this.offset_x                = this.map_limit.x*this.original_block_scale-GV.canvas_witdh+this.original_block_scale;};
        this.interpoled_offset_x      = this.offset_x+this.offset_interpo_x*Fps.nbofframewithoutphysics;
        this.interpoled_camsmoother_x = this.camsmoother_x+this.smooth_interpo_x*Fps.nbofframewithoutphysics;

        this.offset_y                 = Player.y-(GV.canvas_height-this.original_block_scale)/2;
        if(this.offset_y < 0){this.offset_y = 0;}
        else if(this.offset_y         > this.map_limit.y*this.original_block_scale-GV.canvas_height+this.original_block_scale)
        {this.offset_y                = this.map_limit.y*this.original_block_scale-GV.canvas_height+this.original_block_scale;};
        this.interpoled_offset_y      = this.offset_y+this.offset_interpo_y*Fps.nbofframewithoutphysics;
        this.interpoled_camsmoother_y = this.camsmoother_y+this.smooth_interpo_y*Fps.nbofframewithoutphysics;
        
        this.offsetsmoothX                     = Math.round(Tools.resolutionScaler(this.interpoled_offset_x-this.interpoled_camsmoother_x));
        this.offsetsmoothY                     = Math.round(Tools.resolutionScaler(this.interpoled_offset_y-this.interpoled_camsmoother_y));
        this.pre_snap_offset_smooth_X          = Math.round(this.offsetsmoothX/this.pre_block_scaling);
        this.pre_snap_offset_smooth_Y          = Math.round(this.offsetsmoothY/this.pre_block_scaling);
        this.pre_snap_offset_smooth_X_minus_05 = Math.round(this.offsetsmoothX/this.pre_block_scaling-0.5);
        // this.pre_snap_offset_smooth_Y_minus_05 = Math.round(this.pre_snap_offset_smooth_Y-0.5);
        
        if(GV.devmode){
            ctx.lineWidth = Tools.resolutionScaler(0.5*(this.original_block_scale/71));
            ctx.font      = Tools.resolutionScaler(15 *(this.original_block_scale/71))+'px arial';
        }
        this.i_define        = 0;
        this.operation_count = 0;
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
        if(this.i_define < this.pre_snap_offset_smooth_Y)
        {
            this.i_define = Math.round(Math.round(this.interpoled_offset_y-this.interpoled_camsmoother_y)/this.original_block_scale-0.5)
        }
        for(let i = this.i_define; i < this.pre_snap_offset_smooth_Y+675/this.original_block_scale; i++) //Affichage des textures
        {
            if(i > this.map_limit.y){break;};
            this.pre_vertical_position_line_block_displayed = Math.round(i*this.pre_block_scaling_unround-this.offsetsmoothY);
            this.index_value                                = this.block_index[i][this.pre_snap_offset_smooth_X_minus_05];

            for (let k = this.index_value; k < this.index_value+1200/this.original_block_scale+1; k++)
            {
                if(this.block_map_snap_position[i][k] >   this.pre_snap_offset_smooth_X+(1200/this.original_block_scale) 
                || this.block_map_snap_position[i][k] === this.block_map_snap_position[i][-1])
                {
                    if(GV.devmode){
                        ctx.fillStyle = "rgba(0,0,255,0.25)";
                        ctx.fillRect(this.block_map[i][k-1]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                                     this.pre_block_scaling,                    this.pre_block_scaling);
                    };
                    break;
                };
                switch(this.block_map_type_texture[i][k][0]) // selection des textures
                {
                    case 0:
                        ctx.drawImage(this.testblock, 
                                      this.block_map[i][k]-this.offsetsmoothX,                         this.pre_vertical_position_line_block_displayed, 
                                      this.pre_block_scaling,                                          this.pre_block_scaling); //testblock
                        break
                    case 1:
                        ctx.drawImage(this.grass_blocks, 
                                    ((this.block_map_type_texture[i][k][1]+4)%4)*this.pre_block_scale, Math.floor(this.block_map_type_texture[i][k][1]/4)*this.pre_block_scale, 
                                      this.pre_block_scale,                                            this.pre_block_scale,
                                      this.block_map[i][k]-this.offsetsmoothX,                         this.pre_vertical_position_line_block_displayed, 
                                      this.pre_block_scaling+1,                                        this.pre_block_scaling+1);
                        break;
                }
                if(GV.devmode) //Affichage position de chaque block
                {
                    this.operation_count++;
                    ctx.lineWidth = Tools.resolutionScaler(0.01);
                    Tools.logText("["+this.block_map_snap_position[i][k]+" : "+i+"]", 
                                  this.block_map_snap_position[i][k]*this.original_block_scale-(this.interpoled_offset_x-this.interpoled_camsmoother_x)+5, 
                                  i*this.original_block_scale-(this.interpoled_offset_y-this.interpoled_camsmoother_y)+20);
                    Tools.logText("["+this.operation_count+"]", 
                                  this.block_map_snap_position[i][k]*this.original_block_scale-(this.interpoled_offset_x-this.interpoled_camsmoother_x)+5, 
                                  i*this.original_block_scale-(this.interpoled_offset_y-this.interpoled_camsmoother_y)+60);
                }
            }
            if(GV.devmode){
                ctx.fillStyle = "rgba(255,255,0,0.2)";
                ctx.fillRect(this.block_map[i][this.index_value]-this.offsetsmoothX, this.pre_vertical_position_line_block_displayed, 
                             this.pre_block_scaling,                                 this.pre_block_scaling);
            }
        }

        if(GV.devmode) //Affichage debug des collisions
        {
            ctx.font      = Tools.resolutionScaler(20)+'px arial';
            ctx.lineWidth = Tools.resolutionScaler(1);
            Tools.logText("-Count : "+this.operation_count, 40, 225, "rgb(0,255,0)", "rgb(0,100,0)");
            Tools.logText("-Collide Count : "+this.block_in_test_collision_area_count, 40, 250, "rgb(0,255,0)", "rgb(0,100,0)");
            
            ctx.font      = Tools.resolutionScaler(15)+'px arial';
            Tools.logText("["+Math.round((Player.x)/this.original_block_scale)+" : "+Math.round((Player.y)/this.original_block_scale)+"]", 
            this.interpoled_camsmoother_x+(Player.positionning_x/Tools.ratio)+50,                                              this.interpoled_camsmoother_y+(Player.positionning_y/Tools.ratio)+20);

            

            ctx.lineWidth   = Tools.resolutionScaler(2);
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.strokeRect(Tools.resolutionScaler(this.interpoled_camsmoother_y)+Player.positionning_x,                         Tools.resolutionScaler(this.interpoled_camsmoother_y)+Player.positionning_y, 
                           this.pre_block_scaling,                                     this.pre_block_scaling);

            ctx.strokeStyle = "rgb(150,150,150)";
            ctx.strokeRect(Tools.resolutionScaler(this.interpoled_camsmoother_x+Player.adapted_horizontal_hit_box_offset)+Player.positionning_x,   Tools.resolutionScaler(this.interpoled_camsmoother_y+Player.adapted_vertical_hit_box_offset)+Player.positionning_y, 
                           Tools.resolutionScaler(Player.adapted_horizontal_hit_box),                     Tools.resolutionScaler(Player.adapted_vertical_hit_box));
            
            ctx.lineWidth   = Tools.resolutionScaler(4);
            ctx.strokeStyle = ctx.fillStyle = "rgb(255,255,0)";

            
            ctx.strokeRect(Tools.resolutionScaler(Player.playerPositionner(this.start_square_collisions_test_area[0]*this.original_block_scale, this.interpoled_offset_x)),
                           Tools.resolutionScaler(Player.playerPositionner(this.start_square_collisions_test_area[1]*this.original_block_scale, this.interpoled_offset_y)),
                           Tools.resolutionScaler(((this.end_square_collisions_test_area[0]-this.start_square_collisions_test_area[0])*this.original_block_scale+this.original_block_scale)), 
                           Tools.resolutionScaler(((this.end_square_collisions_test_area[1]-this.start_square_collisions_test_area[1])*this.original_block_scale+this.original_block_scale)));

            ctx.lineWidth   = Tools.resolutionScaler(3);
            ctx.strokeStyle = ctx.fillStyle = "rgb(150,150,0)";
            ctx.beginPath();
            ctx.moveTo(Tools.resolutionScaler(this.interpoled_camsmoother_x+Player.adapted_horizontal_hit_box_offset)+Player.positionning_x,                 Tools.resolutionScaler(this.interpoled_camsmoother_y)+Player.positionning_y);
            ctx.lineTo(Tools.resolutionScaler(this.interpoled_camsmoother_x+Player.adapted_horizontal_hit_box_offset-Player.vector_X)+Player.positionning_x, Tools.resolutionScaler(this.interpoled_camsmoother_y-Player.vector_Y)+Player.positionning_y);
            ctx.stroke();
        }
        this.graphics_loop_log = this.GraphicsLoop.endLogTime()
    }

    requiredDisplayVariableUpdater()
    {
        // this.pre_block_scale = 24;
        this.pre_block_scaling_unround = Tools.resolutionScalerUnround(this.original_block_scale);
        this.pre_block_scaling         = Tools.resolutionScaler       (this.original_block_scale);
        this.block_map                 = [];
        Player.modifyHitBox(this.original_block_scale/this.pre_block_scale, Player.horizontal_hit_box, Player.horizontal_hit_box_offset, Player.vertical_hit_box, Player.vertical_hit_box_offset)
        if(this.pre_block_scale === 24)
        {
            this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass.png");
        }else{
            this.grass_blocks = Tools.textureLoader("graphics/map_content/harmonic_grass_12px.png");
        }

        for(let i = 0; i < this.map_limit.y+1; i++)
        {
            this.block_map.push([]);
        }
        for(let i = 0; i < this.map_limit.y+1; i++)
        {
            for(let k = 0; k < this.block_map_snap_position[i].length; k++)
            {
                this.block_map[i].push(Math.round(this.block_map_snap_position[i][k]*this.pre_block_scaling_unround));
            }
        }
    }

    fcamsmoother(pause)
    {
        this.CamSmootherLoop.startTime()
        if(pause === false)    
        {
            if(GV.camsmootherenable) //smooth the camera
            {
                this.previous_camsmoother_x = this.camsmoother_x;
                this.previous_camsmoother_y = this.camsmoother_y;

                this.previousoffset.unshift([Math.round(this.offset_x), Math.round(this.offset_y)]);
                this.previousoffset.lenght  = 16;
                this.camsmoother_x          = Math.round(this.offset_x-(this.previousoffset[0][0] + this.previousoffset[1][0] + this.previousoffset[2][0] + this.previousoffset[3][0] +
                       this.previousoffset[4][0] + this.previousoffset[5][0] + this.previousoffset[6][0] + this.previousoffset[7][0] )/8);

                this.camsmoother_y          = Math.round(this.offset_y-((this.previousoffset[0][1] + this.previousoffset[1][1] + this.previousoffset[2][1] + this.previousoffset[3][1] +
                       this.previousoffset[4][1] + this.previousoffset[5][1] + this.previousoffset[6][1] + this.previousoffset[7][1] +
                       this.previousoffset[8][1] + this.previousoffset[9][1] + this.previousoffset[10][1]+ this.previousoffset[11][1]+
                       this.previousoffset[12][1]+ this.previousoffset[13][1]+ this.previousoffset[14][1]+ this.previousoffset[15][1])/16));
                
                
            }else{
                this.previous_camsmoother_x = this.camsmoother_x =
                this.previous_camsmoother_y = this.camsmoother_y = 0;
            }
        }
        this.cam_smoother_loop_log          = this.CamSmootherLoop.endLogTime()
    }

    reset()
    {
        this.map_limit = [0, 0];
        this.spawn = [0, 0];
        this.level_data = []
        this.offset_y = 0;
        this.offset_x = 0;
        this.previous_offset_x = 0;
        this.previous_offset_y = 0;
        this.offset_x_on = 0;
        this.offset_y_on = 0;
        this.cache_data = 0;
        this.collisions = [0,0,0,0,0,0,0,0];
        this.stock = [];
        this.bestup = [false,false,false,false]; //mise a 0 des variable qui enregistre la position des blocs sujets a une possible collision
        this.bestdown = [false,false,false,false,false]; // ordre Player.x,py;ox,oy
        this.bestleft = [false,false,false,false];
        this.bestright = [false,false,false,false];
        this.previousoffset = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
        this.camsmoother = [0, 0];
        this.previouscamsmoother = [0,0];
        this.level_data_textures = [];
        this.data_temp = [];
    }
}

export{Map_Data}

            // if(this.collisions[0] == 1)
            // {
            //     this.offset_x = Math.round(this.offset_x);
            // }
            // if(Player.x > (1200-this.original_block_scale)/2 & this.offset_x_on == -1 | this.offset_x_on == 0 | Player.x < (1200-this.original_block_scale)/2 & this.offset_x_on == 1) //Camera X
            // { 
            //     if(this.offset_x >= 0 & this.offset_x <= this.map_limit.x*this.original_block_scale-(1200-this.original_block_scale)) // X offset
            //     {
            //         this.offset_x += Player.vector_X;
            //         this.offset_x_on = 0;
            //         Player.x = (1200-this.original_block_scale)/2;
            //         if(this.offset_x < 1) //left
            //         {
            //             this.offset_x_on = -1;
            //         }
            //         else if(this.offset_x > this.map_limit.x*this.original_block_scale-(1200-this.original_block_scale)) //right
            //         {
            //             this.offset_x_on = 1
            //         }
            //     }
            //     if(this.offset_x < 0) //replacer camera si elle sort du cadre
            //     {
            //         this.offset_x = 0;
            //     }
            //     else if(this.offset_x > this.map_limit.x*this.original_block_scale-(1200-this.original_block_scale))
            //     {
            //         this.offset_x = this.map_limit.x*this.original_block_scale-(1200-this.original_block_scale);
            //     }
            // }

            // if(Player.y > (675-this.original_block_scale)/2 & this.offset_y_on == -1 | this.offset_y_on == 0 | Player.y < (675-this.original_block_scale)/2 & this.offset_y_on == 1) //Camera Y
            // {    
            //     if(this.offset_y >= 0 & this.offset_y <= this.map_limit.y*this.original_block_scale-(675-this.original_block_scale)) // Y offset
            //     {
            //         this.offset_y += Player.vector_Y;
            //         this.offset_y_on = 0;
            //         Player.y = (675-this.original_block_scale)/2;
            //         if(this.offset_y < 1) //up
            //         {
            //             this.offset_y_on = -1;
            //             Player.y = (675-this.original_block_scale)/2+Player.vector_Y;
            //         }
            //         else if(this.offset_y > this.map_limit.y*this.original_block_scale-(675-this.original_block_scale)) //down
            //         {
            //             this.offset_y_on = 1;
            //             Player.y = (675-this.original_block_scale)/2+Player.vector_Y;
            //         }
            //     }
            //     if(this.offset_y < 0) //replacer camera si elle sort du cadre
            //     {
            //         this.offset_y = 0;
            //     }
            //     else if(this.offset_y > this.map_limit.y*this.original_block_scale-(675-this.original_block_scale))
            //     {
            //         this.offset_y = this.map_limit.y*this.original_block_scale-(675-this.original_block_scale);
            //     }
            // }