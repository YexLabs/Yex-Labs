// @ts-nocheck
'use client'

import { useEffect } from 'react';
import CodeTextAnimationsStyles from './CodeTextAnimations.module.css';

export default function CodeTextAnimations() {
    // function([string1, string2],target id,[color1,color2])    
    function consoleText(words: any, id: string, colors: any) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        target?.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function() {
        
            if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function() {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
            } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
            }
        }, 120)
        window.setInterval(function() {
            if (visible === true) {
            con.className = CodeTextAnimationsStyles.consoleUnderscore + ' hidden';
            visible = false;
        
            } else {
            con.className = CodeTextAnimationsStyles.consoleUnderscore
        
            visible = true;
            }
        }, 400)
    }

    useEffect(() => {
        consoleText(['Community-centric.', 'Democratic.', 'Upgradeable.'], 'text',['tomato','rebeccapurple','lightgreen']);
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <div className={CodeTextAnimationsStyles.consoleContainer}>
                <span id='text'></span>
                <div className={CodeTextAnimationsStyles.consoleUnderscore} id='console'>&#95;</div>
            </div>
        </div>
    );
}