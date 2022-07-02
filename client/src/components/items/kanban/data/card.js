import * as Immutable from "immutable";
import { v4 as uuidv4 } from "uuid";

const CardRecord = Immutable.Record({
  id: uuidv4(),
  title: undefined,
  description: undefined,
  status: undefined,
  person: undefined,
  category: undefined,
  urgency: undefined,
});

export class Card extends CardRecord {}



export function convertCard(card) {
  if (card.id === undefined) {
    card.id = uuidv4();
  }
  return new Card(card);
}

export function convertCards(CardsList) {
  const cards = CardsList.map((card) => convertCard(card));
  return Immutable.List(cards);
}
