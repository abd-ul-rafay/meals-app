import './App.css';
import Navbar from './components/NavRow';
import Favorite from './components/Favorite';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useAppContext } from './context';

const App = () => {
    const { favorites, selectedItem } = useAppContext();

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {favorites.length > 0 && <Favorite />}
                <Meals />
                {selectedItem && <Modal />}
            </main>
        </>
    );
}

export default App;
