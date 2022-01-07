import { ctx, Tools, GV, Keyboard, Fps, GameMenu, Pause, Player} from "../../../../main.js";

class AnimationReader {
    constructor(image, width, height, pixel_gap, frame_timing = [], start = 0, end = width / pixel_gap) {
        this.image = Tools.textureLoader(image);
        this.width = width;
        this.height = height;
        this.start = start;
        this.end = end;
        this.pixel_gap = pixel_gap;
        this.step = 0;
        this.frame_timing = frame_timing;
        if(this.frame_timing === [])
        {
            for(let i = start; i <= end; i++)
            {
                this.frame_timing.push(i);
            };
        }
        this.reloop = this.frame_timing.length-1;

    };

    setAnimationFrameTiming(frame_timing = this.frame_timing) { //Modify the animation frame timing, needs an array for the input of the function
        this.frame_timing = frame_timing;
        this.step = 0;
        this.reloop = this.frame_timing.length;
    };

    animationPlay() { //Play the animation
        ctx.drawImage(this.image, 
            this.frame_timing[Math.floor(this.step)]*this.pixel_gap, 0, this.pixel_gap, this.height,
             Player.positionning_x, Player.positionning_y, 
             Player.pre_player_scaling, Player.pre_player_scaling);
        if(Pause.pause === false)
        {
            this.step += 1/Fps.dt/*(Fps.speed_percentage/100)*/;
            if(Math.floor(this.step) > this.reloop)
            {
                this.step = 0;
            }
        };
    };

    displayFrame(frame_position = 0) { //Display the selected frame
        ctx.drawImage(this.image, 
            frame_position*this.pixel_gap, 0, this.pixel_gap, this.height,
             Player.positionning_x, Player.positionning_y, 
             Player.pre_player_scaling, Player.pre_player_scaling);
    };

};

export { AnimationReader };