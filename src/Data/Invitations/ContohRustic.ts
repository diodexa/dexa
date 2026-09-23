import type { Invitation } from "../../types/invitationType";

export const ContohRustic: Invitation = {
  slug: "Rustic",

  template: "Flower-2",

  Namabride: "Rosi Putri Ibunya",
  NamabridePanggilan : "Rosi",
  GelarBride : "S.pd",
  AkunTikTokWanita : "Oci",
  AkunIGWanita: "Oci",
  BapakpengantinWanita : "Bpk Heri",
  IbupengantinWanita : "Ibu Sumi",

  Namagroom: `Trisna Rizky Saputra `,
  GelarGroom : "S . E.",
  NamagroomPanggilan : "Trisna",
  AkunIGPria : "Trisna",
  BapakpengantinPria : "Bpk Sony",
  IbupengantinPria : "Ibu Waode",

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
        atasNama: "Trisna",
        nomorRekening: "1234567890",
      },
      {
        bank: "bni",
        atasNama: "Oci",
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

 sections : [
    { id: "ayat", scrollY: 203 },
    { id: "sambutan", scrollY: 862 },
    { id: "couple", scrollY: 1350 },
    { id: "saveDate", scrollY: 2044 },
    { id: "gallery", scrollY: 2874 },
    { id: "ucapan", scrollY: 3760 },
    { id: "gift", scrollY: 4832 },
    { id: "closing", scrollY: 5500 }
    ],

  Closing : `Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami.
With love, always.`,

  music: "/Audio/audio.mp3",
  theme : {

    warnaweddingInvitation : "#6c613b",

    warna1: "#E2E2E1",
    warna2: "#6c613b",
    warna3: "#981206",
    
    contrasfont: "#6c613b",
    ContrasBackgroundColor:"#981206",

    warnaButtonBackground : "#6c613b",
    warnaButtonBorder : "#E2E2E1",
    

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