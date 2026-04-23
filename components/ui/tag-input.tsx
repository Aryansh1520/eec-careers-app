import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

type TagInputProps = {
  /** Current tags */
  value: string[];
  /** Called when tags change */
  onValueChange: (tags: string[]) => void;
  /** Placeholder for the input */
  placeholder?: string;
  /** Maximum number of tags (-1 = unlimited) */
  maxTags?: number;
  /** If true, user cannot add/remove tags */
  readOnly?: boolean;
  className?: string;
};

function TagInput({
  value,
  onValueChange,
  placeholder = 'Type and press enter…',
  maxTags = -1,
  readOnly = false,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');

  function addTag() {
    const tag = inputValue.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInputValue('');
      return;
    }
    if (maxTags > 0 && value.length >= maxTags) return;
    onValueChange([...value, tag]);
    setInputValue('');
  }

  function removeTag(index: number) {
    if (readOnly) return;
    const next = [...value];
    next.splice(index, 1);
    onValueChange(next);
  }

  return (
    <View className={cn('gap-2', className)}>
      {/* Tags display */}
      {value.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {value.map((tag, index) => (
            <View
              key={`${tag}-${index}`}
              className="bg-secondary flex-row items-center gap-1.5 rounded-full px-3 py-1.5">
              <Text className="text-secondary-foreground text-xs font-medium">
                {tag}
              </Text>
              {!readOnly && (
                <Pressable
                  onPress={() => removeTag(index)}
                  hitSlop={8}
                  className={cn(
                    'items-center justify-center rounded-full',
                    Platform.select({
                      web: 'cursor-pointer hover:bg-muted-foreground/20',
                    })
                  )}>
                  <Icon
                    as={X}
                    size={12}
                    className="text-muted-foreground"
                  />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Input */}
      {!readOnly && (
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder}
          returnKeyType="done"
          onSubmitEditing={addTag}
          submitBehavior="submit"
          blurOnSubmit={false}
        />
      )}
    </View>
  );
}

export { TagInput };
export type { TagInputProps };
