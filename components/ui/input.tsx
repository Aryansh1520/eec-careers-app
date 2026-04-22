import * as React from 'react';
import { Platform, TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string; // 👈 custom prop (web-only usage)
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderClassName, editable, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'dark:bg-input/30 border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',

          editable === false &&
          cn(
            'opacity-50',
            Platform.select({
              web: 'pointer-events-none cursor-not-allowed',
            })
          ),

          Platform.select({
            web: cn(
              'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[color,box-shadow] md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            ),
            native: 'placeholder:text-muted-foreground/50',
          }),

          className
        )}

        // 👇 Web-only placeholder styling (safe fallback)
        {...(Platform.OS === 'web' && placeholderClassName
          ? { 'data-placeholder-class': placeholderClassName }
          : {})}

        editable={editable}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
