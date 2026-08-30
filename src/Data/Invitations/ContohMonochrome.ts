import type { Invitation } from "../../types/invitationType";

export const ContohMonohrome: Invitation = {
  slug: "Monochrome",

  template: "Monochrome",

  Namabride: "Dilla Nur S.Kom",
  NamabridePanggilan : "Dilla",
  AkunTikTokWanita : "Dilla",
  AkunIGWanita: "Dilla123",
  BapakpengantinWanita : "Bpk Heri",
  IbupengantinWanita : "Ibu Sumi",

  Namagroom: "Aris Dwi Putra S.hum A.md",
  NamagroomPanggilan : "Aris",
  AkunIGPria : "Arispdrs",
  BapakpengantinPria : "Bpk Mamat",
  IbupengantinPria : "Ibu Rina",

  FotoBride: "/Gallery/ContohLeaf/wanita1.png",
  FotoGroom: "/Gallery/ContohLeaf/pria1.png",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "10 Desember 2029",
  TanggalAkadISO: "2029-12-10",
  JamAkad: "08:00",
  LokasiAkad: " Jl. Muara Gading Mas nomor 10, kel MGM, kec MGM, kab Lampung Selatan",

  TanggalResepsi: "10 Desember 2029",
  JamResepsi: "08:00",
  LokasiResepsi: "Jl. Muara Gading Mas nomor 10, kel MGM, kec MGM, kab Lampung Selatan",
  LinkGoogleMapsAkad: "https://www.google.com/maps/place/Bandung+Convention+Centre/@-6.9488599,107.5985921,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e89569ffdb69:0x6c9a53530e0d0d8e!8m2!3d-6.9488599!4d107.5985921!16s%2Fg%2F1tf7j_39?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  LinkGoogleMapsResepsi: "https://www.google.com/maps/place/Bandung+Convention+Centre/@-6.9488599,107.5985921,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e89569ffdb69:0x6c9a53530e0d0d8e!8m2!3d-6.9488599!4d107.5985921!16s%2Fg%2F1tf7j_39?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",

  // note: `*dresscode putih krem untuk cowok 
  //  putih hitam untuk cewek` ,

  coverImage: "/Gallery/ContohLeaf/4.webp",
  
  gallery: [
    "/Gallery/ContohMonochrome/1.webp",
    "/Gallery/ContohMonochrome/2.webp",
    "/Gallery/ContohMonochrome/3.webp",
    "/Gallery/ContohMonochrome/4.webp",
    "/Gallery/ContohMonochrome/5.webp",
    "/Gallery/ContohMonochrome/6.webp",
   
    
  ],

  video : "/Gallery/ContohLeaf/video.mp4",

  WeddingGift: {
    rekening: [
      {
        bank: "shopeepay",
        atasNama: "Dilla",
        nomorRekening: "1234567890",
      },
      {
        bank: "bni",
        atasNama: "Aris",
        nomorRekening: "9876543210",
      },
    ],

    alamat: {
      penerima: "Dio Deska Permana",
      noHp: "081234567890",
      alamat: "Jl. Contoh No. 123, kelurahan bojong soang, kecamatan cikudapateuh, kota Bandung",
    },
  },
  
  Salam: "Assalamualaikum wr wb",
  Sambutan : "Dengan segala kerendahan hati dan dengan ungkapan syukur atas karunia Tuhan, kami mengundang Bapak/ Ibu/ Saudara/i untuk menghadiri acara pernikahan putra & putri kami",
  Ayat: ` وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
          أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
  Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapatkan ketenangan hati.`,
  NamaSurat : "Surah Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

  Story : [
    {Head : "Tak Ada yang Kebetulan",
    Story : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, necessitatibus."},
    {Head : "Pertemuan Pertama ",
    Story : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit tempora expedita porro ab modi totam laboriosam voluptates ea, minima molestiae!"},
    {Head : "Belajar Memahami",
    Story : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dolorem exercitationem, maiores necessitatibus quos cupiditate."},
    {Head : "Final Chapter",
    Story : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, magnam! Asperiores at distinctio mollitia! Minima asperiores corrupti possimus?"},
    ],

  Closing : `Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami.
With love, always.`,

  music: "/Audio/audio.mp3",
  theme : {

    warnaweddingInvitation : "#1E3C2B",

    warna1: "#030303",
    warna2: "#ffffff",
    warna3: "#D3A474",
    
    contrasfont: "#ffffff",
    ContrasBackgroundColor:"#050505",

    warnaButtonBackground : "#030303",
    warnaButtonBorder : "#ffffff",
    

  },


  
};