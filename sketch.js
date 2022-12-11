
const fps = 30 // set the framerate
let translate_x
let translate_y
let bg_color
let rightPane

let scene_2_t = 0
let poster_scene_2 = ['poster1', 'poster2', 'poster3', 'poster4', 'poster5', 'poster6', 'poster7', 'poster8', 'poster9']
let posters = []

let bottles = []

let bottles_direction = []
let bottles_speed = []

let wave_scene_1 = [10, -10, 10, -10, 10, -10, 10, -10, 60, -60]
let wave = 0
let wave_index = 0
let wave_increasement = 2

let bears = []
let bubble_pop
let bubbles = []

let cola_tree_root
let cola_tree_leaves
let cola_rains = []

let cola_cap


let sun_drink
let particles_range = []
let random_particles = []
let particles = []


let fireworks = [];
let gravity;
let city

let words = ['Taste the Feeling', '品嚐感覺', '気持ちを味わう', 'Prueba el sentimiento', 'Goûtez la sensation', '느낌을 맛보다', 'ลิ้มรสความรู้สึก', 'Nếm thử cảm giác', 'Assapora la sensazione', 'Rasakan Rasa', 'भावना का स्वाद लें', 'Вкус чувств']
let wordSize = 30
let streams = []
let finalLogo

let ratio
let h
let w
const n2 = 12
const n1 = 48

let bgSound
let suckSound
let hiyaSound
let uhohSound
let colapourSound
let slotSound
let winSound
let fireworkSound
let niceSound

function preload() {
  soundFormats('mp3');
  bgSound = loadSound('assets/Taste_The_Feeling.mp3');
  suckSound = loadSound('assets/suck.mp3');
  bubble_pop = loadSound('assets/bubble_pop.mp3');
  hiyaSound = loadSound('assets/hiya.mp3');
  uhohSound = loadSound('assets/uhoh.mp3');
  slotSound = loadSound('assets/slot.mp3');
  colapourSound = loadSound('assets/colapour.mp3');
  winSound = loadSound('assets/win.mp3');
  fireworkSound = loadSound('assets/firework.mp3')
  niceSound = loadSound('assets/nice.mp3')
  poster_scene_2.forEach(e => {
    const img = loadImage(`assets/${e}.jpg`)
    posters.push(img)
  })
  bottles.push(loadImage(`assets/bottle-red.png`))
  bottles.push(loadImage(`assets/bottle-white.png`))
  bottles.push(loadImage(`assets/bottle-black.png`))
  cola_tree_root = loadImage(`assets/bottle.png`)
  logo_bottle3 = loadImage(`assets/bottle-3.png`)
  logo_bottle2 = loadImage(`assets/bottle-2.png`)
  cola_tree_leaves = loadImage(`assets/coke-logo.png`)
  sun_drink = loadImage(`assets/sun-drink.png`)
  cola_cap = loadImage(`assets/colacap.jpg`)
  city = loadImage(`assets/city.png`)
  finalLogo= loadImage(`assets/logo2.png`)

  for (let i = 1; i < 5; i++) {
    bears.push(loadImage(`assets/bear${i}.jpg`))
  }
  bears.push(loadImage(`assets/bear6.png`))

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  translate_x = (width) / 2
  translate_y = (height) / 2
  bg_color = color(140, 2, 0)
  rightPane = {
    "color": bg_color,
    "x": windowWidth / 2,
    "y": 0,
    "w": windowWidth / 2,
    'h': windowHeight
  }
  ratio = height / width
  h = height - 100 > 0 ? height - 100 : height
  w = 1.2 * ratio * h
  gravity = createVector(0, 0.2);
  for (let i = 0; i < bottles.length * 8; i++) {
    bottles_direction.push(noise(i) < 0.5 ? -1 : 1)
    bottles_speed.push(map(noise(i), 0, 1, 1, 5))
  }
  for (let i = 0; i < 24; i++) {
    streams.push(new Stream(i % 12, i * 40 + width/2-480, 0))
  }
}



let isTrigger_1 = true
let isTrigger_2 = false
let isTrigger_3 = false
let isTrigger_4 = false
let isTrigger_5 = false
let trigger_2_start_frame
let trigger_3_start_frame
let trigger_4_start_frame
let trigger_5_start_frame
let trigger_count_1 = 0
let trigger_count_2 = 0
let trigger_count_3 = 0
let trigger_count_4 = 0
let trigger_count_5 = 0

function draw() {
  // initial
  frameRate(fps)
  // scene1
  if (isTrigger_1) {
    if (mouseX <= width / 2 + 60 && mouseX >= width / 2 - 60 && mouseY <= height / 2 + 250 && mouseY >= height / 2 - 100) {
      cursor(HAND)
    } else {
      cursor(ARROW)
    }
    background(color(142, 2, 0))
    push()
    noStroke()
    fill(255)
    rect(width / 2 - 50, height / 2 - 250, 100, 500)

    // rest of the cola
    fill(0)
    rect(width / 2 - 50, map(trigger_count_1, 0, 4, height / 2, height / 2 + 250), 100, map(trigger_count_1, 0, 4, 250, 0))

    // amount of drink
    fill(255, 255, 0)
    rect(width / 2 - 50, map(trigger_count_1, 0, 4, height / 2 - 150, height / 2 - 250), 100, map(trigger_count_1, 0, 4, 0, 120))
    pop()
    image(sun_drink, width / 2 - 60, height / 2 - 250, 120, 500)
  }
  // scene2
  else if (isTrigger_2) {
    background(255)
    let time = frameCount - trigger_2_start_frame

    // animation 
    if (time < 330) {
      if (!bgSound.isPlaying()) {
        bgSound.play()
      }

      if (time < 200) {
        if (wave == wave_scene_1[wave_index]) {
          wave_increasement *= -1
          wave_index++
        }
        wave += wave_increasement
        push()
        noStroke()

        if ((time >= 70 && time < 80) || (time >= 50 && time < 60)) {
          fill(255)
          background(rightPane.color)

        }
        else {
          fill(rightPane.color)
          drawingContext.shadowOffsetX = -4;
          drawingContext.shadowOffsetY = -2;
          drawingContext.shadowBlur = 6;
          drawingContext.shadowColor = "#E5E5E5"
        }
        beginShape()
        vertex(windowWidth / 2, -100)
        for (let i = 0; i < windowHeight; i += 10) {
          vertex(windowWidth / 2 + wave * cos(i * 2 / windowHeight * PI), i)
        }
        vertex(windowWidth / 2, windowHeight + 100)
        vertex(windowWidth, windowHeight)
        vertex(windowWidth, 0)
        endShape()
        pop()

        // console.log(wave,wave_index,wave_increasement)
        // text motion
        if (time > 80 && time < 110) {
          push()
          textSize(64)
          fill(255)
          noStroke()
          textWidth(100)
          textStyle(BOLD)
          text('Coca', windowWidth / 2 - map(time - 80, 0, 30, -10, 50), windowHeight / 2 + 30)
          pop()
        } else if (time >= 110 && time < 140) {
          push()
          textSize(64)
          noStroke()
          textWidth(100)
          fill(255)
          textStyle(BOLD)
          text('Cola', windowWidth / 2 - map(time - 110, 0, 30, 50, -10), windowHeight / 2 + 30)

          fill(142, 2, 0, map(time - 102, 0, 60, 0, 255))
          text('Coca', windowWidth / 2 - map(time - 110, 0, 30, 230, 170), windowHeight / 2 + 30)
          pop()
        }
        else if (time >= 140 && time < 170) {
          push()
          textSize(50)
          noStroke()
          textWidth(100)
          textStyle(BOLD)
          fill(255)
          text('Tastes Better', windowWidth / 2 - map(time - 140, 0, 30, -30, -70), windowHeight / 2 + 30)
          fill(142, 2, 0)
          text('Together', windowWidth / 2 - map(time - 140, 0, 30, 240, 200), windowHeight / 2 + 30)
          pop()
        }
        else if (time >= 170 && time < 200) {
          push()
          textSize(50)
          noStroke()
          textWidth(100)
          textStyle(BOLD)
          fill(255)
          text('Happiness', windowWidth / 2 - map(time - 185, 0, 15, -50, -20), windowHeight / 2 + 30)
          fill(142, 2, 0)
          text('Open', windowWidth / 2 - map(time - 185, 0, 15, 120, 150), windowHeight / 2 + 30)
          pop()
        }
      }
      // random elements
      else if (time < 210) {
        const r = time - 200
        push()
        stroke(142, 0, 0, map(r, 0, 5, 10, 255))
        strokeWeight(3)

        for (let i = 0; i < n1; i++) {
          line(width / 2 + cos(i * TWO_PI / n1) * map(r, 0, 10, 20, width / 4),
            height / 2 + sin(i * TWO_PI / n1) * map(r, 0, 10, 20, width / 4),
            width / 2 + cos(i * TWO_PI / n1) * map(r, 0, 10, 40, width / 2),
            height / 2 + sin(i * TWO_PI / n1) * map(r, 0, 10, 40, width / 2))
        }
        pop()
      }
      // rotating rightPane
      else if (time >= 210 && time < 230) {
        if (time < 224) {
          push()
          translate(translate_x, translate_y)
          rotate(-map(time - 210, 0, 14, 0, 90 * (-PI) / 180))
          noStroke()
          fill(rightPane.color)
          rect(0, -windowWidth, windowWidth * 1.5, windowWidth * 2)
          pop()
        } else {
          push()
          noStroke()
          fill(rightPane.color)
          rect(0, windowHeight / 2, windowWidth, windowHeight / 2)
          pop()
        }
      }
      // translating
      else if (time >= 230 && time < 260) {
        push()
        fill(142, 2, 0)
        if (time < 240) {
          rect(0, windowHeight / 2 + map(time - 230, 0, 10, 0, 20), windowWidth, windowHeight / 2)
        } else {
          rect(0, windowHeight / 2 + map(time - 240, 0, 20, 100, -windowHeight / 2), windowWidth, windowHeight / 2 + map(time - 240, 0, 20, 0, windowHeight / 2))
        }
        pop()
        push()
        textSize(82)
        textStyle(BOLD)
        fill(142 + map(time - 230, 0, 30, 0, 113), 0 + map(time - 230, 0, 30, 0, 255), 0 + map(time - 230, 0, 30, 0, 255))
        text('Cola', windowWidth / 2 + 20, windowHeight / 2 + map(time - 230, 0, 30, -30, 0))
        text('Coca', windowWidth / 2 - 190, windowHeight / 2 + map(time - 230, 0, 30, -30, 0))
        pop()
        push()

      }
      else {
        push()
        fill(142, 2, 0)
        rect(0, 0, windowWidth, windowHeight)
        pop()
        if (time < 280) {
          textSize(82)
          textStyle(BOLD)
          fill(255, 255, 255, map(time - 260, 0, 20, 255, 50))
          text('Cola', windowWidth / 2 + 20, windowHeight / 2)
          text('Coca', windowWidth / 2 - 190, windowHeight / 2)
          for (let i = 0; i < 10; i++) {
            random_particles.push(new RandomParticle(random(windowWidth / 2 - 100, windowWidth / 2 + 100), windowHeight / 2, 0))
          }
        } else {
          if (time < 290) {
            textSize(82)
            textStyle(BOLD)
            fill(255, 255, 255, map(time - 280, 0, 10, 50, 0))
            text('Cola', windowWidth / 2 + 20, windowHeight / 2)
            text('Coca', windowWidth / 2 - 190, windowHeight / 2)
          }
          for (let i = random_particles.length - 1; i >= 0; i--) {
            random_particles[i].update()
            random_particles[i].show()
            if (random_particles[i].hasDone()) {
              random_particles.splice(i, 1)
            }
          }
          if (time >= 285) {
            push()
            translate(windowWidth / 2, height / 2)
            textSize(10 + map(time - 285, 0, 35, 0, 60))
            fill(255, map(time - 285, 0, 35, 50, 255))
            textWidth(400)
            textAlign(CENTER, CENTER)
            text('Turn Up Your Rhythm', 0, 0)
            pop()
          }
        }
      }
    }

    // interaction
    else {
      background(color(142, 2, 0))
      if (bgSound.isPlaying()) {
        hiyaSound.play()
        bgSound.pause()
      }
      push()
      textSize(30)
      textAlign(CENTER, CENTER)
      textWidth(300)
      fill(255)
      if (trigger_count_2 < 2) {

        text(`Ice bear wants bubble: ${trigger_count_2}`, width / 2, height / 2 + 200)
        image(bears[0], width / 2 - 100, height / 2 - 150, 200, 300)
      } else if (trigger_count_2 <= 10) {

        text(`Ice bear wants more: ${trigger_count_2}`, width / 2, height / 2 + 200)

        if (frameCount % 30 < 10) {
          image(bears[0], width / 2 - 100, height / 2 - 150, 200, 300)
        } else if (frameCount % 30 < 20) {
          image(bears[1], width / 2 - 100, height / 2 - 150, 200, 300)
        } else {
          image(bears[2], width / 2 - 100, height / 2 - 150, 200, 300)
        }
      } else if (trigger_count_2 < 20) {
        text(`Come on, blow me up: ${trigger_count_2}`, width / 2, height / 2 + 200)
        if (frameCount % 30 < 8) {
          image(bears[0], width / 2 - 100, height / 2 - 150, 200, 300)
        } else if (frameCount % 30 < 16) {
          image(bears[1], width / 2 - 100, height / 2 - 150, 200, 300)
        } else if (frameCount % 30 < 24) {
          image(bears[2], width / 2 - 100, height / 2 - 150, 200, 300)
        } else {
          image(bears[3], width / 2 - 100, height / 2 - 150, 200, 300)
        }

      } else {
        text(`Oh yeah! : ${trigger_count_2} `, width / 2, height / 2 + 200)
        image(bears[4], width / 2 - 100, height / 2 - 150, 300, 300)
      }
      pop()
      // bubble drawing
      for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update()
        bubbles[i].show()
        if (bubbles[i].hasBloomed) {

          bubbles.splice(i, 1)
        }
      }

    }
  }
  // scene3
  else if (isTrigger_3) {
    background(255)
    let time = frameCount - trigger_3_start_frame

    // animation 
    if (time < 200) {
      if (bgSound.isPaused()) {
        bgSound.play()
      }
      if (time < 90) {
        // posters showing
        scene_2_t++
        scene_2_t %= 80
        let c = scene_2_t > 30 ? 1 : 0
        SunflowerParticle(500 * (1 - cos(scene_2_t / 30)), Math.sqrt(windowWidth * windowWidth + windowHeight * windowHeight) / 2, 50, c)

        if (time < 30) {
          push()
          translate(translate_x - w / 2, translate_y - h / 2)
          image(posters[0], 0, 0, w, h)
          pop()
        } else if (time < 45) {
          push()
          translate(translate_x - w / 2, translate_y - h / 2)
          image(posters[1], 0, 0, w, h)
          pop()
        }
        else if (time < 60) {
          push()
          translate(translate_x - w / 2, translate_y - h / 2)
          image(posters[2], 0, 0, w, h)
          pop()
        } else if (time >= 60) {
          let index = int((time - 60) / 2) + 3
          if (index <= 15) {
            if (index >= 9) {
              index = index - 9
            }
            push()
            translate(translate_x - w / 2, translate_y - h / 2)
            image(posters[index], 0, 0, w, h)
            pop()
          }
        }
      } else if (time < 180) {
        //bottle dancing

        if (time < 150) {
          for (let i = 0; i < bottles.length * 8; i++) {
            for (let j = 0; j < n2; j++) {
              image(bottles[i % 3],
                ((j - 1) + (i % 2) * 0.8) * 1.5 * width / (n2 - 1) + bottles_direction[i] * bottles_speed[i] * time / 5,
                (i - 2) * height / 24 + map(noise(i, j), 0, 1, 40, 60) * sin(time / 5),
                100,
                200)
            }
          }
        }
        else if (time < 154) {
          for (let i = 0; i < bottles.length * 8; i++) {
            for (let j = 0; j < n2; j++) {
              image(
                bottles[i % 3], ((j - 1) + (i % 2) * 0.8) * 1.5 * width / (n2 - 1) + bottles_direction[i] * bottles_speed[i] * time / 5,
                (i - 2) * height / 24 - map(time - 150, 0, 4, 40, 100),
                100,
                200)
            }
          }
        } else {
          for (let i = 0; i < bottles.length * 8; i++) {
            for (let j = 0; j < n2; j++) {
              image(
                bottles[i % 3], ((j - 1) + (i % 2) * 0.8) * 1.5 * width / (n2 - 1) + bottles_direction[i] * bottles_speed[i] * time / 5,
                (i - 2) * height / 24 - map(time - 154, 0, 26, 100, -500),
                100,
                200)
            }
          }

          if (time >= 170) {
            const i_w = map(time - 170, 0, 10, 300, 210)
            const i_h = i_w * 2
            const i_y = map(time - 170, 0, 10, -400, (height / 2 + 100) / 3)
            image(cola_tree_root, width / 2 - i_w / 2, i_y, i_w, i_h)
          }
        }

      } else {
        const i_w = map(time - 180, 0, 20, 210, 30)
        const i_h = i_w * 2
        const i_y = map(time - 180, 0, 20, (height / 2 + 100) / 3, height / 2 + 100)
        image(cola_tree_root, width / 2 - i_w / 2, i_y, i_w, i_h)
      }
    }

    // interaction
    else {
      if (bgSound.isPlaying()) {
        uhohSound.play()
        bgSound.pause()
      }
      if (mouseY <= 150 && mouseY >= 50) {
        cursor(HAND)
      } else {
        cursor(ARROW)
      }
      ColaCloud(mouseX, 100)
      image(cola_tree_root, width / 2 - 15, height / 2 + 100, 30, 60)

      for (let i = cola_rains.length - 1; i >= 0; i--) {
        cola_rains[i].update()
        cola_rains[i].show()
        if (cola_rains[i].opacity < 0) {
          cola_rains.splice(i, 1)
        }
      }
      switch (trigger_count_3) {
        case 1:
          image(cola_tree_leaves, width / 2 - 150, height / 2 + 0, 300, 100)
          break
        case 2:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          break
        case 3:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
          break
        case 4:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
          image(cola_tree_leaves, width / 2 - 60, height / 2 - 160, 120, 40)
          break
        case 5:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
          image(cola_tree_leaves, width / 2 - 60, height / 2 - 160, 120, 40)
          image(cola_tree_leaves, width / 2 - 40, height / 2 - 190, 80, 30)
          break
        case 6:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
          image(cola_tree_leaves, width / 2 - 60, height / 2 - 160, 120, 40)
          image(cola_tree_leaves, width / 2 - 40, height / 2 - 190, 80, 30)
          image(cola_tree_leaves, width / 2 - 20, height / 2 - 210, 40, 20)
          break
        case 7:
          image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
          image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
          image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
          image(cola_tree_leaves, width / 2 - 60, height / 2 - 160, 120, 40)
          image(cola_tree_leaves, width / 2 - 40, height / 2 - 190, 80, 30)
          image(cola_tree_leaves, width / 2 - 20, height / 2 - 210, 40, 20)
          image(cola_tree_leaves, width / 2 - 10, height / 2 - 220, 20, 10)
          break
      }
    }
  }
  // scene4
  else if (isTrigger_4) {
    background(255)

    let time = frameCount - trigger_4_start_frame
    // animation
    if (time <= 235) {
      if (bgSound.isPaused()) {
        bgSound.play()
      }
      if (time < 35) {


        image(cola_tree_root, width / 2 - 15, height / 2 + 100, 30, 60)
        image(cola_tree_leaves, width / 2 - 150, height / 2, 300, 100)
        image(cola_tree_leaves, width / 2 - 120, height / 2 - 70, 240, 80)
        image(cola_tree_leaves, width / 2 - 90, height / 2 - 120, 180, 60)
        image(cola_tree_leaves, width / 2 - 60, height / 2 - 160, 120, 40)
        image(cola_tree_leaves, width / 2 - 40, height / 2 - 190, 80, 30)
        image(cola_tree_leaves, width / 2 - 20, height / 2 - 210, 40, 20)
        image(cola_tree_leaves, width / 2 - 10, height / 2 - 220, 20, 10)
        if (time <= 15) {
          push()
          textAlign(CENTER, CENTER)
          textSize(28)
          fill(142, 0, 0, map(time, 0, 15, 50, 255))
          text('Merry Christmas', width / 2, height / 2 + map(time, 0, 15, 300, 200))
          pop()
        } else {
          push()
          textAlign(CENTER, CENTER)
          textSize(28)
          fill(142, 0, 0)
          text('Merry Christmas', width / 2, height / 2 + 200)
          pop()
        }

        const r = time % 10
        push()
        stroke(142, 0, 0, map(r, 0, 10, 10, 255))
        strokeWeight(1)
        for (let i = 0; i < 8; i++) {
          line(width / 2 + + cos(i * TWO_PI / 8) * map(r, 0, 10, 5, 10),
            height / 2 - 240 + sin(i * TWO_PI / 8) * map(r, 0, 10, 5, 10),
            width / 2 + cos(i * TWO_PI / 8) * map(r, 0, 10, 10, 15),
            height / 2 - 240 + sin(i * TWO_PI / 8) * map(r, 0, 10, 10, 15))
        }
        pop()
      } else if (time < 65) {
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 300, 0) / 2, height / 2 + map(time - 35, 0, 30, 0, -50), map(time - 35, 0, 30, 300, 0), 100)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 240, 0) / 2, height / 2 + map(time - 35, 0, 30, -70, -50), map(time - 35, 0, 30, 240, 0), 80)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 180, 0) / 2, height / 2 + map(time - 35, 0, 30, -120, -50), map(time - 35, 0, 30, 180, 0), 60)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 120, 0) / 2, height / 2 + map(time - 35, 0, 30, -160, -50), map(time - 35, 0, 30, 120, 0), 40)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 80, 0) / 2, height / 2 + map(time - 35, 0, 30, -190, -50), map(time - 35, 0, 30, 80, 0), 30)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 40, 0) / 2, height / 2 + map(time - 35, 0, 30, -210, -50), map(time - 35, 0, 30, 40, 0), 20)
        image(cola_tree_leaves, width / 2 - map(time - 35, 0, 30, 10, 0) / 2, height / 2 + map(time - 35, 0, 30, -220, -50), map(time - 35, 0, 30, 20, 0), 10)
        image(cola_tree_root, width / 2 - map(time - 35, 0, 30, 30, 40) / 2, height / 2 + map(time - 35, 0, 30, 100, -50), map(time - 35, 0, 30, 30, 40), map(time - 35, 0, 30, 60, 100))
      } else {
        background(142, 0, 0)
        if (time < 135) {
          const count = int((time - 65) / 6) * 2
          image(logo_bottle3, width / 2 - 10, height / 2 - 50, 20, 60)
          for (let i = 1; i <= count / 2; i++) {
            image(logo_bottle3, width / 2 - 10 - i * 20, height / 2 - 50, 20, 60)
            image(logo_bottle3, width / 2 + 10 + (i - 1) * 20, height / 2 - 50, 20, 60)
          }
        } else if (time <= 165) {
          const count = 25
          const a = map(time - 135, 0, 30, 0, 60)
          for (let i = 0; i < count; i++) {
            image(logo_bottle3, width / 2 + (i - 12) * map(time - 135, 0, 30, 20, 18), height / 2 - 50 + a * sin(i / 24 * PI), 20 * sin((i + 1) / 25 * PI), 60 * sin((i + 1) / 25 * PI))
          }
        } else {
          if (random(0, 1) < 0.5) {
            random_particles.push(new RandomLines(width / 2 + random(-300, 300), height / 2 + random(-300, 300), random(8, 12)))
          }
          for (let i = random_particles.length - 1; i >= 0; i--) {
            random_particles[i].update()
            random_particles[i].show()
            if (random_particles[i].hasDone() == true) {
              random_particles.splice(i, 1)
            }
          }
          const count = 25
          for (let i = 0; i < count; i++) {
            image(logo_bottle3, width / 2 + (i - 12) * 18, height / 2 - 50 + 60 * sin(i / 24 * PI), 20 * sin((i + 1) / 25 * PI), 60 * sin((i + 1) / 25 * PI))
          }

        }

      }
    }
    // interaction
    else {
      if (bgSound.isPlaying()) {
        slotSound.play()
        bgSound.pause()
      }
      background(142, 2, 0)
      textAlign(CENTER, CENTER)
      textSize(30)
      fill(255)
      text('Filp coca cola cap to win a prize', width / 2, 70)
      textSize(24)
      text(`You've got a change to win an iphone 13 !`, width / 2, 120)
      push()
      translate(width / 2 - 180, height / 2 - 180)
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          image(cola_cap, r * 120 + cos(frameCount / 10) * 5, c * 120 + sin(frameCount / 20) * 5, 100, 100)
        }
      }
      pop()
      if (mouseX <= width / 2 + 180 && mouseX >= width / 2 - 180 && mouseY <= height / 2 + 180 && mouseY >= height / 2 - 180) {
        cursor(HAND)
      } else {
        cursor(ARROW)
      }
    }
  }
  // scene5
  else if (isTrigger_5) {

    let time = frameCount - trigger_5_start_frame
    if (time < 660) {
      if (bgSound.isPaused()) {
        winSound.stop()
        bgSound.play()
      }
      if (time < 45) {
        background(255)
        textAlign(CENTER, CENTER)
        textSize(30)
        fill(142, 2, 0, map(time, 0, 45, 50, 255))
        text('Congratulations, you have won a fireworks feast !', width / 2, height / 2 + map(time, 0, 45, 30, 0))
      } else if (time < 75) {
        background(255)
        text('Ready?', width / 2, height / 2 + map(time - 45, 0, 30, 30, 0))
      } else if (time < 390) {
        background(255, 80)
        if (random(1) < 0.2) {
          fireworks.push(new Firework(random(width * 0.2, width * 0.8)))
        }
        for (let i = fireworks.length - 1; i >= 0; i--) {
          fireworks[i].upadte();
          fireworks[i].show();
          if (fireworks[i].hasDone()) {
            fireworks.splice(i, 1);
          }
        }
        image(city, width * 0.2, height - 300, width * 0.6, width * 0.6 * 0.314)
      }
      else if(time<600){
        background(color(142, 2, 0))
          for (const s of streams) {
            s.show()
          }
      }else{
        background(255)
        push()
        imageMode(CENTER)
        translate(width/2,height/2)
        rotate(map(time-600,0,60,-PI/2,0))
        image(finalLogo,0,0,200,200)
        pop()
      }
    }else{
      // stop drawing
      noLoop()
    }
  }
}

function mouseClicked() {
  if (isTrigger_1) {
    if (mouseX <= width / 2 + 60 && mouseX >= width / 2 - 60 && mouseY <= height / 2 + 250 && mouseY >= height / 2 - 100) {
      trigger_count_1++
     
      suckSound.play()
      if(trigger_count_1==3){
        suckSound.stop()
        niceSound.play()
      }
      if (trigger_count_1 > 3) {
     
        isTrigger_1 = false
        isTrigger_2 = true
        cursor(ARROW)
        trigger_2_start_frame = frameCount
        // TODO: there should has a "nice" sound
      }
    }
  } else if (isTrigger_2 && !bgSound.isPlaying()) {
    bubbles.push(new RandomBubble(mouseX, mouseY))
    trigger_count_2++
    if (trigger_count_2 > 20) {
      isTrigger_2 = false
      isTrigger_3 = true
      trigger_3_start_frame = frameCount
    }
  } else if (isTrigger_3 && !bgSound.isPlaying() ) {
    if (mouseY <= 150 && mouseY >= 50) {
      colapourSound.play()
      for (let i = 0; i < 30; i++) {
        cola_rains.push(new ColaRain(mouseX + map(i, 0, 30, -50, 50), 100))
      }
      if (mouseX <= width / 2 + 100 && mouseX >= width / 2 - 150) {
        trigger_count_3++
      }
      if (trigger_count_3 == 7) {
        isTrigger_3 = false
        isTrigger_4 = true
        trigger_4_start_frame = frameCount
        delete colapourSound
        cursor(ARROW)
      }
    }
  } else if (isTrigger_4 && !bgSound.isPlaying()) {
    if (mouseX <= width / 2 + 180 && mouseX >= width / 2 - 180 && mouseY <= height / 2 + 180 && mouseY >= height / 2 - 180) {
      winSound.play()
      slotSound.stop()
      isTrigger_4 = false
      isTrigger_5 = true
      trigger_5_start_frame = frameCount
      cursor(ARROW)
    }
  }
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}


function ColaCloud(x, y) {
  push()
  noStroke()
  fill(142, 2, 0)
  ellipse(x, y, 70, 50);
  ellipse(x + 10, y + 10, 70, 50);
  ellipse(x - 20, y + 10, 70, 50);
  pop()
}

function ColaRain(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector(0, random(5, 12))
  this.sw = random(1, 2)
  this.len = random(5, 8)
  this.opacity = 255
  this.update = () => {
    this.pos.add(this.vel)
    this.opacity -= 3
  }
  this.show = () => {
    push()
    noFill()
    stroke(142, 2, 0, this, this.opacity)
    strokeWeight(this.sw)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.len)
    pop()
  }

}

function StrokeCircle(x, y) {
  this.x = x
  this.y = y
  this.sw = 1
  this.size = random(8, 16)
  this.opacity = random(200, 255)
  this.update = () => {
    this.size++
    this.opacity -= 6
  }
  this.show = () => {
    push()
    noFill()
    stroke(255, this.opacity)
    strokeWeight(this.sw)
    ellipse(this.x, this.y, this.size, this.size)
    pop()
  }
  this.hasDone = () => {
    return this.opacity <= 0
  }
}

function FillCircle(x, y) {
  this.pos = createVector(x, y)
  this.size = 1
  this.opacity = random(200, 255)
  this.vec = p5.Vector.random2D()
  this.vec.mult(random(1, 6))
  this.update = () => {
    this.size += random(0.1, 0.5)
    this.opacity -= random(1, 6)
    if (this.opacity <= 156) {
      this.vec = createVector(this.vec.x, -5)
    }
    this.pos.add(this.vec)
  }
  this.show = () => {
    push()
    noStroke()
    fill(255, 255, 255, this.opacity)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()
  }
  this.hasDone = () => {
    return this.opacity <= 0
  }
}

function RandomParticle(x, y, color) {
  this.pos = createVector(x, y)
  this.vec = createVector(random(-50, 50), random(-windowHeight / 10, windowHeight / 10))
  this.type = Math.floor(random(0, 3))
  this.opacity = random(150, 255)
  this.color = color
  this.isFill = Math.round(random(0, 1))
  this.sw = random(1, 3)
  this.size = random(5, 30)
  this.update = () => {
    this.pos.add(this.vec)
    this.opacity -= random(1, 5)
  }
  this.show = () => {
    push()
    if (this.isFill == 1) {
      noStroke()
      if (this.color == 0) {
        fill(255, this.opacity)
      } else {
        fill(142, 2, 0, this.opacity)
      }
    } else {
      noFill()
      if (this.color == 0) {
        stroke(255, this.opacity)
      } else {
        stroke(142, 2, 0, this.opacity)
      }
    }



    strokeWeight(this.sw)
    switch (this.type) {
      case 0:
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.size)
      case 1:
        rect(this.pos.x, this.pos.y, this.size, this.size)
      case 2:
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
      // case 3:
      //     triangle(this.pos.x, this.pos.y, this.pos.x+this.size,this.pos.y+this.size, this.pos.x-this.size, this.pos.y-this.size)
    }
    pop()
  }
  this.hasDone = () => {
    return this.opacity <= 0
  }
}

function RandomLines(x, y, n) {
  this.pos = createVector(x, y)
  this.n = n
  this.r1 = random(5, 20)
  this.r2 = random(20, 30)
  this.r3 = random(10, 15)
  this.r4 = random(25, 40)
  this.opacity = 255
  this.count = 0;
  this.sw = random(1, 3)
  this.update = () => {
    this.count++
    this.opacity -= 6
  }
  this.show = () => {
    push()
    stroke(255, this.opacity)
    strokeWeight(this.sw)
    for (let i = 0; i < n; i++) {
      line(this.pos.x + cos(i * TWO_PI / this.n) * map(this.count, 0, 30, this.r1, this.r2),
        this.pos.y + sin(i * TWO_PI / this.n) * map(this.count, 0, 30, this.r1, this.r2),
        this.pos.x + cos(i * TWO_PI / this.n) * map(this.count, 0, 30, this.r3, this.r4),
        this.pos.y + sin(i * TWO_PI / this.n) * map(this.count, 0, 30, this.r3, this.r4),
      )
    }
    pop()
  }
  this.hasDone = () => {
    return this.opacity < 0
  }
}

function RandomBubble(x, y) {
  this.pos = createVector(x, y)
  this.size = random(5, 10)
  this.vel = createVector(sin(random(-PI, PI)) * 5, -6)
  this.opacity = 255
  this.hasBloomed = false
  this.update = () => {
    this.opacity -= 5
    if (!this.hasBloomed) {
      this.size += 1.5
    }
    if (this.size > 40 && !this.hasBloomed) {
      this.hasBloomed = true
      bubble_pop.play()
    }
    this.vel = createVector(sin(random(-PI, PI)) * 5, -6)
    this.pos.add(this.vel)
  }
  this.show = () => {
    push()
    strokeWeight(2)
    stroke(255, this.opacity)
    fill(255, this.opacity - 20)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()
  }

}


function SunflowerParticle(count, radius, size, color) {
  const new_PI = (1 + Math.sqrt(5)) / 2;
  push()
  if (color == 0) {
    background(132, 2, 0)
    fill(255)
  } else {
    background(255)
    fill(132, 2, 0)

  }

  translate(width / 2, height / 2)
  noStroke()

  for (let i = 0; i < count; i++) {
    const angle = i * new_PI
    const friction = i / count
    const x = cos(angle * TWO_PI) * friction * radius
    const y = sin(angle * TWO_PI) * friction * radius
    ellipse(x, y, friction * size)
  }
  pop()
}

function FireworkParticle(x, y, acc, spread) {
  this.pos = createVector(x, y);
  this.spread = spread;
  this.opacity = 255;
  this.r = random(142,255)
  // check if the particle is the seed
  if (spread) {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 6));
  } else {
    this.vel = createVector(0, random(-20, -8));
  }
  this.acc = acc


  // use to check whether to remove the particle
  this.hasDone = () => {
    return this.opacity < 0;
  }

  // use to update the position of the particle
  this.update = function () {
    if (this.spread) {
      this.vel.mult(0.95)
      this.opacity -= 6;

    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  // use to draw the particle via its position
  this.show = () => {
    if (this.spread) {
      strokeWeight(2);
    } else {
      strokeWeight(3);
    }
    stroke(this.r, 0, 0,this.opacity)
    point(this.pos.x, this.pos.y)
  }

}

function Firework(x) {

  // the seed of the firework

  this.seed = new FireworkParticle(x, height, gravity, false, this.rgb);
  // the spread particles 
  this.particles = [];

  // if the firework has exploded
  this.exploded = false;

  this.hasDone = () => {
    return this.exploded && this.particles.length === 0
  }

  this.upadte = () => {
    if (this.seed) {
      this.seed.update();

      // if the seed reach to the highest place it can get
      // then explode it, and remove the seed
      if (this.seed.vel.y >= 0) {
        this.exploded = true;
        this.explode();
        this.seed = null;
        fireworkSound.play();
      }
    }

    if (this.exploded) {

      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].hasDone()) {
          this.particles.splice(i, 1);
        }

      }

    }

  }


  this.explode = () => {
    for (let i = 0; i < 40; i++) {
      let p = new FireworkParticle(this.seed.pos.x, this.seed.pos.y,
        gravity, true)
      this.particles.push(p);
    }
  }

  this.show = () => {
    if (this.seed) {
      this.seed.show();
    }
    for (let p of this.particles) {
      p.show();
    }
  }

}


function WordSymbol(word, x, y, speed) {
  this.x = x
  this.y = y
  this.word = word
  this.speed = speed
  this.opacity = 255
  this.update = () => {
    if (this.y >= height) {
      this.y = 0
      this.opacity = 255
    } else {
      this.y = this.y + this.speed
      this.opacity -= 2
    }
  }

  this.show = function () {
    fill(220, this.opacity)
    textSize(wordSize)
    textStyle(NORMAL)
    text(this.word, this.x, this.y)
    this.update()
  }

}
function Stream(index, x, y) {
  this.str = words[index]
  this.wordSymbols = []
  this.speed = random(5, 10)
  for (let char of this.str) {
    this.wordSymbols.push(new WordSymbol(char, x, y, this.speed))
    y += wordSize
  }
  this.show = () => {
    for (const w of this.wordSymbols) {
      w.show()
    }
  }
}