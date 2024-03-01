import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { transporter } from "@/helpers/mailConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    //check user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const salt = await bcryptjs.genSalt(10);
    const newHashedPassword = await bcryptjs.hash(newPassword, salt);
    await User.findByIdAndUpdate(user._id, {
      $set: { password: newHashedPassword },
    });
    await sendPasswordResetEmail(user.email, newPassword);

    return NextResponse.json({
      message: "Check Youer Mail!, New password send on Your Mail",
      sucess: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//send Password Email
async function sendPasswordResetEmail(
  email: string,
  newPassword: string
): Promise<void> {
  const mailOptions = {
    from: 'harshit.yadav@nexowa.com',
    to: email,
    subject: "Password Reset",
    text: `Your password has been reset. Your new password is ${newPassword}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}
