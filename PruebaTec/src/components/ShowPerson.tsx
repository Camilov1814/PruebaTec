import { PersonDB } from "../models/Person.models";
import Person from "./Person";
import { useEffect, useState } from 'react';

export const ShowPerson = () => {
    const [person, setPerson] = useState<PersonDB[]>([]);
    const [target, setTarget] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarget(parseInt(e.target.value));
    }
     

    const getPerson = async()  => {
        const response = await fetch('https://mach-eight.uc.r.appspot.com/');
        const data = await response.json();
        setPerson(data.values);
    }

    useEffect(() => {
        getPerson();
    },[]);
    

    const heighSum = (): { pair: [PersonDB, PersonDB] }[] => {
        const result: { pair: [PersonDB, PersonDB] }[] = [];
        const heightMap = new Map<number, PersonDB[]>();
    
        for (let i = 0; i < person.length; i++) {
            const currentHeight = parseInt(person[i].h_in);
            const complement = target - currentHeight;
    
            if (heightMap.has(complement)) {
                const possibleMatches = heightMap.get(complement);
                possibleMatches!.forEach(match => {
                    result.push({ pair: [match, person[i]] });
                });
            }
    
            if (heightMap.has(currentHeight)) {
                heightMap.get(currentHeight)!.push(person[i]);
            } else {
                heightMap.set(currentHeight, [person[i]]);
            }
        }
    
        return result;
    };
    const pairs = heighSum();

    return (
        <div className="p-4 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg ">
            <div className="mb-4">
                <input
                    type="number"
                    id="numberInput"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Enter a number"
                />
            </div>
            
            <div>
                {pairs.length === 0 ? (
                    <p className="text-center text-gray-400">No matches found</p>
                ) : (
                    <>
                        <p className="text-center text-gray-400 mb-4">Total pairs found: {pairs.length}</p>
                        {pairs.map((p, index) => (
                            <Person key={index} pair={p.pair} />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
