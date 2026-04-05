import GlitchText from '@/components/ui/GlitchText';
import { cn } from '@/lib/utils';

export default function Home() {
  const phrases = ['신입 프론트엔드 개발자', '집요하게 완성하는', '사용자 경험을 다듬는', '디테일을 놓치지 않는'];
  return (
    <>
      <div className={cn('w-full h-dvh p-5', 'flex flex-col justify-center items-center gap-1')}>
        <h1 className={cn('text-[clamp(4.5rem,10vw,12rem)] font-black tracking-tighter')}>YDJ</h1>
        <h2 className={cn('text-[clamp(2rem,8vw,8rem)] font-bold tracking-tighter -mt-10')}>Front-end Developer</h2>
        <GlitchText phrases={phrases} fontSize="clamp(28px, 5vw, 56px)" />
      </div>
    </>
  );
}
