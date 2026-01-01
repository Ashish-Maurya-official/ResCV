'use client';

import dynamic from 'next/dynamic';

const ResumeBuilderClient = dynamic(() => import('./page.client'), {
  ssr: false,
});

export default function ResumeBuilder() {
  return <ResumeBuilderClient />;
}
