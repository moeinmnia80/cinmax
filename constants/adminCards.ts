import db from "@/lib/db";

export async function getCards() {
  const [movieCount, serialCount, genreCount, userCount] =
    await Promise.allSettled([
      db.movie.count(),
      db.serial.count(),
      db.genre.count(),
      db.user.count(),
    ]);

  return [
    {
      label: "Movies",
      value: movieCount,
      href: "/admin/movies",
    },
    {
      label: "Serials",
      value: serialCount,
      href: "/admin/serials",
    },
    {
      label: "Genres",
      value: genreCount,
      href: "/admin/metadata",
    },
    {
      label: "Users",
      value: userCount,
      href: "/admin/users",
    },
  ];
}
