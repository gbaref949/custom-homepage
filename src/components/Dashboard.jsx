import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        // Fetch user data
        fetchUserData()
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));

        // Fetch leaderboard data
        fetchLeaderboardData()
            .then(data => setLeaderboardData(data))
            .catch(error => console.error('Error fetching leaderboard data:', error));
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/userData'); // Replace '/api/userData' with your actual API endpoint
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    };

    const fetchLeaderboardData = async () => {
        try {
            const response = await fetch('/api/leaderboardData'); // Replace '/api/leaderboardData' with your actual API endpoint
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch leaderboard data');
        }
    };

    return (
        <div className="bckg dash">
            <h1 className="text dashboard">Dashboard</h1>
            {userData && <Scoreboard user={userData} />}
            {leaderboardData && <Leaderboard leaderboard={leaderboardData} />}
        </div>
    );
};

const Scoreboard = ({ user }) => {
    const winPercentage = ((user.games_won / user.games_played) * 100).toFixed(2);

    return (
        <div className="container">
            <h1 className="text">ScoreBoard</h1>
            <ul>
                <h4 className="stext">Users with the best time</h4>
                <li>Games Played: {user.games_played}</li>
                <li>Games Won: {user.games_won}</li>
                <li>Win Percentage: {isNaN(winPercentage) ? 0 : winPercentage}%</li>
                <li>Current Win Streak: {user.win_streak}</li>
                <li>Highest Win Streak: {user.highest_win_streak}</li>
                <a className="astext" href="/game">Start Game</a>
                <a className="astext" href="/users/logout">Logout</a>
            </ul>
        </div>
    );
};

const Leaderboard = ({ leaderboard }) => {
    return (
        <div className="container">
            <ul className="leaderboard">
                <h4>Win Streak Leaderboard</h4>
                {leaderboard.map((entry, index) => (
                    <li key={index}>{entry.username}: {entry.win_streak}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
