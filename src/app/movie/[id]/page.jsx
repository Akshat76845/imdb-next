"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import Loading from "@/app/loading"; // Ensure this is the correct path to your loading component

// Fetch movie data with timeout
async function fetchMovieData(movieId) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing");
    throw new Error("API key is missing");
  }

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  console.log("Fetching movie data from URL:", url);

  // Set a timeout for the fetch request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

  try {
    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorMessage = `Failed to fetch movie data: ${res.status} ${res.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error("Fetch request timed out");
      throw new Error("Fetch request timed out");
    }
    console.error("Fetch request failed:", error);
    throw error;
  }
}

export default function MoviePage({ params }) {
  const { id: movieId } = params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovieData() {
      try {
        const data = await fetchMovieData(movieId);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load movie data:", error.message);
        setError(error.message);
        setTimeout(() => setLoading(false), 5000); // Show spinner for 5 seconds before showing error
      }
    }

    loadMovieData();
  }, [movieId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load movie data: {error}</div>;
  }

  // Ensure the image path is defined
  const imagePath = movie?.backdrop_path || movie?.poster_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/original${imagePath}`
    : "/default-image-path.jpg"; // Use a default image if path is undefined
  const altText = movie?.title || movie?.name || "Movie Image";

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Suspense fallback={<Loading />}>
          <Image
            src={imageUrl}
            width={500}
            height={300}
            className="rounded-lg"
            style={{ maxWidth: "auto", height: "auto" }}
            alt={altText}
          />
        </Suspense>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie?.title || movie?.name}
          </h2>
          <p className="text-lg mb-3">{movie?.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie?.release_date || movie?.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie?.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
