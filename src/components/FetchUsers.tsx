import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
};
const FetchUsers = () => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 5 * 60 * 1000,
        retry: 3
    })
    
    if(isLoading) return <h1>Loading...</h1>
    if(isError) return <h1>Error: {error.message}</h1>

    return (
        <div>
            <h1>Users List:</h1>
            <ul>
                {data.map(( user: any ) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>

    )
}
export default FetchUsers
  