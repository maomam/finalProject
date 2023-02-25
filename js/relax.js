
const ns = "http://www.w3.org/2000/svg";
const svg = document.getElementById("contur");
const player = document.getElementById("player");
const progress = document.getElementById("progress");
const bar = document.getElementById("bar");
const nase = document.getElementById("nase");
const lunge = document.getElementById("lunge");
const mund = document.getElementById("mund");
const bauch = document.getElementById("bauch");
const augen = document.getElementById("augen");
const cloud = document.getElementById("cloud");
const smile = document.getElementById("smile");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");


let playing = false;
let button;

let masterVolume = -12; // in decibels (dB);
let scaleNotes = Tonal.Scale.get("C3 phrygian").notes;

let chords = [];
let currentChord = 0;
let nextChord = 0;
let motif; 
let poly;
let autoFilter;
let noise; 

const cont =  [
        { x: 656.626046127378, y: 128.3200001260637 },
        { x: 993.8111422277611, y: 419.08023125774935 },
        { x: 1033.7494631154764, y: 850.231770795946 },
        { x: 967.1749827850936, y: 1688.3086526243274 },
        { x: 733.690178732236, y: 2120.791377334668 },
        { x: 214.33781964423002, y: 2063.7498924831057 },
        { x: 130.1425741153367, y: 1608.139859230041 },
        { x: 145.89213607854205, y: 1123.4388809609875 },
        { x: 50.761779233761985, y: 655.0025120646302 },
        { x: 242.70324656716542, y: 193.56876898180644 },
        { x: 581.1650746928929, y: 131.56473242125276 },
        { x: 131.11690555621593, y: 283.7737010419144 },
        { x: 57.471204659498795, y: 782.6051749105816 },
        { x: 70.9897609442164, y: 1219.0187680205047 },
        { x: 176.3357043566392, y: 1691.8872278570823 },
        { x: 311.84462616509666, y: 2122.789682893741 },
        { x: 831.1776543773768, y: 2093.877725788763 },
        { x: 999.6445388460766, y: 1608.9712003506916 },
        { x: 1081.9947057472045, y: 1192.553946712101 },
        { x: 1027.756398639083, y: 339.54641226204984 }
];

const nose = [
        {x: 525.8182632000005, y: 683.6856444879396},
  {x: 513.8104589930256, y: 708.9325508789464},
  {x: 500.1699239279269, y: 733.3879418434622},
  {x: 487.34277357339636, y: 758.2642411193287},
  {x: 484.3569052271065, y: 785.7773473670741},
  {x: 496.3040837461435, y: 810.6488729327373},
  {x: 520.6045083021489, y: 823.4366367055006},
  {x: 547.7824130359293, y: 818.8001137767731},
  {x: 575.1115083098412, y: 817.3507264220714},
  {x: 601.5883753455488, y: 825.4846045050274},
  {x: 626.7334357374615, y: 814.754762914592},
  {x: 640.0459062034251, y: 790.5581850769198},
  {x: 638.5672005000804, y: 762.9522545385919},
  {x: 624.2699252909795, y: 739.0136981111204},
  {x: 607.6459910261916, y: 716.4890218257988},
  {x: 592.7137658178434, y: 692.8486865923367},
  {x: 584.1060910848582, y: 666.2276677734574},
  {x: 571.2201499284852, y: 641.535185618481},
  {x: 547.2220149097476, y: 640.1503480286839},
  {x: 532.8523161902132, y: 663.995591299579}
];

const mouth = [
        { x: 708.3599970805066, y: 947.809466334105 },
        { x: 473.55933581244676, y: 932.0594712404534 },
        { x: 688.7585626989451, y: 971.251886670949 },
        { x: 532.0502828187642, y: 993.5882392875214 },
        { x: 659.0225126080645, y: 982.8938972653298 },
        { x: 564.0173426192746, y: 994.6075188742012 },
        { x: 416.9396734880029, y: 950.8245887357219 },
        { x: 696.6519909100014, y: 939.5714720426128 },
        { x: 500.2398048606551, y: 990.1427209426427 },
        { x: 438.9285456702969, y: 972.679270116925 },
        { x: 595.9895811502787, y: 993.3700298772134 },
        { x: 468.90152023983296, y: 983.7011298296775 },
        { x: 601.4487352179076, y: 929.0401779763401 },
        { x: 627.7672511905305, y: 989.6728091731409 },
        { x: 505.4808250797264, y: 929.7942818684503 },
        { x: 441.8443515504564, y: 936.3055876178666 },
        { x: 537.4563171548904, y: 928.6688561432063 },
        { x: 569.4469248990932, y: 928.4320293873549 },
       
        { x: 633.4080838685197, y: 930.6116017518566 },
        { x: 665.265395685259, y: 933.559718777053 }
     
];

const lungs = [
        { x: 559.4005983304978, y: 1158.8169368648528 },
        { x: 560.8027368834113, y: 1226.7481061642734 },
        { x: 529.1191622524345, y: 1278.4797284737194 },
        { x: 462.55676532550524, y: 1276.055984111635 },
        { x: 419.212380477786, y: 1327.5118190836906 },
        { x: 393.1323735660853, y: 1390.1464897695791 },
        { x: 387.2213034812634, y: 1457.474498070953 },
        { x: 400.1575250175699, y: 1523.8694400751933 },
        { x: 452.9494277839397, y: 1535.8331152225735 },
        { x: 498.7036288770658, y: 1488.5886717600113 },
        { x: 559.120476679802, y: 1159.5571445465087 },
        { x: 560.6660172220971, y: 1227.5100706286728 },
        { x: 589.527904230687, y: 1279.2421104259533 },
        { x: 656.0618569182454, y: 1276.8676984679962 },
        { x: 699.3598956897945, y: 1328.3734083879426 },
        { x: 725.4146382371312, y: 1391.0279620776519 },
        { x: 731.2807770703788, y: 1458.3659400393803 },
        { x: 718.2981507522054, y: 1524.7381065634172 },
        { x: 665.4760615088453, y: 1536.4829798766705 },
        { x: 619.6766946008895, y: 1489.338563806219 }
];

const tummy = [
        { x: 627.9673653136001, y: 2029.547376827777 },
        { x: 681.8474837722833, y: 1995.9263528224421 },
        { x: 718.6937198422429, y: 1944.0422586038082 },
        { x: 735.5245379515566, y: 1882.6092851262738 },
        { x: 730.0431317603122, y: 1819.2114449647956 },
        { x: 702.0597467868625, y: 1762.0406593190064 },
        { x: 655.6401004694555, y: 1718.4884194393499 },
        { x: 596.6663534808313, y: 1694.651404957924 },
        { x: 533.1018550869866, y: 1695.2854616552288 },
        { x: 597.1418985009676, y: 2040.342243745179 },
        { x: 533.7540667456016, y: 2045.369787721152 },
        { x: 473.25116934024675, y: 2025.7725105883428 },
        { x: 424.74158851526386, y: 1984.640174190487 },
        { x: 395.2637579297274, y: 1928.284403752014 },
        { x: 389.404302344761, y: 1864.9375124086562 },
        { x: 405.10259567203576, y: 1803.1554154430623 },
        { x: 438.77235071351953, y: 1749.033189169596 },
        { x: 488.8192339654771, y: 1709.8195664506836 },
        { x: 534.7017343825746, y: 1933.6769580309508 },
        { x: 500.1971284720827, y: 1934.0496464446874 }
];

   
const pick = (d) => d[Math.floor(Math.random() * d.length)];

const layer = (d,i) => {
        const c = document.createElementNS(ns, "circle");
        svg.append(c);
        c.setAttribute("stroke", "none");
        c.setAttribute("r", "20");
        return c;
};
const elements = Array(20).fill(0).map(layer);

const shape = (path,i) => {
        
        const NosePoints = Array(20)
                .fill(0)
                .map((d) => {
                        let p = nose[i];
                        return p ;
                })
                .sort((i, j) => i > j);
                
        const LungsPoints = Array(20)
                .fill(0)
                .map((d) => {
                        let p = lungs[i];
                        return p ;
                })
                .sort((i, j) => i > j);

        const MouthPoints = Array(20)
                .fill(0)
                .map((d) => {
                        let p = mouth[i];
                        return p ;
                })
                .sort((i, j) => i > j);

        const strX = NosePoints[i].x;
        const strY = NosePoints[i].y;

        const strnX = LungsPoints[i].x;
        const strnY = LungsPoints[i].y;

        const strgX = MouthPoints[i].x;
        const strgY = MouthPoints[i].y;
        
        path.setAttribute("cx", 0);
        path.setAttribute("cy", 0);
        path.setAttribute("transform", `translate(${cont[i].x } , ${cont[i].y})`);
        path.setAttribute("opacity", "0");
        path.style.setProperty("--originX", strX + "px");
        path.style.setProperty("--originY", strY + "px");
        path.style.setProperty("--breatheInX", strnX + "px");
        path.style.setProperty("--breatheInY", strnY+ "px");
        path.style.setProperty("--breatheOutX", strgX + "px");
        path.style.setProperty("--breatheOutY", strgY + "px");
        path.style.setProperty("--dissolveX", cont[i].x + "px");
        path.style.setProperty("--dissolveY", cont[i].y + "px");
        path.style.animation = ('relax 12s  5 normal');
      
       
};

function playSound() {
        playing = true; 
        button.addClass("dissappear");
        Tone.Master.volume.value = masterVolume;
       
        Tone.Transport.bpm.value = 60; // default 120
  

      poly = new Tone.PolySynth(Tone.AMSynth, {
        envelope: {
          attack: 1,
          release: 2,
        },
        volume: masterVolume
      });
     
     poly.toDestination(); // Tone.Master
    
      // Create 2 different melodic motifs
      motif = new Motif([3, 2, 1,  0, 1, 2, 3, 4, 5, 6, 7, 8], "xxxx---xxxxxxxx--","6n", "2n");
      //let motif2 = new Motif([ 0, 1, 1, 2, 3, 4, 5, 5], "----xxxxxxxx", "1s", "2n"); // 7 -> one octaave higher
      noise = new Tone.Noise("white").start();
       autoFilter = new Tone.AutoFilter({
	frequency: "1n",
	baseFrequency: 200,
	octaves: 0.5
}).toDestination().start();
// connect the noise
  noise.connect(autoFilter);
// start the autofilter LFO
      motif.synth.connect(autoFilter);
     // motif.synth.toDestination();

      //motif2.synth.toDestination();
     // Tone.Transport.schedule(changeChord, "12");
     /*elements[10].onanimationiteration = () => {
      changeChord(1);
      };*/
      Tone.Transport.start();
}


      //-------------------------------------------------------
    function changeChord(time) {
        currentChord = nextChord;
        let duration = "1n";
        poly.triggerAttackRelease(chords[currentChord], duration, time);

        nextChord = floor(noise(chords.length));
      
        // Here, we recursively schedule changeChord based on the new
        // chord duration that was just generated
        // the + sign means "from now"
        Tone.Transport.schedule(changeChord, "+" + duration);
      }
      
      //-------------------------------------------------------
      // See the previous week's lesson for an explanation on how this
      // function works!
      function getMidiNote(noteNumber, notes) {
        let numNotes = notes.length;
        let i = modulo(noteNumber, numNotes);
        let note = notes[i];
        // ** fixed!  should now work with scales that don't start
        // in C :-)
        // thanks to YouTube user Mark Lee for pointing this out!
        let octaveTranspose = floor(noteNumber / numNotes);
        let interval = Tonal.Interval.fromSemitones(octaveTranspose * 12);
        return Tonal.Note.transpose(note, interval);
      }
      
      
      //------------------------------------------------------------
      function modulo(n, m) {
        return ((n % m) + m) % m;
      }



function setup() {
          // generate all the chords in our scale
  // (harmonizing the scale)
       for (let i = 0; i < scaleNotes.length; i++) {
        let chord = [];
    
        chord[0] = getMidiNote(i, scaleNotes);
        chord[1] = getMidiNote(i + 2, scaleNotes);
        chord[2] = getMidiNote(i + 3, scaleNotes);
        chord[3] = getMidiNote(i + 4, scaleNotes);
    
        //console.log(chord);
        chords.push(chord);
      }
        button = createButton(" ");
        button.addClass("play");
        button.mousePressed(playSound);
}


function draw() {
        if (playing) {
                elements.map(shape);
                let prop = elements[10].getBoundingClientRect();
                elements[10].onanimationiteration = () => {
                        navigator.vibrate(255); 
                        };
    
                //let vib = map(prop.y, 50, window.height-50, 150, 300)
            
        
                let anim = elements[10].getAnimations();
                let curr; 
                try {
                        curr = anim[0].currentTime;
                        let w = map(curr, 0, 60000, 0, 1000 )
                        progress.setAttribute("width", w);
                      } catch(e) {
                        curr = 60000; 
                        playing = false; 
                        Tone.Transport.stop(); 
                        autoFilter.stop();
                        noise.stop();
                       progress.classList.add("dissappear");
                       mund.classList.add("dissappear");
                       bauch.classList.add("dissappear");
                       lunge.classList.add("dissappear");
                       nase.classList.add("dissappear");
                       bar.classList.add("dissappear");
                       augen.classList.add("dissappear");

                    
                       cloud.classList.add("cloudsuccess");
                       smile.classList.add("linesuccess");
                       line1.classList.add("linesuccess");
                       line2.classList.add("linesuccess");
                       line3.classList.add("linesuccess");
                       

                       const h2 = document.createElement("h2");
                       const textNode1 = document.createTextNode("You have made 5 breaths!");
                       h2.appendChild(textNode1);
                       h2.classList.add("successtext");
                       h2.classList.add("appear");
                       const h3 = document.createElement("h3");
                       const textNode2 = document.createTextNode("We hope you feel more relaxed.");
                       h3.appendChild(textNode2);
                       h3.classList.add("successsub");
                       h3.classList.add("appear");
                       document.body.appendChild(h2);
                       document.body.appendChild(h3);
                      }
  
        }
       
}

//-------------------------------------------------------
class Motif {
        constructor(
          motifArray,
          rhythmArray,
          tempo = "8n",
          duration = "8n",
          offset = 0
        ) {
          this.tempo = tempo;
          this.duration = duration;
          this.offset = offset;
      
          this.synth = new Tone.AMSynth();
          //commented out because we are connecting into a Delay instead
          //this.synth.toDestination();
      
          // the generate function is declared below
          this.motif = generate(motifArray);
          this.rhythm = generate(rhythmArray);
      
          // Here we use Tone.js's Loop object to schedule an anonymous function
          // at a regular interval
          this.loop = new Tone.Loop(time => {
            let chordNotes = chords[currentChord];
      
            let noteIndex = this.motif.next().value;
            let r = this.rhythm.next().value;
      
            if (r == "x") {
              let note = getMidiNote(noteIndex + this.offset, chordNotes);
              this.synth.triggerAttackRelease(note, this.duration, time);
            }
          }, this.tempo);
      
          this.loop.start(1);
        }
      }
      
      //-------------------------------------------------------
      // Use Javascript's generator syntax (* and yield) to
      // iterate over an array forever
      // 'yields' returns from the function until next() is
      // called again, where it will resume from where it left off
      
      function* generate(array) {
        let i = 0;
        while (true) {
          let value = array[i % array.length];
          i++;
          yield value;
        }
      }
      








