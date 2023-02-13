import { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

export function Home() {

    let [notes, setNotes] = useState<any>([])
    let {errMsg, authTokens, logoutUser}:any = useContext(AuthContext)

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async() => {
        try {
            if (!authTokens) {throw new Error("Need to login mate")}

            let response = await fetch(`http://${window.location.hostname}:8000/api/notes/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(authTokens.access) },
            })

            let data = await response.json()

            if (response.status == 200) {
                setNotes(data)
            } 
            else if(response.status == 401){
                logoutUser()
            }
            else {
                errMsg('Tried getting notes' + '<br/>' + response.status + ' - ' + response.statusText)
            }
        }
        catch (err:any) {
            errMsg('Tried requesting notes' + '<br/>' + err.message)
        }
    }

    return (
        <Fragment>
            <h1>Home</h1>
            {days[new Date().getDay()]} {new Date().toLocaleString()}
            <hr/>
            <h4>These are the things you need to do</h4>

            <ol>
                {/* {notes.map((note: { id: number; body: string; }) => { */}
                {notes.map((note:any) => (
                    <li key={note.id}>{note.body}</li>
                ))}
            </ol>

            {notes.length > 0 ? null : <span>Let's hope that list loaded</span>}<p></p>
            <button className='btn btn-warning' onClick={() => {errMsg("Fail")}}>Throw example error</button>
        </Fragment>
    );
};