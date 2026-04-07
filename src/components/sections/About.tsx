import { cn } from '@/lib/utils';
import SectionHeadingButton from '../ui/SectionHeadingButton';

export default function About() {
  const paragraphs = [
    '저는 사용자가 실제로 겪는 불편을 발견하고 그것을 이해하기 쉬운 화면으로 바꿔 문제를 해결하는 일을 좋아하는 신입 프론트엔드 개발자 윤동주입니다',
    '제 프로젝트인 Carokann과 Cernium처럼 반복 작업 관리의 불편함이나 GMS 공지의 낮은 접근성같은 문제를 명확히 정의하고 Next.js와 TypeScript를 기반으로 직접 서비스를 구현했습니다',
    '저는 데이터와 상태가 어떻게 보여져야 사용자가 한눈에 이해할 수 있는지, 시간과 흐름이 바뀌는 인터랙션을 어떻게 더 자연스럽게 전달할 수 있는지 등을 고민하며 단순히 화면을 만드는 데서 멈추지 않습니다',
    '새로운 기술과 도메인을 빠르게 흡수해 실제 결과물로 연결하는 속도, 막히는 문제를 끝까지 파고드는 집요함, 그리고 작은 디테일까지 신경써 완성도를 높이는 태도가 강점입니다',
  ];
  const contacts = [
    { label: 'Email', value: 'carokann1945@gmail.com', href: 'mailto:carokann1945@gmail.com' },
    { label: 'GitHub', value: 'github.com/carokann1945', href: 'https://github.com/carokann1945' },
  ];

  return (
    <section
      id="about"
      className={cn('relative w-full px-5 mt-[150px] scroll-mt-[100px]', 'flex flex-col items-center')}>
      <h2
        className={cn(
          'font-[900] text-[3rem] underline underline-offset-15 decoration-1 decoration-gray-400/30',
          'mb-5',
        )}>
        <SectionHeadingButton sectionId="about">About</SectionHeadingButton>
      </h2>

      <div className={cn('relative w-full max-w-[960px]')}>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-8 inset-y-6 rounded-[36px]',
            'bg-[linear-gradient(135deg,rgba(148,163,184,0.12),rgba(255,255,255,0))] blur-2xl',
          )}
        />

        <div
          className={cn(
            'relative isolate overflow-hidden rounded-[28px] border border-gray-200/80 bg-white',
            'px-6 py-8 bp960:px-12 bp960:py-12',
            'shadow-[0_24px_80px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.04)]',
          )}>
          <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0')}>
            <div
              className={cn('absolute -top-12 right-0 h-40 w-40 rounded-full', 'bg-[rgba(148,163,184,0.14)] blur-3xl')}
            />
            <div
              className={cn('absolute bottom-0 left-0 h-32 w-32 rounded-full', 'bg-[rgba(226,232,240,0.9)] blur-3xl')}
            />
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-px',
                'bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(203,213,225,0.9),rgba(255,255,255,0))]',
              )}
            />
          </div>

          <div className={cn('relative mx-auto max-w-[760px]')}>
            <div className={cn('mb-8 h-1.5 w-18 rounded-full bg-gray-900/80')} />
            <div className={cn('flex flex-col gap-7')}>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={cn('text-[1.05rem] bp960:text-[1.2rem] leading-8 bp960:leading-9 text-gray-800')}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-7 rounded-[24px] border border-gray-200/80 bg-[#fafafa] px-6 py-6 bp960:px-10 bp960:py-8',
            'shadow-[0_14px_40px_rgba(15,23,42,0.05)]',
          )}>
          <div className={cn('mx-auto max-w-[760px]')}>
            <p className={cn('text-[0.95rem] bp960:text-[1rem] font-semibold text-gray-500')}>Contact</p>
            <p className={cn('mt-2 text-[1.1rem] bp960:text-[1.25rem] font-semibold leading-8 text-gray-900')}>
              편하게 연락 주세요
            </p>

            <div className={cn('mt-6 divide-y divide-gray-200')}>
              {contacts.map((contact) => (
                <div
                  key={contact.label}
                  className={cn(
                    'flex flex-col gap-2 py-4',
                    'bp960:flex-row bp960:items-center bp960:justify-between bp960:gap-6',
                  )}>
                  <span
                    className={cn('text-[0.9rem] bp960:text-[0.95rem] font-semibold tracking-[0.08em] text-gray-500')}>
                    {contact.label}
                  </span>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'text-[1rem] bp960:text-[1.05rem] font-medium text-gray-800 break-all',
                      'transition-colors duration-200 hover:text-blue-500',
                    )}>
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
