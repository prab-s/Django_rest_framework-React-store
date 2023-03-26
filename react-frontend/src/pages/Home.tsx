import { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';

export function Home() {

    let [notes, setNotes] = useState<any>([])
    let { errMsg, authTokens, logoutUser }: any = useContext(AuthContext)

    let api = useAxios()

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        try {
            if (!authTokens) { throw new Error("Need to login mate") }
            
            // Regular method:
            // let response = await fetch(`http://192.168.1.81:8000/api/notes/`, {
            //     method: 'GET',
            //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) },
            // })

            // let data = await response.json()
            
            // Old Axios method:
            // let response = await axiosInstance.get('/api/notes/')

            // New useAxios (my own hook) method
            let response = await api.get('/api/notes/')

            if (response.status == 200) {
                // setNotes(data)
                setNotes(response.data)
            }
            else if (response.status == 401) {
                logoutUser()
            }
            else {
                errMsg('Tried getting notes' + '<br/>' + response.status + ' - ' + response.statusText)
            }
        }
        catch (err: any) {
            errMsg('Tried requesting notes' + '<br/>' + err.message)
        }

    }
    
    // const fun1 = () => {
    //     document.title = "LOL"
    // }
    
    return (
        <Fragment>
            <h1>Home</h1>
            {days[new Date().getDay()]} {new Date().toLocaleString()}
            <hr />
            <h4>These are the things you need to do</h4>

            {/* <button className='btn btn-secondary btn-sm py-0 px-1' onClick={() => {fun1()}}><i className="fa fa-times"></i></button> */}

            <ol>
                {/* {notes.map((note: { id: number; body: string; }) => { */}
                {notes.map((note: any) => (
                    <li key={note.id}>{note.body}</li>
                ))}
            </ol>

            {notes.length > 0 ? null : <span>Let's hope that list loaded</span>}<p></p>
            <button className='btn btn-warning' onClick={() => { errMsg("Fail") }}>Throw example error</button>

            <hr></hr>
            <p></p>
            
            <video width="720" height="480" itemType='video/mp4' src='https://www.w3schools.com/html/mov_bbb.mp4' autoPlay muted loop/>

        </Fragment>
    );
};