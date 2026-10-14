import axios from "axios";
import type { ResumeHistoryItem } from "../types/history";

const API_URL = "http://127.0.0.1:8000";

export async function getResumeHistory() {
    const response = await axios.get<ResumeHistoryItem[]>(
        `${API_URL}/resume/history`
    );

    return response.data;
}