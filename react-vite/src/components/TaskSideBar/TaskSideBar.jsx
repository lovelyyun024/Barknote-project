import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import TaskCreationForm from "../NewTaskModal/NewTaskModal";
import TaskUpdateForm from "../UpdateTaskModal/UpdateTaskModal";
import { thunkUpdateTask, thunkFetchTasks } from "../../redux/tasks";

export default function TaskSideBar() {
  const dispatch = useDispatch();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const tasksData = useSelector((state) => state.task.tasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  const sortedTasksData = tasksData.sort((a, b) => {
    const completedA = a.completed ? 1 : 0;
    const completedB = b.completed ? 1 : 0;

    return completedB - completedA;
  });

  const handleStaUpdate = async (id, description, completed, due_date, e) => {
    e.preventDefault();
    const updatedCompletedTasks = completedTasks.includes(id)
      ? completedTasks.filter((taskId) => taskId !== id)
      : [...completedTasks, id];

    setCompletedTasks(updatedCompletedTasks);

    const task = {
      description: description,
      completed: !completed,
    };

    setTimeout(async () => {
      await dispatch(thunkUpdateTask(id, task));
    }, 500);
  };

    useEffect(() => {
      dispatch(thunkFetchTasks());
    }, [dispatch]);

 

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {/* <div className="tag-sidebar-wrapper"> */}
      <div className="tag-sidebar-header">
        <div>Tasks</div>
        <div className="tag-sidebar-header-button">
          <OpenModalButton
            buttonText={
              <div style={{ fontSize: "15px", color: "#333333" }}>
                <i className="fas fa-tasks"></i>&nbsp;New
              </div>
            }
            onItemClick={closeMenu}
            modalComponent={<TaskCreationForm />}
          />
        </div>
      </div>
      <div className="tag-sidebar-main">
        {sortedTasksData &&
          [...sortedTasksData] // .filter((task) => task.completed == false)
            .reverse()
            .map(({ description, due_date, completed, id }) => (
              <div className="task-board-action" key={id}>
          
                  <i
                    onClick={(e) =>
                      handleStaUpdate(id, description, completed, due_date, e)
                    }
                    className={
                      completed === true
                        ? "far fa-check-circle completed"
                        : "far fa-circle incomplete"
                    }
              
                  ></i>
                {/* </button> */}
                <OpenModalButton
                  buttonText={
                    <div className="task-board-button">
                      <div className={`task-description ${completed == false? "" : "delete"}`}>
                        {description}
                      </div>
                      {!completed && due_date && (
                        <div
                          style={{
                            fontSize: "12px",
                            color:
                              new Date(due_date) < new Date()
                                ? "red"
                                : "inherit",
                          }}
                        >
                          Due {due_date.slice(4, 11)}
                        </div>
                      )}
                    </div>
                  }
                  onItemClick={closeMenu}
                  type="button"
                  modalComponent={<TaskUpdateForm id={id} />}
                />
              </div>
            ))}
      </div>
      {/* </div> */}
    </>
  );
}
