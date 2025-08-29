import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCTAButton() {
  return (
    <Link href="https://api.whatsapp.com/send/?phone=2349018464789&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full p-0 shadow-xl bg-primary hover:bg-primary/90"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageSquare className="h-8 w-8 text-primary-foreground" />
      </Button>
    </Link>
  );
}
