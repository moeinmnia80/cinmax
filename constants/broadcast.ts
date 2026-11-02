const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
export type Day = (typeof days)[number];

const dayFromDate = (d: Date): Day => days[(d.getDay() + 1) % 7];

const addDays = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return {
    day: dayFromDate(d),
    date: d.getDate(),
    month: d.toLocaleString("en", { month: "short" }),
  };
};

export const broadcastDays = [
  {
    ...addDays(0),
    programs: [
      {
        id: 1,
        time: "20:00",
        title: "IRON VEIL",
        label: "Cinemax Premiere",
        duration: "2h 05m",
        image:
          "https://images.unsplash.com/photo-1643756173714-5b492591768c?w=1200&h=700&fit=crop&auto=format",
        slug: "iron-veil",
        live: true,
      },
      {
        id: 2,
        time: "22:10",
        title: "SIGNAL LOST",
        label: "After Dark",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
      {
        id: 3,
        time: "00:05",
        title: "COLD MERIDIAN",
        label: "Director's Cut",
        duration: "2h 18m",
        image:
          "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=600&h=340&fit=crop&auto=format",
        slug: "cold-meridian",
        live: false,
      },
      {
        id: 4,
        time: "02:30",
        title: "THE SILENT COAST",
        label: "Late Night Cinema",
        duration: "1h 44m",
        image:
          "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=600&h=340&fit=crop&auto=format",
        slug: "the-silent-coast",
        live: false,
      },
    ],
  },
  {
    ...addDays(1),
    programs: [
      {
        id: 5,
        time: "19:30",
        title: "NEON GHOST",
        label: "Sunday Spotlight",
        duration: "2h 11m",
        image:
          "https://images.unsplash.com/photo-1558683018-e0e6e20f2bdb?w=1200&h=700&fit=crop&auto=format",
        slug: "neon-ghost",
        live: false,
      },
      {
        id: 6,
        time: "21:45",
        title: "IRON VEIL",
        label: "Encore Presentation",
        duration: "2h 05m",
        image:
          "https://images.unsplash.com/photo-1643756173714-5b492591768c?w=600&h=340&fit=crop&auto=format",
        slug: "iron-veil",
        live: false,
      },
      {
        id: 7,
        time: "23:55",
        title: "SIGNAL LOST",
        label: "Midnight Signal",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
    ],
  },
  {
    ...addDays(2),
    programs: [
      {
        id: 8,
        time: "20:00",
        title: "COLD MERIDIAN",
        label: "Monday Feature",
        duration: "2h 18m",
        image:
          "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=1200&h=700&fit=crop&auto=format",
        slug: "cold-meridian",
        live: false,
      },
      {
        id: 9,
        time: "22:25",
        title: "THE SILENT COAST",
        label: "Cinemax Selects",
        duration: "1h 44m",
        image:
          "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=600&h=340&fit=crop&auto=format",
        slug: "the-silent-coast",
        live: false,
      },
      {
        id: 10,
        time: "00:15",
        title: "NEON GHOST",
        label: "After Hours",
        duration: "2h 11m",
        image:
          "https://images.unsplash.com/photo-1558683018-e0e6e20f2bdb?w=600&h=340&fit=crop&auto=format",
        slug: "neon-ghost",
        live: false,
      },
    ],
  },
  {
    ...addDays(3),
    programs: [
      {
        id: 11,
        time: "20:00",
        title: "SIGNAL LOST",
        label: "Sci-Fi Night",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=1200&h=700&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
      {
        id: 12,
        time: "22:00",
        title: "NEON GHOST",
        label: "Double Feature",
        duration: "2h 11m",
        image:
          "https://images.unsplash.com/photo-1558683018-e0e6e20f2bdb?w=600&h=340&fit=crop&auto=format",
        slug: "neon-ghost",
        live: false,
      },
      {
        id: 13,
        time: "00:20",
        title: "IRON VEIL",
        label: "Cinemax Replay",
        duration: "2h 05m",
        image:
          "https://images.unsplash.com/photo-1643756173714-5b492591768c?w=600&h=340&fit=crop&auto=format",
        slug: "iron-veil",
        live: false,
      },
    ],
  },
  {
    ...addDays(4),
    programs: [
      {
        id: 14,
        time: "19:45",
        title: "THE SILENT COAST",
        label: "Critics' Choice",
        duration: "1h 44m",
        image:
          "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=1200&h=700&fit=crop&auto=format",
        slug: "the-silent-coast",
        live: false,
      },
      {
        id: 15,
        time: "21:35",
        title: "COLD MERIDIAN",
        label: "Award Winners",
        duration: "2h 18m",
        image:
          "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=600&h=340&fit=crop&auto=format",
        slug: "cold-meridian",
        live: false,
      },
      {
        id: 16,
        time: "00:00",
        title: "SIGNAL LOST",
        label: "Midweek Midnight",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
    ],
  },
  {
    ...addDays(5),
    programs: [
      {
        id: 17,
        time: "19:45",
        title: "THE SILENT COAST",
        label: "Critics' Choice",
        duration: "1h 44m",
        image:
          "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=1200&h=700&fit=crop&auto=format",
        slug: "the-silent-coast",
        live: false,
      },
      {
        id: 18,
        time: "21:35",
        title: "COLD MERIDIAN",
        label: "Award Winners",
        duration: "2h 18m",
        image:
          "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=600&h=340&fit=crop&auto=format",
        slug: "cold-meridian",
        live: false,
      },
      {
        id: 19,
        time: "00:00",
        title: "SIGNAL LOST",
        label: "Midweek Midnight",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
    ],
  },
  {
    ...addDays(6),
    programs: [
      {
        id: 20,
        time: "19:45",
        title: "THE SILENT COAST",
        label: "Critics' Choice",
        duration: "1h 44m",
        image:
          "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=1200&h=700&fit=crop&auto=format",
        slug: "the-silent-coast",
        live: false,
      },
      {
        id: 21,
        time: "21:35",
        title: "COLD MERIDIAN",
        label: "Award Winners",
        duration: "2h 18m",
        image:
          "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=600&h=340&fit=crop&auto=format",
        slug: "cold-meridian",
        live: false,
      },
      {
        id: 22,
        time: "00:00",
        title: "SIGNAL LOST",
        label: "Midweek Midnight",
        duration: "1h 52m",
        image:
          "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
        slug: "signal-lost",
        live: false,
      },
    ],
  },
] as const;
