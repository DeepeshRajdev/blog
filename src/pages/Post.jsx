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
            <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fill-opacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          ></path>
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9089FC"></stop>
              <stop offset="1" stop-color="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-center items-center">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border  p-2 sm:mb-2 md:w-2/3">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-l"
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            flexGrow: 1,
                        
                        }}
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
        </div>
    ) : null;
}
export default Post