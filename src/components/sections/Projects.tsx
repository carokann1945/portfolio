import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Projects() {
  return (
    <section id="projects" className={cn('relative w-full px-5 pt-15', 'flex flex-col items-center gap-10')}>
      <h2 className={cn('font-bold text-[3rem] underline underline-offset-15 decoration-1 decoration-gray-400/30')}>
        <a href="#projects">Projects</a>
      </h2>
      {/* 첫번째 프로젝트 wrapper */}
      <div
        className={cn('w-full max-w-[560px] bp960:max-w-[1860px] mt-5', 'bp960:px-22 bp1200:px-5', 'flex gap-[30px]')}>
        {/* 왼쪽 설명 */}
        <div className={cn('flex flex-col gap-[12px] bp960:flex-1 bp960:mt-5 bp1200:flex-[10]')}>
          <figure className={cn('relative min-w-0 aspect-[6/3] rounded-md overflow-hidden')}>
            <Image src="/images/cernium-ogimage.png" alt="img" fill className="object-cover" />
          </figure>
          {/* 왼쪽 글 상자 */}
          <div className={cn('flex flex-col gap-[8px]')}>
            <h3 className={cn('text-[1.5rem] bp1200:text-[1.8rem] font-bold text-gray-800 backface-hidden')}>
              Cernium
            </h3>
            <p
              className={cn(
                'text-[1rem] bp1200:text-[1.1rem] leading-7 bp1200:leading-8 backface-hidden text-gray-800',
              )}>
              Cernium은 영어 및 해외 시간대(UTC, PDT) 기반 GMS(글로벌 메이플스토리) 공지의 낮은 접근성과, 이벤트 정보가
              분산된 문제를 해결하기 위해 제작했습니다. 2026년 4월부터 개발 중이며 DAU 100명 규모로 운영되고 있습니다.
              Next.js와 Typescript 기반으로 제작되었습니다. 데이터 수집을 위한 서브 프로젝트는 Node.js 기반으로
              제작되었습니다.
            </p>
            {/* 왼쪽 버튼들 */}
            <div
              className={cn(
                'w-full',
                'flex gap-[6px]',
                'font-semibold',
                '[&>button]:px-2 [&>button]:py-1 [&>button]:border [&>button]:border-gray-400 [&>button]:rounded-md [&>button]:cursor-pointer',
                '[&>button>a]:flex [&>button>a]:justify-center [&>button>a]:items-center [&>button>a]:gap-[4px]',
              )}>
              <button className={cn('flex justify-center items-center gap-[4px]')}>
                <Image src="/images/note.svg" alt="github" width={18} height={18} />
                <span>README</span>
              </button>
              <button>
                <a href="https://github.com/carokann1945/cernium" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/github.svg" alt="github" width={18} height={18} />
                  <span>Github</span>
                </a>
              </button>
              <button>
                <a href="https://cernium.app/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/www.svg" alt="github" width={18} height={18} />
                  <span>Live</span>
                </a>
              </button>
            </div>
          </div>
        </div>
        {/* 오른쪽 이미지 */}
        <div
          className={cn(
            'hidden',
            'bp960:aspect-[2/3] bp1200:aspect-[4/3] bp1600:aspect-[16/8]',
            'bp960:flex bp960:flex-1 bp1200:flex-[18] bp1600:flex-[30]',
            'gap-[30px]',
            'p-[20px] bp1200:p-[30px]',
            'bg-[#f7f7f7] rounded-md',
          )}>
          <figure
            className={cn(
              'hidden',
              'relative bp1200:flex bp1200:flex-1 bp1600:flex-[20] hidden h-full',
              'border border-gray-800',
            )}>
            <Image src="/images/cernium-desktop-1500x1190.png" alt="img" fill className="object-cover object-top" />
          </figure>

          <figure
            className={cn(
              'hidden bp1200:hidden',
              'relative bp960:flex flex-1 bp1600:flex bp1600:flex-[10] h-full',
              'border border-gray-800',
            )}>
            <Image src="/images/cernium-mobile.png" alt="img" fill className="object-cover object-top" />
          </figure>
        </div>
      </div>
    </section>
  );
}

//나중에 쓸 버튼 컴포넌트
type ButtonsProp = {
  readmeHref: string;
  githubHref: string;
  liveHref: string;
};

export function Buttons({ readmeHref, githubHref, liveHref }: ButtonsProp) {
  <div
    className={cn(
      'w-full',
      'flex gap-[6px]',
      'font-semibold',
      '[&>button]:px-2 [&>button]:py-1 [&>button]:border [&>button]:border-gray-400 [&>button]:rounded-md [&>button]:cursor-pointer',
      '[&>button>a]:flex [&>button>a]:justify-center [&>button>a]:items-center [&>button>a]:gap-[4px]',
    )}>
    <button className={cn('flex justify-center items-center gap-[4px]')}>
      <Image src="/images/note.svg" alt="github" width={18} height={18} />
      <span>README</span>
    </button>
    <button>
      <a href="https://github.com/carokann1945/cernium" target="_blank" rel="noopener noreferrer">
        <Image src="/images/github.svg" alt="github" width={18} height={18} />
        <span>Github</span>
      </a>
    </button>
    <button>
      <a href="https://cernium.app/" target="_blank" rel="noopener noreferrer">
        <Image src="/images/www.svg" alt="github" width={18} height={18} />
        <span>Live</span>
      </a>
    </button>
  </div>;
}
