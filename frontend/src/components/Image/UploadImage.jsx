import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handleImageSubmit } from "../../api/ImageAPI";

const UploadImage = () => {
    const navigate = useNavigate();
    const imageRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!selectedImage) {
            setPreview(null);
            return;
        }
        const imageUrl = URL.createObjectURL(selectedImage);
        setPreview(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [selectedImage])

    const handleWindowOpen = (e) => {
        e.preventDefault();
        imageRef.current.click();
    }

    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(null);
            return;
        }
        setSelectedImage(e.target.files[0])
    }

    return (
        <React.Fragment>
            <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center"
            >
                <div className="absolute opacity-60 inset-0 z-0"></div>
                <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 outline outline-1 outline-slate-300">
                    <div className="text-center">
                        <h2 className="mt-5 text-3xl font-bold text-gray-900">
                            Upload Image
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">Upload Image here</p>
                    </div>
                    <form className="mt-8 space-y-3">
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Title" />
                        </div>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Image</label>
                            <div className="flex items-center justify-center w-full">
                                {
                                    selectedImage ?
                                        <img src={preview} alt='preview' />
                                        :
                                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik" style={{ position: 'absolute', clip: 'rect(10px, 150px, 130px, 10px)' }} />
                                                </div>
                                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <button onClick={handleWindowOpen} className="text-blue-600 hover:underline">select a file</button> from your computer</p>
                                            </div>
                                            <input type="file" onChange={handleFileChange} ref={imageRef} accept="image/*" multiple={false} encType="multipart/form-data" className="hidden" />
                                        </label>
                                }
                            </div>
                        </div>
                        <p className="text-sm text-gray-300">
                            <span>File type: jpg, jpeg and png</span>
                        </p>
                        <div>
                            <button type="submit" onClick={(e) => handleImageSubmit(e, title, selectedImage, navigate)} className="my-5 w-full flex justify-center bg-red-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-400 shadow-lg cursor-pointer transition ease-in duration-300">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UploadImage;