import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featuredItems = await db.featuredItem.findMany({
      where: { active: true },
      include: {
        movie: {
          select: {
            id: true,
            slug: true,
            title: true,
            rating: true,
            year: true,
            description: true,
            image: true,
            backdrop: true,
            genres: {
              select: {
                genre: { select: { name: true, slug: true } },
              },
            },
            crew: {
              select: {
                person: { select: { name: true } },
                role: true,
              },
            },
            cast: {
              select: {
                person: { select: { name: true } },
                role: true,
              },
            },
            language: { select: { name: true } },
          },
        },
        serial: {
          select: {
            id: true,
            slug: true,
            title: true,
            rating: true,
            startYear: true,
            endYear: true,
            seasons: true,
            episodes: true,
            description: true,
            image: true,
            backdrop: true,
            genres: {
              select: {
                genre: { select: { name: true, slug: true } },
              },
            },
            crew: {
              select: {
                person: { select: { name: true } },
                role: true,
              },
            },
            cast: {
              select: {
                person: { select: { name: true } },
                role: true,
              },
            },
            language: { select: { name: true } },
          },
        },
      },
    });

    const formattedFeatured = featuredItems
      .map((item) => {
        const isMovie = item.type === "Movie" && item.movie;
        const target = isMovie ? item.movie : item.serial;

        if (!target) return null;

        return {
          featuredId: item.id,
          type: item.type,
          id: target.id,
          slug: target.slug,
          title: target.title,
          rating: Number(target.rating),
          description: target.description,
          image: target.image,
          backdrop: target.backdrop,
          genres: target.genres.map((g) => g.genre.name),
          year: isMovie ? item.movie?.year : item.serial?.startYear,
          crew: target.crew,
          cast: target.cast,
          language: target.language,
        };
      })
      .filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        data: formattedFeatured,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching Hero data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Hero data",
      },
      { status: 500 },
    );
  }
}
