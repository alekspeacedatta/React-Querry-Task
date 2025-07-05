import { useQuery } from "@tanstack/react-query";
const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };

const FetchPosts = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
      staleTime: 5 * 60 * 1000,
      retry: 3
    })

    if(isLoading) return <h1>Loading...</h1>
    if(isError) return <p style={{color: 'red'}}>Error: {error.message}</p>

    return (
      <div>
          <h2>Posts:</h2>
          <ul style={{display: 'flex', alignItems: 'flex-start', gap: '24px'}}>
            {data.map(post => (
              <li key={post.id}>
                <section>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </section>
              </li>
            ))}
          </ul>
      </div>
    )
}
export default FetchPosts