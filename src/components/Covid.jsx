import {useState} from "react";
import "./covid.css";

export const Covid = () => {
    const [state, setState] = useState([]);
    const [isState, setIsState]= useState(false);



    

    const handleState = async () => {
        const res = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states");
        const allState = await res.json();
        // setData();
        setState( allState.states )
        setIsState(true);
        

    }
    
    const[stateCode, setStateCode] = useState(0);
    const [dis, setDis] = useState([])
    const [isSCode, setIsSCode] = useState(false);

    const handleDistrict = async () => {
        const res = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateCode}`);
        const all = await res.json();
        setIsSCode(true);
        setIsState(false);
        setDis(all.districts);

    }

    const [pin, setPin] = useState(721232);
    const [isPin, setIsPin] = useState(false);
    const [pinArea, setPinArea] = useState([])


    const handlePin = async () => {
        let date = new Date();
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear()
        const res = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${d}-${m}-${y}`);
        const all = await res.json();
        setIsSCode(false);
        setIsState(false);
        setIsPin(true);
        setPinArea(all.sessions);
    }
    


    console.log(pinArea);


    return (
        <div className = "container">
            <div className = "functionality">
                <div className = "available">
                    <button onClick = {handleState}>Check Availability</button>
                    <div>
                        <input  onChange={(e) => setStateCode(e.target.value)} type="number" placeholder="Enter the State id" />
                        <button className="btn" onClick = {handleDistrict}>Check</button>
                    </div>
                    <div>
                    <input  onChange = {(e) => setPin(e.target.value)} type = "number" placeholder = "Enter the Pincode" />
                        <button className="btn" onClick = {handlePin}>Check</button>
                    </div>
                </div>
            </div>
            <div className = "show-data">
            {
                
                isState ? (<div>
                    <h1>All State</h1>
                    {state.map((d) => (
                        <p key = {d.state_id}> State Name : {d.state_name}</p>
                    ))}
                </div>)
                : isSCode?  (
                    
                    <div>
                        <h1>Id based area</h1>
                        { 
                            dis.map((d) => (
                                <p key = {d.district_id} >district nanme : {d.district_name}</p>
                            ))
                        }
                    </div>
                ): isPin?  (
                    <div>

                        {
                            pinArea.map((e) => (
                                <div key = {e.session_id}>
                                    <h1>Area </h1>
                                    <p>Dose Name : {e.vaccine}</p>
                                    <p>Name : {e.name}</p>
                                    <p>Address : {e.address}</p>
                                    <p>Fee : {e.fee_type}</p>
                                    <p>Date : {e.date}</p>
                                    <p>Slots : {e.slots}</p>
                                    <p>Capacity : {e.available_capacity}</p>
                                    
                                </div>
                            ))
                        }



                    </div>
                ) : (
                    <div></div>
                )


            }

            </div>
        </div>
    )
}