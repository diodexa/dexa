import type { Invitation } from "../../../types/invitationType";

export const SyifaJody: Invitation = {
  slug: "Syifa-Jody-Wedding",

  template: "Flower-2",

  Namabride: "Syifa Sopia Nur Fadilah",
  NamabridePanggilan : "Syifa",
  AkunIGWanita: "Syifasopiaaanf",
  AkunTikTokWanita :"Syifasopiaaanf",
  Putri: "The beloved daughter",
  BapakpengantinWanita : "Mr. Ceppy Sopian ",
  IbupengantinWanita : "Mrs. Rina Kustiana Arini",

  Namagroom: `Jody Bagja Firdaus, S.H. `,
  NamagroomPanggilan : "Jody",
  AkunIGPria : "jodybagjafirdaus21",
  Putra :"The beloved son",
  BapakpengantinPria : "Mr. Sukmara ",
  IbupengantinPria : "Mrs. Yuyun yusilawati",

  FotoBride: "/Gallery/SyifaJody/Wanita.webp",
  FotoGroom: "/Gallery/SyifaJody/Pria.webp",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "10 Oktober 2026",
  TanggalAkadISO: "2026-10-10",
  JamAkad: "13:00",
  LokasiAkad: " Hotel Augusta Lembang, Jl. Raya Tangkuban Parahu No.53, Cibogo, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391",

  TanggalResepsi: "10 Oktober 2026",
  JamResepsi: "15.00-17.30",
  LokasiResepsi: "Hotel Augusta Lembang, Jl. Raya Tangkuban Parahu No.53, Cibogo, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391",
  LinkGoogleMapsAkad: "https://maps.app.goo.gl/TDec5LUJJz5iQDk29?g_st=ic",
  LinkGoogleMapsResepsi: "https://maps.app.goo.gl/TDec5LUJJz5iQDk29?g_st=ic",

  // note: `*dresscode putih krem untuk cowok 
  //  putih hitam untuk cewek` ,

  coverImage: "/Gallery/ContohSunFlower/4.webp",
  
  gallery: [
    "/Gallery/SyifaJody/1.webp",
    "/Gallery/SyifaJody/2.webp",
    "/Gallery/SyifaJody/3.webp",
    "/Gallery/SyifaJody/4.webp",
    "/Gallery/SyifaJody/5.webp",
    "/Gallery/SyifaJody/6.webp",

   
    
  ],

  WeddingGift: {
    rekening: [
      {
        bank: "BCA",
        atasNama: "Syifa Sopian Nur Fadilah",
        nomorRekening: "1370396961",
      },
      {
        bank: "BCA",
        atasNama: "Jody Bagja Firdaus",
        nomorRekening: "7175026363",
      },

    ],

    Qris: {
      Qris : "/Gallery/SyifaJody/qris.png",
      penerima : "Morphine 21, Edukasi"
    },
  },
  
  Salam: "Assalamualaikum wr wb",
  Sambutan : "With the blessings and grace of Allah SWT, we humbly invite you, our family and friends, to join us in celebrating our wedding.",
  Ayat: `وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
          أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
          مَّوَدَّةً وَرَحْمَةً`,
  Ayat2: `“And among His signs is that He created for you spouses from among yourselves, so that you may find tranquility in them, and He placed between you affection and mercy.”`,
  NamaSurat : "QS. Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

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
    

  Closing : `Thank you for being part of our story, our journey, and our happiness.`,

  music: "/Audio/Bermuara-Adera.mp3",
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