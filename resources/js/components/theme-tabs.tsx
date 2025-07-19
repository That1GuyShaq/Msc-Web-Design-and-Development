import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class concatenation
import { useTheme, Theme } from '@/hooks/use-theme'; // Import the new useTheme hook
import { Palette, Droplet, Heart, Leaf, Sun, Citrus, Waves, Gem } from 'lucide-react'; // Example icons for themes

// Define the structure for each theme tab
interface ThemeTab {
    value: Theme;
    icon: React.ElementType; // LucideIcon or similar component type
    label: string;
    color: string;
}

/**
 * A component that provides tabs for selecting different theme colors.
 * It uses the `useTheme` hook to manage and update the active theme.
 */
export default function ThemeToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    // Access the current theme and the update function from the useTheme hook
    const { theme, updateTheme } = useTheme();

    // Define the available theme options with their values, icons, and labels
    const themes: ThemeTab[] = [
        { value: 'neutral', icon: Palette, label: 'Neutral', color: 'text-neutral-500' }, // Default theme
        { value: 'rose', icon: Heart, label: 'Rose', color: 'text-rose-500' },         // Rose theme
        { value: 'red', icon: Droplet, label: 'Red', color: 'text-red-500' },         // Red theme
        { value: 'orange', icon: Citrus, label: 'Orange', color: 'text-orage-500' },      // Orange theme
        { value: 'green', icon: Leaf, label: 'Green', color: 'text-green-500' },        // Green theme
        { value: 'blue', icon: Waves, label: 'Blue', color: 'text-blue-500' },       // Blue theme
        { value: 'yellow', icon: Sun, label: 'Yellow', color: 'text-yellow-500' },   // Yellow theme
        { value: 'violet', icon: Gem, label: 'Violet', color: 'text-violet-500' },   // Violet theme
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {themes.map(({ value, icon: Icon, label, color }) => (
                <button
                    key={value}
                    onClick={() => updateTheme(value)} // Call updateTheme when a button is clicked
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        // Apply different styles based on whether this theme is currently active
                        theme === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' // Active state styles
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60', // Inactive state styles
                    )}
                >
                    {/* Render the icon for the theme */}
                    <Icon className={cn('-ml-1 h-4 w-4 ', color)} />
                    {/* Render the label for the theme */}
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
