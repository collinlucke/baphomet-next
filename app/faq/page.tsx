import { Accordion } from "athameui";
import { Main } from "@/components/Main";
import { PageTitle } from "@/components/PageTitle";
import { questions } from "./questions";

export default function FaqPage() {
  return (
    <Main>
      <PageTitle
        title="FAQ"
        subtitle="That stands for Frequently Asked Questions"
      />

      <Accordion items={questions} />
    </Main>
  );
}
