import {PersonDB} from '../models/Person.models';

interface PersonProps {
    pair: [PersonDB, PersonDB];
}

const Person = ({pair}: PersonProps) => {
    return (
        <div className="flex justify-between p-4 border border-gray-600 rounded-lg shadow-md mb-4 bg-gray-800">
        <div className="w-1/2 px-2">
            <p className="font-semibold text-lg text-white">Person 1:</p>
            <p className="text-gray-300">{pair[0].first_name} {pair[0].last_name}</p>
            <p className="text-gray-400">Height: {pair[0].h_in} in</p>
        </div>
        <div className="w-1/2 px-2">
            <p className="font-semibold text-lg text-white">Person 2:</p>
            <p className="text-gray-300">{pair[1].first_name} {pair[1].last_name}</p>
            <p className="text-gray-400">Height: {pair[1].h_in} in</p>
        </div>
    </div>
    
    )
}

export default Person;