import Hero from '@/components/sections/Hero';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <Hero />
      <section
        id="about"
        aria-labelledby="about-heading"
        className={cn('scroll-mt-[70px] px-5 py-24', 'flex min-h-[60vh] items-center justify-center bg-white')}>
        <div className="max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">About</p>
          <h2 id="about-heading" className="mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
            다음 섹션을 연결할 준비가 된 자리
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
            스크롤 인디케이터와 헤더 링크가 자연스럽게 동작하도록 임시 앵커 섹션을 먼저 배치했습니다. 실제 About
            콘텐츠를 만들 때 이 블록을 교체하면 됩니다.
          </p>
        </div>
      </section>
    </>
  );
}
