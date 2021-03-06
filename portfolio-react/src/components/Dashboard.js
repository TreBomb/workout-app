import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard({ user, setUser }) {
    const [workoutList, setWorkoutList] = useState([]);
    const [routinesList, setRoutinesList] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`https://fit-spot.herokuapp.com/users/${user.id}/workouts`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWorkoutList(data);
            })

            fetch(`https://fit-spot.herokuapp.com/users/${user.id}/weekly_routines`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRoutinesList(data);
            })
        }
    } ,[user]);

    return (
    <div className="dash-page">
        <div className="spacer" />
        <h1 className="txt txt-title">Your Dashboard</h1>
        <hr/>
        <div className="dashboard-div">
            <div className="dashboard-card">
                <h2>Daily Workouts</h2>
                <div className="dashboard-card-content">
                    {workoutList.map(workout => {
                        return (
                                <Link to={{
                                    pathname:"/viewer",
                                    state:{ show: "workout", id: workout.id }
                                }} className="dashboard-workout-card" key={workout.id}>
                                <h3 className="txt txt-workout-name">{workout.name}</h3>
                                    <p className="txt txt-view">Click To View Workout</p>
                                </Link>
                        );
                    })}
                </div>
                <Link to="/new-workout"><button className="btn btn-quaternary">New Workout</button></Link>
            </div>
            <div className="dashboard-card">
                <h2>Weekly Routines</h2>
                <div className="dashboard-card-content">
                {routinesList.map(routine => {
                        return (
                            <Link to={{
                                pathname:"/viewer",
                                state:{ show: "weekly_routine", id: routine.id }
                            }} className="dashboard-workout-card" key={routine.id}>
                            <h3 className="txt txt-workout-name">{routine.name}</h3>
                                <p className="txt txt-view">Click To View Routine</p>
                            </Link>
                        );
                    })}
                </div>
                <Link to="/new-routine"><button className="btn btn-quaternary">New Routine</button></Link>
            </div>
        </div>
    </div>
    );
}

export default Dashboard;