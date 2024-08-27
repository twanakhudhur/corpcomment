import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";


export default function Header() {
  // const { handleAddtoFeedback } = useFeedbackItemsContext();
  const  addItemToList  = useFeedbackItemsStore(state=> state.addItemToList);
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddList={addItemToList} />
    </header>
  );
}
