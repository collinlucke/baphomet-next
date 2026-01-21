import { BackToTopButton } from "athameui";
import { Main } from "@/components/Main";
import { LinkToFaq } from "@/components/LinkToFaq";
import { MovieList } from "@/components/Lists/MovieList/MovieList";

export default async function Home() {
  return (
    <Main
      addClasses={{
        main: "flex min-h-screen w-full flex-col items-center justify-between p-16",
      }}
    >
      <div>
        <h1>{`Oh, Hey! It's you!`}</h1>

        <p>
          {`If you're here, it's pro'ly cuz I asked you to. So, thanks for showing up!`}
        </p>

        <p>
          {`As I might have explained, this is a movie ranking app. Over on the
          Arena page, you're going to be shown two movies. Vote for the one you
          think is the better movie - how you determine that is up to you. All
          the selections you make will be shaken and stirred with other users'
          selections and a score for each movie will be generated.`}
        </p>

        <p>
          {`So, when you are ready, click that "Sign Up" button in the header and
            get to voting!`}
        </p>

        <div>{`And if you have any feedback, don't hesitate to reach out!`}</div>

        <div className="flex justify-center mt-4">
          <LinkToFaq />
        </div>
      </div>
      <div className="w-full">
        <h3>Current Movie Standings...</h3>
        <br />
        <MovieList showSearch={false} sortBy="winningPercentage" />
      </div>
      <div className="fixed bottom-4 right-4">
        <BackToTopButton />
      </div>
    </Main>
  );
}
