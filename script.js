// var answers = ["B", "C", "A", "C", "B", "D", "A", "B"],
//     tot = answers.length;
// function getCheckedValue(radioName) {
//     var radios = document.getElementsByName(radioName);
//     for (var y = 0; y < radios.length; y++)
//         if (radios[y].checked) return radios[y].value;
// }
// function getScore() {
//     var score = 0;
//     for (var i = 0; i < tot; i++)
//         if (getCheckedValue("question" + i) === answers[i]) score += 1;
//     return score;
// }
// function returnScore() {
//     document.getElementById("myresults").innerHTML =
//         "YOU SCORED A " + getScore() + "/" + tot;
//     if (getScore() > 6) {
//         console.log("Bravo");
//         more.style.display = "block"
//     }
//     if (getScore() < 6) {
//         console.log("Oops");
//         less.style.display = "block"
//     }

// }
//  var more = document.getElementById("more")
//  var less = document.getElementById("less")

function returnScore() {
    const answers = ["B", "C", "A", "C", "B", "D", "A", "B"];
    let score = 0;

    // Loop through each question to check answers
    for (let i = 0; i < answers.length; i++) {
        const selected = document.querySelector(`input[name="question${i}"]:checked`);
        if (selected && selected.value === answers[i]) {
            score++;
        }
    }

    const results = document.getElementById("myresults");
    results.textContent = `YOU SCORED A ${score}/8`;

    document.getElementById("less").style.display = score < 5 ? "block" : "none";
    document.getElementById("less-sad").style.display = score < 5 ? "block" : "none";
    document.getElementById("more").style.display = score >= 5 ? "block" : "none";
    document.getElementById("more-happy").style.display = score >= 5 ? "block" : "none";
    
}



//keyframe trigger
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5
    });

    // Select elements to observe
    document.querySelectorAll('.keytext, .optitle').forEach(element => {
        observer.observe(element);
    });
});


//custom cursor
// JavaScript for the custom cursor
document.addEventListener("DOMContentLoaded", function() {
    // Find the cursor element
    const cursor = document.querySelector(".cursor");
    
    // Update the position of the cursor on mouse move
    document.addEventListener("mousemove", (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // Set the cursor's position with a small offset
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }); 
});


//dots
function createRandomDots() {
    const introPrac = document.querySelector('.intro-prac');
    const numDots =  60; 
    const width = introPrac.offsetWidth;
    const height = introPrac.offsetHeight;

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');

      const x = Math.random() * (width - 60); 
      const y = Math.random() * (height - 60);

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      
      const delay = Math.random() * 4; 
      dot.style.animationDelay = `${delay}s`;

      introPrac.appendChild(dot);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(createRandomDots, 400); 
  });





  //dash
function createRandomDash() {
    const messageInt = document.querySelector('.message-int');
    const numDash =  60; 
    const width = messageInt.offsetWidth;
    const height = messageInt.offsetHeight;

    for (let i = 0; i < numDash; i++) {
      const dash = document.createElement('div');
      dash.classList.add('dash');

      const x2 = Math.random() * (width - 100); 
      const y2 = Math.random() * (height - 30);

      dash.style.left = `${x2}px`;
      dash.style.top = `${y2}px`;

      
      const delay2 = Math.random() * 4; 
      dash.style.animationDelay = `${delay2}s`;

      messageInt.appendChild(dash);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(createRandomDash, 400); 
  });






//circular div on scroll
let radiusSection;
let sectionObserver;
let originalStyles;

let viewportHeight;
let viewportWidth;
let radiusSectionHeight;
let maxRatio;
let bottomThreshold;
let topThreshold;
let totalTransitionPixels;
let transitionPercentage;

let isMobile = false;
let prevWidth;

function calculateMaxRatio() {
  viewportHeight = window.innerHeight;
  radiusSectionHeight = document.querySelector('.radius-block').offsetHeight;
  maxRatio = viewportHeight / radiusSectionHeight;
}

function calculateBottomTopThresholds() {
  bottomThreshold = maxRatio / 3;
  topThreshold = maxRatio / 1.5;
}

window.addEventListener('DOMContentLoaded', () => {
  viewportWidth = window.innerWidth;

  if (viewportWidth < 735) {
    isMobile = true;
  }

  radiusSection = document.querySelector('.radius-block');
  originalStyles = getComputedStyle(radiusSection);

  calculateMaxRatio();
  calculateBottomTopThresholds();

  createRadiusSectionObserver();
}, false);

window.onresize = function () {
  prevWidth = viewportWidth;
  viewportWidth = window.innerWidth;

  calculateMaxRatio();
  calculateBottomTopThresholds();

  // Update the observer to reflect new dimensions
  sectionObserver.disconnect(); // Stop observing previous dimensions
  createRadiusSectionObserver(); // Reinitialize observer with updated thresholds
};

function createRadiusSectionObserver() {
  let sectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList()
  };

  sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= bottomThreshold && entry.intersectionRatio <= topThreshold) {
        transitionPercentage = ((entry.intersectionRatio - bottomThreshold) / (topThreshold - bottomThreshold));
        // Calculate border-radius based on transitionPercentage
        let borderRadius = (1 - transitionPercentage) * 50; // 50% to 0%
        radiusSection.style.borderRadius = `${borderRadius}%`;
      } else if (entry.intersectionRatio > topThreshold) {
        radiusSection.style.borderRadius = '0%';
      } else {
        radiusSection.style.borderRadius = '50%'; // Fully rounded when leaving
      }
    });
  }, sectionOptions);

  sectionObserver.observe(radiusSection);
}


function buildThresholdList() {
  let thresholds = [];
  const numSteps = 1000;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}


//morse sounds
// https://elucidation.github.io/MorsePy/
//has a separate file for the morse sounds that it pulls from
//chatGPT


const morseCodeMap = {
  'A': '._', 'B': '_...', 'C': '_._.', 'D': '_..', 'E': '.', 
  'F': '.._.', 'G': '__.', 'H': '....', 'I': '..', 'J': '.___',
  'K': '_._', 'L': '._..', 'M': '__', 'N': '_.', 'O': '___',
  'P': '.__.', 'Q': '__._', 'R': '._.', 'S': '...', 'T': '_',
  'U': '.._', 'V': '..._', 'W': '.__', 'X': '_.._', 'Y': '_.__',
  'Z': '__..', ' ': ' ', '1': '.____', '2': '..___', '3': '...__',
  '4': '...._', '5': '.....', '6': '_....', '7': '__...', '8': '___..',
  '9': '____.', '0': '_____'
};

// Converts text to Morse code
function textToMorse(text) {
  return text.toUpperCase().split('').map(char => morseCodeMap[char] || '').join(' ');
}

// Plays the Morse code using the Web Audio API
function playMorse(morseCode, audioContext, streamDestination = null) {
  let startTime = audioContext.currentTime;

  morseCode.split('').forEach(symbol => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);

    // Connect to the correct destination
    if (streamDestination) {
      oscillator.connect(streamDestination);
    } else {
      oscillator.connect(audioContext.destination);
    }

    if (symbol === '.') {
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2); // Dot: 200ms
      startTime += 0.4; // Dot + space
    } else if (symbol === '_') {
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.6); // Dash: 600ms
      startTime += 0.8; // Dash + space
    } else {
      startTime += 0.4; // Space between letters
    }
  });
}

// Handles user input and plays Morse code
async function handleMorse() {
  const userInput = document.getElementById('userInput').value.trim();
  const morseCode = textToMorse(userInput);

  if (morseCode === '') {
    alert("Hey Old Chap, enter a valid transmission.");
    return;
  }

  // Display Morse code
  document.getElementById('output').innerText = morseCode;

  // Play Morse code
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  playMorse(morseCode, audioContext);
}

async function downloadMorse() {
  const userInput = document.getElementById('userInput').value.trim();
  const morseCode = textToMorse(userInput);

  if (morseCode === '') {
    alert("Hey Old Chap, enter a valid transmission.");
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate; // Get audio sample rate
  const duration = morseCode.split('').reduce((acc, symbol) => {
    if (symbol === '.') return acc + 0.2 + 0.2; // Dot + space
    if (symbol === '-') return acc + 0.6 + 0.2; // Dash + space
    return acc + 0.4; // Space
  }, 0);

  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const channelData = buffer.getChannelData(0);

  let offset = 0;

  // Generate Morse tones
  morseCode.split('').forEach(symbol => {
    const toneFrequency = 600; // Frequency of Morse tone in Hz
    const dotDuration = 0.2; // Dot duration in seconds
    const dashDuration = 0.6; // Dash duration in seconds
    const silenceDuration = 0.6; // Silence between symbols

    if (symbol === '.') {
      generateTone(channelData, offset, toneFrequency, dotDuration, sampleRate);
      offset += Math.floor(dotDuration * sampleRate);
    } else if (symbol === '-') {
      generateTone(channelData, offset, toneFrequency, dashDuration, sampleRate);
      offset += Math.floor(dashDuration * sampleRate);
    }
    offset += Math.floor(silenceDuration * sampleRate); // Add silence
  });

  // Create a WAV file
  const wavBlob = createWavFile(buffer, sampleRate);

  // Offer the WAV file for download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(wavBlob);
  link.download = 'morse.wav';
  link.click();
}

function generateTone(channelData, start, frequency, duration, sampleRate) {
  const samples = Math.floor(duration * sampleRate);
  for (let i = 0; i < samples; i++) {
    channelData[start + i] = Math.sin(2 * Math.PI * frequency * (i / sampleRate));
  }
}

function createWavFile(buffer, sampleRate) {
  const numChannels = buffer.numberOfChannels;
  const length = buffer.length * numChannels;
  const wavBuffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(wavBuffer);

  // Write WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true); // File size
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // PCM format chunk size
  view.setUint16(20, 1, true); // Audio format (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true); // Byte rate
  view.setUint16(32, numChannels * 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, length * 2, true);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    const channelData = buffer.getChannelData(i);
    for (let j = 0; j < channelData.length; j++) {
      const sample = Math.max(-1, Math.min(1, channelData[j]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
