import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addtodo, edittodo, removetodo, settodo, toggletodo,filtertodo } from '../Slices/TodoSlices';
import Trash from '../src/images/trash3.svg'


const Todo = () => {
    const todo = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const tasknameref = useRef();
    const taskdescref = useRef();
    const tasknameref2 = useRef();
    const taskdescref2 = useRef();
    const editref = useRef();
    const [inputtaskname, setinputtaskname] = useState('');
    const [inputtaskdesc, setinputtaskdesc] = useState('');
    const [edit, setedit] = useState(null);
    const [edittaskname, setedittaskname] = useState('');
    const [edittaskdesc, setedittaskdesc] = useState('');
    const [filter, setfilter] = useState('');
    


    useEffect(() => {
        fetch("https://668b53780b61b8d23b092486.mockapi.io/id")
            .then(response => response.json())
            .then(data =>
                dispatch(settodo(data)))
    }, [dispatch])

    const handlesubmit = (e) => {
        e.preventDefault();

        const taskn = tasknameref.current?.value;
        const taskd = taskdescref.current?.value;
        const nextId = todo.length > 0 ? todo[todo.length - 1].id + 1 : 1;
        if (taskn !== '' && taskd !== '') {
            const newTask = {
                taskname: taskn,
                taskdesc: taskd,
                id: nextId,
                status: 'Pending'
            };
            console.log(newTask)
            fetch('https://668b53780b61b8d23b092486.mockapi.io/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            }).then(res => res.json()).then(data => dispatch(addtodo(data)))


        }
        setinputtaskname(' ')
        setinputtaskdesc(' ')

    }

    const handleremove = (id) => {

        fetch(`https://668b53780b61b8d23b092486.mockapi.io/id/${id}`, {
            method: 'DELETE'
        })
        dispatch(removetodo(id))
    }


    const handleedit = (newdata) => {

        const updatetask = {
            taskname: tasknameref2.current?.value,
            taskdesc: taskdescref2.current?.value,
            id: newdata.id,
            status: newdata.status
        };
        fetch(`https://668b53780b61b8d23b092486.mockapi.io/id/${updatetask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatetask)
        })

        dispatch(edittodo(updatetask))

        
       
    }
    const handlecomplete=(newdata)=>{
        const updatedStatus = newdata.status === 'Completed' ? 'Pending' : 'Completed';
        const updatecomplete={
            taskname: newdata.taskname,
            taskdesc: newdata.taskdesc,
            id: newdata.id,
            status: updatedStatus
        }
       
        fetch(`https://668b53780b61b8d23b092486.mockapi.io/id/${updatecomplete.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatecomplete)
        })

        dispatch(toggletodo(updatecomplete.id))
    }
const handlefilter=(e)=>
    {
        setfilter(e.target.value)
    }

        const filteredTodos = todo.filter(todo => {
            if (filter === 'Pending') {
                return todo.status === 'Pending';
            } else if (filter === 'Completed') {
                return todo.status === 'Completed';
            }
            return true; 
        });



    return (
        <>
            
                <form className="row col-12 bg-primary d-flex flex-row p-3 m-1">
                    <div className="col-12 d-flex flex-row align-content-center justify-content-start bg-primary">
                        <label htmlFor="task" className="p-1">Task Name</label>
                        <input type="text" ref={tasknameref}  style={{width:'25vw'}} id="task" value={inputtaskname} onChange={(e) => setinputtaskname(e.target.value)}></input>
                        <label htmlFor="taskdescription" className=" p-1">Task Description</label>
                        <input type="text" ref={taskdescref} style={{width:'25vw'}} id="taskdescription" value={inputtaskdesc} onChange={(e) => setinputtaskdesc(e.target.value)}></input>
                        <button type="submit" className="col-auto btn btn-success btn-xs ms-5 h-auto w-auto" onClick={handlesubmit} >Submit</button>
                    </div>
                    
                </form >
                <div className='search-input d-flex flex-row mb-3 mt-3'>
                    <h3 className='ms-3'>Filter:</h3>
                <select  className='ms-3' defaultValue='All' onChange={(e)=>handlefilter(e)}>
                    <option value='Completed'>Completed</option>
                    <option value='Pending'>Pending</option>
                    <option value='All'>All</option>

                </select>

                </div>
            
            <div className='container-fluid'>
                <div className='row mb-3'>
                    {
                        filteredTodos.map((data) => (<div style={{backgroundColor:data.status === 'Completed' ?  '#90EE90' : '#ffc0cb'}} className='col-12  card card-body d-flex flex-row  m-1 p-2 w-5' key={data.id}>
                            <div className='col-6'>
                            {edit === data.id ? (
                                
                                <>
                                    <input type="text" ref={tasknameref2} className="form-control" id="taskname2" value={edittaskname} onChange={(e) => setedittaskname(e.target.value)}></input>
                                    <input type="text" ref={taskdescref2} className="form-control" id="taskdescription2" value={edittaskdesc} onChange={(e) => setedittaskdesc(e.target.value)}></input>

                                </>
                            ) : (
                                <>
                                    <h3>{data.taskname}</h3>
                                    <p>{data.taskdesc}</p>

                                </>
                            )}
                            </div>
                            <div className='col-6 d-flex align-items-center'>
                                <button className={`btn btn-${data.status === 'Completed' ? 'success' : 'primary'} me-5 h-audo w-auto`} value={data.status} onClick={() => handlecomplete(data)}>{data.status}</button>
                                <button
                                    className={`btn btn-${edit === data.id ? 'danger' : 'warning'} me-5h-auto w-auto`}
                                    ref={editref}
                                    onClick={() => {
    
                                        if (edit === null){
                                            setedit(data.id)
                                            console.log("inside edit toggle")
                                            console.log(edit)
                                            setedittaskname(data.taskname)
                                            setedittaskdesc(data.taskdesc)

                                        }   
                                        
                                        else {
                                            
                                            handleedit(data)
                                            setedit(null);
                                           
                                        }
                                    
                                    }
                                }
                                >
                                    {edit === data.id ? 'Save' : 'Edit'}
                                </button>

                                <img src={Trash} alt="Delete" className='w-auto ms-5'style={{ height: '5vh', cursor: 'pointer' }} onClick={() => handleremove(data.id)} />
                                </div>
                        </div>))

                    }
                </div>
            </div>



        </>
    )
}

export default Todo