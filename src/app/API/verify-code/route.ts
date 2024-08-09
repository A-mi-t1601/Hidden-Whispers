import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  //Connect To The Database
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }

    //Check If The Code Is Correct And Not Expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      //Update The User's Verification Status
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "Account Verified Successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      //Code Has Expired
      return Response.json(
        {
          success: false,
          message:
            "Verification Code Has Expired. Please Sign Up Again To Get A New Code.",
        },
        { status: 400 }
      );
    } else {
      //Code Is Incorrect
      return Response.json(
        { success: false, message: "Incorrect Verification Code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error Verifying User:", error);

    return Response.json(
      { success: false, message: "Error Verifying User" },
      { status: 500 }
    );
  }
}
