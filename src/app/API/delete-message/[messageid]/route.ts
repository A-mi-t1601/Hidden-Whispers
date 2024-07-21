import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: "Message Not Found or Already Deleted", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Message Deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Deleting Message:", error);
    return Response.json(
      { message: "Error Deleting Message", success: false },
      { status: 500 }
    );
  }
}
