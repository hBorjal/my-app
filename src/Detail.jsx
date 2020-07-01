import React, { useState, useEffect } from 'react';
import { Card, AnalyticalTable, Icon } from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import axios from 'axios';

export function Detail() {
	const [ users, setUsers ] = useState([]);
	// const [ products, setProducts ] = useState([]);
	
	useEffect(() => {
		obtenerDatos();
		obtenerProductos();
	}, []);

	const obtenerDatos = async () => {
		const data = await fetch('http://appsdev.cotemar.com.mx:443/ApiCoreApp/api/Employees');
		const users = await data.json();
		setUsers(users);
		// console.log(process.env);
		const {API_URL} = process.env;
		console.log(API_URL);
	};

	const obtenerProductos = async () => {
		const username = 'sb-5749487f-2238-431b-8ab5-977d65cc134f!b8520|it-rt-63c747dftrial!b5051';
		const password = 'BPyF/JMedKElHq6AZUJTdI0rHhg=';
		const url = 'http://63c747dftrial.it-cpitrial-rt.cfapps.us10.hana.ondemand.com/http/CloudIntegrationTrialJSON';
		// const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
		const res = await axios.get(url, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'X-Requested-With': 'XMLHttpRequest'
			},
			proxy: {
				host: '192.168.0.115',
				port: 3000
			},
			auth: {
				username: username,
				password: password
			},
			withCredentials: true,
			data: {
				productIdentifier: 'HT-6130',
				cheaper: 0
			},
			responseType: 'json'
		});
		console.log(res);
	};
	const tableColumns = [
		{
			Header: 'Ficha',
			accessor: 'ficha' // String-based value accessors!
		},
		{
			Header: 'Name',
			accessor: 'nombre'
		},
		{
			Header: 'Last Name',
			accessor: 'apellido'
		},
		{
			Header: 'Age',
			accessor: 'edad'
		}
	];
	return (
		<div>
			<Card
				heading="Table User"
				style={{ maxWidth: '900px', ...spacing.sapUiContentPadding }}
				avatar={<Icon name="table-view" />}
			>
				<div>
					<AnalyticalTable data={users} columns={tableColumns} visibleRows={5} />
					{/* <AnalyticalTable data={users} columns={tableColumns} visibleRows={5} /> */}
				</div>
			</Card>
		</div>
	);
}
