import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import ViewSwitcherCss from './ViewSwitcher.module.css';
import { useState, useEffect } from "react";

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import 'primeicons/primeicons.css';

export const ViewSwitcher = ({
	onViewModeChange,
	onViewListChange,
	isChecked
}) => {

	const [viewMode, setViewMode] = useState(ViewMode.Day);

	return (
		<div className="ViewContainer" id={ViewSwitcherCss.container}>

			{/* search */}
			<div id={ViewSwitcherCss.search}>
				<div>
					<Dropdown 
						placeholder="검색 대상"
					/>
				</div>
				<span className="p-input">
					<InputText 
					/>
				</span>
				<Button 
					icon="pi pi-search" 
					className="p-button-outlined p-button-custom"  
					aria-label="Search"
					style={{
						width: '80px', 
						color: '#FFFFFF', 
						backgroundColor: '#1D1E27', 
						border: '1px solid #333544'
					}}
				/>
			</div>
			
			<ToggleButton 
				onLabel="메뉴바 ON" 
				offLabel="메뉴바 OFF" 
				onIcon="pi pi-check" 
				offIcon="pi pi-times" 
				checked={isChecked} 
				onChange={() => onViewListChange(!isChecked)}
				style={{
					width: '160px',
					height: '40px',
					backgroundColor: (isChecked)? '#F86064': '',
					color: '#FFFFFFAA',
					border: (isChecked)? '1px solid #333544': '1px solid white'
				}}
			/>

			<div id={ViewSwitcherCss.period}>
				<Button 
					className="p-button-outlined p-button-custom"  
					label="Day"
					style={{
						width: '80px',
						height: '40px',
						backgroundColor: (viewMode === ViewMode.Day)? '#FFB95F': '#333544',
						color: '#FFFFFFAA',
						border: '0px solid #333544'
					}}
					onClick={() => {
						setViewMode(ViewMode.Day);
						onViewModeChange(ViewMode.Day);
					}}
				/>

				<Button 
					className="p-button-outlined p-button-custom"  
					label="Week"
					style={{
						width: '80px',
						height: '40px',
						backgroundColor: (viewMode === ViewMode.Week)? '#FFB95F': '#333544',
						color: '#FFFFFFAA',
						border: '0px solid #333544'
					}}
					onClick={() => {
						setViewMode(ViewMode.Week);
						onViewModeChange(ViewMode.Week);
					}}
				/>

				<Button 
					className="p-button-outlined p-button-custom"  
					label="Month"
					style={{
						width: '80px',
						height: '40px',
						backgroundColor: (viewMode === ViewMode.Month)? '#FFB95F': '#333544',
						color: '#FFFFFFAA',
						border: '0px solid #333544',
					}}
					onClick={() => {
						setViewMode(ViewMode.Month);
						onViewModeChange(ViewMode.Month);
					}}
				/>
			</div>

			<Button 
				className="p-button-outlined p-button-custom"  
				label="새 스프린트 생성"
				style={{
					width: '160px',
					height: '40px',
					color: '#FFFFFFAA',
					backgroundColor: '#00AA9C',
					border: '1px solid #333544'
				}}
			/>
		</div>
	);
};
