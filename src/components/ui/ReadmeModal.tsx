'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; markdown: string; baseUrl: string }
  | { status: 'error'; message: string };

interface GitHubReadmeResponse {
  content: string;
  encoding: string;
  name: string;
  download_url: string;
}

interface ReadmeButtonProps {
  repo: string;
}

interface ReadmeContentProps {
  markdown: string;
  baseUrl: string;
}

function ReadmeContent({ markdown, baseUrl }: ReadmeContentProps) {
  return (
    <div className="font-pretendard font-normal text-[#1a1a1a]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ children }) => (
            <div className={cn('overflow-x-auto mb-3')}>
              <table className={cn('w-full text-sm border-collapse')}>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className={cn('bg-gray-100 text-gray-700')}>{children}</thead>,
          tbody: ({ children }) => <tbody className={cn('divide-y divide-gray-200')}>{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className={cn('px-3 py-2 text-left font-semibold border border-gray-200')}>{children}</th>
          ),
          td: ({ children }) => <td className={cn('px-3 py-2 text-gray-700 border border-gray-200')}>{children}</td>,
          h1: ({ children }) => (
            <h1 className={cn('text-2xl font-bold text-gray-800 pb-3 mt-1 border-b border-gray-400')}>{children}</h1>
          ),
          h2: ({ children }) => <h2 className={cn('text-xl font-bold mb-4 mt-4')}>{children}</h2>,
          h3: ({ children }) => <h3 className={cn('text-base font-semiboldmb-2 mt-3')}>{children}</h3>,
          p: ({ children }) => <p className={cn('text-base leading-7 mb-3')}>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('text-blue-600 underline underline-offset-2 hover:text-blue-800')}>
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className={cn('bg-gray-100 text-gray-800 text-sm px-1 py-0.5 rounded')}>{children}</code>
          ),
          pre: ({ children }) => (
            <pre className={cn('bg-gray-100 rounded-md p-4 overflow-x-auto text-sm text-gray-800 mb-3')}>
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className={cn('list-disc pl-5 mb-3 text-base text-gray-700 space-y-1')}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={cn('list-decimal pl-5 mb-3 text-base text-gray-700 space-y-1')}>{children}</ol>
          ),
          hr: () => <hr className={cn('border-gray-200 my-4')} />,
          img: ({ src, alt }) => {
            const resolvedSrc =
              typeof src === 'string' && !src.startsWith('http')
                ? new URL(src, baseUrl).href
                : (src as string | undefined);
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={resolvedSrc} alt={alt ?? ''} className={cn('max-w-full rounded-md my-2')} />;
          },
        }}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export function ReadmeButton({ repo }: ReadmeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'idle' });
  const hasFetched = useRef(false);

  const fetchReadme = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setFetchState({ status: 'loading' });
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GitHubReadmeResponse = await res.json();
      const binary = atob(data.content.replace(/\n/g, ''));
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const markdown = new TextDecoder('utf-8').decode(bytes);
      const baseUrl = data.download_url.substring(0, data.download_url.lastIndexOf('/') + 1);
      setFetchState({ status: 'success', markdown, baseUrl });
    } catch (err) {
      hasFetched.current = false;
      setFetchState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to load README',
      });
    }
  }, [repo]);

  const handleOpen = () => {
    setIsOpen(true);
    fetchReadme();
  };

  useEffect(() => {
    if (!isOpen) return;

    // 배경 스크롤 잠금
    document.body.style.overflow = 'hidden';

    // 뒤로가기 감지를 위한 히스토리 엔트리 추가
    history.pushState({ readmeModal: true }, '');

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handlePopstate = () => setIsOpen(false);

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={handleOpen} className={cn('flex justify-center items-center gap-[4px]')}>
        <Image src="/images/note.svg" alt="readme" width={18} height={18} />
        <span>README</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="readme-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className={cn('fixed inset-0 z-50 overflow-y-auto', 'bg-black/30 backdrop-blur-sm')}>
            <div className={cn('flex min-h-full items-start justify-center', 'px-4 py-8')}>
              <motion.div
                key="readme-panel"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={cn(
                  'relative w-full max-w-[800px]',
                  'flex flex-col',
                  'bg-white rounded-lg',
                  'shadow-xl overflow-hidden',
                )}>
                <div
                  className={cn('w-full', 'flex items-center justify-between', 'px-5 py-4', 'bg-[#222]', 'shrink-0')}>
                  <span className={cn('font-semibold text-white')}>README.md</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close README"
                    className={cn(
                      'flex items-center justify-center',
                      'w-7 h-7 rounded-md',
                      'text-gray-400 hover:text-gray-100',
                      'cursor-pointer',
                    )}>
                    <X size={25} />
                  </button>
                </div>

                <div className={cn('px-6 py-5')}>
                  {fetchState.status === 'loading' && (
                    <div className={cn('flex justify-center items-center py-16 text-gray-400')}>Loading…</div>
                  )}
                  {fetchState.status === 'error' && (
                    <div className={cn('py-8 text-center text-sm text-red-500')}>{fetchState.message}</div>
                  )}
                  {fetchState.status === 'success' && (
                    <ReadmeContent markdown={fetchState.markdown} baseUrl={fetchState.baseUrl} />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
