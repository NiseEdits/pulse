import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(req:AuthRequest, res: Response, next:NextFunction) {
 try{
    const userId = req.userId || "No user ID found in request";
    
    const user = await User.findById(userId)

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return
     }
    res.status(200).json({ user });

    }

    catch(error){
        res.status(500);
        next(error);
    }
}

export async function authCallback(req:Request, res: Response, next:NextFunction) {
    try {
      const {userID: clerkId} = getAuth(req);

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }
        let user = await User.findOne({ clerkId });

        if (!user) {
            // get user information from clerk and create a new user in the database
            const clerkUser = await clerkClient.users.getUser(clerkId);

            user = await User.create({
                clerkId,
                name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}` .trim():
                clerkUser.emailAddresses[0]?.emailAddress?.split("@") [0],
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatar: clerkUser.imageUrl,
            });
        }

        res.jason({ user });
    } catch (error) {
        res.status(500)
        next(error);
    }
}