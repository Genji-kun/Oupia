import dynamic from 'next/dynamic'
import React from 'react'

const CertificationAccept = dynamic(() => import('./_components/CertificationAccept'), {
    ssr: false
});

export default function CertificationPage() {

    return (
        <div className="container py-6 h-[calc(100vh-80px)]">
            <CertificationAccept />
        </div>
    )
}