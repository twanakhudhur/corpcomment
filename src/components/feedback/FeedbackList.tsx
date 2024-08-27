import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

export default function FeedbackList() {
  // const { filteredFeedbackItems, isLoading, errorMessage } =
  //   useFeedbackItemsContext();

  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const getFilteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {getFilteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}

// Custom Fetching data
// useEffect(() => {
// setIsLoading(true);
// fetch(
//   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw Error("Something went wrong!");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     setFeedbackItems(data.feedbacks);
//     setIsLoading(false);
//   })
//   .catch((error) => {
//     setErrorMessage("Something went wrong!");
//     setIsLoading(false);
//   });
// }, []);
