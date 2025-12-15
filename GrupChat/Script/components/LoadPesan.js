import { getMessages } from "./API.js";
import { escapeHtml } from "./escapeHTML.js";
import { formatTimeWhatsApp } from "./TimeUtils.js";




export async function loadPesan() {
  const data = await getMessages();
  if (!data) return;

  
  const chatList = document.querySelector(".chat");

  


  data.forEach((item)=> {


    const li =  document.createElement("li");
    // li.classList.add("active");
    const namaText = item.Nama;
    const pesanText = item.Pesan;
    const time = formatTimeWhatsApp(item.Date);

    const colors = ["#ac038dff","#3a86d2ff","#0aa54bff","#b57706ff","#640811ff","#167f9cff","#839534ff","#5352ed"];

    let pesanContent = "";
    let isSticker = false;
    let htmlContent = "";

    if (/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i.test(pesanText)) {
    isSticker = true;
    pesanContent = `<img src="${pesanText}" alt="stiker" class="stiker-chat">`;
    } else {
    pesanContent = `<p>${escapeHtml(pesanText)}</p>`;
    }

    console.log (time)
    if (isSticker) {
    htmlContent = `
        <div class="chat-image" style="background-image: url('img/logoDexa.webp'); background-size: 150%;"></div>
        <div class="balon-chat-transparant">
        <h3 style="color:${colors[Math.floor(Math.random() * colors.length)]};">${escapeHtml(namaText)}</h3>
        <img src="${pesanText}" alt="stiker" class="stiker-chat">
        <span class="waktu">${time}</span>
        </div>
    `;
    } else {
    htmlContent = `
        <div class="chat-image" style="background-image: url('img/logoDexa.webp'); background-size: 150%;"></div>
        <div class="balon-chat">
        <h3 style="color:${colors[Math.floor(Math.random() * colors.length)]};">${escapeHtml(namaText)}</h3>
        <div class="Nama-chat">
            <p>${escapeHtml(pesanText)}</p>
            <br>
            <span class="waktu">${time}</span>
        </div>
        </div>
    `;
    }

    li.innerHTML = htmlContent;
    chatList.appendChild(li);
    console.log(li.innerHTML)
});

  initFancyboxProfile()
}


function initFancyboxProfile() {
  const fotoPP = document.querySelectorAll('.chat-image');

  fotoPP.forEach(pp => {
    if (pp.dataset.bound) return; // biar gak dobel event
    pp.dataset.bound = true;

    pp.addEventListener('click', () => {  
      const bg = pp.style.backgroundImage;
      if (!bg || bg === 'none') return;

      const src = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      Fancybox.show([{ src, type: 'image', caption: 'Foto Profil' }]);
    });
  });
}