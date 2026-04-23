import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Upload, FileText } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

type FileUploadProps = {
  /** Display name of the selected file (null = nothing selected) */
  fileName?: string | null;
  /** Called when the upload area is pressed (UI only) */
  onPress?: () => void;
  /** Accepted file hint label */
  accept?: string;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
};

function FileUpload({
  fileName,
  onPress,
  accept = 'PDF, DOC, DOCX',
  disabled = false,
  className,
}: FileUploadProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'border-input dark:border-input/50 flex items-center justify-center rounded-lg border-2 border-dashed px-6 py-8',
        Platform.select({
          web: cn(
            'cursor-pointer transition-colors',
            'hover:bg-muted/40 hover:border-primary/40',
            'focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]'
          ),
        }),
        disabled && 'opacity-50',
        className
      )}>
      <View className="items-center gap-3">
        {fileName ? (
          <>
            <Icon as={FileText} size={32} className="text-primary" />
            <Text className="text-foreground text-sm font-medium">
              {fileName}
            </Text>
            <Text className="text-muted-foreground text-xs">
              Tap to replace
            </Text>
          </>
        ) : (
          <>
            <Icon
              as={Upload}
              size={32}
              className="text-muted-foreground"
            />
            <Text className="text-foreground text-sm font-medium">
              Upload your resume
            </Text>
            <Text className="text-muted-foreground text-xs">
              {accept}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

export { FileUpload };
export type { FileUploadProps };
