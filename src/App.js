import Header from './Components/Header';
import Tasks from './Components/Tasks';
import { useState , useEffect} from 'react';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';
import { BrowserRouter as Router , Route } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
        const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      }
    getTasks();
  },[]);
  const [show,setShow] = useState(true);
  
  // Fetch tasks from server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    return data;
  }

  // Fetch task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  }

  // addTask
  const addTask = async(task) => {
    
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(task)  
    });

    const data = await res.json();
    console.log(data);

    setTasks([...tasks,data]);
  }

  // Delete Task 
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',

    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // toggle Reminder
  const toggleReminder = async(id) => {

    const toggleTOTasks = await fetchTask(id);
    const updTask = {...toggleTOTasks, reminder : !toggleTOTasks.reminder};
    console.log(updTask);
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })
    const data = await res.json();
    console.log(data);
    setTasks(tasks.map((task) => {
      return task.id === id ? {...task,reminder:data.reminder} :task
    }))
  }
  // show addTask or not
  const showAddTask = () => {
    setShow(!show);
  }
  return (
    <div className="container">
      <Router>
        <Header show = {show}  showAddTask={showAddTask} />
        {show ?<AddTask addTask={addTask} />:null}
        <Route path="/" exact render={(props) => (
          <>
              {tasks.length > 0 ? <Tasks 
              tasks={tasks} 
              onToggle={toggleReminder}
              onDelete={deleteTask} /> 
              :<p>Please start adding task</p>}
          </>
        )} />
          <Route path="/About" component={About}></Route>
          <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
