import GanttCss from './GanttChart.module.css';
import PageTitle from '../../../components/items/PageTitle';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

function GanttChart() {

    let tasks = [
        {
          id: 'Task 1',
          name: `task 1`,
          type:'project', // project, milestone, task
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 31),
          progress: 20, // 0 ~ 100
          dependencies: [],
          styles: { 
            // backgroundColor: '',
            // backgroundSelectedColor: '',
            progressColor: '#ffbb54', 
            progressSelectedColor: '#ff9e0d' 
          },
          isDisabled: false,
          // fontSize: '12px',
          project: '',
          hideChildren: true,
        },
        {
          id: 'Task 1-1',
          name: 'task 1-1',
          type:'milestone',
          start: new Date(2020, 1, 15),
          end: new Date(2020, 1, 31),
          progress: 45,
          dependencies: ['Task 1'],
          styles: { 
            // backgroundColor: '',
            // backgroundSelectedColor: '',
            progressColor: '#ffbb54', 
            progressSelectedColor: '#ff9e0d' 
          },
          isDisabled: false,
          // fontSize: '12px',
          project: '',
          hideChildren: false,
        },
        {
          id: 'Task 1-2',
          name: 'task 1-2',
          type:'task',
          start: new Date(2020, 1, 15),
          end: new Date(2020, 1, 31),
          progress: 45,
          dependencies: ['Task 1'],
          styles: { 
            // backgroundColor: '',
            // backgroundSelectedColor: '',
            progressColor: '#ffbb54', 
            progressSelectedColor: '#ff9e0d',
          },
          isDisabled: false,
          // fontSize: '12px',
          project: '',
          hideChildren: false,
        },
        {
          id: 'Task 2',
          name: `task 2`,
          type:'project', // project, milestone, task
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 31),
          progress: 10, // 0 ~ 100
          dependencies: [],
          styles: { 
            // backgroundColor: '',
            // backgroundSelectedColor: '',
            progressColor: '#ffbb54', 
            progressSelectedColor: '#ff9e0d' 
          },
          isDisabled: false,
          // fontSize: '12px',
          project: '',
          hideChildren: true,
        },
    ];
  
    // let viewDate = '';
    // let locale = '';
    // let rtl = false;
  
    const onSelect = () => {};
  
    const onDblClick = () => {
      alert('onDblClick');
    };
  
    const onDelete = () => {};
  
    const onTaskChange = () => {};
  
    const onTaskDelete = () => {};
  
    const onProgressChange = () => {};
  
    const timeStep = () => {};

    return (
        <section style={{width: '100%'}}>
            <PageTitle
                icon={ <i className="pi pi-fw pi-inbox"></i> }
                text="백로그 및 스프린트"
            />
            
            <Gantt
                tasks={ tasks }
                viewMode={ ViewMode.Week } //Hour, Quarter Day, Half Day, Day, Week(ISO-8601, 1st day is Monday), Month.
                onSelect={ onSelect }
                onDoubleClick={ onDblClick }
                onDelete={ onDelete }
                onDateChange={ onTaskChange }
                // onTaskDelete={ onTaskDelete }
                onProgressChange={ onProgressChange }
                // timeStep={ timeStep }
            />

        </section>
    );
}

export default GanttChart;