import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchByTitleService = (title) => News.find({
    title: {$regex: `${title || ""}`, $options: "i"}
}).sort({_id: -1}).populate("user");

const byUserService = (id) => News.find({user: id}).sort({_id: -1}).populate("user");

const updateService = (id, title, text, banner) => 
    News.findOneAndUpdate(
        {_id: id}, 
        {title, text, banner},
        {
            rawResult: true,
        }
    )

const newsDeleteService = (id) => News.findOneAndDelete({_id:id});

const likeNewService = (id, userId) => News.findOneAndUpdate(
    {_id: id, "likes.userId":{$nin: [userId]}},
    {$push:{likes: {
        userId,
        created: new Date()
    }}}
)

const deleteLikeNewService = (id, userId) => News.findOneAndUpdate(
    {_id: id},
    {$pull:{likes: {
        userId
    }}}
)

const addCommentService = (id, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    return News.findOneAndUpdate(
        {_id: id}, 
        {$push: {comments: {idComment, userId, comment, createdAt: new Date()},}}
    );
}

const deleteCommentService = (idNews, idComment, userId)=>{
    return News.findOneAndUpdate({_id: idNews}, {$pull: {comments: {idComment, userId}}})
}
export {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    newsDeleteService,
    likeNewService,
    deleteLikeNewService,
    addCommentService,
    deleteCommentService
}