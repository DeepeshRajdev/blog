import React, { useEffect, useState } from "react"
import { PostForm, Container } from '../components/index'
import { useNavigate, useParams } from "react-router-dom"
import service from "../appwrite/service"
const Edit = () => {
    let { slug } = useParams();
    let navigate = useNavigate();
    let [post, fetchPost] = useState(null)
    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((myPost) => {
                    if (myPost) fetchPost(myPost);
                })
        }
        else {
            navigate('/');
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}
export default Edit