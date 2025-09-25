'use client';

import { useState } from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ContentCreationForm } from '../editor/ContentCreationForm';

export function CreateContentButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <PlusCircle className="w-5 h-5" />
          Create Content
          <Sparkles className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Create Custom Content
          </DialogTitle>
          <DialogDescription>
            Generate viral content with AI assistance. Fill in the details below to create 
            platform-optimized content tailored to your audience.
          </DialogDescription>
        </DialogHeader>
        <ContentCreationForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}