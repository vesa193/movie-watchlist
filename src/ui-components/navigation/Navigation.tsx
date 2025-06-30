import ThemeToggle from '@mw/features/common/ThemeToggle';
import { RouterPaths } from '@mw/router/routerPaths';
import { Button } from '@mw/ui-components/buttons/Button';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-end justify-end p-4">
            <Button onClick={() => navigate(RouterPaths.AddMovie)}>
                <p className="flex items-center gap-2">
                    <BsPlusLg /> Add Movie
                </p>
            </Button>
        </nav>
    );
};
