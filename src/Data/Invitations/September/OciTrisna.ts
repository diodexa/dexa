import type { Invitation } from "../../../types/invitationType";

export const OciTrisna: Invitation = {
  slug: "Oci-Trisna-Wedding",

  template: "Flower-2",

  Namabride: "Rossiana Iqlima Zulfah, A.Md",
  NamabridePanggilan : "Oci",
  AkunIGWanita: "rossiana.iqlima",
  Putri: "Putri dari",
  BapakpengantinWanita : "Bapak Wawan",
  IbupengantinWanita : "Ibu Ani Tukini",

  Namagroom: `Trisna Rizky Saputra, S.M. `,
  NamagroomPanggilan : "Trisna",
  AkunIGPria : "Trisnarizky",
  Putra :"Putra dari",
  BapakpengantinPria : "Bapak Sonny Wirahma Soemantri",
  IbupengantinPria : "Ibu (Purn) AKP. Waode Nurbahana",

  FotoBride: "/Gallery/ContohSunFlower/Wanita.webp",
  FotoGroom: "/Gallery/ContohSunFlower/Pria.webp",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "28 November 2026",
  TanggalAkadISO: "2026-11-28",
  JamAkad: "09:00",
  LokasiAkad: " Aula Badarusamsi Ditkuad, Jl. Menado No.8, Merdeka, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40113",

  TanggalResepsi: "28 November 2026",
  JamResepsi: "11:00 - 14:00",
  LokasiResepsi: "Aula Badarusamsi Ditkuad, Jl. Menado No.8, Merdeka, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40113",
  LinkGoogleMapsAkad: "https://maps.app.goo.gl/4qKo4kr2uhGRhqQb9",
  LinkGoogleMapsResepsi: "https://maps.app.goo.gl/4qKo4kr2uhGRhqQb9",

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
        bank: "BCA",
        atasNama: "Trisna Rizky Saputra",
        nomorRekening: "8090510208",
      },
      {
        bank: "BSI",
        atasNama: "Rossiana Iqlima Zulfah",
        nomorRekening: "7249767993",
      },
      {
        bank: "BCA",
        atasNama: "Rossiana Iqlima Zulfah",
        nomorRekening: "8090237234",
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