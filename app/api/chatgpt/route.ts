import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { question } = await req.json();

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are chatting with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
                    },
                    {
                        role: "user",
                        content: `Tell me ${question}`,
                    },
                ],
            }),
        });

        const responseData = await response.json();
        console.log('Response Data:', responseData); // Logging for debugging

        if (!responseData.choices || responseData.choices.length === 0 || !responseData.choices[0].message) {
            throw new Error('Invalid response format from AI API');
        }

        const reply = responseData.choices[0].message.content;
        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message });
    }
};
