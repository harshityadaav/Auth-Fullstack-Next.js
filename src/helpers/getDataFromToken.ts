import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextResponse) => {
    try {
        const token = request.cookies.get('TOKEN')?.value || '';
        const TOKEN_SECRET= 'authtokensecretforjwttoken'
        const decodedToken: any = jwt.verify(token, TOKEN_SECRET);
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }
}