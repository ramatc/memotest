import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import question from './assets/question-circle.svg';

const IMAGES = [
    'https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/react-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/mysql-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/github-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/sequelize-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/linkedin-original.svg?size=128&color=currentColor',
]
.flatMap(image => [`a|${image}`, `b|${image}`])
.sort(() => Math.random() - 0.5);

const App = () => {

    const [guessed, setGuessed] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [clicks, setClicks] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const jsConfetti = new JSConfetti();

    useEffect(() => {
        if (selected.length === 2) {
            if(selected[0].split('|')[1] === selected[1].split('|')[1]){
                setGuessed((guessed) => guessed.concat(selected));
            }

            setTimeout(() => setSelected([]), 1000);
        }
    }, [selected]);

    useEffect(() => {
        if(guessed.length === IMAGES.length){
            jsConfetti.addConfetti();
        }
    }, [guessed]);

    useEffect(() => {
        const timer = setInterval(() => {
            if(guessed.length !== IMAGES.length) {
                setSeconds(prev => prev + 1);
            }
    
            if(seconds === 59) {
                setMinutes(prev => prev + 1);
                setSeconds(0);
            }
        }, 1000)

        return () => clearInterval(timer);
    });

    const handleSelected = (image: string) => {
        if(!selected.includes(image) && !guessed.includes(image) && selected.length < 2 ){
            setSelected((selected) => selected.concat(image));
            setClicks(prev => prev + 1);
        }
    }

    return (
        <main>
            <h1>Memotest</h1>
            <p className='info'>clicks: {clicks < 10 ? '0' + clicks : clicks} <span>|</span> time: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
            <ul className='memo-container'>
                {IMAGES.map((image) => {
                    const [, url] = image.split('|');

                    return(
                        (
                            <li 
                                key={image}
                                onClick={() => handleSelected(image)}
                                className={selected.includes(image) || guessed.includes(image) ? 'memo-flipped clicked' : ''}
                            >
                                {selected.includes(image) || guessed.includes(image) ? (
                                    <img src={url} alt='Icon' className='memo-flipped'/>    
                                ) : (
                                    <img src={question} alt='Question circle' />
                                )}
                            </li>
                        )
                    )
                })}
            </ul>
            <button 
                className={`btn-again ${guessed.length === IMAGES.length ? '' : 'hidden'}`}
                onClick={() => location.reload()}
            >
                PLAY AGAIN
            </button>
        </main>
    )
};

export default App;