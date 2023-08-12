import { useAppContext } from "../context";
import { GrFormClose } from "react-icons/Gr";

const Modal = () => {
  const { selectedItem: meal, setSelectedItem } = useAppContext();
  const { strMeal: title, strMealThumb: imgSrc, strInstructions: instructions, strSource: source } = meal;

  const closeModal = () => {
    setSelectedItem(null); // clicked outside content container
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="content-container" onClick={handleContentClick}>
        <span className="close" onClick={closeModal}><GrFormClose /></span>
        <img src={imgSrc} alt={title} />
        <div className="text-content">
          <h3>{ title }</h3>
          <p>{ instructions }</p>
          <a href={source} target="_blank" rel="noreferrer">Original source</a>
        </div>
      </div>
    </div>
  )
}

export default Modal;
