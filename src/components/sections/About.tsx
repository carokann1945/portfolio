import { cn } from '@/lib/utils';

export default function About() {
  return (
    <section
      id="about"
      className={cn('relative w-full h-[800px] px-5 py-15 mt-20', 'flex flex-col items-center gap-1 bg-[#fafafa]')}>
      <h2 className={cn('font-bold text-[3rem] underline underline-offset-15 decoration-1 decoration-gray-400/30')}>
        <a href="#about">About</a>
      </h2>
    </section>
  );
}
