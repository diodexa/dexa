import type { Invitation } from "../../types/invitationType";

export const ContohPlayful: Invitation = {
  slug: "Playful",

  template: "Playful-1",

  Namabride: "Juliet Putri Ibunya S.pd",
  NamabridePanggilan : "Juliet",
  GelarBride : "S.pd",
  AkunTikTokWanita : "Juliet",
  AkunIGWanita: "Juliet",
  Putri: "Putri dari",
  BapakpengantinWanita : "Bpk Romeo",
  IbupengantinWanita : "Ibu Juliet",

  Namagroom: `Romeo Putra Bapakanya `,
  GelarGroom : "S . E.",
  NamagroomPanggilan : "Romeo",
  AkunIGPria : "Romeo",
  Putra: "Putra dari",
  BapakpengantinPria : "Bpk Romeo",
  IbupengantinPria : "Ibu Juliet",

  FotoBride: "/Gallery/ContohSunFlower/ChildWanita.webp",
  FotoGroom: "/Gallery/ContohSunFlower/ChildPria.webp",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "10 Februari 2029",
  TanggalAkadISO: "2029-02-10",
  JamAkad: "08:00",
  LokasiAkad: " The Ratan, Jl. Ringroad Selatan No.93, Glugo, Panggungharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",

  TanggalResepsi: "10 Desember 2029",
  JamResepsi: "08:00",
  LokasiResepsi: "The Ratan, Jl. Ringroad Selatan No.93, Glugo, Panggungharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
  LinkGoogleMapsAkad: "https://www.google.com/maps/place/The+Ratan+-+Multi+Use+Building/@-7.834827,110.3627029,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a5753a2bd3a9b:0x1a6020ff1e351a58!8m2!3d-7.834827!4d110.3627029!16s%2Fg%2F11mx5m9jmc?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",
  LinkGoogleMapsResepsi: "https://www.google.com/maps/place/The+Ratan+-+Multi+Use+Building/@-7.834827,110.3627029,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a5753a2bd3a9b:0x1a6020ff1e351a58!8m2!3d-7.834827!4d110.3627029!16s%2Fg%2F11mx5m9jmc?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",

  sections : [
    { id: "Opening2", scrollY: 203 },
    { id: "ayat", scrollY: 862 },
    { id: "couple", scrollY: 1350 },
    { id: "saveDate", scrollY: 2396 },
    { id: "venue", scrollY: 3318 },
    { id: "gallery", scrollY: 4328 },
    { id: "gift", scrollY: 5670 },
    { id: "ucapan", scrollY: 6755 },
    { id: "closing", scrollY: 8148 }
    ],
  

  coverImage: "/Gallery/ContohSunFlower/Child1.webp",
  
  gallery: [
    "/Gallery/ContohSunFlower/Child2.webp",
    "/Gallery/ContohSunFlower/Child3.webp",
    "/Gallery/ContohSunFlower/Child4.webp",
    "/Gallery/ContohSunFlower/4.webp",
    "/Gallery/ContohSunFlower/5.webp",


   
    
  ],



  WeddingGift: {
    rekening: [
      {
        bank: "shopeepay",
        atasNama: "Romeo",
        nomorRekening: "1234567890",
      },
      {
        bank: "bni",
        atasNama: "Juliet",
        nomorRekening: "9876543210",
      },
    ],

    alamat: {
      penerima: "Trisna",
      noHp: "081234567890",
      alamat: "Jl. Contoh No. 123, kelurahan Yogya Tenggara Timur Barat, kecamatan Yogya, kota Yogyakarta",
    },
  },
  
  Salam: "Assalamualaikum wr wb",
  Sambutan : "Dengan memohon rahmat dan ridho Allah SWT,kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami: ",
  Ayat: `وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
          أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
          مَّوَدَّةً وَرَحْمَةً`,
  Ayat2: `“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.”`,
  NamaSurat : "QS. Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

  

  Closing : `Waktu membawa kami tumbuh hingga tiba di hari istimewa ini. 
  Terima kasih telah mengiringi langkah baru kami.`,

  music: "/Audio/audio.mp3",
  theme : {

    warnaweddingInvitation: "#F7E8D9",

    warna1: " #F6C5CC",
    warna2: "#5c8b49",
    warna3: "#af4364",
    
    contrasfont: "#5E6623",
    ContrasBackgroundColor:"#981206",

    warnaButtonBackground : "#B85C78",
    warnaButtonBorder : "#FFF9E6",
    

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