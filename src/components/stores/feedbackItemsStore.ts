import { create } from "zustand";
import { TFeedbackItem } from "../../libs/types";

type TStore = {
    feedbackItems: TFeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    addItemToList: (text: string) => Promise<void>;
    fetchFeedbackItems: () => Promise<void>
}


export const useFeedbackItemsStore = create<TStore>((set, get) => ({
    feedbackItems: [],
    isLoading: false,
    errorMessage: "",
    selectedCompany: "",
    getCompanyList: () => {
        return get().feedbackItems
            .map((item) => item.company)
            .filter((item, index, array) => {
                return array.indexOf(item) === index;
            })
    },
    getFilteredFeedbackItems: () => {
        const state = get()
        return state.selectedCompany
            ? state.feedbackItems.filter(
                (feedbackItem) => feedbackItem.company === state.selectedCompany
            )
            : state.feedbackItems
    },
    addItemToList: async (text: string) => {
        const companyName = text
            .split(" ")
            .find((word) => word.includes("#"))!
            .substring(1);
        const newItem: TFeedbackItem = {
            id: Date.now(),
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0, 1).toUpperCase(),
        };
        set(state => ({
            feedbackItems: [...state.feedbackItems, newItem],
        }))
        await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            }
        );
    },
    setCompany: (company: string) => {
        set(() => ({
            selectedCompany: company,
        }))
    },
    fetchFeedbackItems: async () => {
        set(() => ({
            isLoading: true,
        }))
        try {
            const response = await fetch(
                "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );
            if (!response.ok) {
                throw Error("Something went wrong!");
            }
            const data = await response.json();
            set(() => ({
                feedbackItems: data.feedbacks,
            }))
        } catch (error) {
            set(() => ({
                errorMessage: "Something went wrong!",
            }))
        }
        set(() => ({
            isLoading: false,
        }))
    }
}))