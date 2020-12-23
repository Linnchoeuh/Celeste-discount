const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d")!;
const width = 1200;
const height = 675;

let keys_input: (0 | 1)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

ctx.canvas.addEventListener("mousemove", function (event) {
  mouseX = event.clientX - ctx.canvas.offsetLeft;
  mouseY = event.clientY - ctx.canvas.offsetTop;
  var status = document.getElementById("status");
});
ctx.canvas.addEventListener("mousedown", function (event) {
  mouseX = event.clientX - ctx.canvas.offsetLeft;
  mouseY = event.clientY - ctx.canvas.offsetTop;
  var clicking = document.getElementById("clicking");
  click = true;
});
ctx.canvas.addEventListener("mouseup", function (event) {
  mouseX = event.clientX - ctx.canvas.offsetLeft;
  mouseY = event.clientY - ctx.canvas.offsetTop;
  var clicking = document.getElementById("clicking");
  click = false;
});
document.addEventListener("keydown", function (event) {
  const key_press = String.fromCharCode(event.keyCode);
  const keynb = event.keyCode;
  switch (keynb) {
    case 90:
      keys_input.splice(0, 1, 1); //z
      break;
    case 81:
      keys_input.splice(1, 1, 1); //q
      break;
    case 83:
      keys_input.splice(2, 1, 1); //s
      break;
    case 68:
      keys_input.splice(3, 1, 1); //d
      break;
    case 32:
      keys_input.splice(4, 1, 1); //space
      break;
    case 16:
      keys_input.splice(5, 1, 1); //shift
      break;
    case 80:
      keys_input.splice(6, 1, 1); //p
      break;
    case 67:
      keys_input.splice(7, 1, 1); //c
      break;
    case 13:
      keys_input.splice(8, 1, 1); //enter
      break;
  }
});
document.addEventListener("keyup", function (event) {
  const keynb = event.keyCode;
  switch (keynb) {
    case 90:
      keys_input.splice(0, 1, 0);
      break;
    case 81:
      keys_input.splice(1, 1, 0);
      break;
    case 83:
      keys_input.splice(2, 1, 0);
      break;
    case 68:
      keys_input.splice(3, 1, 0);
      break;
    case 32:
      keys_input.splice(4, 1, 0);
      break;
    case 16:
      keys_input.splice(5, 1, 0);
      break;
    case 80:
      keys_input.splice(6, 1, 0);
      break;
    case 67:
      keys_input.splice(7, 1, 0); //c
      break;
    case 13:
      keys_input.splice(8, 1, 0); //enter
      break;
  }
});
document.addEventListener(
  "fullscreenchange",
  function () {
    canvasfullscreen = document.fullscreen ? true : false;
  },
  false
);

var return_arrow = new Image();
return_arrow.src = "graphics/ui/return_arrow.png";
var bg = new Image();
bg.src = "graphics/map_content/background.png";

import {
  upscale,
  twPleinEcran,
  ui_var_updater,
  ui_var_updater2,
  ui_var_updater3,
} from "./includes/ui";
import {
  animatic_text,
  animatic_texture,
  transition_plus,
  transition_minus,
  animatic_var_update,
  animatic_var_update2,
  animatic_var_update3,
} from "./includes/animatic";
import { MapData } from "./includes/level_reader";
import { PlayerData } from "./includes/player";
import * as levels from "./includes/levels";

var command = "false"; //command
var push = 0;
var devmode = true;
var godmode = false;
var frametime = 0;
var camsmootherenable = true;

var key_press = "N/A"; //ui and interactivity
var keynb = "N/A";
var click = false;
var menu = 2;
var mouseX = 0;
var mouseY = 0;
var keypressed = false;
var mousepressed = false;
var canvasfullscreen = false;
var ablefullscrenn = "enable";
var fullscreenupscale = true;
var transition = "false";
var selectedaction = "N/A";

var level = [levels.leveltest1, levels.leveltest2]; //game
var levelid = 0;
let map = new MapData();
var start = true;
let player = new PlayerData();
var vect = [0, 0];
var stock = [[1, 1, 1, 1, 1, 1, 1, 1], 0, 0];

var pause = false; //pause
var pauseframe = 0;
var endpause = false;
var pkey = false;

//setting

map.var_update(ctx);
map.var_update2(devmode);
player.var_update(ctx);
animatic_var_update(ctx);
animatic_var_update2(devmode);
ui_var_updater(ctx);
ui_var_updater2(devmode);

function main() {
  frametime = Date.now();
  requestAnimationFrame(main);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (canvasfullscreen == true) {
    if (fullscreenupscale == true) {
      canvas.width = screen.width;
      canvas.height = screen.height;
    } else {
      canvas.width = 1200;
      canvas.height = 675;
    }
    ablefullscrenn = "Disable";
  } else {
    canvas.width = 1200;
    canvas.height = 675;
    ablefullscrenn = "Enable";
  }

  // TODO: webkit + ms

  // ctx.webkitImageSmoothingEnabled = false;
  // ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  ui_var_updater3(canvasfullscreen, fullscreenupscale, mouseX, mouseY, canvas);
  animatic_var_update3(canvasfullscreen, mouseX, mouseY, click, mousepressed);

  switch (menu) {
    case 1: //Main menu
      ctx.fillStyle = "rgb(255,255,255)";
      if (
        animatic_text(
          "--Play--",
          0,
          460,
          405,
          285,
          60,
          520,
          450,
          48,
          54,
          58,
          60
        ) ||
        (transition === "finish" && selectedaction === "menu2")
      ) {
        //play
        switch (transition) {
          case "false":
            transition = "true";
            selectedaction = "menu2";
            break;
          case "finish":
            menu = 2;
            transition = "false";
            selectedaction = "N/A";
            break;
        }
      }
      if (
        animatic_text(
          "--Setting--",
          1,
          460,
          505,
          285,
          60,
          487,
          550,
          48,
          54,
          58,
          60,
          -0.7
        ) ||
        (transition === "finish" && selectedaction === "menu3.1")
      ) {
        //setting
        switch (transition) {
          case "false":
            transition = "true";
            selectedaction = "menu3.1";
            break;
          case "finish":
            menu = 3;
            transition = "false";
            selectedaction = "N/A";
            break;
        }
      }
      transition_minus(canvas, transition);
      break;
    case 2: //Game
      if (start) {
        player.spawn(map.start(level[levelid]));
        start = false;
      }
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.drawImage(bg, 0, 0, upscale(1200), upscale(675));
      vect = player.velocity(
        keys_input,
        vect[0],
        vect[1],
        godmode,
        map.collisions,
        map.offsetX_on,
        map.offsetY_on,
        map.bestdown[4],
        pause
      );
      stock = map.displayer(
        player.playerX,
        player.playerY,
        vect[0],
        vect[1],
        camsmootherenable,
        pause
      );
      player.playerX = stock[1] as number;
      player.playerY = stock[2] as number;
      player.player_animatic(
        keys_input,
        map.collisions as (0 | 1)[],
        map.offsetX,
        map.offsetY,
        map.offsetX_on,
        map.offsetY_on,
        map.camsmoother,
        pause
      );
      if ((keys_input[6] == 1 && pkey == false) || pause == true) {
        //pause
        if (pause == false && pkey == false) {
          pause = true;
          keypressed = true;
          pkey = true;
          endpause = false;
        }
        var grd = ctx.createLinearGradient(-150, 0, upscale(3000), 0);
        grd.addColorStop(0.1, "transparent");
        grd.addColorStop(0, "black");
        if (pauseframe < 10 && endpause == false) {
          pauseframe++;
        }
        ctx.fillStyle = "rgba(0,0,0," + 0.05 * pauseframe + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = grd;
        ctx.fillRect(
          upscale(-200 + pauseframe * 20),
          0,
          upscale(100 + pauseframe * 20),
          upscale(675)
        );
        if (endpause == false) {
          ctx.font = "Bold " + upscale(125) + "px arial";
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.fillText("Pause", upscale(425), upscale(100));
        }
        ctx.fillStyle = "rgb(255,255,255)";

        if (
          animatic_text(
            "Resume",
            3,
            0,
            145,
            195,
            40,
            -180 + pauseframe * 20,
            175,
            30,
            33,
            36,
            40,
            3.6,
            0.4
          ) == true
        ) {
          //resume
          endpause = true;
        }

        if (
          animatic_text(
            "Setting",
            4,
            0,
            222,
            175,
            40,
            -180 + pauseframe * 20,
            250,
            30,
            33,
            36,
            40,
            3.7,
            0.3
          ) == true ||
          (transition == "finish" && selectedaction == "menu4")
        ) {
          //setting
          switch (transition) {
            case "false":
              transition = "true";
              selectedaction = "menu4";
              break;
            case "finish":
              menu = 4;
              endpause = false;
              pause = true;
              pauseframe = 10;
              transition = "false";
              selectedaction = "N/A";
              break;
          }
        }

        if (
          animatic_text(
            ablefullscrenn + " fullscreen",
            5,
            0,
            295,
            380,
            40,
            -180 + pauseframe * 20,
            325,
            30,
            33,
            36,
            40,
            4.5,
            0.4
          ) == true
        ) {
          //fullscreen
          twPleinEcran(canvas);
        }

        if (
          animatic_text(
            "Back to menu",
            6,
            0,
            370,
            305,
            40,
            -180 + pauseframe * 20,
            400,
            30,
            33,
            36,
            40,
            3.8,
            0.4
          ) == true ||
          (transition == "finish" && selectedaction == "menu1")
        ) {
          //back to menu
          switch (transition) {
            case "false":
              transition = "true";
              selectedaction = "menu1";
              break;
            case "finish":
              menu = 1;
              endpause = false;
              pause = false;
              pauseframe = 0;
              transition = "false";
              selectedaction = "N/A";
              break;
          }
        }

        if ((keys_input[6] == 1 && pkey == false) || endpause == true) {
          endpause = true;
          grd.addColorStop(0.1, "transparent");
          grd.addColorStop(0, "black");
          ctx.fillStyle = grd;
          pauseframe--;
          ctx.fillRect(
            upscale(-200 - pauseframe * 20),
            0,
            upscale(100 - pauseframe * 20),
            upscale(675)
          );

          if (pauseframe < 1) {
            endpause = false;
            pause = false;
            pauseframe = 0;
          }
        }
      }
      transition_minus(canvas, transition);
      break;
    case 3:
    case 4: //Setting
      if (
        animatic_texture(
          return_arrow,
          7,
          0,
          0,
          120,
          80,
          20,
          10,
          [48, 48],
          55,
          65,
          70,
          0,
          0,
          "Back",
          50,
          70,
          25
        ) == true ||
        (keys_input[5] == 1 && keypressed == false) ||
        (transition == "finish" && selectedaction == "menu3.2")
      ) {
        switch (transition) {
          case "false":
            transition = "true";
            selectedaction = "menu3.2";
            break;
          case "finish":
            switch (menu) {
              case 3:
                menu = 1;
                break;
              case 4:
                menu = 2;
                break;
            }
            transition = "false";
            selectedaction = "N/A";
            break;
        }
      }
      transition_minus(canvas, transition);
      break;
  }
  if (keys_input[7] == 1 || command == "true") {
    //To enter some usefull commands ingame
    push += 1;
    if (push > 60 || devmode == true) {
      if (keys_input[7] == 1) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "Bold " + upscale(100) + "px arial";
        ctx.fillText("Release C", upscale(385), upscale(350));
        command = "true";
      } else {
        command = "";
        const prompted = prompt("Enter a command:");
        if (prompted !== null) {
          command = prompted;
        }
        ctx.fillText("Inputs : " + keys_input, upscale(978), upscale(150)); //input

        ctx.fillText("Collisions : " + stock[0], upscale(963), upscale(175)); //collisions

        ctx.fillText(
          "PX : " + Math.round(player.playerX),
          upscale(985),
          upscale(200)
        ); //px
        ctx.fillText("|", upscale(1080), upscale(200));
        ctx.fillText("OffOnX : " + map.offsetX_on, upscale(1092), upscale(200));

        ctx.fillText(
          "PY : " + Math.round(player.playerY),
          upscale(985),
          upscale(225)
        ); //py
        ctx.fillText("|", upscale(1080), upscale(225));
        ctx.fillText("OffOnY : " + map.offsetY_on, upscale(1092), upscale(225));

        ctx.fillText("VX : " + Math.round(vect[0]), upscale(985), upscale(250)); //vect
        ctx.fillText("|", upscale(1080), upscale(250));
        ctx.fillText("VY : " + vect[1], upscale(1092), upscale(250));

        ctx.fillText(
          "OX : " + Math.round(map.offsetX),
          upscale(985),
          upscale(275)
        ); //offset
        ctx.fillText("|", upscale(1080), upscale(275));
        ctx.fillText("OY : " + map.offsetY, upscale(1092), upscale(275));

        ctx.fillText(
          "BU : [" + map.bestup[0] + "]px ; [" + map.bestup[1] + "]py",
          upscale(970),
          upscale(300)
        );
        ctx.fillText(
          "[" + map.bestup[2] + "]ox ; [" + map.bestup[3] + "]oy",
          upscale(1015),
          upscale(325)
        );

        ctx.fillText(
          "BD : [" + map.bestdown[0] + "]px ; [" + map.bestdown[1] + "]py",
          upscale(970),
          upscale(350)
        );
        ctx.fillText(
          "[" + map.bestdown[2] + "]ox ; [" + map.bestdown[3] + "]oy",
          upscale(1015),
          upscale(375)
        );

        ctx.fillText(
          "BL : [" + map.bestleft[0] + "]px ; [" + map.bestleft[1] + "]py",
          upscale(970),
          upscale(400)
        );
        ctx.fillText(
          "[" + map.bestleft[2] + "]ox ; [" + map.bestleft[3] + "]oy",
          upscale(1015),
          upscale(425)
        );

        ctx.fillText(
          "BR : [" + map.bestright[0] + "]px ; [" + map.bestright[1] + "]py",
          upscale(970),
          upscale(450)
        );
        ctx.fillText(
          "[" + map.bestright[2] + "]ox ; [" + map.bestright[3] + "]oy",
          upscale(1015),
          upscale(475)
        );

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText(
          player.dashbuttonrelease +
            "     " +
            player.jump +
            "   " +
            player.ground_slideposition,
          upscale(1000),
          upscale(500)
        ); //-------------------------------------------------------test var------------------------------------------------

        ctx.strokeStyle = "rgb(0,0,0)";

        ctx.strokeText("x : " + mouseX, upscale(1125), upscale(25)); //mouse pos
        ctx.strokeText("y : " + mouseY, upscale(1125), upscale(50));

        ctx.strokeText(key_press, upscale(1100), upscale(75)); //key pressed
        ctx.strokeText("|", upscale(1141), upscale(75));
        ctx.strokeText(keynb, upscale(1152), upscale(75));

        ctx.strokeText("Click : " + click, upscale(1091), upscale(100)); //click

        ctx.strokeText(
          "Fullscreen : " + canvasfullscreen,
          upscale(1043),
          upscale(125)
        ); //fullscreen

        ctx.strokeText("Inputs : " + keys_input, upscale(978), upscale(150)); //input

        ctx.strokeText("Collisions : " + stock[0], upscale(963), upscale(175)); //collisions

        ctx.strokeText(
          "PX : " + Math.round(player.playerX),
          upscale(985),
          upscale(200)
        ); //px
        ctx.strokeText("|", upscale(1080), upscale(200));
        ctx.strokeText(
          "OffOnX : " + map.offsetX_on,
          upscale(1092),
          upscale(200)
        );

        ctx.strokeText(
          "PY : " + Math.round(player.playerY),
          upscale(985),
          upscale(225)
        ); //py
        ctx.strokeText("|", upscale(1080), upscale(225));
        ctx.strokeText(
          "OffOnY : " + map.offsetY_on,
          upscale(1092),
          upscale(225)
        );

        ctx.strokeText(
          "VX : " + Math.round(vect[0]),
          upscale(985),
          upscale(250)
        ); //vect
        ctx.strokeText("|", upscale(1080), upscale(250));
        ctx.strokeText("VY : " + vect[1], upscale(1092), upscale(250));

        ctx.strokeText(
          "OX : " + Math.round(map.offsetX),
          upscale(985),
          upscale(275)
        ); //offset
        ctx.strokeText("|", upscale(1080), upscale(275));
        ctx.strokeText("OY : " + map.offsetY, upscale(1092), upscale(275));

        ctx.strokeText(
          "BU : [" + map.bestup[0] + "]px ; [" + map.bestup[1] + "]py",
          upscale(970),
          upscale(300)
        );
        ctx.strokeText(
          "[" + map.bestup[2] + "]ox ; [" + map.bestup[3] + "]oy",
          upscale(1015),
          upscale(325)
        );

        ctx.strokeText(
          "BD : [" + map.bestdown[0] + "]px ; [" + map.bestdown[1] + "]py",
          upscale(970),
          upscale(350)
        );
        ctx.strokeText(
          "[" + map.bestdown[2] + "]ox ; [" + map.bestdown[3] + "]oy",
          upscale(1015),
          upscale(375)
        );

        ctx.strokeText(
          "BL : [" + map.bestleft[0] + "]px ; [" + map.bestleft[1] + "]py",
          upscale(970),
          upscale(400)
        );
        ctx.strokeText(
          "[" + map.bestleft[2] + "]ox ; [" + map.bestleft[3] + "]oy",
          upscale(1015),
          upscale(425)
        );

        ctx.strokeText(
          "BR : [" + map.bestright[0] + "]px ; [" + map.bestright[1] + "]py",
          upscale(970),
          upscale(450)
        );
        ctx.strokeText(
          "[" + map.bestright[2] + "]ox ; [" + map.bestright[3] + "]oy",
          upscale(1015),
          upscale(475)
        );
      }
      ctx.fillStyle = "rgb(0,255,0)";
      ctx.fillText(
        Math.round(1000 / frametime) + " FPS " + frametime + " ms",
        upscale(20),
        upscale(25)
      );
      ctx.strokeStyle = "rgb(0,100,0)";
      ctx.strokeText(
        Math.round(1000 / frametime) + " FPS " + frametime + " ms",
        upscale(20),
        upscale(25)
      );
    }
  }
}
