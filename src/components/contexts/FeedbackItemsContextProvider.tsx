import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../../libs/types";
import { useFeedbackItems } from "../../libs/hooks";

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddtoFeedback: (text: string) => Promise<void>;
  handleSelectCompany: (company: string) => void;
};
type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

// export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null); this need if(!context) inside hook to check if its null or not
export const FeedbackItemsContext = createContext({} as TFeedbackItemsContext);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  } = useFeedbackItems();
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((item, index, array) => {
          return array.indexOf(item) === index;
        }),
    [feedbackItems]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const handleAddtoFeedback = async (text: string) => {
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
    setFeedbackItems([...feedbackItems, newItem]);
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
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        companyList,
        handleAddtoFeedback,
        isLoading,
        errorMessage,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
