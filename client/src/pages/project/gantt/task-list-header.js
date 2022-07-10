import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth, isChecked }) => {
	return (
		<div
			className={styles.ganttTable}
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
				minWidth: '260px',
				height: '44px',
				border: '1px solid grey',
				backgroundColor: '#282936',
			}}
		>
			<div
				className={styles.ganttTable_Header}
				style={{
					height: headerHeight - 2,
				}}
			>
				<div
					className={styles.ganttTable_HeaderItem}
					style={{
						minWidth: rowWidth,
					}}
				>
					{/* &nbsp;Name */}
					<div className={styles.cells}>
						<i className="pi pi-bars"/>
						&nbsp;스프린트 - 일감
					</div>
				</div>
			</div>
		</div>
	);
};