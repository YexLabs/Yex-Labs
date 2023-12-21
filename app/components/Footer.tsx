import footerStyles from './Footer.module.css';
import Link from 'next/link';
import Logo from '@/public/yexlabs-logo-v2.svg';

const footerItems: any = {
    // Target can be '_blank' to open new window or '_self'
    'Community': [
        { displayName: 'Discord', link: 'https://discord.gg/93fkRv5DgB', target: '_blank' },
    ],
    'News': [
        { displayName: 'Twitter', link: 'https://twitter.com/yex_lab', target: '_blank' },
        { displayName: 'Mirror', link: 'https://yexlabs.vercel.app/#', target: '_blank' },
    ],
    'Resources': [
        { displayName: 'YexFunds Docs', link: 'https://yexlabs.vercel.app/whitePaper', target: '_blank' },
        { displayName: 'Splatter Docs', link: 'https://yexlabs.vercel.app/#', target: '_blank' },
    ],
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className='section' style={{ backgroundColor: 'var(--bg-primary)'}}>
            <div className={'sectionContainer ' + footerStyles.container}>
                <div className={footerStyles.leftCol}>
                    <Link href='/'>
                        <Logo style={{ width: '180px', height: 'auto', color: 'var(--text-secondary)'}} />
                    </Link>
                    <p style={{ margin: '24px 0 18px 0', fontWeight: '500', lineHeight: 1.3, fontSize: '14px' }}>
                        Building the future of upgradeable, community-centric smart contracts.
                    </p>
                    <p style={{ fontSize: '10px', lineHeight: '16px', fontWeight: 400 }}>
                        ©YexLabs {year}.<br></br>
                        All rights reserved.
                    </p>
                </div>
                <div className={footerStyles.rightCol}>
                    {Object.keys(footerItems).map((section, i) => {
                        return (
                            <div key={i} className={footerStyles.section}>
                                <p style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{section}</p>
                                {footerItems[section].map((item: any, i: number) => {
                                    return (
                                        <Link 
                                            key={i} 
                                            href={item.link} 
                                            target={item.target}
                                            className={`button3 ${footerStyles.link}`} 
                                        >
                                            {item.displayName}
                                        </Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>  
    )
}
