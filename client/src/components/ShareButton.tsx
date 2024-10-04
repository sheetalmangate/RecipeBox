import Modal from './Modal';
import { useState } from 'react';
import { RecipeData  } from '../interfaces/RecipeData';
import { shareRecipe } from '../api/recipeAPI';

interface ShareButtonProps {
  data: RecipeData;
}
const ShareButton = ({data}:ShareButtonProps) => {
  const {title, ingredients, servings, instructions} = data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
console.log(isOpen);
  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }
  const handleShare = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    const data = await shareRecipe({title, ingredients, servings, instructions});
    console.log(`Sharing with ${email}`);
    console.log(data);
    handleClose();
  }


  return (
    <div>
      <button onClick={handleOpen}>Share</button>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <h2>Share Recipe</h2>
        <p>Share this recipe with your friends!</p>
        <input type="text" placeholder='Enter email address' onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={handleShare}>Send Email</button>
      </Modal>
    </div>
  );
}

export default ShareButton;