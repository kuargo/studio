
"use client";

import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const libraries: "places"[] = ['places'];

interface LocationInputProps {
    id: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    types?: string[];
}

export function LocationInput({ id, value, onValueChange, placeholder, types }: LocationInputProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries,
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const onLoad = (ac: google.maps.places.Autocomplete) => {
        setAutocomplete(ac);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            onValueChange(place.formatted_address || place.name || '');
        } else {
            console.error('Autocomplete is not loaded yet!');
        }
    };

    if (loadError) {
        console.error("Google Maps script load error:", loadError);
        return <Input id={id} value={value} onChange={(e) => onValueChange(e.target.value)} placeholder="Error loading maps..." disabled />;
    }

    if (!isLoaded) {
        return <Skeleton className="h-10 w-full" />;
    }

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            types={types}
        >
            <Input
                id={id}
                type="text"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
            />
        </Autocomplete>
    );
}
