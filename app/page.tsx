import Image from 'next/image';
import CodeTextAnimations from './components/CodeTextAnimations';
import homepageStyles from './page.module.css';
import NavBar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';
import Logo from '@/public/yexlabs-logo-v2.svg';

export default function Home() {

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBar />
      <section 
        className='section' 
        style={{ padding: 'calc(25vh - 25px) 0 calc(25vh - 50px) 0' }}
      >
        <div 
          className='sectionContainer' 
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', alignContent: 'center' }}
        >
          <div style={{ textAlign: 'left', margin: '0 0 50px 0', fontSize: '10px' }}>
            {/* <pre>
            <span className={homepageStyles.asc0}> __  __     ______     __  __   </span><br></br>
            <span className={homepageStyles.asc1}>/\ \_\ \   /\  ___\   /\_\_\_\  </span><br></br>
            <span className={homepageStyles.asc2}>\ \____ \  \ \  __\   \/_/\_\/_ </span><br></br>
            <span className={homepageStyles.asc3}> \/\_____\  \ \_____\   /\_\/\_\</span><br></br>
            <span className={homepageStyles.asc4}>  \/_____/   \/_____/   \/_/\/_/</span>
            </pre> */}
            {/* <pre style={{ color: 'var(--text-secondary)', lineHeight: 1 }}>
            <span className={homepageStyles.asc0}>██    ██ ███████ ██   ██ ██       █████  ██████  ███████ </span><br></br>
            <span className={homepageStyles.asc0}> ██  ██  ██       ██ ██  ██      ██   ██ ██   ██ ██      </span><br></br>
            <span className={homepageStyles.asc0}>  ████   █████     ███   ██      ███████ ██████  ███████ </span><br></br>
            <span className={homepageStyles.asc0}>   ██    ██       ██ ██  ██      ██   ██ ██   ██      ██ </span><br></br>
            <span className={homepageStyles.asc0}>   ██    ███████ ██   ██ ███████ ██   ██ ██████  ███████ </span>
            </pre> */}
            <Logo style={{ maxWidth: '340px', width: '100%', height: 'auto', color: 'var(--text-secondary)', margin: '0 auto' }} />
          </div>
          <h1 style={{ margin: '0 0 40px 0', fontSize: '32px' }}>Building The Future of Web3.</h1>
          <CodeTextAnimations />
        </div>
      </section>
      <section className='section' style={{ paddingTop: '0' }}>
        <div className='sectionContainer'  style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Image 
            src='/info-circle.svg' 
            className={homepageStyles.sectionIcon}
            width={0} 
            height={0} 
            alt='info' 
          />
          <div style={{ display: 'inline' }}>
            <h2 style={{ color: 'var(--text-secondary)' }}>About</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Yexlabs is a research-based core contracts development team working toward innovation in Web 3.0. 
              The vision is decentralization that is community-centric. The community chooses their development team, 
              their front-end & their smart contracts to realize the products they want.</p>
          </div>
        </div>
      </section>
      <section className='section' style={{ paddingTop: '0' }}>
        <div className='sectionContainer'  style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Image 
            src='/people.svg' 
            className={homepageStyles.sectionIcon}
            width={0} 
            height={0} 
            alt='info' 
          />
          <div style={{ display: 'inline', width: '100%' }}>
            <h2 style={{ color: 'var(--text-secondary)' }}>Partners</h2>
            <div className={homepageStyles.partnersSection}>
              <Image
                src='/chainlink.svg'
                className={homepageStyles.partnerLogo}
                width={0} 
                height={0} 
                alt='Chainlink logo' 
              />
              <Image
                src='/bera.png'
                className={homepageStyles.partnerLogo}
                width={838} 
                height={216} 
                alt='Bera logo' 
              />
              <Image
                src='/scroll.svg'
                className={homepageStyles.partnerLogo}
                style={{ padding: '13px' }}
                width={268} 
                height={76} 
                alt='Scroll logo' 
              />
              <Image
                src='/honeypot.png'
                className={homepageStyles.partnerLogo}
                width={866} 
                height={288} 
                alt='Honeypot logo' 
              />              
              <Image
                src='/splatter.png'
                className={homepageStyles.partnerLogo}
                width={320} 
                height={107} 
                alt='Splatter logo' 
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
