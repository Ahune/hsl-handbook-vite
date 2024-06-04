const BACKEND_URI = "https://ca-backend-sc-hslhandboken-main.proudmushroom-466eb4cf.swedencentral.azurecontainerapps.io";

import { ChatCookie } from "./models";
// import { useLogin } from "../authConfig";
import { SendQuestionRequest, SendQuestionResponse } from './models'; // Import your types/interfaces


// function getHeaders(idToken: string | undefined): Record<string, string> {
//     var headers: Record<string, string> = {
//         "Content-Type": "application/json"
//     };
//     // If using login, add the id token of the logged in account as the authorization
//     if (useLogin) {
//         if (idToken) {
//             headers["Authorization"] = `Bearer ${idToken}`;
//         }
//     }

//     return headers;
// }

export async function startChat(): Promise<ChatCookie | null> {
    try {
        const response = await fetch(`${BACKEND_URI}/api/chat/start`);
        const chatId = response.headers.get('x-chat-id');
        if (chatId) {
            return { x_chat_id: chatId };
        } else {
            throw new Error('x-chat-id cookie not found in response header');
        }
    } catch (error) {
        console.error('Error starting chat:', error);
        return null;
    }
}


export async function sendQuestion(cookie: string, question: string): Promise<SendQuestionResponse | null> {
    try {
        const requestBody: SendQuestionRequest = {
            content: question
        };

        const response = await fetch(`${BACKEND_URI}/api/chat/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-chat-id': cookie
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Failed to send question. Status: ${response.status}`);
        }

        const data: SendQuestionResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending question:', error);
        return null;
    }
}

export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${BACKEND_URI}/api/health`);
        return response.status === 200;
    } catch (error) {
        console.error('Error checking health:', error);
        return false;
    }
}

// no need for this i think.
export function getCitationFilePath(citation: string): string {
    return `${BACKEND_URI}/content/${citation}`;
}
