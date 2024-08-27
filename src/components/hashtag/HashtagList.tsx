import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  // const { companyList, handleSelectCompany } = useFeedbackItemsContext();
  const getCompanyList = useFeedbackItemsStore((state) =>
    state.getCompanyList()
  );
  const setCompany = useFeedbackItemsStore((state) => state.setCompany);

  return (
    <ul className="hashtags">
      {getCompanyList.map((company) => (
        <HashtagItem key={company} company={company} onClick={setCompany} />
      ))}
    </ul>
  );
}
