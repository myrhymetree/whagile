// 카테고리 타입
export var Category;
(function (Category) {
  Category["Backlog"] = "백로그";
  Category["Before"] = "진행 전";
  Category["InProgress"] = "진행 중";
  Category["Done"] = "완료";
})(Category || (Category = {}));

// 이슈 타입
export var Issue;
(function (Issue) {
  Issue["Basic"] = "기본";
  Issue["Issue"] = "이슈";
})(Issue || (Issue = {}));

// 긴급도 타입
export var Urgency;
(function (Urgency) {
  Urgency["LowGrade"] = "낮음";
  Urgency["NormalGrade"] = "보통";
  Urgency["HighGrade"] = "긴급";
})(Urgency || (Urgency = {}));

// 담당자 타입
export var Charger;
(function (Charger) {
  Charger["Jin"] = "우진";
  Charger["Park"] = "성준";
  Charger["Joo"] = "민주";
  Charger["Sol"] = "한솔";
  Charger["Lee"] = "호성";
})(Charger || (Charger = {}));
