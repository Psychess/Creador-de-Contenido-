'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ContentRequest, SocialPlatform, ContentTone, ContentType } from '@/shared/types';
import { PLATFORM_CONFIGS, CONTENT_TONES } from '@/shared/constants';
import { Sparkles, Target, MessageSquare, Hash, Users, Zap } from 'lucide-react';

const contentFormSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  tone: z.string(),
  contentType: z.string(),
  targetAudience: z.string().optional(),
  keywords: z.string(),
  hashtags: z.string(),
  cta: z.string().optional(),
  characterLimit: z.number().optional(),
});

type ContentFormData = z.infer<typeof contentFormSchema>;

interface ContentCreationFormProps {
  onClose: () => void;
  initialTrend?: any;
}

export function ContentCreationForm({ onClose, initialTrend }: ContentCreationFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      topic: initialTrend?.title || '',
      platforms: [],
      tone: 'casual',
      contentType: 'post',
      keywords: initialTrend?.hashtags?.join(', ') || '',
      hashtags: initialTrend?.hashtags?.map((h: string) => `#${h}`)?.join(' ') || '',
    }
  });

  const selectedTone = watch('tone');
  const selectedContentType = watch('contentType');

  const handlePlatformToggle = (platform: SocialPlatform) => {
    const newPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    
    setSelectedPlatforms(newPlatforms);
    setValue('platforms', newPlatforms);
  };

  const onSubmit = async (data: ContentFormData) => {
    setIsGenerating(true);
    
    try {
      // Mock content generation - in production this would call the AI API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show success message and close
      console.log('Generated content for:', data);
      onClose();
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Topic */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Target className="w-4 h-4" />
          Content Topic
        </label>
        <Input
          {...register('topic')}
          placeholder="What would you like to create content about?"
          className="text-base"
        />
        {errors.topic && (
          <p className="text-sm text-destructive">{errors.topic.message}</p>
        )}
      </div>

      {/* Platforms Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Target Platforms
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPlatforms.includes(key as SocialPlatform)
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-muted-foreground/50'
              }`}
              onClick={() => handlePlatformToggle(key as SocialPlatform)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: config.color }}
                >
                  {config.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{config.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {config.maxTextLength} chars
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.platforms && (
          <p className="text-sm text-destructive">{errors.platforms.message}</p>
        )}
      </div>

      {/* Tone and Content Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Tone & Voice
          </label>
          <Select value={selectedTone} onValueChange={(value) => setValue('tone', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONTENT_TONES).map(([key, tone]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex flex-col">
                    <span>{tone.name}</span>
                    <span className="text-xs text-muted-foreground">{tone.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content Type</label>
          <Select value={selectedContentType} onValueChange={(value) => setValue('contentType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Social Post</SelectItem>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="reel">Reel/Short Video</SelectItem>
              <SelectItem value="carousel">Carousel</SelectItem>
              <SelectItem value="thread">Thread</SelectItem>
              <SelectItem value="poll">Poll</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Target Audience (Optional)
        </label>
        <Input
          {...register('targetAudience')}
          placeholder="e.g., Young professionals, Tech enthusiasts, Small business owners"
        />
      </div>

      {/* Keywords and Hashtags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Keywords</label>
          <Input
            {...register('keywords')}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Hashtags
          </label>
          <Input
            {...register('hashtags')}
            placeholder="#hashtag1 #hashtag2 #hashtag3"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Call to Action (Optional)</label>
        <Input
          {...register('cta')}
          placeholder="e.g., Visit our website, Subscribe for more, Join the community"
        />
      </div>

      {/* Selected tone preview */}
      {selectedTone && CONTENT_TONES[selectedTone as ContentTone] && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Tone Preview:</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {CONTENT_TONES[selectedTone as ContentTone].description}
          </p>
          <div className="flex flex-wrap gap-1">
            {CONTENT_TONES[selectedTone as ContentTone].examples.map((example, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                "{example}"
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isGenerating || selectedPlatforms.length === 0}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Generating<span className="loading-dots"></span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate Content
            </>
          )}
        </Button>
      </div>
    </form>
  );
}