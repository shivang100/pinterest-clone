import React, { useState } from "react";
import { submitComment } from "../../api/ImageAPI";

const Comment = ({ img, setUpdateUI }) => {

    const [comment, setComment] = useState('');

    return (
        <div className="flex items-center justify-center shadow-lg mt-2 mb-2 w-full">
            <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white text-slate-900" name="body" placeholder='Type Your Comment' value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                    </div>
                    <div className="w-full md:w-full flex items-start md:w-full px-3 ">
                        <div className="-mr-1">
                            <button type='submit' onClick={(e) => {
                                submitComment(e, setUpdateUI, img, comment);
                                setComment('');
                            }
                            } className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default Comment;