import { cn } from '@/lib/utils';
import SectionHeadingButton from '../ui/SectionHeadingButton';

export default function About() {
  return (
    <section
      id="about"
      className={cn(
        'relative w-full h-[800px] px-5 pt-10 scroll-m-[70px]',
        'flex flex-col items-center gap-1 bg-red-200',
      )}>
      <h2 className={cn('font-[900] text-[3rem] underline underline-offset-15 decoration-1 decoration-gray-400/30')}>
        <SectionHeadingButton sectionId="about">About</SectionHeadingButton>
      </h2>
    </section>
  );
}
