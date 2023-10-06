import styles from './nav-form-styles.module.css';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const AddTaskCreator = () => {
	const { isAdding, newToDoTitle, setNewToDoTitle, handleAddToDo, setIsAdding } =
		useContext(AppContext);

	return isAdding ? (
		<>
			<span className={styles.textForAddInput}>Add new task</span>
			<input
				className={styles.inputLine}
				type="text"
				value={newToDoTitle}
				onChange={(e) => setNewToDoTitle(e.target.value)}
				onBlur={handleAddToDo}
				onKeyPress={(e) => {
					if (e.key === 'Enter') handleAddToDo();
				}}
				autoFocus
			/>
		</>
	) : (
		<button onClick={() => setIsAdding(true)}>+</button>
	);
};
