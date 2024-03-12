import dreampadPageStyles from './page.module.css';
import LaunchToken from '../components/LaunchToken';
import Token from '../components/Token';

export default function DreamPadPage() {
  const myTokens = [
    {name: 'Spider', timeline: 129, totalRaised: 200, price: 1.23, status: 'processing'},
    {name: 'Spider', timeline: 129, totalRaised: 200, price: 1.23, status: 'processing'},
    {name: 'Spider', timeline: 129, totalRaised: 200, price: 1.23, status: 'processing'},
    {name: 'Spider', timeline: 129, totalRaised: 200, price: 1.23, status: 'processing'},
    {name: 'Spider', timeline: 129, totalRaised: 200, price: 1.23, status: 'processing'},

  ]

  return (
    <>
        <section className='section'>
          <div className='sectionContainer'>
            <div className={dreampadPageStyles.headerRow}>
                <div style={{ display: 'flex' }}>
                    <h1>Dreampad beta</h1>
                    <span style={{ margin: '0 0 0 2px', color: 'var(--text-primary)' }}>beta</span>
                </div>
                <div>
                    <button 
                        className='button3'
                        style={{ marginRight: '12px' }}
                    >
                        Get USDC Faucet
                    </button>
                    <LaunchToken />
                </div>
            </div>
            <h2>My Tokens</h2>
            <div style={{ margin: '0 -10px', display: 'flex', flexWrap: 'wrap' }}>
              {myTokens.map((token: any, i: number) => (
                <Token key={i} token={token} />
              ))}
            </div>
          </div>
        </section>
    </>
  );
}