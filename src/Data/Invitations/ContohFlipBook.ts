import type { Invitation } from "../../types/invitationType";

export const ContohFlipBook: Invitation = {
  slug: "Flipbook",

  template: "FlipBook",

  Namabride: "Clara Chintia Dewi S.E",
  NamabridePanggilan : "Clara",
  // AkunTikTokWanita : "Tetew",
  // AkunIGWanita: "totow",
  BapakpengantinWanita : "Bpk Samuel Cristian",
  IbupengantinWanita : "Ibu Margaretha Sukma",

  Namagroom: "Daniel Richard S.H",
  NamagroomPanggilan : "Daniel",
  AkunIGPria : "Tetew",
  AkunTikTokPria: "totow",
  BapakpengantinPria : "Bpk Marcus fredy",
  IbupengantinPria : "Ibu Cristiany Vony",

  FotoBride: "/Gallery/ContohDio/wanita.webp",
  FotoGroom: "/Gallery/ContohDio/pria.webp",
  
  FormatWaktu: "WIB",
  
  TanggalAkad: "12 Juni 2029",
  TanggalAkadISO: "2029-06-12",
  JamAkad: "10:00",

  LokasiAkad: " Jl. Soekarno-Hatta No.354, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
  LokasiResepsi: "Jl. Soekarno-Hatta No.354, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
  LinkGoogleMapsAkad: "https://www.google.com/maps/place/Bandung+Convention+Centre/@-6.9488599,107.5985921,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e89569ffdb69:0x6c9a53530e0d0d8e!8m2!3d-6.9488599!4d107.5985921!16s%2Fg%2F1tf7j_39?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  LinkGoogleMapsResepsi: "https://www.google.com/maps/place/Bandung+Convention+Centre/@-6.9488599,107.5985921,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e89569ffdb69:0x6c9a53530e0d0d8e!8m2!3d-6.9488599!4d107.5985921!16s%2Fg%2F1tf7j_39?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",

  // note: `*dresscode putih krem untuk cowok 
  //  putih hitam untuk cewek` ,

  coverImage: "/Gallery/ContohDio/4.webp",
  

  gallery: [
    "/Gallery/ContohDio/1.webp",
    "/Gallery/ContohDio/2.webp",
    "/Gallery/ContohDio/3.webp",
    "/Gallery/ContohDio/4.webp",
    "/Gallery/ContohDio/5.webp",
    "/Gallery/ContohDio/6.webp",
    "/Gallery/ContohDio/7.webp",
    "/Gallery/ContohDio/8.webp",
  ],

  WeddingGift: {
    rekening: [
      {
        bank: "shopeepay",
        atasNama: "Daniel",
        nomorRekening: "1234567890",
      },
      {
        bank: "ovo",
        atasNama: "Clara",
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
  Ayat: '"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."',
  NamaSurat : "Surah Ar-Rum : 21",
  // Ayat:"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia",
  // NamaSurat:"Markus 10:9",

  Story : [
    {Head : "Tak Ada yang Kebetulan",
    Story : "Oktober 2020, awal bertemu lewat aplikasi dating. awalnya sih ingin cari teman bercerita, namun takdir berkata lain"},
    {Head : "Pertemuan Pertama ",
    Story : "5 Desember 2020, awal bertemu di 150 Coffee Garden Bandung. Obrolan mulai terasa hangat dan nyaman"},
    {Head : "Belajar Memahami",
    Story : " 20 Desember 2020 kami memutuskan mulai berjalan bersama. Banyak cerita dan tantangan yang kita lewati untuk terus belajar saling memahami."},
    {Head : "Final Chapter",
    Story : "Setelah 6 tahun lamanya, kami memantapkan hati untuk melangkah ke jenjang yang lebih serius. 12 Juni 2029. Let’s grow old together! ❤️"},
    ],

  Closing : `Terima kasih telah menjadi bagian dari cerita dan kebahagiaan kami.
With love, always.`,

  music: "/music/romantic.mp3",
  theme : {


    // PrimaryColor: "#EDDBC4",

    warna1: "#EFD9BC",
    warna2: "#056f41",
    warna3: "#880a0a",
    
    contrasfont: "#f9f9f9",
    ContrasBackgroundColor:"#000000",

    warnaButtonBackground : "#056f41",
    warnaButtonBorder : "#EFD9BC",

    warnaweddingInvitation : "#880a0a",
    
  },
  Background : {
    CoverFront : "/Gallery/ContohDio/4.webp"
  }
  
};