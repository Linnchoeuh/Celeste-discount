import {ctx, GV, Tools, Player, canvas, Fps, GameMenu, Pause, Fullscreen} from "../../../../main.js";

class CollisionsSquare
{
    constructor()
    {
        this.CollisionSquareArea_ = {
            StartCoords_ : {
                x : 0,
                y : 0
            },

            EndCoords_ : {
                x : 0,
                y : 0
            }
        }; 
    };

    framesArea(Player, map_limit, original_block_scale)
    {
        this.CollisionSquareArea_.StartCoords_.x = Player.Position_.x+Player.HitBox_.scaled_left_side;
        this.CollisionSquareArea_.StartCoords_.y = Player.Position_.y+Player.HitBox_.scaled_top_side;
        this.CollisionSquareArea_.EndCoords_.x   = Player.Position_.x+Player.HitBox_.scaled_right_side;
        this.CollisionSquareArea_.EndCoords_.y   = Player.Position_.y+Player.HitBox_.scaled_down_side;

        if(Player.Vector_.x < 0){ //left
            this.CollisionSquareArea_.EndCoords_.x   -= Player.Vector_.x;
        }else if(Player.Vector_.x > 0){//right
            this.CollisionSquareArea_.StartCoords_.x -= Player.Vector_.x;
        };
        if(Player.Vector_.y < 0){//up
            this.CollisionSquareArea_.EndCoords_.y   -= Player.Vector_.y;
        }else if(Player.Vector_.y > 0){//down
            this.CollisionSquareArea_.StartCoords_.y -= Player.Vector_.y;
        };

        this.CollisionSquareArea_.StartCoords_.x = Math.floor(this.CollisionSquareArea_.StartCoords_.x/original_block_scale);
        this.CollisionSquareArea_.StartCoords_.y = Math.floor(this.CollisionSquareArea_.StartCoords_.y/original_block_scale);
        this.CollisionSquareArea_.EndCoords_.x   = Math.floor(this.CollisionSquareArea_.EndCoords_.x  /original_block_scale);
        this.CollisionSquareArea_.EndCoords_.y   = Math.floor(this.CollisionSquareArea_.EndCoords_.y  /original_block_scale);

        if(this.CollisionSquareArea_.StartCoords_.x < 0)
            {this.CollisionSquareArea_.StartCoords_.x = 0;};
        if(this.CollisionSquareArea_.StartCoords_.y < 0)
            {this.CollisionSquareArea_.StartCoords_.y = 0;};

        if(this.CollisionSquareArea_.EndCoords_.x >= map_limit.x)
            {this.CollisionSquareArea_.EndCoords_.x = map_limit.x;};
        if(this.CollisionSquareArea_.EndCoords_.y >= map_limit.y)
            {this.CollisionSquareArea_.EndCoords_.y = map_limit.y;};

    
    };
};

export{CollisionsSquare};