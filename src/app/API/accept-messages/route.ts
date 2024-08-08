import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  //Connect To The Database
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    //Update The User's Message Acceptance Status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      //User Not Found
      return Response.json(
        {
          success: false,
          message: "Unable To Find User To Update Message Acceptance Status",
        },
        { status: 404 }
      );
    }

    //Successfully Updated Message Acceptance Status
    return Response.json(
      {
        success: true,
        message: "Message Acceptance Status Updated Successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Updating Message Acceptance Status:", error);
    return Response.json(
      { success: false, message: "Error Updating Message Acceptance Status" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  //Connect To The Database
  await dbConnect();

  //Get The User Session
  const session = await getServerSession(authOptions);
  const user = session?.user;

  //Check If The User Is Authenticated
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    //Retrieve The User From The Database Using The ID
    const foundUser = await UserModel.findById(user._id);
    if (!foundUser) {
      //User Not Found
      return Response.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }

    //Return The User's Message Acceptance Status
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Retrieving Message Acceptance Status:", error);

    return Response.json(
      { success: false, message: "Error Retrieving Message Acceptance Status" },
      { status: 500 }
    );
  }
}
