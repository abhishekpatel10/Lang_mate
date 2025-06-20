import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends } from '../controllers/user.controller.js';
import { sendFriendRequest , acceptfriendRequest,getFriendRequests,getOutgoingFriendRequests} from '../controllers/user.controller.js';

const router = express.Router();

router.use(protectRoute)
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptfriendRequest);

router.get("/friend-requests", getFriendRequests);

router.get("/outgoing-friend-requests",getOutgoingFriendRequests);

export default router;