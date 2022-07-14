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
					expanderSymbol = <i className="pi pi-folder-open" style={{'fontSize': '1.5em', marginRight: "10px"}}/>;
				} else if (t.hideChildren === true) {
					expanderSymbol = <i className="pi pi-folder" style={{'fontSize': '1.5em', marginRight: "10px"}}/>;
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
						<div
							className="Gantt-Task-List_Cell"
							style={{
								minWidth: rowWidth,
								maxWidth: "360px",
								height: "50px",
								border: "1px solid grey",
								display: 'flex', 
								flexDirection: 'row', 
								alignItems: 'center',
								padding: "10px",
								fontSize: "16px",
								backgroundColor: expanderSymbol? '#282936': '#333544',
								color: expanderSymbol? ((t.progressStatus === 'Y')? '#F86064': '#FFB95F'): 'lightgrey',
							}}
							title={t.name}
						>
							<div className="Gantt-Task-List_Name-Container">
								<div
									id={styles.cellsContainer}
									className={
										expanderSymbol
										? "Gantt-Task-List_Cell__Expander"
										: "Gantt-Task-List_Cell__Empty-Expander"
									}
									onClick={(e) => {
										onExpanderClick(t);
										e.stopPropagation();
									}}
								>
									<div className={styles.cells}>
										{expanderSymbol}
										{ 
											(expanderSymbol)
											? ''
											: <i className="pi pi-file" style={{fontSize: "1.2em", marginRight: "10px"}}/>
										}
										<span>{t.name}</span>
										<span style={{fontSize: '12px', marginLeft: "10px"}}>
											{
												(t.tasksCount > 0)
												? (t.tasksCount > 99)
													? '99+'
													: `[${t.tasksCount}]`
												: ''
											}
										</span>
									</div>
									<Button
										className="p-button-outlined"
										style={{
											width: '20px',
											height: '20px',
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