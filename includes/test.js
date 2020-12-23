if(this.dashbuttonrelease == false & input[5] == 0)
{
    this.dashbuttonrelease = true
}
if(input[5] == 1 & this.dashbuttonrelease == true | this.dashcount != 0)
{
    if(this.dashcount == 0)
    {
        this.dashbuttonrelease = false;
    }
    if(this.dashcount >= this.dashduration)
    {
        vx = 0;
        this.dashcooldown = this.dashcooldownmax
    }
    else
    {
        vx = this.dashspeed
    }
}




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
        

        this.speed; //Permet juste de stocker un calcul pour la vitesse (Ne pas toucher)
        this.maxcurrentvelocity; //La fameuse
        this.jumpforce = 35; //Puissance du saut
        this.maxgroundvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est au sol
        this.maxaerialvelocity = 9; //Vitesse max de déplacement du joueur lorsqu'il est en chute libre
        this.aerialmoving = 0.5; //Pour pouvoir se diriger dans les airs, si la valeure est trop élevé on peut faire des walljump sur un seul mur mdr
        
        
        this.wallleavemax = 5; //Nombre de frame requise pour quitter un mur lorsque qu'on est en position pour faire un walljump
        this.wallleave = this.wallleavemax+1;
        this.groundfriction = 3; //Ralentissement de la vitesse joueur lorsqu'il est au sol
        this.airfriction = 0.2; //Ralentissement de la vitesse joueur lorsqu'il est en l'air
        
        
        this.gravity = 2; //Permet d'ajuster la vitesse de chute du joueur
        this.maxgravityspeed = 20; //Permet de donner une vitesse de chute max (ne jamais dépasser 34px/frame)