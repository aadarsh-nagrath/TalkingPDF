// api.create-chat --> will call query asking option

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    try {
        const body = await req.json();
        const {file_key, file_name} = body;
        return NextResponse.json({message: "success"});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal server Error"},
            {status: 500},
        )
    }
}