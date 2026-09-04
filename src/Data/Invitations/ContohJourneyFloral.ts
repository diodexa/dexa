import type { Invitation } from "../../types/invitationType";

export const ContohScrollFloral: Invitation = {
  slug: "Floral",

  template: "Floral",

  Namabride: "Martha Nila S.pd",
  NamabridePanggilan : "Martha",
  AkunTikTokWanita : "Martha",
  AkunIGWanita: "Martha",
  BapakpengantinWanita : "Bpk Heri",
  IbupengantinWanita : "Ibu Sumi",

  Namagroom: "Andre Muhammad S.pd",
  NamagroomPanggilan : "Andre",
  AkunIGPria : "Andre",
  BapakpengantinPria : "Bpk Andre",
  IbupengantinPria : "Ibu Rina",

  FotoBride: "/Gallery/ContohSunFlower/Wanita.webp",
  FotoGroom: "/Gallery/ContohSunFlower/Pria.webp",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "10 Desember 2029",
  TanggalAkadISO: "2029-12-10",
  JamAkad: "08:00",
  LokasiAkad: " The Ratan, Jl. Ringroad Selatan No.93, Glugo, Panggungharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",

  TanggalResepsi: "10 Desember 2029",
  JamResepsi: "08:00",
  LokasiResepsi: "The Ratan, Jl. Ringroad Selatan No.93, Glugo, Panggungharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
  LinkGoogleMapsAkad: "https://www.google.com/maps/place/The+Ratan+-+Multi+Use+Building/@-7.834827,110.3627029,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a5753a2bd3a9b:0x1a6020ff1e351a58!8m2!3d-7.834827!4d110.3627029!16s%2Fg%2F11mx5m9jmc?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",
  LinkGoogleMapsResepsi: "https://www.google.com/maps/place/The+Ratan+-+Multi+Use+Building/@-7.834827,110.3627029,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a5753a2bd3a9b:0x1a6020ff1e351a58!8m2!3d-7.834827!4d110.3627029!16s%2Fg%2F11mx5m9jmc?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",

  // note: `*dresscode putih krem untuk cowok 
  //  putih hitam untuk cewek` ,

  coverImage: "/Gallery/ContohSunFlower/4.webp",
  
  gallery: [
    "/Gallery/ContohSunFlower/1.webp",
    "/Gallery/ContohSunFlower/2.webp",
    "/Gallery/ContohSunFlower/3.webp",
    "/Gallery/ContohSunFlower/4.webp",
    "/Gallery/ContohSunFlower/5.webp",

   
    
  ],

  video : "/Gallery/ContohLeaf/video.mp4",

  WeddingGift: {
    rekening: [
      {
        bank: "shopeepay",
        atasNama: "Andre",
        nomorRekening: "1234567890",
      },
      {
        bank: "bni",
        atasNama: "Martha",
        nomorRekening: "9876543210",
      },
    ],

    alamat: {
      penerima: "Andre",
      noHp: "081234567890",
      alamat: "Jl. Contoh No. 123, kelurahan Yogya, kecamatan Yogya, kota Yogyakarta",
    },
  },
  
  Salam: "Assalamualaikum wr wb",
  Sambutan : "Dengan memohon rahmat dan ridho Allah SWT,kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
  Ayat: `"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri.."`,
  NamaSurat : "QS. Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

  Story : [
    {Head : "Tak Ada yang Kebetulan",
    Story : "Oktober 2020, awal bertemu lewat aplikasi dating. awalnya sih ingin cari teman bercerita, namun takdir berkata lain"},
    {Head : "Pertemuan Pertama ",
    Story : "5 Desember 2020, awal bertemu di Alun-alun. Obrolan mulai terasa hangat dan nyaman"},
    {Head : "Belajar Memahami",
    Story : " 20 Desember 2020 kami memutuskan mulai berjalan bersama. Banyak cerita dan tantangan yang kita lewati untuk terus belajar saling memahami."},
    {Head : "Final Chapter",
    Story : "Setelah 6 tahun lamanya, kami memantapkan hati untuk melangkah ke jenjang yang lebih serius. 30 Juni 2029. Let’s grow old together! ❤️"},
    ],

  Closing : `Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami.
With love, always.`,

  music: "/Audio/audio.mp3",
  theme : {

    warnaweddingInvitation : "#297fc1",

    warna1: "#297fc1",
    warna2: "#ffffff",
    warna3: "#e0ec5f",
    
    contrasfont: "#ffffff",
    ContrasBackgroundColor:"#050505",

    warnaButtonBackground : "#d6b81e",
    warnaButtonBorder : "#297fc1",
    

  },


  nav: [
    {
      label: "Mempelai",
      icon: "fa-heart",
      scrollTo: 1010,
    },
    {
      label: "Jadwal",
      icon: "fa-calendar-alt",
      scrollTo: 1662,
    },
    {
      label: "Home",
      icon: "fas fa-home",
      scrollTo: 0,
    },
    {
      label: "Galeri",
      icon: "fa-th",
      scrollTo: 3428,
      scrollEnd: 3996,
    },
    {
      label: "Ucapan",
      icon: "fa-pencil",
      scrollTo: 4754,
    },
  ],
  
};