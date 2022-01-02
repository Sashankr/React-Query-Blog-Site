import React,{useState} from 'react'
import './App.css'
import { useQuery } from 'react-query'
import Post from './Post';
import client from './react-query-client';

const url = 'https://jsonplaceholder.typicode.com/posts';

const fetcher = () =>{
    return fetch(url).then(data => data.json())
}
//trying ssh

function App() {
	// let's go
    const [postID,setPostID] = useState(null);
    const {data : posts,isLoading} = useQuery(['posts'],()=>fetcher(),{
        select : result => result.slice(0,5)
    })


    {isLoading && <h2>Loading...</h2>}

    if(postID !== null){
        return <Post postID = {postID} goBack={() => setPostID(null)} />
    }


	return (
		<div className="App">
			<h2>Blog posts</h2>
            <div className="posts">
                {posts?.map((post)=>{
                const cachedPost = client.getQueryData(['individualPost',post.id]);
                return (
                    <div key={post.id}>
                    
                    <p>
                    <strong>{cachedPost?'(visited)':''}</strong>
                       {post.id} <a onClick={()=>{setPostID(post.id)}} href="#">{post.title}</a>
                    </p>
                    </div>
                )
            })}
            </div>
		</div>
	)
}

export default App
