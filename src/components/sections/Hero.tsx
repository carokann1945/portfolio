import GlitchText from '@/components/ui/GlitchText';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import { cn } from '@/lib/utils';

export default function Hero() {
  const phrases = ['신입 프론트엔드 개발자', '집요하게 완성하는', '사용자 경험을 다듬는', '디테일을 놓치지 않는'];

  return (
    <section
      id="home"
      className={cn(
        'relative w-full h-dvh px-5',
        'flex flex-col justify-center items-center gap-1',
        'border-b border-gray-300',
      )}>
      <h1 className={cn('text-[6rem] md:text-[10rem] xl:text-[12rem] font-[900] tracking-tight')}>윤동주</h1>
      <h2
        className={cn(
          'text-[2rem] md:text-[4rem] xl:text-[6rem] font-bold tracking-tighter -mt-5 md:-mt-10 text-center',
        )}>
        프론트엔드 개발자
      </h2>
      <GlitchText
        phrases={phrases}
        wrapperClassName="text-[1rem] md:text-[2rem] xl:text-[3rem] font-bold text-black"
        cursorClassName="w-2 ml-2"
      />
      <ScrollIndicator />
    </section>
  );
}
