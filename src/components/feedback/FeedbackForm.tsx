import { useState } from "react";
import { MAX_CHARACTERS } from "../../libs/constants";
type FeedbackFormProps = {
  onAddList: (text: string) => void;
};

export default function FeedbackForm({ onAddList }: FeedbackFormProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
  const CharCount = MAX_CHARACTERS - feedbackText.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setFeedbackText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedbackText.includes("#") && feedbackText.length > 5) {
      setShowValidIndicator(true);
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 2000);
      return;
    }

    onAddList(feedbackText);
    setFeedbackText("");
  };
  return (
    <form
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        value={feedbackText}
        onChange={handleChange}
        name="feedback"
        id="feedback-textarea"
        placeholder="text"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remmember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{CharCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
