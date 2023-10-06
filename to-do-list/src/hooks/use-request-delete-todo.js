import { useState } from 'react';

export const useRequestDeleteToDo = (refreshToDo, setRefreshToDo) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteToDo = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setRefreshToDo(!refreshToDo);
			})
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteToDo, isDeleting };
};
