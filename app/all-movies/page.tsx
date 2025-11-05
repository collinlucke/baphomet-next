import { Main } from "@/components/Main";
import { PageTitle } from "@/components/PageTitle";
import { MovieList } from "@/components/Lists/MovieList/MovieList";

export default function AllMovies() {
  return (
    <Main>
      <PageTitle
        title="All Movies"
        subtitle="Here's a big ol' list of movies"
      />
      <MovieList />
    </Main>
  );
}
