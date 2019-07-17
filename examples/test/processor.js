window.onload = function() {
  (function localFileVideoPlayerInit(win) {
    var URL = win.URL || win.webkitURL,
    displayMessage = (function displayMessageInit() {
        var node = document.querySelector('#message');
        return function displayMessage(message, isError) {
            node.innerHTML = message;
            node.className = isError ? 'error' : 'info';
        };
    }());
    playSelectedFile = function playSelectedFileInit(event) {
        var file = this.files[0];
        var type = file.type;
        var videoNode = document.querySelector('video');
        var canPlay = videoNode.canPlayType(type);
        canPlay = (canPlay === '' ? 'no' : canPlay);
        var message = 'Can play type "' + type + '": ' + canPlay;
        var isError = canPlay === 'no';
        displayMessage(message, isError);
        if (isError) {
            return;
        }
        fileURL = URL.createObjectURL(file);
        videoNode.src = fileURL;
    };
    if (!URL) {
        displayMessage('Your browser is not ' +
           '<a href="http://caniuse.com/bloburls">supported</a>!', true);
        return;
    }
    var inputNode = document.getElementById('file_input');
    inputNode.addEventListener('change', playSelectedFile, false);
  }(window));
}


let processor = {
    timerCallback: function() {
      if (this.video.paused || this.video.ended) {
        return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },
  
    doLoad: function() {
      this.video = document.getElementById("video");

      this.c2 = document.getElementById("c2");
      this.c3 = document.getElementById("c3");

      var s = new CanvasState(this.c3);

      var canvasState = CanvasState.bind(this);
      CanvasState(this.c2);

      this.ctx2 = this.c2.getContext("2d");
      let self = this;
      this.video.addEventListener("play", function() {
        
      self.width = self.video.videoWidth;
      self.height = self.video.videoHeight;
      self.c2.width = self.width;
      self.c2.height = self.height;
      self.c3.width = self.width;
      self.c3.height = self.height;
      self.timerCallback();
      }, false);
    },
  
    computeFrame: function() {
      this.ctx2.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx2.getImageData(0, 0, this.width, this.height);
      let l = frame.data.length / 4;
      
      mosaic(frame.data);


      this.ctx2.putImageData(frame, 0, 0);
      return;
    }
  };


const filter = {
  rgbBand: function (data, rL, gL, bL) {
    for (let i = 0; i < l; i++) {
    let r = data[i * 4 + 0];
    let g = data[i * 4 + 1];
    let b = data[i * 4 + 2];
    if (r > rL && g > rL && b > bL);
      frame.data[i * 4 + 3] = 0;
    }
  },
  mosaic: function (data) {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = randomNumber(0, 255);
      data[i+1] = randomNumber(0, 255);
      data[i+2] = randomNumber(0, 255);
      data[i+3] = 255;
    }
  },

  invertColors: function (data) {
    for (var i = 0; i < data.length; i+= 4) {
      data[i] = data[i] ^ 255; // Invert Red
      data[i+1] = data[i+1] ^ 255; // Invert Green
      data[i+2] = data[i+2] ^ 255; // Invert Blue
    }
  }

};


document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});


