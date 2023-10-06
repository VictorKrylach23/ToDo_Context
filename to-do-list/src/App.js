import './App.css';
import { useState } from 'react';
import { NavForm, ToDoList } from './components';
import { useRequestDeleteToDo, useRequestGetToDo } from './hooks';
import { AppContext } from './context';

function App() {
	const [toDo, setToDO] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [results, setResults] = useState('');
	const [alphabetFilter, setAlphabetFilter] = useState(false);

	useRequestGetToDo(setIsLoading, refreshToDo, setToDO);

	const [newToDoTitle, setNewToDoTitle] = useState('');
	const [isAdding, setIsAdding] = useState(false);

	const requestAddToDo = (newToDo) => {
		fetch(`http://localhost:3005/todos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(newToDo),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setRefreshToDo(!refreshToDo);
			});
	};

	const handleAddToDo = () => {
		const newToDo = {
			userId: Math.random(),
			id: Date.now(),
			title: newToDoTitle,
			completed: false,
		};

		requestAddToDo(newToDo);
		setNewToDoTitle('');
		setIsAdding(false);
	};

	const { requestDeleteToDo, isDeleting } = useRequestDeleteToDo(
		refreshToDo,
		setRefreshToDo,
	);

	return (
		<>
			<AppContext.Provider
				value={{
					toDo,
					isAdding,
					newToDoTitle,
					setNewToDoTitle,
					handleAddToDo,
					setIsAdding,
					setAlphabetFilter,
					alphabetFilter,
				}}
			>
				<div className="toDo">ToDoList</div>
				<NavForm isAdding={isAdding} toDo={toDo} setResults={setResults} />
				<ToDoList
					isLoading={isLoading}
					toDo={toDo}
					isDeleting={isDeleting}
					requestDeleteToDo={requestDeleteToDo}
					setRefreshToDo={setRefreshToDo}
					refreshToDo={refreshToDo}
					results={results}
					alphabetFilter={alphabetFilter}
				/>
			</AppContext.Provider>
		</>
	);
}

export default App;
