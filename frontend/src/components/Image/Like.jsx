import { handleLikeImage } from '../../api/ImageAPI';
import { MDBIcon } from 'mdb-react-ui-kit';
const Like = ({ setLikes, likes, img }) => {

    return (
        <div className="flex flex-row justify-end" onClick={(e) => handleLikeImage(e, img, setLikes, likes)} >
            <button><MDBIcon far icon="heart" />
            </button>
            <div
                className="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                <span>{likes}</span>
            </div>
        </div>
    );
}

export default Like;