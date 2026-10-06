const screens=[...document.querySelectorAll(".screen")];
const music=document.getElementById("music");
const musicToggle=document.getElementById("music-toggle");
let musicStarted=false;

function go(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{
  const target=b.dataset.go; go(target);
  if(!musicStarted){ music.play().then(()=>{musicStarted=true}).catch(()=>{}); }
}));
musicToggle.addEventListener("click",()=>{
  if(music.paused){music.play().catch(()=>{});musicStarted=true;musicToggle.textContent="♫"}
  else{music.pause();musicToggle.textContent="♪"}
});

const questions=[
 {q:"Which moment feels most like the beginning of your story?",a:["The first time we met","Our first proper conversation","The first trip together","Something completely unexpected"],c:0},
 {q:"What has made your journey special?",a:["The adventures","The family","The little everyday moments","All of the above ❤️"],c:3},
 {q:"After all these years, what is the best answer?",a:["Still laughing together","Still making memories","Still choosing each other","Every single one"],c:3}
];
let qi=0;
const qEl=document.getElementById("question"),ansEl=document.getElementById("answers"),fb=document.getElementById("feedback"),prog=document.getElementById("progress"),qn=document.getElementById("q-number");
function renderQ(){
  const x=questions[qi]; qEl.textContent=x.q; qn.textContent=String(qi+1).padStart(2,"0");
  prog.style.width=`${((qi)/questions.length)*100}%`; fb.textContent="";
  ansEl.innerHTML="";
  x.a.forEach((a,i)=>{
    const b=document.createElement("button");b.type="button";b.className="answer";b.textContent=a;
    b.addEventListener("click",()=>{
      [...ansEl.children].forEach(v=>v.disabled=true);
      if(i===x.c){b.classList.add("correct");fb.textContent="Beautiful. That sounds right. ♥";}
      else{b.classList.add("wrong");fb.textContent="Maybe… but the real answer is whatever makes you both smile."}
      setTimeout(()=>{
        qi++;
        if(qi<questions.length) renderQ();
        else {prog.style.width="100%";go("memories");}
      },650);
    });
    ansEl.appendChild(b);
  });
}
renderQ();

document.getElementById("surprise").addEventListener("click",()=>{
  go("video");
  document.getElementById("music").pause();
  const v=document.getElementById("surprise-video");
  const placeholder=document.getElementById("video-placeholder");
  v.load();
  v.play().then(()=>{
    placeholder.style.display="none";v.style.display="block";
  }).catch(()=>{});
  burst();
});
document.getElementById("video-ready").addEventListener("click",()=>{
  const v=document.getElementById("surprise-video"),p=document.getElementById("video-placeholder");
  v.load();v.style.display="block";p.style.display="none";
  v.play().catch(()=>{});
});
function burst(){
  const c=document.getElementById("confetti");
  for(let i=0;i<70;i++){
    const s=document.createElement("i");s.className="confetti-piece";
    s.style.left=Math.random()*100+"%";s.style.background=["#d7b26d","#b96b78","#f8efe5","#9b7b91"][i%4];
    s.style.setProperty("--x",(Math.random()*220-110)+"px");s.style.animationDelay=(Math.random()*.45)+"s";
    c.appendChild(s);setTimeout(()=>s.remove(),3200);
  }
}
