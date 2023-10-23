import React from "react"
import { Link } from "react-router-dom"
import service from "../appwrite/service"

const Card = ({ $id, title, featuredImage }) => {
    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className='w-full p-4 border-2 border-cyan-200 rounded-md bg-violet-600'>
                    <div className='w-full justify-center mb-4'>
                        <img src={service.getFilePreview(featuredImage)} alt="image" />
                    </div>
                    <h2 className="text-cyan-200">{title}</h2>
                </div>
            </Link>
        </>
    )

}
export default Card