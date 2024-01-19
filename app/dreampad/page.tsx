import dreampadPageStyles from './page.module.css';
import LaunchToken from '../components/LaunchToken';

export default function DreamPadPage() {

  return (
    <>
        <section className='section'>
          <div className='sectionContainer'>
            <div className={dreampadPageStyles.headerRow}>
                <div style={{ display: 'flex' }}>
                    <h1>Dreampad</h1>
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
          </div>
        </section>
    </>
  );
}