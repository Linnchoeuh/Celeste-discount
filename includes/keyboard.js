var key_input = "N/A";
var key_id = "N/A";
var keys_input = {
    "z" : false,
    "q" : false,
    "s" : false,
    "d" : false,
    "space" : false,
    "shift" : false,
    "p" : false,
    "c" : false,
    "return" : false,
    "escape" : false,
    "e" : false
};

document.addEventListener("keydown", function(event)
{
    key_input = String.fromCharCode(event.keyCode);
    key_id = event.keyCode;
    switch(event.keyCode)
    {
        case 90:
            keys_input.z      = true;
            break;
        case 81:
            keys_input.q      = true;
            break;
        case 83:
            keys_input.s      = true;
            break;
        case 68:
            keys_input.d      = true;
            break;
        case 32:
            keys_input.space  = true;
            break;
        case 16:
            keys_input.shift  = true;
            break;
        case 80:
            keys_input.p      = true;
            break;
        case 67:
            keys_input.c      = true;
            break;
        case 13:
            keys_input.return = true;
            break;
        case 27:
            keys_input.escape = true;
            break;
    }
});
document.addEventListener("keyup", function(event)
{
    switch(event.keyCode)
    {
        case 90:
            keys_input.z      = false;
            break;
        case 81:
            keys_input.q      = false;
            break;
        case 83:
            keys_input.s      = false;
            break;
        case 68:
            keys_input.d      = false;
            break;
        case 32:
            keys_input.space  = false;
            break;
        case 16:
            keys_input.shift  = false;
            break;
        case 80:
            keys_input.p      = false;
            break;
        case 67:
            keys_input.c      = false;
            break;
        case 13:
            keys_input.return = false;
            break;
        case 27:
            keys_input.escape = false;
            break;
    }
});

class Keyboard_Data{
    constructor(){
        this.key_input  = key_input; //Last key pressed
        this.key_id     = key_id; //Keycode of the last key pressed
        this.keys_input = keys_input; //Object of all used keys in the game and when they're activated
        this.no_key_pressed_object = { //constant
            "z" : false,
            "q" : false,
            "s" : false,
            "d" : false,
            "space" : false,
            "shift" : false,
            "p" : false,
            "c" : false,
            "return" : false,
            "escape" : false,
            "e" : false
        };
        this.keys_pressed = {} //Object of all the keys used in game that refer if a key is pressed more than one frame
        
        this.any_key_press   = false; //Become true when a key in the object keys_input is true
        this.any_key_pressed = false; //become true when a key in the object keys_pressed is true
        this.array_of_keys_from_keys_input   = Object.keys(this.keys_input);
        this.array_of_values_from_keys_input = Object.values(this.keys_input);
    };

    varUpdater(){        
        this.key_input = key_input;
        this.key_id = key_id;
        this.keys_input = keys_input;
        this.array_of_keys_from_keys_input = Object.keys(this.keys_input);
        this.array_of_values_from_keys_input = Object.values(this.keys_input);
        this.any_key_press = false;
        if(Object.values(this.keys_input).toString() !== Object.values(this.no_key_pressed_object).toString()){
            this.any_key_press = true;
        }
    };

    keyPressed(){
        this.keys_pressed = {};
        for (let i = 0; i < this.array_of_keys_from_keys_input.length; i++){
            this.keys_pressed[this.array_of_keys_from_keys_input[i]] = this.array_of_values_from_keys_input[i]
        }
        this.any_key_pressed = false;
        if(Object.values(this.keys_pressed).toString() !== Object.values(this.no_key_pressed_object).toString()){
            this.any_key_pressed = true;
        }
    };
}

export{Keyboard_Data};