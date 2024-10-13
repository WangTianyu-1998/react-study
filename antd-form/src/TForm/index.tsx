import InternalForm from "./TForm";
import TItem from "./TItem";

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  TItem: typeof TItem;
}

const TForm = InternalForm as FormInterface;

TForm.TItem = TItem;

export default TForm;
