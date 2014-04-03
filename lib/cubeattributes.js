/** Constructor
 * Holds the attributes of a Rubik's Cube like puzzle.
 */
CubeAttributes=function(partCount, stickerCount, stickerCountPerFace) {
    this.partsVisible = new Array(partCount);//boolean
    this.partsFillColor = new Array(partCount);//[r,g,b,a]
    this.partsPhong = new Array(partCount);//[ambient, diffuse, specular, shininess]
    this.stickersVisible = new Array(stickerCount);//boolean
    this.stickersFillColor = new Array(stickerCount);//[r,g,b,a]
    this.stickersPhong = new Array(stickerCount);//[ambient, diffuse, specular, shininess]
    this.stickerCountPerFace = stickerCountPerFace;//integer
    this.partExplosion = new Array(partCount);//float
    this.stickerExplosion = new Array(stickerCount);//float
    this.xRot=-30;
    this.yRot=-40;
    this.scaleFactor=1;
    this.explosionFactor=0;
    
    this.stickersImageURL=null;
    
    // The twist duration of the cube.
    this.twistDuration=200;
    
    // The twist duration that will be set on twistDuration when the user
    // performs an twist operation.
    this.userTwistDuration=200;
    
    // The twist duration that will be set on twistDuration when the program
    // performs a scramble operation.
    this.scrambleTwistDuration=200/2;
    
    this.backgroundColor=[0, 0, 0, 0]; //[r,g,b,a]
    
    for (var i=0;i<partCount;i++) {
      this.partsVisible[i]=true;
      this.stickersVisible[i]=true;
      this.partExplosion[i]=0;
    }
}

