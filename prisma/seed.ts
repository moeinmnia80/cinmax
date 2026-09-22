import {
  PrismaClient,
  PersonType,
  ImageCategory,
  SerialStatus,
  FeaturedType,
} from "@prisma/client";

import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 7500,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");

  // ------------------------------------------------------
  // 1. Languages
  // ------------------------------------------------------
  const languagesData = [
    { id: 1, code: "en", name: "English" },
    { id: 2, code: "fa", name: "Persian" },
    { id: 3, code: "zh", name: "Chinese" },
    { id: 4, code: "ko", name: "Korean" },
    { id: 5, code: "ja", name: "Japanese" },
    { id: 6, code: "tr", name: "Turkish" },
    { id: 7, code: "fr", name: "French" },
    { id: 8, code: "es", name: "Spanish" },
    { id: 9, code: "de", name: "German" },
    { id: 10, code: "hi", name: "Hindi" },
  ];

  for (const lang of languagesData) {
    await prisma.language.upsert({
      where: { id: lang.id },
      update: lang,
      create: lang,
    });
  }
  console.log("✅ Languages seeded.");

  // ------------------------------------------------------
  // 2. Countries
  // ------------------------------------------------------
  const countriesData = [
    { id: 1, code: "USA", name: "United States" },
    { id: 2, code: "UK", name: "United Kingdom" },
    { id: 3, code: "CN", name: "China" },
    { id: 4, code: "KR", name: "South Korea" },
    { id: 5, code: "JP", name: "Japan" },
    { id: 6, code: "TR", name: "Turkey" },
    { id: 7, code: "IR", name: "Iran" },
    { id: 8, code: "FR", name: "France" },
    { id: 9, code: "IN", name: "India" },
    { id: 10, code: "DE", name: "Germany" },
  ];

  for (const country of countriesData) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: country,
      create: country,
    });
  }
  console.log("✅ Countries seeded.");

  // ------------------------------------------------------
  // 3. Genres
  // ------------------------------------------------------
  const genresData = [
    { id: 1, slug: "action", name: "Action" },
    { id: 2, slug: "drama", name: "Drama" },
    { id: 3, slug: "comedy", name: "Comedy" },
    { id: 4, slug: "sci-fi", name: "Sci-Fi" },
    { id: 5, slug: "horror", name: "Horror" },
    { id: 6, slug: "animation", name: "Animation" },
    { id: 7, slug: "thriller", name: "Thriller" },
    { id: 8, slug: "romance", name: "Romance" },
    { id: 9, slug: "mystery", name: "Mystery" },
    { id: 10, slug: "fantasy", name: "Fantasy" },
    { id: 11, slug: "historical", name: "Historical" },
    { id: 12, slug: "wuxia", name: "Wuxia" },
    { id: 13, slug: "xianxia", name: "Xianxia" },
    { id: 14, slug: "crime", name: "Crime" },
    { id: 15, slug: "documentary", name: "Documentary" },
  ];

  for (const genre of genresData) {
    await prisma.genre.upsert({
      where: { id: genre.id },
      update: genre,
      create: genre,
    });
  }
  console.log("✅ Genres seeded.");

  // ------------------------------------------------------
  // 4. Studios
  // ------------------------------------------------------
  const studiosData = [
    { id: 1, name: "Warner Bros. Pictures" },
    { id: 2, name: "Universal Pictures" },
    { id: 3, name: "Paramount Pictures" },
    { id: 4, name: "A24" },
    { id: 5, name: "Marvel Studios" },
    { id: 6, name: "Tencent Video" },
    { id: 7, name: "iQIYI" },
    { id: 8, name: "tvN" },
    { id: 9, name: "JTBC" },
    { id: 10, name: "Toei Animation" },
    { id: 11, name: "MAPPA" },
  ];

  for (const studio of studiosData) {
    await prisma.studio.upsert({
      where: { id: studio.id },
      update: studio,
      create: studio,
    });
  }
  console.log("✅ Studios seeded.");

  // ------------------------------------------------------
  // 5. People (بازیگران و عوامل جدید اضافه شدند)
  // ------------------------------------------------------
  const peopleData = [
    // --- Love Like the Galaxy ---
    {
      id: 1,
      slug: "zhao-lusi",
      name: "Zhao Lusi",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/A0tq4iXf1fG7iXW3bA3b4.jpg",
      bio: "Zhao Lusi, also known as Rosy Zhao, is a Chinese actress and singer. She is well known for her roles in Love Like the Galaxy, The Romance of Tiger and Rose, and Who Rules The World.",
      birthDate: new Date("1998-11-09"),
      birthPlace: "Chengdu, Sichuan, China",
      height: "161 cm",
      activeYears: "2017-present",
      socialInstagram: "roba_zhao",
      socialTwitter: null,
      socialImdb: "nm10189032",
    },
    {
      id: 2,
      slug: "wu-lei",
      name: "Wu Lei (Leo Wu)",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/wulei_photo.jpg",
      bio: "Wu Lei, also known as Leo Wu, is a Chinese actor. Known as the 'Nation's Little Brother' in China, he started his career as a child actor and starred in Nirvana in Fire and Cross Fire.",
      birthDate: new Date("1999-12-26"),
      birthPlace: "Shanghai, China",
      height: "182 cm",
      activeYears: "2005-present",
      socialInstagram: "leowu_official",
      socialTwitter: null,
      socialImdb: "nm7294498",
    },
    {
      id: 7,
      slug: "li-yun-rui",
      name: "Li Yun Rui",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/li_yunrui.jpg",
      bio: "Chinese actor and singer who gained wide recognition for his role as Yuan Shen in Love Like the Galaxy.",
      birthDate: new Date("1996-08-24"),
      birthPlace: "Hubei, China",
      height: "182 cm",
      activeYears: "2015-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm10928231",
    },
    {
      id: 8,
      slug: "yu-cheng-en",
      name: "Yu Cheng En",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/yu_chengen.jpg",
      bio: "Chinese actor and dancer, famous for Go Go Squid! and playing Lou Yao in Love Like the Galaxy.",
      birthDate: new Date("1998-09-21"),
      birthPlace: "Wuhan, Hubei, China",
      height: "178 cm",
      activeYears: "2019-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm10892312",
    },

    // --- Love's Ambition ---
    {
      id: 4,
      slug: "william-chan",
      name: "William Chan",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/william_chan.jpg",
      bio: "Hong Kong singer, dancer and actor. He gained widespread popularity in Mainland China for his role in Swords of Legends and The Mystic Nine.",
      birthDate: new Date("1985-11-21"),
      birthPlace: "Hong Kong",
      height: "182 cm",
      activeYears: "2003-present",
      socialInstagram: "williamchanwaiting",
      socialTwitter: null,
      socialImdb: "nm3848123",
    },
    {
      id: 9,
      slug: "wan-peng",
      name: "Wan Peng",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/wan_peng.jpg",
      bio: "Chinese actress who debuted with When We Were Young and starred in My Girlfriend is an Alien.",
      birthDate: new Date("1996-08-20"),
      birthPlace: "Beijing, China",
      height: "172 cm",
      activeYears: "2018-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm10492831",
    },

    // --- The Story of Pearl Girl ---
    {
      id: 5,
      slug: "liu-yuning",
      name: "Liu Yuning",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/liu_yuning.jpg",
      bio: "Lead singer of Modern Brothers, Liu Yuning is a popular singer and actor known for A Journey to Love and The Long Ballad.",
      birthDate: new Date("1990-01-08"),
      birthPlace: "Dandong, Liaoning, China",
      height: "189 cm",
      activeYears: "2014-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm10705231",
    },
    {
      id: 10,
      slug: "tang-xiao-tian",
      name: "Tang Xiao Tian (Daddi Tang)",
      role: PersonType.Actor,
      image: "https://image.tmdb.org/t/p/w500/daddi_tang.jpg",
      bio: "Chinese actor and model, best known for My Little Happiness and Put Your Head on My Shoulder.",
      birthDate: new Date("1991-06-02"),
      birthPlace: "Tianjin, China",
      height: "188 cm",
      activeYears: "2016-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm10582910",
    },

    // --- Directors ---
    {
      id: 3,
      slug: "fei-zhen-xi",
      name: "Fei Zhen Xiang",
      role: PersonType.Director,
      image: null,
      bio: "Renowned Chinese director known for directing Candle in the Tomb series and Love Like the Galaxy.",
      birthDate: new Date("1978-07-28"),
      birthPlace: "Beijing, China",
      height: "175 cm",
      activeYears: "2000-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: "nm8529302",
    },
    {
      id: 6,
      slug: "xie-zhe-bin",
      name: "Xie Zhe Bin",
      role: PersonType.Director,
      image: null,
      bio: "Director specializing in historical and period drama series.",
      birthDate: null,
      birthPlace: "China",
      height: null,
      activeYears: "2015-present",
      socialInstagram: null,
      socialTwitter: null,
      socialImdb: null,
    },
  ];

  for (const person of peopleData) {
    await prisma.person.upsert({
      where: { id: person.id },
      update: person,
      create: person,
    });
  }
  console.log("✅ People seeded.");

  // ------------------------------------------------------
  // 6. Serials
  // ------------------------------------------------------
  const serialsData = [
    {
      id: 1,
      slug: "love-like-the-galaxy-2022",
      title: "Love Like the Galaxy",
      rating: 9.0,
      startYear: 2022,
      endYear: 2022,
      seasons: 2,
      episodes: 56,
      durationMinutes: 45,
      description:
        "The young Cheng Shaoshang was left behind because her parents had to go off to war. In order to protect herself, she had to be extra vigilant and pretend to be clumsy, hiding her true talents while waiting for her parents return.",
      image:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/love-like-the-galaxy/poster.webp",
      backdrop:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/love-like-the-galaxy/backdrop.webp",
      status: SerialStatus.Ended,
      badge: "Top Rated C-Drama",
      languageId: 3,
      countryId: 3,
      studioId: 1,
    },
    {
      id: 2,
      slug: "loves-ambition-2024",
      title: "Love's Ambition",
      rating: 8.7,
      startYear: 2024,
      endYear: 2024,
      seasons: 1,
      episodes: 36,
      durationMinutes: 45,
      description:
        "A captivating modern drama following high-stakes romance, professional rivalries, and ambition in the modern business world.",
      image:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/loves-ambition/poster.webp",
      backdrop:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/loves-ambition/backdrop.webp",
      status: SerialStatus.Ongoing,
      badge: "Trending Now",
      languageId: 3,
      countryId: 3,
      studioId: 1,
    },
    {
      id: 3,
      slug: "the-story-of-pearl-girl-2024",
      title: "The Story of Pearl Girl",
      rating: 8.9,
      startYear: 2024,
      endYear: 2024,
      seasons: 1,
      episodes: 40,
      durationMinutes: 45,
      description:
        "A pearl diver slave girl escapes her tragic fate and joins a merchant caravan, rising through determination and intelligence in the booming jewelry trade during the Tang Dynasty.",
      image:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/the-story-of-pearl-girl/poster.webp",
      backdrop:
        "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax/serials/the-story-of-pearl-girl/backdrop.webp",
      status: SerialStatus.Ongoing,
      badge: "Must Watch",
      languageId: 3,
      countryId: 3,
      studioId: 1,
    },
  ];

  for (const serial of serialsData) {
    await prisma.serial.upsert({
      where: { id: serial.id },
      update: serial,
      create: serial,
    });
  }
  console.log("✅ Serials seeded.");

  // ------------------------------------------------------
  // 7. Serial Genres
  // ------------------------------------------------------
  const serialGenresData = [
    { serialId: 1, genreId: 2 },
    { serialId: 1, genreId: 8 },
    { serialId: 2, genreId: 2 },
    { serialId: 2, genreId: 8 },
    { serialId: 3, genreId: 1 },
    { serialId: 3, genreId: 2 },
    { serialId: 3, genreId: 8 },
  ];

  for (const item of serialGenresData) {
    await prisma.serialGenre.upsert({
      where: {
        serialId_genreId: {
          serialId: item.serialId,
          genreId: item.genreId,
        },
      },
      update: item,
      create: item,
    });
  }
  console.log("✅ SerialGenres seeded.");

  // ------------------------------------------------------
  // 8. Serial Cast & Crew (ارتباط بازیگران مکمل به سریال‌ها)
  // ------------------------------------------------------
  const serialCastData = [
    // Love Like the Galaxy (Serial #1)
    {
      id: 1,
      serialId: 1,
      personId: 1,
      role: "Lead Actress",
      character: "Cheng Shaoshang",
    },
    {
      id: 2,
      serialId: 1,
      personId: 2,
      role: "Lead Actor",
      character: "Ling Buyi",
    },
    {
      id: 7,
      serialId: 1,
      personId: 7,
      role: "Supporting Actor",
      character: "Yuan Shen",
    },
    {
      id: 8,
      serialId: 1,
      personId: 8,
      role: "Supporting Actor",
      character: "Lou Yao",
    },

    // Love's Ambition (Serial #2)
    {
      id: 3,
      serialId: 2,
      personId: 1,
      role: "Lead Actress",
      character: "Xu Yan",
    },
    {
      id: 4,
      serialId: 2,
      personId: 4,
      role: "Lead Actor",
      character: "Shen Hao Ming",
    },
    {
      id: 9,
      serialId: 2,
      personId: 9,
      role: "Supporting Actress",
      character: "Lin Shuang",
    },

    // The Story of Pearl Girl (Serial #3)
    {
      id: 5,
      serialId: 3,
      personId: 1,
      role: "Lead Actress",
      character: "Duan Wu / Su Mu Zhe",
    },
    {
      id: 6,
      serialId: 3,
      personId: 5,
      role: "Lead Actor",
      character: "Yan Zi Jing",
    },
    {
      id: 10,
      serialId: 3,
      personId: 10,
      role: "Supporting Actor",
      character: "Cui Zhi Miao",
    },
  ];

  for (const cast of serialCastData) {
    await prisma.serialCast.upsert({
      where: { id: cast.id },
      update: cast,
      create: cast,
    });
  }

  const serialCrewData = [
    { id: 1, serialId: 1, personId: 3, role: PersonType.Director },
    { id: 2, serialId: 3, personId: 6, role: PersonType.Director },
  ];

  for (const crew of serialCrewData) {
    await prisma.serialCrew.upsert({
      where: { id: crew.id },
      update: crew,
      create: crew,
    });
  }
  console.log("✅ SerialCast & SerialCrew seeded.");

  // ------------------------------------------------------
  // 9. Serial Images (اصلاح URLهای ناقص)
  // ------------------------------------------------------
  const baseUrl =
    "https://br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech/cinmax";

  const serialImagesData = [
    {
      id: 1,
      serialId: 1,
      url: `${baseUrl}/serials/love-like-the-galaxy/gallery-1.jpg`,
      key: "serials/love-like-the-galaxy/gallery-1.jpg",
      caption: "Cheng Shaoshang & Ling Buyi",
      type: ImageCategory.gallery,
    },
    {
      id: 2,
      serialId: 1,
      url: `${baseUrl}/serials/love-like-the-galaxy/gallery-2.jpg`,
      key: "serials/love-like-the-galaxy/gallery-2.jpg",
      caption: "Palace Scene",
      type: ImageCategory.gallery,
    },
    {
      id: 3,
      serialId: 2,
      url: `${baseUrl}/serials/loves-ambition/gallery-1.jpg`,
      key: "serials/loves-ambition/gallery-1.jpg",
      caption: "Main Poster Scene",
      type: ImageCategory.gallery,
    },
    {
      id: 4,
      serialId: 3,
      url: `${baseUrl}/serials/the-story-of-pearl-girl/gallery-1.jpg`,
      key: "serials/the-story-of-pearl-girl/gallery-1.jpg",
      caption: "Pearl Market Scene",
      type: ImageCategory.gallery,
    },
  ];

  for (const img of serialImagesData) {
    await prisma.serialImage.upsert({
      where: { id: img.id },
      update: img,
      create: img,
    });
  }
  console.log("✅ SerialImages seeded.");

  // ------------------------------------------------------
  // 10. Featured Items
  // ------------------------------------------------------
  const featuredItemsData = [
    {
      id: 1,
      type: FeaturedType.Serial,
      order: 1,
      active: true,
      movieId: null,
      serialId: 1,
    },
    {
      id: 2,
      type: FeaturedType.Serial,
      order: 2,
      active: true,
      movieId: null,
      serialId: 2,
    },
    {
      id: 3,
      type: FeaturedType.Serial,
      order: 3,
      active: true,
      movieId: null,
      serialId: 3,
    },
  ];

  for (const item of featuredItemsData) {
    await prisma.featuredItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log("✅ FeaturedItems seeded.");

  console.log("🚀 Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
