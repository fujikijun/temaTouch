//--------------------------------------------------------------------
//
// tema
//
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// vec2
//--------------------------------------------------------------------

class vec2
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
  }

  DotProduct( V )
  { 
    let r = this.x*V.x + this.y*V.y; 
    return r;
  }

  CrossProduct( V )
  {
    let z = this.x*V.y-this.y*V.x;
    return z;
  }

  Angle()
  { 
    let s = atan2( this.x, this.y ) / PI * 180.0;
    return s;
  }
}

let BASE_DISPLAY_WIDTH = 1920;
let BASE_DISPLAY_HEIGHT = 1080;
let movie;
let capture;
let model = null;
let isPlaying = true;
let posX = 0, posY = 0;
let isHand = false;
let cameraWidth = 160;
let cameraHeight = 120;
let pos = 0;
let speed = 1;
let state = 0;
let vCurrent = new vec2();
let vOld = new vec2();
let font;
let loading;

const modelParams = {
  flipHorizontal: 
true, 
  maxNumBoxes: 
20, 
  iouThreshold: 
0.5, 
  scoreThreshold: 
0.6, 
  };
/*
handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
}
);
*/
function preload() 
{
  //font = loadFont('data/arial.ttf');
  loading = loadImage('data/loading.png');
}

//--------------------------------------------------------------------
// setup
//--------------------------------------------------------------------

function setup()
{
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  let x, y;
  if ( r1 < r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }
  scaling = w;
  x = ( windowWidth - w*float(BASE_DISPLAY_WIDTH) ) / 2;
  y = ( windowHeight - h*float(BASE_DISPLAY_HEIGHT) ) / 2;

  let canvas = createCanvas( w*float(BASE_DISPLAY_WIDTH), h*float(BASE_DISPLAY_HEIGHT) );
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('left', x);
  canvas.style('top', y);
  canvas.id( "canvas" );

  movie = createVideo(['data/tema.mp4']);
  movie.id( "video" );
  movie.hide();
  //movie.loop();
  /*
  capture = createCapture( VIDEO );
  capture.id( "capture" );
  capture.size(cameraWidth, cameraHeight);
  capture.hide();

  const captureElement = document.getElementById("capture");
  handTrack.startVideo(captureElement).then(function (status) {
    console.log("video started", status);
    if (status) {
      isPlaying = true;
      runDetection();
    } else {
    }
  }
  );
  */

  const videoElement = document.getElementById("video");
  videoElement.playbackRate = 1.0;
}

//--------------------------------------------------------------------
// runDetection
//--------------------------------------------------------------------
/*
function runDetection()
{
  const captureElement = document.getElementById("capture");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  model.detect(captureElement).then(predictions => {
    //console.log("Predictions: ", predictions);
    isHand = false;
    for ( let i=0; i<predictions.length; i++ )
    {
      if ( predictions[i].class == 1 )
      {
        isHand = true;
        posX = predictions[i].bbox[0] + ( predictions[i].bbox[2] ) /2;
        posY = predictions[i].bbox[1] + ( predictions[i].bbox[3] ) /2;
      }
    }

    switch( state )
    {
    case 0:
      {
        if ( isHand )
        {
          vCurrent.x = map(posX, 0, cameraWidth, -100, 100);
          vCurrent.y = map(posY, 0, cameraHeight, -100, 100);
          vOld.x = vCurrent.x;
          vOld.y = vCurrent.y;
          state = 1;
        }
      }
      break;

    case 1:
      {
        if ( isHand )
        {
          vOld.x = vCurrent.x;
          vOld.y = vCurrent.y;
          vCurrent.x = map(posX, 0, cameraWidth, -100, 100);
          vCurrent.y = map(posY, 0, cameraHeight, -100, 100);
          let d = vCurrent.DotProduct( vOld );
          let c = vCurrent.CrossProduct( vOld );
          if ( c < 0 )
          {
            if ( d > 0.1 )
            {
              speed += 0.02;
            }
          } else 
          {
            if ( d > 0.1 )
            {
              speed -= 0.02;
            }
          }
        } else
        {
          state = 0;
        }
      }
      break;
    }

    //model.renderPredictions( predictions, canvas, context, captureElement );
    requestAnimationFrame(runDetection);
  }
  );
}
*/
//--------------------------------------------------------------------
// draw
//--------------------------------------------------------------------

function draw()
{
  background( 255 );
  imageMode(CENTER);
  image( loading, width/2, height/2 );
  imageMode(CORNER);

  if ( isPlaying )
  {
    image( movie, 0, 0, width, height ); // draw the video frame to canvas
    if ( isHand )
    {
      noStroke();
      fill( 255, 127 );
      ellipse( 
        map(posX, 0, cameraWidth, 0, width), 
        map(posY, 0, cameraHeight, 0, height), 
        128, 128 );
      fill( 255 );
    }
  } else
  {
  }

  //action();
}

//--------------------------------------------------------------------
// mousePressed
//--------------------------------------------------------------------

function mousePressed()
{
  if ( isPlaying )
  {
    movie.loop();
  } else
  {
    return;
  }
/*
  pos += speed;
  speed -= 0.0002;
  if ( pos < 0 )
  {
    speed = 0;
  }
  if ( speed < -0.1 )
  {
    speed = -0.1;
  }
  if ( speed > 0.01 )
  {
    speed = 0.01;
  }
  if ( pos < 0 )
  {
    pos = 0;
  }
  if ( pos > 1 )
  {
    pos = 1;
  }

  let s = pos;
  if ( s > 1.0 )
  {
    s = 1.0;
  }
  if ( s < 0.1 )
  {
    s = 0.1;
  }

  console.log( s );
*/
  if ( isPlaying )
  {
    movie.speed( map( mouseX, 0, width, 0.1, 2 ) );
  }
}