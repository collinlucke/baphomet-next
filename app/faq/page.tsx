import { Main } from "@/components/Main";
import { PageTitle } from "@/components/PageTitle";
import { questions } from "./questions";
import { List } from "@/components/Lists/List";
import { AccordionListItem } from "@/components/Lists/AccordionListItem";

export default function Faq() {
  return (
    <Main>
      <PageTitle
        title="FAQ"
        subtitle="That stands for Frequently Asked Questions"
      />
      <List>
        {questions.map((item, index) => (
          <AccordionListItem key={index} title={item.q}>
            {item.a}
          </AccordionListItem>
        ))}
      </List>
    </Main>
  );
}
