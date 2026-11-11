const $ = (selector) => document.querySelector(selector);
const screens = ["welcomeScreen","choiceScreen","certificateScreen"];
const state = { name:"", role:"", musicStarted:false, dark:localStorage.getItem("loveTheme")==="dark" };

const wifeMessage = `For being the most wonderful, loving, beautiful, and irreplaceable wife in the entire world.

You are my happiness, my safe place, my greatest blessing, and the person I want beside me through every chapter of life.

Thank you for every smile, every hug, every little moment, and every memory we create together.

You make ordinary days feel extraordinary. Your love makes my world brighter, and your presence makes everything more meaningful.

No certificate could ever fully express how much you mean to me, but I hope this little award reminds you that you will always have a special place in my heart.

You are not just the best wife in the world. You are my favorite person, my greatest treasure, and my forever love.

With all my love, today and always. ♡`;

const girlfriendMessage = `For being the sweetest, most beautiful, caring, and wonderful girlfriend in the entire world.

You bring happiness into my life in ways words could never fully explain. Your smile makes my days brighter, your laughter makes my heart happier, and your presence makes every moment special.

Thank you for being part of my life, for making beautiful memories with me, and for giving me so many reasons to smile.

I hope you never forget how precious you are to me. You deserve endless love, happiness, appreciation, and all the beautiful things this world can offer.

I may not be perfect, but I promise to keep making efforts to make you feel loved, valued, and appreciated.

You are my favorite notification, my sweetest thought, and the girl who makes my world feel magical.

You truly are the best girlfriend in the whole world.

With all my love, today and always. ♡`;

function showScreen(id){
  screens.forEach(screenId => {
    const el = document.getElementById(screenId);
    el.classList.toggle("active", screenId === id);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
function updateCertificate(){
  const isWife = state.role === "wife";
  $("#announcement").textContent = `THIS SPECIAL HONOR BELONGS TO YOU, ${state.name.toUpperCase()}! ♡`;
  $("#certTitle").innerHTML = isWife ? "THE BEST WIFE<br>IN THE WHOLE WORLD ♡" : "THE BEST GIRLFRIEND<br>IN THE WHOLE WORLD ♡";
  $("#certFooter").textContent = isWife ? "THE MOST LOVED WIFE" : "THE MOST LOVED GIRLFRIEND";
  $("#recipientName").textContent = state.name;
  $("#certMessage").textContent = isWife ? wifeMessage : girlfriendMessage;
}
function startCelebration(){
  showScreen("certificateScreen");
  updateCertificate();
  launchFireworks();
  makePetals(55);
}
function launchFireworks(){
  const canvas = $("#fireworks"), ctx = canvas.getContext("2d");
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  canvas.classList.add("show");
  const particles = [];
  const colors = ["#f6d58a","#e98c9b","#fff1d2","#c98791","#d8b16b","#f4d5da"];
  for(let burst=0;burst<7;burst++){
    const x = innerWidth*(.12 + Math.random()*.76), y = innerHeight*(.12 + Math.random()*.48);
    for(let i=0;i<48;i++){
      const angle=Math.PI*2*i/48, speed=1.3+Math.random()*4.1;
      particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:55+Math.random()*30,max:85,size:1.2+Math.random()*2,color:colors[Math.floor(Math.random()*colors.length)]});
    }
  }
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.986;p.vy*=.986;p.life--;
      ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    if(frame++<100){requestAnimationFrame(draw)}else{canvas.classList.remove("show");ctx.clearRect(0,0,canvas.width,canvas.height)}
  }
  draw();
}
function makePetals(count=18){
  const layer=$("#petalLayer");
  for(let i=0;i<count;i++){
    const p=document.createElement("span");p.className="petal";
    p.style.left=Math.random()*100+"%";p.style.animationDuration=(5+Math.random()*6)+"s";
    p.style.animationDelay=(Math.random()*2)+"s";p.style.setProperty("--drift",(Math.random()*180-90)+"px");
    p.style.transform=`rotate(${Math.random()*360}deg)`;layer.appendChild(p);
    setTimeout(()=>p.remove(),14000);
  }
}
function makeAmbient(){
  const layer=$("#ambient");
  for(let i=0;i<18;i++){
    const h=document.createElement("span");h.className="float-heart";h.textContent=Math.random()>.5?"♡":"✧";
    h.style.left=Math.random()*100+"%";h.style.top=(30+Math.random()*80)+"%";
    h.style.fontSize=(12+Math.random()*18)+"px";h.style.animationDuration=(12+Math.random()*16)+"s";
    h.style.animationDelay=(-Math.random()*20)+"s";layer.appendChild(h);
  }
}
function toggleTheme(){
  state.dark=!state.dark;document.body.classList.toggle("dark",state.dark);
  localStorage.setItem("loveTheme",state.dark?"dark":"light");
  $("#themeToggle").textContent=state.dark?"☀":"☾";
}
function sendYouTubeCommand(command){
  const frame=$("#youtubePlayer");
  frame.contentWindow?.postMessage(JSON.stringify({event:"command",func:command,args:[]}),"*");
}
function toggleMusic(){
  state.musicStarted=!state.musicStarted;
  sendYouTubeCommand(state.musicStarted?"playVideo":"pauseVideo");
  $("#musicToggle").textContent=state.musicStarted?"Pause music":"Play music";
  $("#equalizer").classList.toggle("playing",state.musicStarted);
}
function downloadCertificate(){
  const cert=$("#certificate");
  const clone=cert.cloneNode(true);
  const width=1100,height=1250;
  const text=clone.innerText.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const certTitle=($("#certTitle").innerHTML);
  const message=$("#certMessage").textContent;
  const name=$("#recipientName").textContent;
  const footer=$("#certFooter").textContent;
  const isWife=state.role==="wife";
  const title=isWife?"THE BEST WIFE<br/>IN THE WHOLE WORLD ♡":"THE BEST GIRLFRIEND<br/>IN THE WHOLE WORLD ♡";
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));
  const lines=message.split("\n\n").map(p=>`<p>${esc(p)}</p>`).join("");
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#fff9ed"/><stop offset="1" stop-color="#ead7b7"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="#e8d7bc"/><rect x="28" y="28" width="1044" height="1194" fill="url(#paper)" stroke="#b28b4f" stroke-width="5"/><rect x="48" y="48" width="1004" height="1154" fill="none" stroke="#b28b4f" stroke-width="2"/>
  <g fill="#b28b4f" font-family="Georgia" font-size="54"><text x="75" y="115">❦</text><text x="1025" y="115" text-anchor="end">❦</text><text x="75" y="1175">❦</text><text x="1025" y="1175" text-anchor="end">❦</text></g>
  <text x="550" y="115" text-anchor="middle" font-family="Georgia" font-size="22" letter-spacing="5" fill="#9d7848">A TOKEN OF LOVE &amp; APPRECIATION</text>
  <circle cx="550" cy="195" r="42" fill="none" stroke="#bd995c" stroke-width="2"/><text x="550" y="210" text-anchor="middle" font-size="44" fill="#a85e6b">♡</text>
  <text x="550" y="280" text-anchor="middle" font-family="Georgia" font-size="28" letter-spacing="4" fill="#806044">CERTIFICATE OF APPRECIATION</text>
  <path d="M300 315 H800" stroke="#c5a46d"/><text x="550" y="390" text-anchor="middle" font-family="Georgia" font-weight="bold" font-size="43" fill="#713b48">${isWife?"THE BEST WIFE":"THE BEST GIRLFRIEND"}</text>
  <text x="550" y="445" text-anchor="middle" font-family="Georgia" font-weight="bold" font-size="38" fill="#713b48">IN THE WHOLE WORLD ♡</text>
  <text x="550" y="510" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="27" fill="#866a52">This certificate is lovingly and proudly awarded to</text>
  <text x="550" y="595" text-anchor="middle" font-family="cursive" font-size="75" fill="#a85e6b">${esc(name)}</text><path d="M180 615 H920" stroke="#c5a46d"/>
  <foreignObject x="125" y="650" width="850" height="410"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Georgia,serif;font-size:19px;line-height:1.45;color:#654d40;text-align:center">${lines}</div></foreignObject>
  <text x="550" y="1105" text-anchor="middle" font-family="Georgia" font-size="19" letter-spacing="2" fill="#8b6743">OFFICIALLY DECLARED: ${esc(footer)}</text>
  <text x="550" y="1160" text-anchor="middle" font-family="cursive" font-size="35" fill="#9b6570">With all my love, today &amp; always ♡</text></svg>`;
  const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"}),url=URL.createObjectURL(blob);
  const img=new Image();img.onload=()=>{
    const canvas=document.createElement("canvas");canvas.width=width*2;canvas.height=height*2;
    const ctx=canvas.getContext("2d");ctx.scale(2,2);ctx.drawImage(img,0,0,width,height);
    const a=document.createElement("a");a.download=`certificate-${state.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}.png`;a.href=canvas.toDataURL("image/png");a.click();URL.revokeObjectURL(url);
  };img.onerror=()=>{alert("Your browser could not prepare the certificate image. Please try again.");URL.revokeObjectURL(url)};img.src=url;
}

$("#nameForm").addEventListener("submit",e=>{
  e.preventDefault();const name=$("#visitorName").value.trim();
  if(!name){$("#visitorName").focus();return}
  state.name=name;$("#envelopeScene").classList.add("open");
  setTimeout(()=>{$("#nameGreeting").textContent=name+" ♡";showScreen("choiceScreen")},750);
});
document.querySelectorAll(".choice-card").forEach(card=>card.addEventListener("click",()=>{
  state.role=card.dataset.role;startCelebration();
}));
$("#backToName").addEventListener("click",()=>showScreen("welcomeScreen"));
$("#themeToggle").addEventListener("click",toggleTheme);
$("#musicToggle").addEventListener("click",toggleMusic);
$("#downloadBtn").addEventListener("click",downloadCertificate);
$("#replayBtn").addEventListener("click",()=>{startCelebration();});
$("#startAgainBtn").addEventListener("click",()=>{
  state.name="";state.role="";$("#visitorName").value="";$("#envelopeScene").classList.remove("open");
  state.musicStarted=false;sendYouTubeCommand("pauseVideo");$("#musicToggle").textContent="Play music";$("#equalizer").classList.remove("playing");
  showScreen("welcomeScreen");
});
$("#loveNoteBtn").addEventListener("click",()=>{$("#noteModal").classList.add("open");$("#noteModal").setAttribute("aria-hidden","false");$("#loveNoteText").focus()});
function closeModal(){$("#noteModal").classList.remove("open");$("#noteModal").setAttribute("aria-hidden","true")}
$("#closeModal").addEventListener("click",closeModal);
$("#noteModal").addEventListener("click",e=>{if(e.target===$("#noteModal"))closeModal()});
$("#copyNoteBtn").addEventListener("click",async()=>{
  const value=$("#loveNoteText").value.trim();if(!value){$("#copyStatus").textContent="Write a little note first ♡";return}
  try{await navigator.clipboard.writeText(value);$("#copyStatus").textContent="Your love note has been copied ♡"}
  catch{ $("#loveNoteText").select();document.execCommand("copy");$("#copyStatus").textContent="Your love note has been copied ♡"}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
if(state.dark){document.body.classList.add("dark");$("#themeToggle").textContent="☀"}
makeAmbient();
setInterval(()=>{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)makePetals(3)},4200);
