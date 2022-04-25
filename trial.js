let MODE = "memorize";
var isStressed = true;

const socket = new WebSocket("ws://localhost:3000/ar");
socket.onopen = () => {
  console.log("[CONNECTED]");
};
socket.onclose = () => {
  console.log("[DISCONNECTED]");
};
socket.onmessage = (e) => {
  e = JSON.parse(e.data);
  console.log(e);
  switch (e.status) {
    case "mode":
      // document.getElementById("strood").style.display = "none";
      MODE = e.MODE || MODE;
      break;
    case "stress":
      console.log(e.STRESS)
      isStressed = e.STRESS;
      break;
    case "result":
      result(e.result);
      break;
    case "strood":
      createStrood(e.strood);
      break;
    case "start":
      switch (MODE) {
        case "memorize":
          MemorizePhase();
          break;
        case "search":
          SearchPhase();
          break;

        default:
          break;
      }
      break;
    case "stop":
      stopTimer();
      hideAllImages();
      break;

    default:
      break;
  }
};

let numImgs = [
  "images-target/num-1.jpg",
  "images-target/num-2.jpg",
  "images-target/num-3.jpg",
  "images-target/num-4.jpg",
  "images-target/num-5.jpg",
  "images-target/num-6.jpg",
  "images-target/num-7.jpg",
  "images-target/num-8.jpg",
  "images-target/num-9.jpg",
  "images-target/num-10.jpg",
];
let list = [
  "plane-1",
  "plane-2",
  "plane-3",
  "plane-4",
  "plane-5",
  "plane-6",
  "plane-7",
  "plane-8",
  "plane-9",
  "plane-10",
  "plane-11",
  "plane-12",
  "plane-13",
  "plane-14",
  "plane-15",
  "plane-16",
  "plane-17",
  "plane-18",
  "plane-19",
  "plane-20",
];
let imgSrs = [
  "images/cat.jpg",
  "images/corocdile.jpg",
  "images/dog.jpg",
  "images/elephant.jpg",
  "images/giraffe.jpg",
  "images/horse.jpg",
  "images/lion.jpg",
  "images/monkey.jpg",
  "images/penguin.jpg",
  "images/rabbit.jpg",
  "images/tiger.jpg",
  "images/zebra.jpg",
  "images/bagh.jpg",
  "images/bear.jpg",
  "images/camel.jpg",
  "images/kangaro.jpg",
  "images/owl.jpg",
  "images/snake.jpg",
  "images/tawoos.jpg",
  "images/turtle.jpg",
];
let imgList = [];
let hiddenImagesObject = {};
function hideRandomImages() {
  let arr = [];
  const imgIndex = {};
  for (let i = 0; i < 10; i++) {
    while (true) {
      const index = Math.floor(Math.random() * 20);
      if (!imgIndex[index]) {
        imgIndex[index] = true;
        arr.push(index);
        break;
      }
    }
  }
  console.log(imgIndex)
  // console.log(arr);
  let hiddenImgs = [];
  for (let k in imgIndex) {
    hiddenImgs.push(list[k]);
  }
  const mapImagesToNumbersSource = {
    "bagh.jpg": "img-1",
    "bear.jpg": "img-2",
    "camel.jpg": "img-3",
    "cat.jpg": "img-4",
    "crocodile.jpg": "img-5",
    "dog.jpg": "img-6",
    "elephant.jpg": "img-7",
    "giraffe.jpg": "img-8",
    "horse.jpg": "img-9",
    "kangaro.jpg": "img-10",
    "lion.jpg": "img-11",
    "monkey.jpg": "img-12",
    "owl.jpg": "img-13",
    "penguin.jpg": "img-14",
    "rabbit.jpg": "img-15",
    "snake.jpg": "img-16",
    "tawoos.jpg": "img-17",
    "tiger.jpg": "img-18",
    "turtle.jpg": "img-19",
    "zebra.jpg": "img-20",
  };
  for (let i = 0; i < hiddenImgs.length; i++) {
    // let elem = document.getElementById(hiddenImgs[i]);
    // // console.log(elem);
    // elem.removeChild(elem.children[0]);
    let elem = document.getElementById(`img-${arr[i]}`);
    let src = elem.getAttribute("src");
    console.log(src)
    let id = document.getElementById(src.slice(1));
    let assetSrc = id.getAttribute("src");
    hiddenImagesObject[i + 1] =
      mapImagesToNumbersSource[assetSrc.split("/")[1]];
    elem.setAttribute("src", numImgs[i]);
  }
  socket.send(
    JSON.stringify({
      status: "hide",
      value: hiddenImagesObject,
    })
  );
  console.log(hiddenImagesObject);
}

AFRAME.registerComponent("randomization", {
  init: function () {
    let data = this.data;
    let el = this.el;
    // hideRandomImages()
  },
});

let timer = 0;
let interval = null;
function startTimer(limit, callback = null) {
  console.log(limit);
  const timerEl = document.getElementById("timer");
  var visible = false;
  if (isStressed) {
    visible = true;
    timerEl.components.sound.playSound();
  }
  timerEl.setAttribute("visible", visible);
  updateTime(limit);
  interval = setInterval(() => {
    updateTime();
    if (timer == 0) {
      stopTimer();
      interval = null;
      if (callback) {
        callback();
      }
    }
  }, 1000);
}

function updateTime(t = -1) {
  const timerEl = document.getElementById("timer");
  timer = t < 0 ? timer - 1 : t;
  socket.send(
    JSON.stringify({
      status: "timer",
      time: timer,
    })
  );

  // var sound = document.querySelector('[sound]');
  if (timer >= 10 && timer < 60) {
    // timerEl.innerHTML = `00:${timer}`;
    timerEl.setAttribute("text", "value", `00:${timer}`);
  } else if (timer >= 0 && timer < 10) {
    // timerEl.innerHTML = `00:${timer}`;
    timerEl.setAttribute("text", "value", `00:0${timer}`);
  } else if (timer >= 60) {
    const min = Math.floor(timer / 60);
    const sec = Math.floor(timer % 60);

    if (sec >= 10 && sec < 60) {
      // timerEl.innerHTML = `0${min}:${sec}`;
      timerEl.setAttribute("text", "value", `0${min}:${sec}`);
    } else if (sec >= 0 && sec < 10) {
      // timerEl.innerHTML = `0${min}:0${sec}`;
      timerEl.setAttribute("text", "value", `0${min}:0${sec}`);
    }
  }
  //  else {
  //   timerEl.innerHTML = `00:0${timer}`;
  //   timerEl.setAttribute("text", "value",`00:0${timer}` );
  // }
}
function stopTimer(limit) {
  clearInterval(interval);
  const timerEl = document.getElementById("timer");
  timerEl.components.sound.stopSound();
}

// startTimer(10 , hideRandomImages);
// var timerel = document.querySelector('#timer');

function AssignImgAsset() {
  for (let i = 0; i < 20; i++) {
    let img = document.getElementById(+i);
    img.src = imgSrs[i];
  }
}
// AssignImgAsset();
function ArrayOfRndmImgs() {
  const imgIndex = {};
  for (let i = 0; i < 20; i++) {
    while (true) {
      const index = Math.floor(Math.random() * 20);
      if (!imgIndex[index]) {
        imgIndex[index] = true;
        imgList.push(index);
        break;
      }
    }
  }
  console.log(imgList);
}

// ArrayOfRndmImgs();

function AssignRandomImages() {
  for (let i = 0; i < 20; i++) {
    let id = `img-${i}`;
    let img = document.getElementById(id);
    // console.log(img.getAttribute("src"));
    img.setAttribute("src", `#${imgList[i]}`);
  }
}
// AssignRandomImages();

function MemorizePhase() {
  console.log('entaa da5lt memorize 1')
  stopTimer();
  hideAllImages();
  console.log('entaa da5lt memorize 2 ')
  AssignImgAsset();
  console.log('entaa da5lt memorize 3')
  ArrayOfRndmImgs();
  console.log('entaa da5lt memorize 4')
  AssignRandomImages();
  console.log('entaa da5lt memorize 5')
  showAllImages();
  console.log('entaa da5lt memorize 6')
  startTimer(210, hideAllImages);
  console.log('entaa da5lt memorize 7')
}
function hideAllImages() {
  for (let i = 0; i < 20; i++) {
    let id = `img-${i}`;
    let img = document.getElementById(id);
    img.setAttribute("visible", false);
  }
}
function showAllImages() {
  for (let i = 0; i < 20; i++) {
    let id = `img-${i}`;
    let img = document.getElementById(id);
    img.setAttribute("visible", true);
  }
}

function result(result) {
  if (isStressed && !result.result) {
    const buzzerSound = document.getElementById("buzzerSound");
    buzzerSound.components.sound.playSound();
  }
}

function SearchPhase() {
  stopTimer();
  showAllImages();
  hideRandomImages();
  startTimer(120, hideAllImages);
}
