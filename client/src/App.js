// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [timeComparison, setTimeComparison] = useState([]);

    useEffect(() => {
        const calculateTimeComparison = () => {
            const comparisonData = [];
            for (let i = 0; i < 24; i++) {
                const tokyoTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo', hour: `${i}`, hour12: false });
                const seattleTime = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: `${i}`, hour12: false });
                comparisonData.push({ hour: i, tokyoTime, seattleTime });
            }
            setTimeComparison(comparisonData);
        };

        calculateTimeComparison();
        const intervalId = setInterval(calculateTimeComparison, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App dark-mode">
            <h1>Timezone Converter</h1>
            <div className="clock-container">
                <div className="clock">
                    <h2>Tokyo Time</h2>
                    <p>{new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })}</p>
                </div>
                <div className="clock">
                    <h2>Seattle Time</h2>
                    <p>{new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
                </div>
            </div>
            <h2>Hourly Comparison</h2>
            <table className="comparison-table">
                <thead>
                    <tr>
                        <th>Hour</th>
                        <th>Tokyo Time</th>
                        <th>Seattle Time</th>
                    </tr>
                </thead>
                <tbody>
                    {timeComparison.map(data => (
                        <tr key={data.hour}>
                            <td>{data.hour}:00</td>
                            <td>{data.tokyoTime}</td>
                            <td>{data.seattleTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;

