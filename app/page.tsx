import { Main } from "@/components/Main";

export default async function Home() {
  return (
    <Main
      addClasses={{
        main: "flex min-h-screen w-full flex-col items-center justify-between p-16",
      }}
    >
      children
    </Main>
  );
}
