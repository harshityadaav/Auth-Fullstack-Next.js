import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { password, confirmPassword } = reqBody;

    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId});

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not Exist",
        },
        { status: 400 }
      );
    }
    if (!password || !confirmPassword) {
      return NextResponse.json({ error: "fill all fields" }, { status: 400 });
    } else {
      if (password !== confirmPassword) {
        return NextResponse.json({
          error: "Password and confirm password is not same",
        });
      }
      const salt = await bcryptjs.genSalt(10);
      const newHashedPassword = await bcryptjs.hash(password, salt);
      user.password = newHashedPassword;
      await user.save();
      return NextResponse.json(
        { message: "password change Successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
