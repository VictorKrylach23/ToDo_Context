import styles from './todo-list-styles.module.css';
import { useState } from 'react';
import { DeleteTaskButton } from './delete-button-module';
import { ChangeTaskButton } from './change-button-module';
import { requestChangeChecked } from './change-checked-request-module';

export const ToDoList = (props) => {
	const {
		isLoading,
		toDo,
		isDeleting,
		requestDeleteToDo,
		setRefreshToDo,
		refreshToDo,
		results,
		alphabetFilter,
	} = props;

	const [editing, setEditing] = useState(null);
	const [newTitle, setNewTitle] = useState('');

	const handleChangeTitle = (id, completed, userId) => {
		const updatedTask = {
			userId: Math.random(),
			id: id,
			title: newTitle,
			completed: completed,
		};

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedTask),
		})
			.then((response) => response.json())
			.then(() => {
				setEditing(null);
				setNewTitle('');
				setRefreshToDo(!refreshToDo);
			})
			.catch((error) => {
				console.error('Ошибка при обновлении задачи:', error);
			});
	};

	return (
		<ol className={styles.list}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				(alphabetFilter && alphabetFilter !== toDo
					? alphabetFilter
					: results && results !== toDo
					? results
					: toDo
				).map(({ id, title, completed, userId }) => (
					<li key={id}>
						{editing === id ? (
							<>
								<input
									type="text"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
								<button
									onClick={() =>
										handleChangeTitle(id, completed, userId)
									}
								>
									save
								</button>
							</>
						) : (
							title
						)}

						<input
							type="checkbox"
							className={styles.isComplitedCheckbox}
							checked={completed}
							onChange={() =>
								requestChangeChecked({
									id,
									completed,
									title,
									setRefreshToDo,
									refreshToDo,
								})
							}
						></input>
						<ChangeTaskButton
							id={id}
							title={title}
							setEditing={setEditing}
							setNewTitle={setNewTitle}
						/>
						<DeleteTaskButton
							isDeleting={isDeleting}
							requestDeleteToDo={requestDeleteToDo}
							id={id}
						/>
					</li>
				))
			)}
		</ol>
	);
};
