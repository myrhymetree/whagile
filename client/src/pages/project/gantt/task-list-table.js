import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import styles from './task-list-table.module.css';

export const TaskListTableDefault = ({
	rowHeight,
	rowWidth,
	tasks,
	fontFamily,
	fontSize,
	locale,
	selectedTaskId,
	setSelectedTask,
	onExpanderClick
}) => {

  	return (
		<div
			className="Gantt-Task-List_Wrapper"
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
			}}
		>
			{tasks.map((t) => {

				let expanderSymbol = "";
				if (t.hideChildren === false) {
					expanderSymbol = <i className="pi pi-folder-open" style={{'fontSize': '1.2em'}}/>;
				} else if (t.hideChildren === true) {
					expanderSymbol = <i className="pi pi-folder" style={{'fontSize': '1.2em'}}/>;
				}
		
				return (
					<div
						className="Gantt-Task-List_Row"
						style={{ height: rowHeight }}
						key={`${t.id}row`}
						onClick={() => {
							if (selectedTaskId === t.id) setSelectedTask("");
							else setSelectedTask(t.id);
						}}
					>
						<div className="Gantt-Task-List_Cell">
							<div
								className={
									selectedTaskId === t.id
									? "Gantt-Task-List-Checkbox__Checked"
									: "Gantt-Task-List-Checkbox"
								}
							></div>
						</div>
						{/**
						 * Name
						 */}
						<div
							className="Gantt-Task-List_Cell"
							style={{
								minWidth: rowWidth,
								maxWidth: "260px",
								height: "50px",
								border: "1px solid grey",
								display: 'flex', 
								flexDirection: 'row', 
								alignItems: 'center',
								padding: "10px",
								fontSize: "16px",
								backgroundColor: expanderSymbol? '#00AA9C': '#333544',
							}}
							title={t.name}
						>
							<div className="Gantt-Task-List_Name-Container">
								<div
									className={
										expanderSymbol
										? "Gantt-Task-List_Cell__Expander"
										: "Gantt-Task-List_Cell__Empty-Expander"
									}
									onClick={(e) => {
										onExpanderClick(t);
										e.stopPropagation();
									}}
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: 'center',
									}}
								>
									{/* <div style={{width: "210px"}}> */}
									<div className={styles.cells}>
										{expanderSymbol}
										{ 
											(expanderSymbol)
											? ''
											: <i className="pi pi-file"/>
										}
										&nbsp;{t.name}
									</div>
									<Button
										className="p-button-outlined"
										style={{
											width: '24px',
											height: '24px',
											padding: '0',
											color: '#FFFFFFAA',
										}}
										icon="pi pi-minus"
										onClick={(e) => {
											e.stopPropagation();
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	)	
};