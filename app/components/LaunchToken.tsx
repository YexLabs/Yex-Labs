'use client'

import LaunchTokenStyles from './LaunchToken.module.css';
import Modal1 from './Modal1';
import { useState } from 'react';
import { TextField } from '@mui/material';

type Token = {
    address: string,
}

export default function LaunchToken() {
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState({
        address: '',
        addressErr: '',
        symbol: '',
        name: '',
        amount: 0,
        poolHandler: '',
        campaignDuration: 0,
    });

    const handleLaunch = () => {
        console.log(`launching`);
        console.log(token);
        setToken({
            address: '',
            addressErr: '',
            symbol: '',
            name: '',
            amount: 0,
            poolHandler: '',
            campaignDuration: 0,
        });
        setOpen(false);
    }

    return (
        <>
            <button 
                className='button1'
                onClick={() => setOpen(true)}
            >
                Launch token
            </button>
            <Modal1
                open={open}
                onClose={() => setOpen(false)}
                width={550}
                content={
                    <>
                        <h2>Launch Token</h2>
                        {/* Address */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="address" 
                            label="Address" 
                            variant="outlined" 
                            required
                            value={token.address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, address: event.target.value});
                            }}
                            autoComplete='off'
                        />
                        {/* Symbol */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="symbol" 
                            label="Symbol" 
                            variant="outlined"
                            required 
                            value={token.symbol}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, symbol: event.target.value});
                            }}
                            autoComplete='off'
                        />
                        {/* Name */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="name" 
                            label="Name" 
                            variant="outlined"
                            required 
                            value={token.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, name: event.target.value});
                            }}
                            autoComplete='off'
                        />
                        {/* Amount */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="amount" 
                            label="Amount" 
                            variant="outlined"
                            required 
                            value={token.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, amount: Number(event.target.value)});
                            }}
                        />
                        {/* Pool Handler */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="pool-handler" 
                            label="Pool Handler" 
                            variant="outlined"
                            required 
                            value={token.poolHandler}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, poolHandler: event.target.value});
                            }}
                            autoComplete='off'
                        />
                        {/* Campaign Duration */}
                        <TextField 
                            className={LaunchTokenStyles.input}
                            id="campaign-duration" 
                            label="Campaign Duration" 
                            variant="outlined"
                            required 
                            value={token.campaignDuration}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setToken({...token, campaignDuration: Number(event.target.value)});
                            }}
                            autoComplete='off'
                        />
                        <button 
                            className='button1' 
                            type='submit'
                            style={{ width: '100%', margin: '8px 0 0 0'}}
                            onClick={handleLaunch}
                        >
                            Launch Token
                        </button>
                    </>
                }
            />
        </>
    );
}