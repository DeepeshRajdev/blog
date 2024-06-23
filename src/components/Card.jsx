import React from "react"
import { Link } from "react-router-dom"
import service from "../appwrite/service"

const Card = ({ $id, title, featuredImage }) => {
    return (
        <>
            <Link to={`/post/${$id}`}>
                <div className='w-full p-1  rounded-md bg-white'>
                    <div className='w-full justify-center mb-4'>
                        <img src={service.getFilePreview(featuredImage)} alt="image" style={{
                            height: '300px',
                            width: '100%',
                            objectFit: 'cover'
                        
                        }}/>
                    </div>
                    <h2 className="text-stone-950 text-center font-mono">{title}</h2>
                </div>
            </Link>
        </>
    )

}
export default Card