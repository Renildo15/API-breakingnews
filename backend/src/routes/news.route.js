import { Router } from "express";
const router = Router();

import {create, 
    findAll, 
    topNews, 
    findById, 
    searchByTitle, 
    byUser, 
    update, 
    newsDelete, 
    likeNew,
    addComment,
    deleteComment
} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id",authMiddleware, newsDelete );
router.patch("/like/:id", authMiddleware, likeNew);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment);


export default router