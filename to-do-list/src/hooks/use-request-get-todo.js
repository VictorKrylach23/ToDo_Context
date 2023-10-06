import { useEffect } from 'react';

export const useRequestGetToDo = (setIsLoading, refreshToDo, setToDO) => {
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDo) => {
				setToDO(loadedToDo);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDo]);
};
