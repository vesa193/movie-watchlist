import { useTheme } from '@mw/context/ThemeContext';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded light:bg-gray-200 dark:bg-gray-200 hover:bg-gray-300 cursor-pointer"
            title={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <BsFillMoonStarsFill
                    className="text-gray-900 dark:text-gray-600"
                    size={26}
                />
            ) : (
                <BsSunFill
                    className="text-gray-900 dark:text-gray-600"
                    size={26}
                />
            )}
        </button>
    );
};

export default ThemeToggle;
