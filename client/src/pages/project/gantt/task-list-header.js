import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
	return (
		<div
			className={styles.ganttTable}
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
				minWidth: '220px',
				border: '1px solid grey'
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
				</div>
			</div>
		</div>
	);
};