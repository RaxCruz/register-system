import SetQueryFilters from "@/components/_ui/SetQueryFilters";
import { Suspense } from "react";


const RaceResultsPage = async ({
    params,
    searchParams,
}: {
    params: { raceId: string };
    searchParams: { filter: string };
}) => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await result.json();
    data = data.filter((person: any) => {
        if (searchParams.filter) {
            return person.name.toLowerCase().includes(searchParams.filter.toLowerCase());
        }
        return true;
    });
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SetQueryFilters />
            </Suspense>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((person: any) => (
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.username}</td>
                            <td>{person.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default RaceResultsPage;