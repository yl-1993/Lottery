/**
 * A customizable parser for cube scripts.
 */

/** Script nodes. */
TwistNode = function(axis, layerMask, angle) {
  this.axis=axis;
  this.angle=angle;
  this.layerMask=layerMask;
}

/** Applies the node to the specified cube. */
TwistNode.prototype.applyTo = function(cube)  {
   cube.transform(this.axis,this.layerMask,this.angle);
}

/**
 * Creates a new parser.
 */
ScriptParser = function()  {
  this.layerCount=3;
}

/** Returns an array of script nodes. */
ScriptParser.prototype.createRandomScript = function(scrambleCount)  {
  if (scrambleCount==null) scrambleCount=10;
  
  var scrambler=new Array(scrambleCount);
  
  // Keep track of previous axis, to avoid two subsequent moves on
  // the same axis.
  var prevAxis = -1;
  var axis, layerMask, angle;
  for (var i = 0; i < scrambleCount; i++) {
    while ((axis = Math.floor(Math.random()*3)) == prevAxis) {}
    prevAxis = axis;
    while ((layerMask = Math.floor(Math.random()*(1 << this.layerCount))) == 0) {}
    while ((angle = Math.floor(Math.random()*5) - 2) == 0) {}
    scrambler[i]=new TwistNode(axis, layerMask, angle);
  }
  
  return scrambler;
}

