import Modal from './Modal';
import { useState } from 'react';
import { RecipeData  } from '../interfaces/RecipeData';
import { shareRecipe } from '../api/recipeAPI';
import { validateEmail } from '../utils/helpers';

interface ShareButtonProps {
  data: RecipeData;
}
const ShareButton = ({data}:ShareButtonProps) => {
  const {title, ingredients, servings, instructions} = data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
   const [error, setError] = useState<string>("");


  const handleClose = () => {
    setIsOpen(false);
  }
  const handleValidation = () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else {
      setError("");
      return true;
    }
  };
  const handleShare = () => {
    if (handleValidation()) {
      shareRecipe({ title, ingredients, servings, instructions, saved:true});
      console.log(`Sharing with ${email}. Message sent!`);
      handleClose();
    }
  };


  return (
    <div>
      <button className="btn btn-success" onClick={() => setIsOpen(true)}>
        Share Recipe
      </button>
      <div className="h-100 w-100 d-flex justify-content-center">
        <Modal
          isOpen={isOpen}
          title="Share Recipe"
          handleClick={handleShare}
          buttonText="Send Email"
          handleClose={handleClose}
        >
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="name@example.com"
            />
            {error && (
              <p className="alert alert-danger" role="alert">
                {error}{" "}
              </p>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ShareButton;