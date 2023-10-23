import React, { useEffect, useState } from "react"
import service from "../appwrite/service";
import Card from '../components/Card';
import Container from "../components/container/Container";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            console.log(`working or not`)
            if (posts) setPosts(posts.documents);
        })
    }, [])


    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )

}
export default Posts