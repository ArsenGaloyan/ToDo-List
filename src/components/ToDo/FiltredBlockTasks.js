import React from 'react'
import { useDispatch } from 'react-redux'


export default function FiltredBlockTasks({theme,tasks, setVision,FILTRES}) {
	const dispatch = useDispatch();
	return (
		<div>
			
			<div className={`navBar ${theme}`}>
          <button className={`buttonNav ${theme}`}>
            {tasks.filter((task) => !task.status).length} items left
          </button>
          <button
            onClick={() => dispatch(setVision(FILTRES.ALL))}
            className={`buttonNav ${theme}`}
          >
            All
          </button>
          <button
            onClick={() => dispatch(setVision(FILTRES.ACTIVE))}
            className={`buttonNav ${theme}`}
          >
            Active
          </button>
          <button
            onClick={() => dispatch(setVision(FILTRES.COMPLETED))}
            className={`buttonNav ${theme}`}
          >
            Completed
          </button>
          <button
            onClick={() => dispatch(setVision(FILTRES.COMPLETED))}
            className={`buttonNav ${theme}`}
          >
            Clear Completed
          </button>
        </div>
		</div>
	)
}
