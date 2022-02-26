const json = require("json");
const math = Math;
const np = require("numjs");
const os = require("os");
const fs = require("fs");
const {PythonShell} =  require('python-shell');

const py = PythonShell

py.runString("-m poetry install", {
  pythonPath: "python"
}, function(){});

function cv(func)
  {
    let res = null;
    py.run("Node/returnCV.py", {
  pythonPath: "python",
  args: [func]
}, function (err, ret) {
  if (err)
  {
    console.log(err);
    res = null
    return;
  }
    //throw err;
  res = ret
  console.log('finished');
});
    return res;
}

function print(msg)
{
  console.log(msg);
}

function getVideoLocation(videoName)
{
    return "../Videos/" + videoName;
}

function rescaleFrame(frame, scale)
{
  width = parseInt(frame.shape[1]* scale)
  height = parseInt(frame.shape[0] * scale)

  var inter = cv({
    args: "INTER_AREA"});
  
  return cv({args: "resize(" + frame + ", "+(width,height)+", interpolation = " + inter});
}

module.exports = {
  encode: function(filmName,videoName,resolutionMulti,fpsMulti,packetSize)
  {
    videoLocation = getVideoLocation(videoName);

    videoCapture = cv({args: "VideoCapture('"+videoLocation+"')"});

    if (videoCapture == null)
      return;
    
    if (!videoCapture.isOpened())
    {
      print("Error opening video")
      return false;
    }

    fpsMultiReciprocal = math.ceil(1/fpsMulti)

    realWidth  = videoCapture.get(cv.CAP_PROP_FRAME_WIDTH)
    scaledWidth = math.floor(realWidth*resolutionMulti)

    realHeight = videoCapture.get(cv.CAP_PROP_FRAME_HEIGHT)
    scaledHeight = math.floor(realHeight*resolutionMulti)

    realFPS = round(videoCapture.get(cv.CAP_PROP_FPS),3)
    scaledFPS = round(realFPS*fpsMulti,3)

    totalFrames = int(videoCapture.get(cv.CAP_PROP_FRAME_COUNT))
    scaledFrames = math.ceil(totalFrames / fpsMultiReciprocal)

    print(
      "\nTotal Frames: " + totalFrame +
      "\nScaled Frames: " + scaledFrames +
      "\n" +
      "\nReal Width: " + realWidth +
      "\nScaled Width: " + scaledWidth +
      "\n" +
      "\nReal Height: " + realHeight +
      "\nScaled Height: " + scaledHeight +
      "\n" +
      "\nReal FPS: " + realFPS +
      "\nScaled FPS: " + scaledFPS
    )

    prevPercentageCompleted = 0

    totalFrameIterations = 0
    scaledFrameIterations = 0

    packetIndex = 0
    packetData = ""

    
    return true;
  }
}