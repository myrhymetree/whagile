import * as Immutable from "immutable";

const DraftRecord = Immutable.Record({
  id: undefined,
  title: "",
  description: "",
  status: "backlog",
  person: "NONE",
});

export class Draft extends DraftRecord {}
