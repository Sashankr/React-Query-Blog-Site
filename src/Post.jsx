import React from 'react';
import {useQuery} from 'react-query';

const fetcher = (url) =>{
    return fetch(url).then(data => data.json())
}


const Post = ({postID,goBack}) => {

    const {data,isLoading} = useQuery(['individualPost',postID], () => fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`))

    if(isLoading ){
        return <h2>Loading...</h2>
    }

    return (
        <div class="individual-post">
            <a href="#" onClick={goBack}>Go Back</a>
            <p><small>{data.id}</small></p>
            <h2>{data.title} </h2>
            <p>{data.body}</p>
        </div>
    )
}

export default Post;