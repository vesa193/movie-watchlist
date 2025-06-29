import { RouterPaths } from '@mw/router/routerPaths';
import { Button } from '@mw/ui-components/buttons/Button';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import { SelectField } from '../form-fields/SelectField';
import { TextField } from '../form-fields/TextField';

export const Navigation = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<{ title?: string; status?: string }>(
        {
            title: '',
            status: '',
        },
    );
    const [searchParams, setSearchParams] = useSearchParams(
        window.location.search,
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams(filters);
    };

    return (
        <nav className="flex items-end justify-end p-4">
            {/* <form
                className="grid grid-cols-4 items-end gap-4"
                onSubmit={handleSearch}
            >
                <TextField
                    name="title"
                    label="Title"
                    value={filters?.title || searchParams.get('title') || ''}
                    onChange={(e) => setFilters({ title: e.target.value })}
                />
                <SelectField
                    name="status"
                    label="Status"
                    value={filters?.status || searchParams.get('status') || ''}
                    onChange={(e) => setFilters({ status: e.target.value })}
                >
                    <option value="all">All</option>
                    <option value="watched">Watched</option>
                    <option value="planned">Planned</option>
                </SelectField>
                <Button
                    color="tertiary"
                    onClick={() => {
                        setSearchParams({});
                        setFilters({});
                    }}
                >
                    Clear
                </Button>
                <Button type="submit" onClick={() => {}}>
                    Search
                </Button>
            </form> */}
            <Button onClick={() => navigate(RouterPaths.AddMovie)}>
                <p className="flex items-center gap-2">
                    <BsPlusLg /> Add Movie
                </p>
            </Button>
        </nav>
    );
};
