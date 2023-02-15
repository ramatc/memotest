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

    const handleSelected = (image: string) => {
        if(!selected.includes(image) && !guessed.includes(image) && selected.length < 2 ){
            setSelected((selected) => selected.concat(image))
        }
    }

    return (
        <main>
            <h1>Memotest</h1>

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