const $=id=>document.getElementById(id),W=WEDDING;
const text=(id,v)=>{if($(id))$(id).textContent=v};

/* =========================================================
   NAMA TAMU DARI LINK
   Contoh:
   ?to=Bapak%20Budi
   ?to=Ibu%20Siti
   ?to=Keluarga%20Ahmad
   ========================================================= */

const params=new URLSearchParams(window.location.search);
const guestFromURL=params.get("to");

const guestName=guestFromURL
  ? guestFromURL.trim()
  : W.guest;
[
["wBride",W.bride.split(" ")[0]],["wGroom",W.groomNick],["wDate",W.dateShort],["guest",guestName],
["heroBride",W.bride.split(" ")[0]],["heroGroom",W.groomNick],["heroDate",W.dateText],
["groomFull",W.groom],["brideFull",W.bride],["groomParents",W.parents.groom],["brideParents",W.parents.bride],
["akadDate",W.akad.date],["akadTime",W.akad.time],["akadVenue",W.akad.venue],["akadAddress",W.akad.address],
["resepsiDate",W.resepsi.date],["resepsiTime",W.resepsi.time],["resepsiVenue",W.resepsi.venue],["resepsiAddress",W.resepsi.address],
["bank",W.gift.bank],["account",W.gift.account],["holder",W.gift.holder],
["closingNames",W.bride.split(" ")[0]+" & "+W.groomNick]
].forEach(x=>text(x[0],x[1]));
$("akadMap").href=W.akad.maps;$("resepsiMap").href=W.resepsi.maps;

const attend=`https://wa.me/${W.whatsapp}?text=${encodeURIComponent("Halo, saya mengonfirmasi akan hadir di pernikahan "+W.bride+" & "+W.groom+" pada "+W.dateText+".")}`;
const absent=`https://wa.me/${W.whatsapp}?text=${encodeURIComponent("Halo, mohon maaf saya belum dapat hadir di pernikahan "+W.bride+" & "+W.groom+" pada "+W.dateText+".")}`;
$("attend").href=attend;$("absent").href=absent;

$("open").onclick=()=>{
 $("welcome").classList.add("closed");$("content").classList.remove("locked");$("nav").classList.add("show");
 setTimeout(()=>window.scrollTo(0,0),50);
 if(W.music){$("audio").src=W.music;$("audio").play().catch(()=>{});}
};
const tick=()=>{
 let x=Math.max(0,new Date(W.dateISO)-Date.now())/1000;
 text("d",Math.floor(x/86400).toString().padStart(2,"0"));
 text("h",Math.floor(x%86400/3600).toString().padStart(2,"0"));
 text("m",Math.floor(x%3600/60).toString().padStart(2,"0"));
 text("s",Math.floor(x%60).toString().padStart(2,"0"));
};tick();setInterval(tick,1000);

$("copyAccount").onclick=async()=>{
 try{await navigator.clipboard.writeText(W.gift.account);$("copyAccount").textContent="Tersalin ✓";setTimeout(()=>$("copyAccount").textContent="Salin Rekening",1600)}
 catch(e){alert("Nomor rekening: "+W.gift.account)}
};

$("music").onclick=async()=>{

  if(!W.music){
    alert("Tambahkan file MP3 lalu isi properti music di config.js.");
    return;
  }

  const audio=$("audio");

  if(audio.paused){

    try{
      if(!audio.src){
        audio.src=W.music;
        audio.load();
      }

      await audio.play();
      $("music").textContent="❚❚";

    }catch(error){

      console.error("Musik gagal diputar:",error);
      $("music").textContent="♫";
      alert("Musik belum dapat diputar. Silakan coba klik tombol musik sekali lagi.");

    }

  }else{

    audio.pause();
    $("music").textContent="♫";

  }

};
window.addEventListener("load",()=>setTimeout(()=>$("preloader").classList.add("hide"),700));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
