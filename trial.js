var isStressed = true;
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
let hiddenImagesObject = {};
function randomImages() {
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
  // console.log(arr);
  let hiddenImgs = [];
  for (let k in imgIndex) {
    hiddenImgs.push(list[k]);
  }
  for (let i = 0; i < hiddenImgs.length; i++) {
    // let elem = document.getElementById(hiddenImgs[i]);
    // // console.log(elem);
    // elem.removeChild(elem.children[0]);
    let elem = document.getElementById(`img-${arr[i]}`);
    let src = elem.getAttribute("src");
    let id = document.getElementById(src.slice(1));
    let assetSrc = id.getAttribute("src");
    hiddenImagesObject[i + 1] = assetSrc;
    elem.setAttribute("src", numImgs[i]);
  }
  console.log(hiddenImagesObject);
}

AFRAME.registerComponent("randomization", {
  init: function () {
    let data = this.data;
    let el = this.el;
    // randomImages()
  },
});

let timer = 0;
let interval = null;
function startTimer(limit, callback = null) {
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
      timerEl.components.sound.stopSound();
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
}

// startTimer(10 , randomImages);
// var timerel = document.querySelector('#timer');

let imgSrs = [
  "images/cat.jpg",
  "images/corocdile.jpg",
  "images/dog.jpg",
  "images/elephant.jpg",
  "images/giraffe.jpg",
  "images/horse.jpg",
  "images/lion2.jpg",
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
function assignImgs() {
  for (let i = 0; i < 20; i++) {
    let img = document.getElementById(+i);
    img.src = imgSrs[i];
  }
}
// assignImgs();
function randomFirst() {
  const imgIndex = {};
  for (let i = 0; i < 20; i++) {
    while (true) {
      // console.log("5ara");
      const index = Math.floor(Math.random() * 20);
      if (!imgIndex[index]) {
        imgIndex[index] = true;
        imgList.push(index);
        break;
      }
    }
  }
  // console.log(imgList);
}

// randomFirst();

function imgs() {
  for (let i = 0; i < 20; i++) {
    let id = `img-${i}`;
    let img = document.getElementById(id);
    // console.log(img.getAttribute("src"));
    img.setAttribute("src", `#${imgList[i]}`);
    img.setAttribute("visible", true);
  }
}
// imgs();

assignImgs();
function startAll() {
  var start_cube = document.querySelector("#start-cube");
  start_cube.addEventListener("click", function () {
    stopTimer();
    randomFirst();
    imgs();
    startTimer(10, withtest);
  });
}
startAll();
function removeImages() {
  for (let i = 0; i < 20; i++) {
    // let el = document.getElementById(list[i]);
    // el.removeChild(el.children[0]);

    let id = `img-${i}`;
    let img = document.getElementById(id);
    img.setAttribute("visible", false);
  }
}

function withtest() {
  randomImages();
  // const fun = async () => {
  //   await delay(5000);
  //   console.log("Waited 5s");
  // };
  startTimer(10, removeImages);
  // wait(5000);
  // startTimer(0);
}
