import GanttCss from './GanttChart.module.css';
import PageTitle from '../../../components/items/PageTitle';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

import { useState } from "react";
import { initTasks, getStartEndDateForProject } from "./helpers";
import { ViewSwitcher } from "./ViewSwitcher";


function GanttChart() {

	const [view, setView] = useState(ViewMode.Day);
	const [tasks, setTasks] = useState(initTasks());
	const [isChecked, setIsChecked] = useState(true);
	let columnWidth = 60;
	if (view === ViewMode.Month) {
	  columnWidth = 300;
	} else if (view === ViewMode.Week) {
	  columnWidth = 250;
	}
  
	const handleTaskChange = (task) => {
	  console.log("On date change Id:" + task.id);
	  let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
	  if (task.project) {
		const [start, end] = getStartEndDateForProject(newTasks, task.project);
		const project =
		  newTasks[newTasks.findIndex((t) => t.id === task.project)];
		if (
		  project.start.getTime() !== start.getTime() ||
		  project.end.getTime() !== end.getTime()
		) {
		  const changedProject = { ...project, start, end };
		  newTasks = newTasks.map((t) =>
			t.id === task.project ? changedProject : t
		  );
		}
	  }
	  setTasks(newTasks);
	};
  
	const handleTaskDelete = (task) => {
	  const conf = window.confirm("Are you sure about " + task.name + " ?");
	  if (conf) {
		setTasks(tasks.filter((t) => t.id !== task.id));
	  }
	  return conf;
	};
  
	const handleProgressChange = async (task) => {
	  setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	  console.log("On progress change Id:" + task.id);
	};
  
	const handleDblClick = (task) => {
	  alert("On Double Click event Id:" + task.id);
	};
  
	const handleSelect = (task, isSelected) => {
	  console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
	};
  
	const handleExpanderClick = (task) => {
	  setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	  console.log("On expander click Id:" + task.id);
	};

	return (
		<>
			<PageTitle
				icon={ <i className="pi pi-fw pi-inbox"></i> }
				text="백로그 및 스프린트"
			/>
			
			<ViewSwitcher
				onViewModeChange={(viewMode) => setView(viewMode)}
				onViewListChange={setIsChecked}
				isChecked={isChecked}
			/>

			<div style={{width: '1600px', overflow: 'auto'}}>
				<Gantt
					tasks={tasks}
					viewMode={view}
					onDateChange={handleTaskChange}
					onDelete={handleTaskDelete}
					onProgressChange={handleProgressChange}
					onDoubleClick={handleDblClick}
					onSelect={handleSelect}
					onExpanderClick={handleExpanderClick}
					listCellWidth={isChecked ? "155px" : ""}
					// ganttHeight={1000}
					columnWidth={columnWidth}
					
					
				/>
			</div>
		</>
	);
}

export default GanttChart;