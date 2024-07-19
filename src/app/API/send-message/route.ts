import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    //Check If The User Is Accepting Messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User Is Not accepting Messages", success: false },
        { status: 403 } //403 Forbidden Status
      );
    }

    const newMessage = { content, createdAt: new Date() };
    //Push The New Message To The User's Messages Array
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      { message: "Message Sent Successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Adding Message:", error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
