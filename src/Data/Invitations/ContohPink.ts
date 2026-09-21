import type { Invitation } from "../../types/invitationType";

export const ContohPink: Invitation = {
  slug: "PinkGreen",

  template: "Flower-1",

  Namabride: "Haryati Putri Ibunya",
  NamabridePanggilan : "Haryati",
  GelarBride : "S.pd",
  AkunTikTokWanita : "Haryati",
  AkunIGWanita: "Haryati",
  BapakpengantinWanita : "Bpk Heri",
  IbupengantinWanita : "Ibu Sumi",

  Namagroom: `Dino Putra Bapakany `,
  GelarGroom : "S . E.",
  NamagroomPanggilan : "Dino",
  AkunIGPria : "Dino",
  BapakpengantinPria : "Bpk Sony",
  IbupengantinPria : "Ibu Waode",

  FotoBride: "/Gallery/ContohSunFlower/Wanita.webp",
  FotoGroom: "/Gallery/ContohSunFlower/Pria.webp",
  
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
    { id: "ayat", scrollY: 203 },
    { id: "sambutan", scrollY: 862 },
    { id: "couple", scrollY: 1350 },
    { id: "saveDate", scrollY: 2044 },
    { id: "gallery", scrollY: 2874 },
    { id: "gift", scrollY: 3760 },
    { id: "ucapan", scrollY: 4832 },
    { id: "closing", scrollY: 5500 }
    ],
  

  coverImage: "/Gallery/ContohSunFlower/4.webp",
  
  gallery: [
    "/Gallery/ContohLeaf/1.webp",
    "/Gallery/ContohLeaf/2.webp",
    "/Gallery/ContohLeaf/3.webp",
    "/Gallery/ContohLeaf/4.webp",
    "/Gallery/ContohLeaf/5.webp",

   
    
  ],



  WeddingGift: {
    rekening: [
      {
        bank: "shopeepay",
        atasNama: "Dino",
        nomorRekening: "1234567890",
      },
      {
        bank: "bni",
        atasNama: "Haryati",
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
  Sambutan : "Dengan memohon rahmat dan ridho Allah SWT,kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
  Ayat: `وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
          أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
          مَّوَدَّةً وَرَحْمَةً`,
  Ayat2: `“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.”`,
  NamaSurat : "QS. Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

  Closing : `Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami.
With love, always.`,

  music: "/Audio/audio.mp3",
  theme : {

    warnaweddingInvitation : "linear-gradient(180deg, #cad0f4 0%, #d2d3ed 22%, #e5d5e8 40%, #f6dce0 58%, #fde4df 72%, #fbd3c9 100%)",

    warna1: " #F6C5CC",
    warna2: "#7FA66F",
    warna3: "#B85C78",
    
    contrasfont: "#5E6623",
    ContrasBackgroundColor:"#981206",

    warnaButtonBackground : "#B85C78",
    warnaButtonBorder : "#f8f3e8",
    

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