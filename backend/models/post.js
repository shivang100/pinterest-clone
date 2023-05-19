const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        comments: [{
            type: String
        }],
        likedBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        creator: {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        comments: [{
            comment: String,
            commenter: {
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }
        }]
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema);