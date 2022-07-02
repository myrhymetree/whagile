import { UPDATE_CARD, DELETE_CARD } from "../actions/types";
import { convertCard, convertCards } from "../data/card";

const persons = {
  NONE: {
    name: "담당자 없음",
  },
  PM: {
    name: "PM",
  },
  Member: {
    name: "회원",
  },
  Lee: {
    name: "이호성",
  },
  Sol: {
    name: "장한솔",
  },
  Joo: {
    name: "장민주",
  },
  Park: {
    name: "박성준",
  },
  Jin: {
    name: "차우진",
  },
};

const cards = [
  {
    id: "card1",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "backlog",
    person: persons.NONE.name,
  },
  {
    id: "card2",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "backlog",
    person: persons.NONE.name,
  },
  {
    id: "card3",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "before",
    person: persons.Sol.name,
  },
  {
    id: "card4",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "before",
    person: persons.Lee.name,
  },
  {
    id: "card5",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "ongoing",
    person: persons.Joo.name,
  },
  {
    id: "card6",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "ongoing",
    person: persons.Joo.name,
  },
  {
    id: "card7",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "done",
    person: persons.Park.name,
  },
  {
    id: "card8",
    title: "React",
    description: "함수형 컴포넌트는..",
    status: "done",
    person: persons.Park.name,
  },
];


// Card Reducer
const INITIAL_STATE = convertCards(cards);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_CARD:
      return state.filter((card) => card.get("id") !== action.payload);
    case UPDATE_CARD:
      if (action.payload.id === undefined) {
        return state.push(convertCard(action.payload));
      } else {
        const id = state.findIndex(
          (card) => card.get("id") === action.payload.id
        );
        if (id >= 0) {
          return state.set(id, convertCard(action.payload));
        }
      }
      return state;
    default:
      return state;
  }
};
