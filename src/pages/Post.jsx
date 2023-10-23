import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import service from "../appwrite/service";
import { Container } from "../components/index";
import Button from '@mui/material/Button';
import parse from "html-react-parser";
import { useSelector } from "react-redux";


const Post = () => {
    let { slug } = useParams();
    let navigate = useNavigate();
    let [post, setPost] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = userData && post ? userData.$id === post.userId : false;
    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((myPost) => {
                    if (myPost) {
                        setPost(myPost);
                    }
                    else navigate('/')
                })
        }
        else navigate('/')
    }, [slug, navigate])
    const deletePost = () => {
        service.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    service.deleteFile(post.feauturedImage)
                    navigate('/')
                }
            })
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border  p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-l"
                    />

                    {isAuthor && (
                        <div className="absolute right-1 top-1">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button variant="oulined" size="small" color="success">
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost} variant="oulined" size="small" color="success">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
export default Post