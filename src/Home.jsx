import React, { useState } from 'react';
import {
	Card,
	Text,
	List,
	StandardListItem,
	ValueState,
	ProgressIndicator,
	Title,
	TitleLevel,
	FlexBox,
	FlexBoxJustifyContent,
	FlexBoxWrap,
	FlexBoxDirection,
	AnalyticalTable,
	Icon
} from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import { BarChart, LineChart } from '@ui5/webcomponents-react-charts';
import '@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js';
import '@ui5/webcomponents-icons/dist/icons/line-chart.js';
import '@ui5/webcomponents-icons/dist/icons/list.js';
import '@ui5/webcomponents-icons/dist/icons/table-view.js';
import { useHistory } from 'react-router-dom';
import { MyCustomElement } from './MyCustomElement';

export function Home() {
	const [ toggleCharts, setToggleCharts ] = useState('lineChart');
	const [ loading, setLoading ] = useState(false);

	const history = useHistory();
	const handleProgressHeaderClick = () => {
		history.push('/detail');
	};
	const handleHeaderClick = () => {
		if (toggleCharts === 'lineChart') {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setToggleCharts('barChart');
			}, 2000);
		} else {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setToggleCharts('lineChart');
			}, 2000);
		}
	};
	const datasets = [
		{
			label: 'Stock Price',
			data: [ 65, 59, 80, 81, 56, 55, 40 ]
		}
	];
	const labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];
	const tableData = new Array(500).fill(null).map((_, index) => {
		return {
			name: `name${index}`,
			age: Math.floor(Math.random() * 100),
			friend: {
				name: `friend.Name${index}`,
				age: Math.floor(Math.random() * 100)
			}
		};
	});

	const tableColumns = [
		{
			Header: 'Name',
			accessor: 'name' // String-based value accessors!
		},
		{
			Header: 'Age',
			accessor: 'age'
		},
		{
			Header: 'Friend Name',
			accessor: 'friend.name'
		},
		{
			Header: 'Friend Age',
			accessor: 'friend.age'
		}
	];
	const contentTitle = toggleCharts === 'lineChart' ? 'Line Chart' : 'Bar Chart';
	const switchToChart = toggleCharts === 'lineChart' ? 'Bar Chart' : 'Line Chart';
	return (
		<FlexBox justifyContent={FlexBoxJustifyContent.Center} wrap={FlexBoxWrap.Wrap}>
			<MyCustomElement />
			<Card
				avatar={<Icon name={toggleCharts === 'lineChart' ? 'line-chart' : 'horizontal-bar-chart'} />}
				heading="Stock Price"
				headerInteractive
				onHeaderClick={handleHeaderClick}
				subheading={`Click here to switch to ${switchToChart}`}
				style={{ width: '300px', ...spacing.sapUiContentPadding }}
			>
				<Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
				{toggleCharts === 'lineChart' ? (
					<LineChart datasets={datasets} labels={labels} loading={loading} />
				) : (
					<BarChart datasets={datasets} labels={labels} loading={loading} />
				)}
			</Card>
			<Card
				heading="Progress"
				subheading="List"
				style={{ width: '300px', ...spacing.sapUiContentPadding }}
				headerInteractive
				onHeaderClick={handleProgressHeaderClick}
			>
				<List>
					<StandardListItem info="finished" infoState={ValueState.Success}>
						Activity 1
					</StandardListItem>
					<StandardListItem info="failed" infoState={ValueState.Error}>
						Activity 2
					</StandardListItem>
					<StandardListItem info="in progress" infoState={ValueState.Warning} style={{ height: '80px' }}>
						<FlexBox direction={FlexBoxDirection.Column}>
							<Title level={TitleLevel.H5}>Activity 3</Title>
							<ProgressIndicator
								displayValue="89%"
								percentValue={89}
								width="180px"
								state={ValueState.Success}
							/>
						</FlexBox>
					</StandardListItem>
					<StandardListItem info="in progress" infoState={ValueState.Warning} style={{ height: '80px' }}>
						<FlexBox direction={FlexBoxDirection.Column}>
							<Title level={TitleLevel.H5}>Activity 4</Title>
							<ProgressIndicator
								displayValue="5%"
								percentValue={5}
								width="180px"
								state={ValueState.Error}
							/>
						</FlexBox>
					</StandardListItem>
				</List>
			</Card>
			<Card
				heading="AnalyticalTable"
				style={{ maxWidth: '900px', ...spacing.sapUiContentPadding }}
				avatar={<Icon name="table-view" />}
			>
				<AnalyticalTable data={tableData} columns={tableColumns} visibleRows={5} />
			</Card>
		</FlexBox>
	);
}
