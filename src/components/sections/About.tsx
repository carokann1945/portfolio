import Image from 'next/image';
import { cn } from '@/lib/utils';
import SectionHeadingButton from '../ui/SectionHeadingButton';

export default function About() {
  return (
    <section
      id="about"
      className={cn('relative w-full px-5 mt-[150px] scroll-mt-[100px]', 'flex flex-col items-center')}>
      <h2 className={cn('font-[900] text-[3rem] tracking-tight text-center', 'mb-10 bp960:mb-16')}>
        <SectionHeadingButton sectionId="about">About</SectionHeadingButton>
      </h2>

      <div className={cn('w-full max-w-[1180px]')}>
        <div className={cn('mx-auto max-w-[1080px] flow-root')}>
          <figure className={cn('relative float-left mr-4 overflow-hidden', 'h-[130px] w-[190px]')}>
            <Image
              src="/images/profile.JPG"
              alt="윤동주 프로필 사진"
              fill
              sizes="(min-width: 960px) 190px, 120px"
              className="object-cover"
            />
          </figure>

          <p className={cn('text-[1rem] bp960:text-[1.2rem] leading-7 bp960:leading-10 text-gray-800')}>
            안녕하세요, 저는 사용자가 실제로 겪는 불편을 발견하고 그것을 이해하기 쉬운 화면으로 바꿔 문제를 해결하는
            일을 좋아하는 신입 프론트엔드 개발자 윤동주입니다.
          </p>
          <br />
          <p className={cn('text-[1rem] bp960:text-[1.2rem] leading-7 bp960:leading-10 text-gray-800')}>
            제 프로젝트인 Carokann과 Cernium은 반복 작업 관리의 불편함과 GMS 공지의 낮은 접근성이라는 문제를 명확히
            정의하고 Next.js와 TypeScript를 기반으로 직접 구현한 서비스입니다.
          </p>
          <br />
          <p className={cn('text-[1rem] bp960:text-[1.2rem] leading-7 bp960:leading-10 text-gray-800')}>
            저는 데이터와 상태가 어떻게 보여져야 사용자가 한눈에 이해할 수 있는지, 시간과 흐름이 바뀌는 인터랙션을
            어떻게 더 자연스럽게 전달할 수 있는지 등을 고민하며 단순히 화면을 만드는 데서 멈추지 않습니다.
          </p>
          <br />
          <p className={cn('text-[1rem] bp960:text-[1.2rem] leading-7 bp960:leading-10 text-gray-800')}>
            막히는 문제를 끝까지 파고드는 집요함, 필요한 것은 가리지 않고 배워 적용하는 유연함, 그리고 작은 디테일까지
            신경쓰며 책임감 있게 완성하는 태도가 강점입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
