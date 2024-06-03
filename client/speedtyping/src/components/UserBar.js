import React, { useState } from 'react';
import UserOptions from './UserOptions';
import UserStatisticks from './UserStatistics';

function UserBar() {
    const [activeSection, setActiveSection] = useState('options');

    const showOptions = () => setActiveSection('options');
    const showStatistics = () => setActiveSection('statistics');

    return (
        <div className='flex flex-col flex-grow justify-around items-center bg-gray-800 rounded-2xl'>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"style={{justifyContent:'center', backgroundColor: '#1F2833'}}>
                <nav className="bg" style={{backgroundColor: '#000000', border: "3px solid black", borderRadius: "3px"}} >
                    <ul className="font-medium flex p-2 items-center gap-6"style={{color: '#66FCF1', width: "400px", justifyContent: "center"}}>
                        <li>
                            <button onClick={showOptions} className='hover:text-white'>User Options</button>
                        </li>
                        <li>
                            <button onClick={showStatistics} className='hover:text-white'>User Statistics</button>
                        </li>
                    </ul>
                </nav>
            </div>
            {activeSection === 'options' && (
                <div> 
                    <UserOptions></UserOptions>
                </div>
            )}
            {activeSection === 'statistics' && (
                <div>
                    <UserStatisticks></UserStatisticks>
                </div>
            )}
        </div>
    );
}

export default UserBar;
