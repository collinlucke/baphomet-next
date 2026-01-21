import { BackToTopButton } from "athameui";
import { Main } from "@/components/Main";
import { PageTitle } from "@/components/PageTitle";
import { MovieList } from "@/components/Lists/MovieList/MovieList";

export default function AllMoviesPage() {
  return (
    <Main>
      <PageTitle
        title="All Movies"
        subtitle="Here's a big ol' list of movies"
      />
      <MovieList />
      <BackToTopButton dark />
    </Main>
  );
}
