import friendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req,res) {
    try {
    const currentUserId = req.user.id;
    const currentUser = req.user

    const recommendedUsers = await User.find({$and:[
        { _id: { $ne: currentUserId } }, // Exclude current user
        { $id: { $nin: currentUser.friends } } ,
        {isOnboarded:true} // Only include users who have completed onboarding
        // Exclude users who are already friends
    ]
    })
    res.status(200).json(recommendedUsers)


    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguages location bio isOnBoarded");
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching user friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId = req.user.id;
        const {id:recipentId} = req.params
        if (myId === recipentId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself." });
        }
        const recipient = await User.findById(recipentId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found." });
        }
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }
        const existingRequest = await friendRequest.findOne({
            $or:[
                { sender: myId, recipient: recipentId },
                { sender: recipentId, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists." });
        }

        const friendRequest = await friendRequest.create({
            sender: myId,
            recipient: recipentId
        });

        res.status(201).json(friendRequest);

    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptfriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        const request = await friendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Friend request not found." });
        }

        if (request.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only accept requests sent to you." });
        }

        // Add each other as friends
        friendRequest.status = "accepted";
        await friendRequest.save();
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted." });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingRequests = await friendRequest.find({ recipient: req.user.id, status: "pending" }).populate("sender", "fullName profilePic nativeLanguage learningLanguages ");
        const acceptedRequests = await friendRequest.find({ sender: req.user.id, status: "accepted" }).populate("recipient", "fullName profilePic ");
        res.status(200).json({
            incomingRequests,
            acceptedRequests
        });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequests = await friendRequest.find({ sender: req.user.id, status: "pending" }).populate("recipient", "fullName profilePic nativeLanguage learningLanguages ");
        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}