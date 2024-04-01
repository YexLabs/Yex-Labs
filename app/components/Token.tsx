import TokenStyles from './Token.module.css';
import Image from 'next/image';
import { formatAmount } from '../../lib/number';

export default function Token({ token }: { token: any }) {

    return (
        <div className={TokenStyles.container}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'start' }}>
                <Image
                    width={118}
                    height={120}
                    src={'/token-icon.png'}
                    alt='token-icon'
                    style={{ width: '28px', height: '28px', marginRight: '10px' }}
                />
                <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>
                    {token.name}
                </p>
            </div>
            <div className={TokenStyles.grid}>
                <div className={TokenStyles.gridLabel} style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }}>
                    Timeline
                </div>
                <div className={TokenStyles.gridValue} style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1' }}>
                    {token.timeline}D
                </div>
                <div className={TokenStyles.gridLabel} style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }}>
                   Total Raised
                </div>
                <div className={TokenStyles.gridValue} style={{ gridColumn: '2 / span 1', gridRow: '2 / span 1' }}>
                    {formatAmount(token.totalRaised)}
                </div>
                <div className={TokenStyles.gridLabel} style={{ gridColumn: '3 / span 1', gridRow: '1 / span 1' }}>
                    Price
                </div>
                <div className={TokenStyles.gridValue} style={{ gridColumn: '3 / span 1', gridRow: '2 / span 1' }}>
                    {token.price} ETH<br></br>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.7, fontSize: '12px' }}>
                        ~${token.price * 2465} USD
                    </span>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', color: 'var(--text-secondary)', opacity: 0.7, fontSize: '14px' }}>
                {token.status}
            </div>
        </div>
    );
}