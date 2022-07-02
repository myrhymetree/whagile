import * as Immutable from "immutable";

const DraftRecord = Immutable.Record({
  id: undefined,
  title: "",
  description: "",
  status: "backlog",
  person: "NONE",
  category: "basic",
  urgenct: "lowGrade",
});

export class Draft extends DraftRecord {}
