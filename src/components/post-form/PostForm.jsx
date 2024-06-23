import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Select, Input } from '../index'
import MyEditor from '../Editor';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import service from "../../appwrite/service";
const PostForm = ({ post }) => {
    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
            slug: post?.$id || '',
        }
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    console.log(`userdata is ${userData.$id}`)
    // const submit = async (data) => {
    //     if (post) {
    //         const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
    //         if (file) {
    //             service.deleteFile(post.featuredImage)
    //         }
    //         const Post = await service.updatePost(post.$id, {
    //             ...data,
    //             featuredImage: file ? file.$id : undefined,
    //         });
    //         if (Post) navigate(`/post/${Post.$id}`)
    //     }
    //     else {
    //         const file = await service.uploadFile(data.image[0]);
    //         if (file) {
    //             const fileId = file.$id;
    //             data.featuredImage = fileId;
    //             const Post = service.createPost({ ...data, userId: userData.$id })
    //             if (Post) navigate(`/post/${Post.$id}`)
    //         }
    //     }
    // }
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };
    const slugTransform = useCallback((slug) => {
        if (slug && typeof slug === 'string') {
            return slug.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return ''
    }, [])
    useEffect(() => {
        const subs = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })
        return () => {
            subs.unsubscribe();
        }

    }, [slugTransform, watch, setValue])
    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-violet-200 p-2 rounded-xl">
                <div className="px-2 w-full sm:w-2/3">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="text-violet-900  outline-violet-900 bg-violet-100 m-4 rounded-xl  px-2"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="text-violet-900  outline-violet-900 bg-violet-100 m-4 rounded-xl  px-2"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <MyEditor name="content" control={control} defaultValue={getValues("content")} label="Content :" />
                </div>
                <div className="w-1/3 px-2">
                    <div className="text-slate-100">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="m-4   text-slate-900"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <div>
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="text-violet-900  outline-violet-900 bg-violet-100 m-4 rounded-xl  px-2"
                            {...register("status", { required: true })}
                        />
                    </div>
                    <button className="m-4 px-4 py-2 text-violet-900 border-violet-900 border" type="submit">
                        {post ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </>
    )

}
export default PostForm




